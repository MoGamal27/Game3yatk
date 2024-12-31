/*
  Warnings:

  - Changed the type of `userId` on the `CircleMember` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "CircleMember_payoutOrder_key";

-- AlterTable
ALTER TABLE "CircleMember" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CircleMember_circleId_userId_payoutOrder_key" ON "CircleMember"("circleId", "userId", "payoutOrder");

-- AddForeignKey
ALTER TABLE "CircleMember" ADD CONSTRAINT "CircleMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
