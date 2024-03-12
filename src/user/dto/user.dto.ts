import { Role } from '@prisma/client';

export interface UserDto {
  userId: string;
  username: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  editedAt: Date;
}
