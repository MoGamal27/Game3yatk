/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Circle` table. All the data in the column will be lost.
  - You are about to drop the column `installments` on the `Circle` table. All the data in the column will be lost.
  - You are about to drop the column `members` on the `Circle` table. All the data in the column will be lost.
  - You are about to drop the column `slot` on the `Circle` table. All the data in the column will be lost.
  - You are about to drop the column `startOn` on the `Circle` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Circle` table. All the data in the column will be lost.
  - Added the required column `installment` to the `Circle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalMember` to the `Circle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPayout` to the `Circle` table without a default value. This is not possible if the table is not empty.
  - Made the column `adminFees` on table `Circle` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `duration` on the `Circle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Circle" DROP COLUMN "createdAt",
DROP COLUMN "installments",
DROP COLUMN "members",
DROP COLUMN "slot",
DROP COLUMN "startOn",
DROP COLUMN "updatedAt",
ADD COLUMN     "installment" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "payoutDate" TIMESTAMP(3),
ADD COLUMN     "startedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "totalMember" INTEGER NOT NULL,
ADD COLUMN     "totalPayout" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "adminFees" SET NOT NULL,
DROP COLUMN "duration",
ADD COLUMN     "duration" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Duration";

-- DropEnum
DROP TYPE "Slot";

-- CreateTable
CREATE TABLE "CircleMember" (
    "id" SERIAL NOT NULL,
    "circleId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "payoutOrder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CircleMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CircleMember_payoutOrder_key" ON "CircleMember"("payoutOrder");

-- CreateIndex
CREATE UNIQUE INDEX "CircleMember_circleId_userId_payoutOrder_key" ON "CircleMember"("circleId", "userId", "payoutOrder");

-- AddForeignKey
ALTER TABLE "CircleMember" ADD CONSTRAINT "CircleMember_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "Circle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
