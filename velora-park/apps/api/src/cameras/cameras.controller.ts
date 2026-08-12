import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthJwtPayload } from '../auth/auth.types';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { requireOrganizationId } from '../common/tenant';
import { CamerasService } from './cameras.service';

@Controller('cameras')
@UseGuards(RolesGuard)
export class CamerasController {
  constructor(private readonly camerasService: CamerasService) {}

  @Get()
  list(@CurrentUser() user: AuthJwtPayload) {
    return this.camerasService.list(requireOrganizationId(user));
  }

  @Get(':id')
  get(@CurrentUser() user: AuthJwtPayload, @Param('id') id: string) {
    return this.camerasService.get(requireOrganizationId(user), id);
  }
}
