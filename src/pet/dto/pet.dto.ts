import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PetDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @IsIn(['female', 'male', 'other'])
  sex: string;

  @IsNotEmpty()
  @IsNumber()
  breedId: number;

  @IsOptional()
  @IsString()
  @IsIn([
    'unknown',
    'incoming',
    'inshelter',
    'adopting',
    'adopted',
    'ill',
    'deceased',
  ])
  status: string;
}
