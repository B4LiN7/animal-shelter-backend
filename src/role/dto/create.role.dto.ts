import { PermissionEnum as Permission } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z_]+$/, {
    message: 'roleName should only contain uppercase letters and underscores',
  })
  roleName: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(Permission, { each: true })
  permissions: Permission[];
}
