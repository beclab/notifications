/*
  Warnings:

  - You are about to drop the column `content` on the `TemplateContent` table. All the data in the column will be lost.
  - Added the required column `body` to the `TemplateContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `TemplateContent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TemplateContent" DROP COLUMN "content",
ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
