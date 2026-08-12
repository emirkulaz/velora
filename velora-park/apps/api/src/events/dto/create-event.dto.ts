import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { EventDirection } from '@prisma/client';

export class CreateEventDto {
  @IsString()
  @MinLength(1)
  cameraId!: string;

  @IsString()
  @MinLength(2)
  plateText!: string;

  @IsEnum(EventDirection)
  direction!: EventDirection;

  @IsNumber()
  @Min(0)
  @Max(1)
  confidence!: number;

  @IsString()
  @MinLength(2)
  countryCode!: string;

  @IsOptional()
  @IsString()
  detectedAt?: string;

  @IsOptional()
  @IsNumber()
  processingDurationMs?: number;

  @IsOptional()
  @IsString()
  provider?: string;

  @IsOptional()
  @IsString()
  vehicleImageUrl?: string;

  @IsOptional()
  @IsString()
  plateCropUrl?: string;
}
