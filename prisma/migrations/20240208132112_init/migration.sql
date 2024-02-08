/*
  Warnings:

  - The values [female,male,other] on the enum `Sex` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `from` on table `PetStatus` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Sex_new" AS ENUM ('FEMALE', 'MALE', 'OTHER');
ALTER TABLE "Pet" ALTER COLUMN "sex" TYPE "Sex_new" USING ("sex"::text::"Sex_new");
ALTER TYPE "Sex" RENAME TO "Sex_old";
ALTER TYPE "Sex_new" RENAME TO "Sex";
DROP TYPE "Sex_old";
COMMIT;

-- AlterTable
CREATE SEQUENCE pet_petid_seq;
ALTER TABLE "Pet" ALTER COLUMN "petId" SET DEFAULT nextval('pet_petid_seq'),
ALTER COLUMN "sex" SET DEFAULT 'OTHER';
ALTER SEQUENCE pet_petid_seq OWNED BY "Pet"."petId";

-- AlterTable
CREATE SEQUENCE petstatus_petstatusid_seq;
ALTER TABLE "PetStatus" ALTER COLUMN "petStatusId" SET DEFAULT nextval('petstatus_petstatusid_seq'),
ALTER COLUMN "newStatus" SET DEFAULT 'UNKNOWN',
ALTER COLUMN "from" SET NOT NULL;
ALTER SEQUENCE petstatus_petstatusid_seq OWNED BY "PetStatus"."petStatusId";
