-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'SHELTER_WORKER');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('female', 'male');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('INCOMING', 'INSHELTER', 'ADOPTED', 'ILL', 'DECEASED');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "locationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3),
    "editedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Location" (
    "locationId" INTEGER NOT NULL,
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
    "adoptionId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "Adoption_pkey" PRIMARY KEY ("adoptionId")
);

-- CreateTable
CREATE TABLE "Pet" (
    "petId" INTEGER NOT NULL,
    "name" TEXT,
    "sex" "Sex" NOT NULL,
    "breedId" INTEGER NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("petId")
);

-- CreateTable
CREATE TABLE "PetStatus" (
    "petStatusId" INTEGER NOT NULL,
    "newStatus" "Status" NOT NULL,
    "from" TIMESTAMP(3),
    "petId" INTEGER NOT NULL,

    CONSTRAINT "PetStatus_pkey" PRIMARY KEY ("petStatusId")
);

-- CreateTable
CREATE TABLE "Breed" (
    "breedId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Breed_pkey" PRIMARY KEY ("breedId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("locationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("petId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed"("breedId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetStatus" ADD CONSTRAINT "PetStatus_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("petId") ON DELETE RESTRICT ON UPDATE CASCADE;
