/*
  Warnings:

  - You are about to drop the column `app` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `appTemplateId` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the `Messages` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[appTemplateName,appId]` on the table `Template` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appId` to the `Template` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appName` to the `Template` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appTemplateName` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_jobId_fkey";

-- DropIndex
DROP INDEX "Template_appTemplateId_app_key";

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "app",
DROP COLUMN "appTemplateId",
ADD COLUMN     "appId" TEXT NOT NULL,
ADD COLUMN     "appName" TEXT NOT NULL,
ADD COLUMN     "appTemplateName" TEXT NOT NULL;

-- DropTable
DROP TABLE "Messages";

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "message" JSONB NOT NULL,
    "senderType" "SenderType" NOT NULL,
    "sender" JSONB NOT NULL,
    "recipientType" "RecipientType" NOT NULL,
    "recipient" JSONB NOT NULL,
    "user" TEXT NOT NULL,
    "status" "MessageStatus" NOT NULL DEFAULT 'Pending',
    "statusInfo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Template_appTemplateName_appId_key" ON "Template"("appTemplateName", "appId");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
