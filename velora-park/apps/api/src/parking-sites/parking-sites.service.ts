import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ParkingSitesService {
  constructor(private readonly prisma: PrismaService) {}

  list(organizationId: string) {
    return this.prisma.parkingSite.findMany({
      where: { organizationId, isActive: true },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        code: true,
        timezone: true,
        countryCode: true,
        address: true,
        _count: { select: { cameras: true } },
      },
    });
  }
}
