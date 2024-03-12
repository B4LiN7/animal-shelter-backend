import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBreedDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  speciesId: number;
}
