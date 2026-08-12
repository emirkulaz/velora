import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { EventStatus, Prisma, UserRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthJwtPayload } from '../auth/auth.types';
import { CorrectPlateDto } from './dto/correct-plate.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { ListEventsQueryDto } from './dto/list-events.query.dto';
import { normalizePlateText } from './plate-normalize';
import { EventsGateway } from './events.gateway';

@Injectable()
export class EventsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async createFromRecognition(dto: CreateEventDto) {
    const camera = await this.prisma.camera.findUnique({
      where: { id: dto.cameraId },
      include: { parkingSite: true },
    });
    if (!camera || !camera.isActive) {
      throw new NotFoundException('Camera not found or inactive.');
    }

    const organizationId = camera.organizationId;
    const normalizedPlateText = normalizePlateText(
      dto.plateText,
      dto.countryCode || camera.parkingSite.countryCode,
    );
    const detectedAt = dto.detectedAt
      ? new Date(dto.detectedAt)
      : new Date();
    if (Number.isNaN(detectedAt.getTime())) {
      throw new BadRequestException('Invalid detectedAt.');
    }

    const dedupeSince = new Date(
      detectedAt.getTime() - camera.dedupeWindowSeconds * 1000,
    );

    const duplicate = await this.prisma.vehicleEvent.findFirst({
      where: {
        organizationId,
        cameraId: camera.id,
        normalizedPlateText,
        direction: dto.direction,
        detectedAt: { gte: dedupeSince },
      },
      orderBy: { detectedAt: 'desc' },
    });

    if (duplicate) {
      return { deduplicated: true as const, event: duplicate };
    }

    const status: EventStatus =
      dto.confidence < camera.confidenceThreshold
        ? EventStatus.NEEDS_REVIEW
        : EventStatus.CONFIRMED;

    const event = await this.prisma.vehicleEvent.create({
      data: {
        organizationId,
        parkingSiteId: camera.parkingSiteId,
        cameraId: camera.id,
        plateText: dto.plateText.trim(),
        normalizedPlateText,
        direction: dto.direction,
        detectedAt,
        confidence: dto.confidence,
        countryCode: (dto.countryCode || camera.parkingSite.countryCode).toUpperCase(),
        status,
        vehicleImageUrl: dto.vehicleImageUrl,
        plateCropUrl: dto.plateCropUrl,
        processingDurationMs: dto.processingDurationMs,
        recognitions: {
          create: {
            organizationId,
            rawText: dto.plateText.trim(),
            normalizedText: normalizedPlateText,
            confidence: dto.confidence,
            provider: dto.provider ?? 'unknown',
            countryCode: (dto.countryCode || camera.parkingSite.countryCode).toUpperCase(),
            isPrimary: true,
          },
        },
      },
      include: {
        camera: { select: { id: true, name: true, code: true } },
        parkingSite: { select: { id: true, name: true, timezone: true } },
      },
    });

    if (status === EventStatus.NEEDS_REVIEW) {
      await this.prisma.notification.create({
        data: {
          organizationId,
          title: 'Low confidence plate reading',
          body: `${event.plateText} needs review (confidence ${event.confidence.toFixed(2)}).`,
          payloadJson: JSON.stringify({ vehicleEventId: event.id }),
        },
      });
    }

    this.eventsGateway.emitEventCreated(organizationId, event);
    return { deduplicated: false as const, event };
  }

  async list(organizationId: string, query: ListEventsQueryDto) {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 20;

    const where: Prisma.VehicleEventWhereInput = {
      organizationId,
      ...(query.direction ? { direction: query.direction } : {}),
      ...(query.status ? { status: query.status } : {}),
      ...(query.cameraId ? { cameraId: query.cameraId } : {}),
      ...(query.plate
        ? {
            normalizedPlateText: {
              contains: normalizePlateText(query.plate, 'GENERIC'),
            },
          }
        : {}),
      ...(query.from || query.to
        ? {
            detectedAt: {
              ...(query.from ? { gte: new Date(query.from) } : {}),
              ...(query.to ? { lte: new Date(query.to) } : {}),
            },
          }
        : {}),
    };

    const [total, items] = await this.prisma.$transaction([
      this.prisma.vehicleEvent.count({ where }),
      this.prisma.vehicleEvent.findMany({
        where,
        orderBy: { detectedAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          camera: { select: { id: true, name: true, code: true } },
          parkingSite: { select: { id: true, name: true, timezone: true } },
        },
      }),
    ]);

    return {
      data: items,
      meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
    };
  }

  async get(organizationId: string, id: string) {
    const event = await this.prisma.vehicleEvent.findFirst({
      where: { id, organizationId },
      include: {
        camera: {
          select: {
            id: true,
            name: true,
            code: true,
            direction: true,
            status: true,
          },
        },
        parkingSite: {
          select: { id: true, name: true, timezone: true, countryCode: true },
        },
        recognitions: { orderBy: { createdAt: 'desc' } },
        snapshots: true,
      },
    });
    if (!event) throw new NotFoundException('Event not found.');
    return event;
  }

  async correctPlate(
    user: AuthJwtPayload,
    organizationId: string,
    id: string,
    dto: CorrectPlateDto,
  ) {
    if (
      user.role !== UserRole.ORGANIZATION_ADMIN &&
      user.role !== UserRole.OPERATOR &&
      user.role !== UserRole.SUPER_ADMIN
    ) {
      throw new BadRequestException('Role cannot correct plates.');
    }

    const existing = await this.get(organizationId, id);
    const normalizedPlateText = normalizePlateText(
      dto.plateText,
      existing.countryCode,
    );

    const updated = await this.prisma.$transaction(async (tx) => {
      const event = await tx.vehicleEvent.update({
        where: { id },
        data: {
          plateText: dto.plateText.trim(),
          normalizedPlateText,
          manuallyCorrected: true,
          status: EventStatus.CONFIRMED,
        },
        include: {
          camera: { select: { id: true, name: true, code: true } },
          parkingSite: { select: { id: true, name: true, timezone: true } },
        },
      });

      await tx.auditLog.create({
        data: {
          organizationId,
          actorUserId: user.sub,
          action: 'vehicle_event.plate_corrected',
          entityType: 'VehicleEvent',
          entityId: id,
          metadataJson: JSON.stringify({
            from: existing.plateText,
            to: event.plateText,
          }),
        },
      });

      return event;
    });

    return updated;
  }

  reviewQueue(organizationId: string, query: ListEventsQueryDto) {
    return this.list(organizationId, {
      ...query,
      status: EventStatus.NEEDS_REVIEW,
    });
  }
}
