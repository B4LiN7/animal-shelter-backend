import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

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
  @IsString({ each: true })
  @Matches(/^[A-Z_]+$/, {
    each: true,
    message:
      'Each roleName should only contain uppercase letters and underscores',
  })
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  roles: string[];
}
