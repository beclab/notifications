/*
  Warnings:

  - You are about to drop the column `rawdata` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "rawdata";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "message" SET DATA TYPE TEXT,
ALTER COLUMN "sender" SET DATA TYPE TEXT,
ALTER COLUMN "recipient" SET DATA TYPE TEXT;
