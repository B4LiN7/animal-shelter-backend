import { PermissionEnum as Permission } from '@prisma/client';

export interface UserDto {
  userId: string;
  username: string;
  name: string;
  email: string;
  roles: string[];
  permissions: Permission[];
  createdAt: Date;
  updatedAt: Date;
}
