import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSpeciesDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
