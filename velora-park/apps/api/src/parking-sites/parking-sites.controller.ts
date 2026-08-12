import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthJwtPayload } from '../auth/auth.types';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { requireOrganizationId } from '../common/tenant';
import { ParkingSitesService } from './parking-sites.service';

@Controller('parking-sites')
@UseGuards(RolesGuard)
export class ParkingSitesController {
  constructor(private readonly parkingSitesService: ParkingSitesService) {}

  @Get()
  list(@CurrentUser() user: AuthJwtPayload) {
    const organizationId = requireOrganizationId(user);
    return this.parkingSitesService.list(organizationId);
  }
}
