/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `NotifyGroup` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[appTemplateId,app]` on the table `Template` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user` to the `NotifyGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appTemplateId` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NotifyGroup" ADD COLUMN     "user" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "appTemplateId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "NotifyGroup_name_key" ON "NotifyGroup"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Template_appTemplateId_app_key" ON "Template"("appTemplateId", "app");
