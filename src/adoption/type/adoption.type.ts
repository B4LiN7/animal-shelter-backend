import { AdoptionStatusEnum as AdoptionStatus } from '@prisma/client';

export interface AdoptionType {
  adoptionId: string;
  petId: string;
  userId: string;
  status: AdoptionStatus;
  reason: string;
}
