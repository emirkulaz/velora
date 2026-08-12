import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/** Public camera DTO — never includes RTSP secrets. */
export type CameraPublic = {
  id: string;
  parkingSiteId: string;
  name: string;
  code: string;
  direction: 'ENTRY' | 'EXIT';
  status: 'ONLINE' | 'OFFLINE' | 'UNKNOWN';
  lastHeartbeatAt: Date | null;
  frameIntervalMs: number;
  confidenceThreshold: number;
  dedupeWindowSeconds: number;
  isActive: boolean;
  hasRtspConfigured: boolean;
};

@Injectable()
export class CamerasService {
  constructor(private readonly prisma: PrismaService) {}

  async list(organizationId: string): Promise<CameraPublic[]> {
    const cameras = await this.prisma.camera.findMany({
      where: { organizationId },
      orderBy: [{ parkingSiteId: 'asc' }, { name: 'asc' }],
    });
    return cameras.map((camera) => this.toPublic(camera));
  }

  async get(organizationId: string, id: string): Promise<CameraPublic> {
    const camera = await this.prisma.camera.findFirst({
      where: { id, organizationId },
    });
    if (!camera) throw new NotFoundException('Camera not found.');
    return this.toPublic(camera);
  }

  private toPublic(camera: {
    id: string;
    parkingSiteId: string;
    name: string;
    code: string;
    direction: 'ENTRY' | 'EXIT';
    status: 'ONLINE' | 'OFFLINE' | 'UNKNOWN';
    lastHeartbeatAt: Date | null;
    frameIntervalMs: number;
    confidenceThreshold: number;
    dedupeWindowSeconds: number;
    isActive: boolean;
    rtspUrlEncrypted: string | null;
  }): CameraPublic {
    return {
      id: camera.id,
      parkingSiteId: camera.parkingSiteId,
      name: camera.name,
      code: camera.code,
      direction: camera.direction,
      status: camera.status,
      lastHeartbeatAt: camera.lastHeartbeatAt,
      frameIntervalMs: camera.frameIntervalMs,
      confidenceThreshold: camera.confidenceThreshold,
      dedupeWindowSeconds: camera.dedupeWindowSeconds,
      isActive: camera.isActive,
      hasRtspConfigured: Boolean(camera.rtspUrlEncrypted),
    };
  }
}
