import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateLocationDto {
  @IsOptional()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  zipCode: number;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  addressExtra: string;
}
