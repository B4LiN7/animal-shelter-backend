import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBreedDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  speciesId: string;
}
