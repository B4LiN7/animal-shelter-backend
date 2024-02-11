-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'ADOPTING';

-- AlterTable
CREATE SEQUENCE breed_breedid_seq;
ALTER TABLE "Breed" ALTER COLUMN "breedId" SET DEFAULT nextval('breed_breedid_seq');
ALTER SEQUENCE breed_breedid_seq OWNED BY "Breed"."breedId";
