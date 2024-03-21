import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Matches(/^[A-Z_]+$/, {
    message: 'roleName should only contain uppercase letters and underscores',
  })
  roleName: string;
}
