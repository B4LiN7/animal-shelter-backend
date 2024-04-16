import { PetSexEnum as Sex, PetStatusEnum as Status } from '@prisma/client';
import { IsArray, IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsDateInPast } from './create.pet.dto'
import { IsEnumAndTransform, PetStatusDtoEnum } from './pet-status.validator';

export class UpdatePetDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls: string[];

  @IsOptional()
  @IsString()
  breedId: string;

  @IsOptional()
  @IsString()
  @IsEnum(Sex)
  sex: Sex;

  @IsOptional()
  @IsString()
  @IsEnumAndTransform(PetStatusDtoEnum, Status)
  status: Status;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsDateInPast()
  birthDate: Date;
}
