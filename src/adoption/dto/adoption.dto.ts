import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

export enum AdoptionStatus {
  ADOPTING = 'ADOPTING',
  ADOPTED = 'ADOPTED',
  CANCELLED = 'CANCELLED',
}

export class AdoptionDto {
  @IsNotEmpty()
  @IsNumber()
  petId: number;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsEnum(AdoptionStatus)
  status: AdoptionStatus;
}
