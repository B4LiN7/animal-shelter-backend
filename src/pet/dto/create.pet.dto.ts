import { PetSexEnum as Sex, PetStatusEnum as Status } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  registerDecorator,
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
  @IsArray()
  @IsString({ each: true })
  imageUrls: string[];

  @IsNotEmpty()
  @IsString()
  breedId: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Sex)
  sex: Sex;

  @IsOptional()
  @IsString()
  @IsEnum(Status)
  status: Status = Status.UNKNOWN;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsDateInPast()
  birthDate: Date;
}

export function IsDateInPast() {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'isDateInPast',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: any) {
          const dateValue = new Date(value);
          const now = new Date();
          return dateValue <= now;
        },
        defaultMessage() {
          return 'Date should not be in the future';
        },
      },
    });
  };
}
