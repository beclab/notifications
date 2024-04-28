/*
  Warnings:

  - The values [TermiPass,Desktop] on the enum `SenderType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SenderType_new" AS ENUM ('Application', 'SMTP', 'Webhook', 'Lark');
ALTER TABLE "Sender" ALTER COLUMN "type" TYPE "SenderType_new" USING ("type"::text::"SenderType_new");
ALTER TABLE "Message" ALTER COLUMN "senderType" TYPE "SenderType_new" USING ("senderType"::text::"SenderType_new");
ALTER TYPE "SenderType" RENAME TO "SenderType_old";
ALTER TYPE "SenderType_new" RENAME TO "SenderType";
DROP TYPE "SenderType_old";
COMMIT;
