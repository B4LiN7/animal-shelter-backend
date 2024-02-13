-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_breedId_fkey";

-- AlterTable
ALTER TABLE "Pet" ALTER COLUMN "breedId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed"("breedId") ON DELETE SET NULL ON UPDATE CASCADE;
