import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { AdoptionStatusEnum as AdoptionStatus } from '@prisma/client';

export class UpdateAdoptionDto {
  @IsNotEmpty()
  @IsNumber()
  petId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsEnum(AdoptionStatus)
  status: AdoptionStatus;

  @IsString()
  reason: string;
}
