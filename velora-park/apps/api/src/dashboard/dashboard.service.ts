import { Injectable } from '@nestjs/common';
import { EventDirection, EventStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async summary(organizationId: string, timezone: string) {
    const now = new Date();
    const startOfDayUtc = startOfLocalDayAsUtc(now, timezone);
    const endOfDayUtc = new Date(startOfDayUtc.getTime() + 24 * 60 * 60 * 1000);

    const [entriesToday, exitsToday, recentEvents, cameras, hourly] =
      await Promise.all([
        this.prisma.vehicleEvent.count({
          where: {
            organizationId,
            direction: EventDirection.ENTRY,
            detectedAt: { gte: startOfDayUtc, lt: endOfDayUtc },
          },
        }),
        this.prisma.vehicleEvent.count({
          where: {
            organizationId,
            direction: EventDirection.EXIT,
            detectedAt: { gte: startOfDayUtc, lt: endOfDayUtc },
          },
        }),
        this.prisma.vehicleEvent.findMany({
          where: { organizationId },
          orderBy: { detectedAt: 'desc' },
          take: 10,
          include: {
            camera: { select: { name: true, code: true } },
            parkingSite: { select: { name: true, timezone: true } },
          },
        }),
        this.prisma.camera.findMany({
          where: { organizationId },
          select: {
            id: true,
            name: true,
            code: true,
            status: true,
            direction: true,
            lastHeartbeatAt: true,
          },
          orderBy: { name: 'asc' },
        }),
        this.hourlyDensity(organizationId, startOfDayUtc, endOfDayUtc),
      ]);

    const needsReview = await this.prisma.vehicleEvent.count({
      where: { organizationId, status: EventStatus.NEEDS_REVIEW },
    });

    const peakHours = [...hourly]
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    return {
      timezone,
      entriesToday,
      exitsToday,
      needsReview,
      hourlyDensity: hourly,
      peakHours,
      recentEvents,
      cameras,
    };
  }

  private async hourlyDensity(
    organizationId: string,
    from: Date,
    to: Date,
  ): Promise<Array<{ hour: number; count: number }>> {
    const events = await this.prisma.vehicleEvent.findMany({
      where: { organizationId, detectedAt: { gte: from, lt: to } },
      select: { detectedAt: true },
    });

    const buckets = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      count: 0,
    }));
    for (const event of events) {
      buckets[event.detectedAt.getUTCHours()].count += 1;
    }
    return buckets;
  }
}

function startOfLocalDayAsUtc(now: Date, timeZone: string): Date {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const parts = formatter.formatToParts(now);
  const year = Number(parts.find((p) => p.type === 'year')?.value);
  const month = Number(parts.find((p) => p.type === 'month')?.value);
  const day = Number(parts.find((p) => p.type === 'day')?.value);

  // Approximate: treat local midnight as UTC midnight of the calendar day label.
  // Phase 1 simplicity; refine with zone offset library later.
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
}
