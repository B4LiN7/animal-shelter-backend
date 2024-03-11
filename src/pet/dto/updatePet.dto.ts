import { Sex, Status } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdatePetDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsNumber()
  breedId: number;

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
  birthDate: Date;
}
