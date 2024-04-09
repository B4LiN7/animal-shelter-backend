import {
  ArrayMinSize,
  ArrayNotEmpty,
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
  profileImageUrl: string;

  @IsNotEmpty()
  @IsString({ each: true })
  @Matches(/^[A-Z_]+$/, {
    each: true,
    message:
      'Each role name should only contain uppercase letters and underscores',
  })
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  roles: string[];
}
