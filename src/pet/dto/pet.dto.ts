import { Sex, Status } from '@prisma/client';

export interface PetDto {
  petId: number;
  name: string;
  sex: Sex;
  description: string;
  birthDate: Date;
  imageUrl: string;
  breedId: number;
  createdAt: Date;
  updatedAt: Date;
  status: Status;
}
