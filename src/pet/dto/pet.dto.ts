import { Sex, Status } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class PetDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @IsEnum(Sex)
  sex: Sex = Sex.OTHER;

  @IsNotEmpty()
  @IsNumber()
  breedId: number;

  @IsOptional()
  @IsString()
  @IsEnum(Status)
  status: Status = Status.UNKNOWN;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  birthDate: Date;

  @IsOptional()
  @IsString()
  imageUrl: string;
}
