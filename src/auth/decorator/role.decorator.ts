import { SetMetadata } from '@nestjs/common';
import { Role as RoleEnum } from '@prisma/client';

export const Role = (...roles: RoleEnum[]) => SetMetadata('roles', roles);
