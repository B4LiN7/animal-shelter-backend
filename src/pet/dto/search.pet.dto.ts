import { IsOptional, IsString } from 'class-validator';

export class SearchPetDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  breed?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
