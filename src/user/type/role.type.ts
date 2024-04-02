import { PermissionEnum } from '@prisma/client';

export interface RoleType {
  roleId: string;
  roleName: string;
  description: string;
  permissions: PermissionEnum[];
}