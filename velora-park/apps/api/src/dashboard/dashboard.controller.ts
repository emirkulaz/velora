import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthJwtPayload } from '../auth/auth.types';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { requireOrganizationId } from '../common/tenant';
import { PrismaService } from '../prisma/prisma.service';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@UseGuards(RolesGuard)
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('summary')
  async summary(@CurrentUser() user: AuthJwtPayload) {
    const organizationId = requireOrganizationId(user);
    const org = await this.prisma.organization.findUnique({
      where: { id: organizationId },
      select: { timezone: true },
    });
    return this.dashboardService.summary(
      organizationId,
      org?.timezone ?? 'UTC',
    );
  }
}
