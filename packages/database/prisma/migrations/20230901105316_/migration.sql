/*
  Warnings:

  - A unique constraint covering the columns `[templateId,language]` on the table `TemplateContent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TemplateContent_templateId_language_key" ON "TemplateContent"("templateId", "language");
