import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SpeciesDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
