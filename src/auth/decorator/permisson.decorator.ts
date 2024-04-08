import { SetMetadata } from '@nestjs/common';
import { PermissionEnum as Permission } from '@prisma/client';

export const PERMISSION_KEY = 'permissons';

export const Permissions = (...perms: Permission[]) =>
  SetMetadata(PERMISSION_KEY, perms);
