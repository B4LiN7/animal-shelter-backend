import { IsString, IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class AdoptionDto {
  @IsNotEmpty()
  @IsNumber()
  petId: number;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsIn(['adopting', 'adopted'])
  status: string;
}
