import { Sex, Status } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PetDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  /*@IsIn([
  'female', 
  'male', 
  'other',
  ])*/
  @IsEnum(Sex)
  sex: Sex;

  @IsNotEmpty()
  @IsNumber()
  breedId: number;

  @IsOptional()
  @IsString()
  /*@IsIn([
    'unknown',
    'incoming',
    'inshelter',
    'adopting',
    'adopted',
    'ill',
    'deceased',
  ])*/
  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsDate()
  birthDate: Date;

  @IsOptional()
  @IsString()
  imageUrl: string;
}
