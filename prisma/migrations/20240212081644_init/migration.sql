/*
  Warnings:

  - You are about to drop the column `newStatus` on the `PetStatus` table. All the data in the column will be lost.

*/
-- AlterTable
CREATE SEQUENCE adoption_adoptionid_seq;
ALTER TABLE "Adoption" ALTER COLUMN "adoptionId" SET DEFAULT nextval('adoption_adoptionid_seq');
ALTER SEQUENCE adoption_adoptionid_seq OWNED BY "Adoption"."adoptionId";

-- AlterTable
CREATE SEQUENCE location_locationid_seq;
ALTER TABLE "Location" ALTER COLUMN "locationId" SET DEFAULT nextval('location_locationid_seq');
ALTER SEQUENCE location_locationid_seq OWNED BY "Location"."locationId";

-- AlterTable
ALTER TABLE "PetStatus" DROP COLUMN "newStatus",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'UNKNOWN';
