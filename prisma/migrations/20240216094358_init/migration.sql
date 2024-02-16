-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'SHELTER_WORKER');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('FEMALE', 'MALE', 'OTHER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('UNKNOWN', 'INCOMING', 'INSHELTER', 'ADOPTING', 'ADOPTED', 'ILL', 'DECEASED');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT,
    "hashedPassword" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Location" (
    "locationId" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "country" TEXT NOT NULL,
    "state" TEXT,
    "city" TEXT NOT NULL,
    "zipCode" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "addressExtra" TEXT,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("locationId")
);

-- CreateTable
CREATE TABLE "Adoption" (
    "adoptionId" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "Adoption_pkey" PRIMARY KEY ("adoptionId")
);

-- CreateTable
CREATE TABLE "Pet" (
    "petId" SERIAL NOT NULL,
    "name" TEXT,
    "sex" "Sex" NOT NULL DEFAULT 'OTHER',
    "description" TEXT,
    "birthDate" TIMESTAMP(3),
    "imageUrl" TEXT,
    "breedId" INTEGER,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("petId")
);

-- CreateTable
CREATE TABLE "PetStatus" (
    "petStatusId" SERIAL NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'UNKNOWN',
    "from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "PetStatus_pkey" PRIMARY KEY ("petStatusId")
);

-- CreateTable
CREATE TABLE "Breed" (
    "breedId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Breed_pkey" PRIMARY KEY ("breedId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("petId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed"("breedId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetStatus" ADD CONSTRAINT "PetStatus_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("petId") ON DELETE RESTRICT ON UPDATE CASCADE;
