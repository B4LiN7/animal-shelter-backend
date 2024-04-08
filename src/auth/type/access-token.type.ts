import { PermissionEnum as Permission } from '@prisma/client';
export interface AccessTokenType {
  userId: string;
  permissions: Permission[];
  iat: number;
  exp: number;
}
