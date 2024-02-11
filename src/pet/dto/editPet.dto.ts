import { AddPetDto } from './addPet.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class EditPetDto extends AddPetDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
