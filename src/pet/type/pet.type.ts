import { PetSexEnum as Sex, PetStatusEnum as Status } from '@prisma/client';

export interface PetType {
  petId: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  imageUrls: string[];
  sex: Sex;
  birthDate: Date;
  status: Status;
  breedId: string;
}
