import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class PetDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(['female', 'male', 'other'])
  sex: string;

  @IsNotEmpty()
  @IsNumber()
  breedId: number;

  @IsOptional()
  @IsNotEmpty()
  status: string;
}
