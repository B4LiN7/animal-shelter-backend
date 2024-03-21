import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 64, {
    message:
      'Password must be at least 8 characters long but no longer than 64 characters.',
  })
  password: string;

  @IsOptional()
  @IsString()
  name: string;

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
