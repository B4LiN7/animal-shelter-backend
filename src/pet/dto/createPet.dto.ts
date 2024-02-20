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

export class CreatePetDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  imageUrl: string;

  @IsNotEmpty()
  @IsNumber()
  breedId: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Sex)
  sex: Sex = Sex.OTHER;

  @IsOptional()
  @IsString()
  @IsEnum(Status)
  status: Status = Status.UNKNOWN;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  birthDate: Date;
}
