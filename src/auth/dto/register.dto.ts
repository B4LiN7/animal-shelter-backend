import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class RegisterDto {
  @IsOptional()
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
  @IsEmail()
  email: string;
}
