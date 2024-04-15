import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateLocationDto {
  @IsOptional()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  zipCode: number;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  addressExtra: string;
}
