import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BreedDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
