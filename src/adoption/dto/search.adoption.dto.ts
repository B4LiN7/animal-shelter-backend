import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AdoptionStatusEnum as AdoptionStatus } from '@prisma/client';

export class SearchAdoptionDto {
  @IsString()
  @IsOptional()
  petId?: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsEnum(AdoptionStatus)
  @IsOptional()
  status?: AdoptionStatus;
}
