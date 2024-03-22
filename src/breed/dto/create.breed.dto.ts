import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBreedDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  speciesId: string;
}
