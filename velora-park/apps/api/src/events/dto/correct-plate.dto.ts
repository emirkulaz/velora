import { IsString, MinLength } from 'class-validator';

export class CorrectPlateDto {
  @IsString()
  @MinLength(2)
  plateText!: string;
}
