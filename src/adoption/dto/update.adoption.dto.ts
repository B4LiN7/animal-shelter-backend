import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { AdoptionStatusEnum as AdoptionStatus } from '@prisma/client';

export class UpdateAdoptionDto {
  @IsNotEmpty()
  @IsEnum(AdoptionStatus)
  status: AdoptionStatus;

  @IsOptional()
  @IsString()
  reason: string;
}
