-- CreateEnum
CREATE TYPE "Slot" AS ENUM ('FIRST', 'MEDIUM', 'LAST');

-- CreateEnum
CREATE TYPE "Duration" AS ENUM ('SIX_MONTHS', 'TEN_MONTHS', 'TWELVE_MONTHS');

-- CreateTable
CREATE TABLE "Circle" (
    "id" SERIAL NOT NULL,
    "members" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "slot" "Slot" NOT NULL,
    "adminFees" DOUBLE PRECISION,
    "duration" "Duration" NOT NULL,
    "startOn" TIMESTAMP(3) NOT NULL,
    "installments" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Circle_pkey" PRIMARY KEY ("id")
);
