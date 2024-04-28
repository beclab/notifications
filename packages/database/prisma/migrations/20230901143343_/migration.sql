/*
  Warnings:

  - The values [User,Application] on the enum `RecipientType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `name` on the `Job` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RecipientType_new" AS ENUM ('Firebase', 'Email', 'Phone', 'Webhook');
ALTER TABLE "Sender" ALTER COLUMN "recipientType" TYPE "RecipientType_new" USING ("recipientType"::text::"RecipientType_new");
ALTER TABLE "Recipients" ALTER COLUMN "type" TYPE "RecipientType_new" USING ("type"::text::"RecipientType_new");
ALTER TABLE "RecipientAddress" ALTER COLUMN "type" TYPE "RecipientType_new" USING ("type"::text::"RecipientType_new");
ALTER TABLE "Message" ALTER COLUMN "recipientType" TYPE "RecipientType_new" USING ("recipientType"::text::"RecipientType_new");
ALTER TYPE "RecipientType" RENAME TO "RecipientType_old";
ALTER TYPE "RecipientType_new" RENAME TO "RecipientType";
DROP TYPE "RecipientType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "name";
