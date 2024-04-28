/*
  Warnings:

  - The `variables` column on the `Template` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Template" DROP COLUMN "variables",
ADD COLUMN     "variables" TEXT[];
