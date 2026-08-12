import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRole } from '@prisma/client';
import { AuthJwtPayload } from '../auth/auth.types';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { requireOrganizationId } from '../common/tenant';
import { CorrectPlateDto } from './dto/correct-plate.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { ListEventsQueryDto } from './dto/list-events.query.dto';
import { EventsService } from './events.service';

@Controller('events')
@UseGuards(RolesGuard)
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly config: ConfigService,
  ) {}

  @Get()
  list(
    @CurrentUser() user: AuthJwtPayload,
    @Query() query: ListEventsQueryDto,
  ) {
    return this.eventsService.list(requireOrganizationId(user), query);
  }

  @Get('review-queue')
  reviewQueue(
    @CurrentUser() user: AuthJwtPayload,
    @Query() query: ListEventsQueryDto,
  ) {
    return this.eventsService.reviewQueue(requireOrganizationId(user), query);
  }

  @Get(':id')
  get(@CurrentUser() user: AuthJwtPayload, @Param('id') id: string) {
    return this.eventsService.get(requireOrganizationId(user), id);
  }

  @Patch(':id/correct-plate')
  @Roles(UserRole.ORGANIZATION_ADMIN, UserRole.OPERATOR)
  correctPlate(
    @CurrentUser() user: AuthJwtPayload,
    @Param('id') id: string,
    @Body() dto: CorrectPlateDto,
  ) {
    return this.eventsService.correctPlate(
      user,
      requireOrganizationId(user),
      id,
      dto,
    );
  }

  /**
   * Ingest endpoint for the recognition service.
   * Protected by shared service token (not end-user JWT).
   */
  @Public()
  @Post('ingest')
  ingest(
    @Headers('x-recognition-token') token: string | undefined,
    @Body() dto: CreateEventDto,
  ) {
    const expected = this.config.get<string>('RECOGNITION_INGEST_TOKEN');
    if (!expected || token !== expected) {
      throw new UnauthorizedException('Invalid recognition token.');
    }
    return this.eventsService.createFromRecognition(dto);
  }
}
