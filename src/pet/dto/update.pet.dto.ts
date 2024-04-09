import { PetSexEnum as Sex, PetStatusEnum as Status } from '@prisma/client';
import { IsArray, IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsDateInPast } from './create.pet.dto'

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
  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsDateInPast()
  birthDate: Date;
}
