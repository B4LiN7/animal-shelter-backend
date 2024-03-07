import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BreedDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  speciesId: number;
}
