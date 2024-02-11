import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddBreedDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
