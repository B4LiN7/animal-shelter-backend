import { SetMetadata } from '@nestjs/common';
import { Permission } from '@prisma/client';

export const PERMISSION_KEY = 'permissons';

export const Role = (...roles: Permission[]) =>
  SetMetadata(PERMISSION_KEY, roles);
