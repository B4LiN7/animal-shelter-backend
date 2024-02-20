/*
  Warnings:

  - The primary key for the `Adoption` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `adoptionId` on the `Adoption` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Adoption" DROP CONSTRAINT "Adoption_pkey",
DROP COLUMN "adoptionId",
ADD CONSTRAINT "Adoption_pkey" PRIMARY KEY ("userId", "petId");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT;
