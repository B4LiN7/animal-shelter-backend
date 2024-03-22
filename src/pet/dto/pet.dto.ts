import { PetSexEnum as Sex, PetStatusEnum as Status } from '@prisma/client';

export interface PetDto {
  petId: string;
  name: string;
  sex: Sex;
  description: string;
  birthDate: Date;
  imageUrls: string[];
  breedId: string;
  createdAt: Date;
  updatedAt: Date;
  status: Status;
}
