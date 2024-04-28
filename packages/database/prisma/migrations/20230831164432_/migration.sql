/*
  Warnings:

  - You are about to drop the column `notifyGroupId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the `Notify` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NotifyGroup` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `notifyPolicyId` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_notifyGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Notify" DROP CONSTRAINT "Notify_notifyGroupId_fkey";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "notifyGroupId",
ADD COLUMN     "notifyPolicyId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Notify";

-- DropTable
DROP TABLE "NotifyGroup";

-- CreateTable
CREATE TABLE "NotifyPolicy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "status" "ActiveStatus" NOT NULL DEFAULT 'Active',
    "user" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotifyPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotifyRule" (
    "id" SERIAL NOT NULL,
    "notifyPolicyId" INTEGER NOT NULL,
    "sender" INTEGER NOT NULL,
    "recipients" INTEGER NOT NULL,
    "status" "ActiveStatus" NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotifyRule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotifyPolicy_name_key" ON "NotifyPolicy"("name");

-- AddForeignKey
ALTER TABLE "NotifyRule" ADD CONSTRAINT "NotifyRule_notifyPolicyId_fkey" FOREIGN KEY ("notifyPolicyId") REFERENCES "NotifyPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_notifyPolicyId_fkey" FOREIGN KEY ("notifyPolicyId") REFERENCES "NotifyPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
