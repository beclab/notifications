-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('Pending', 'Succeed', 'Failed');

-- CreateEnum
CREATE TYPE "ActiveStatus" AS ENUM ('Active', 'Suspend');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('Security', 'Warning', 'Info', 'Trace');

-- CreateTable
CREATE TABLE "Template" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "appName" TEXT NOT NULL,
    "appTemplateName" TEXT NOT NULL,
    "defaultLanguage" TEXT NOT NULL,
    "variables" JSONB,
    "level" "Level" NOT NULL,
    "user" TEXT NOT NULL,
    "isSystem" BOOLEAN NOT NULL,
    "topic" TEXT NOT NULL,
    "status" "ActiveStatus" NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateContent" (
    "id" SERIAL NOT NULL,
    "templateId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "TemplateContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Template_appTemplateName_appId_key" ON "Template"("appTemplateName", "appId");

-- CreateIndex
CREATE UNIQUE INDEX "TemplateContent_templateId_language_key" ON "TemplateContent"("templateId", "language");

-- AddForeignKey
ALTER TABLE "TemplateContent" ADD CONSTRAINT "TemplateContent_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
