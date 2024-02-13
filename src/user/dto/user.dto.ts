import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsIn(['admin', 'user', 'shelter_worker'])
  role: string;
}
