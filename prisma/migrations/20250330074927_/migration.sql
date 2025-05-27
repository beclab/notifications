/*
  Warnings:

  - You are about to drop the column `appTemplateName` on the `Template` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[appTemplateId,appId]` on the table `Template` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appTemplateId` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Level" ADD VALUE 'Sign';

-- DropIndex
DROP INDEX "Template_appTemplateName_appId_key";

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "appTemplateName",
ADD COLUMN     "appTemplateId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Template_appTemplateId_appId_key" ON "Template"("appTemplateId", "appId");
