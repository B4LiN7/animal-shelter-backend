import { SetMetadata } from '@nestjs/common';
import { Role as RoleEnum } from '@prisma/client';

export const ROLES_KEY = 'roles';

export const Role = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);
