import { IsNotEmpty, IsString } from 'class-validator';

export class SearchAdoptionDto {
  @IsString()
  @IsNotEmpty()
  petId?: string;

  @IsString()
  @IsNotEmpty()
  userId?: string;
}
