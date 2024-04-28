/*
  Warnings:

  - You are about to drop the column `credential` on the `Sender` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Sender_type_app_key";

-- AlterTable
ALTER TABLE "Sender" DROP COLUMN "credential";

-- CreateTable
CREATE TABLE "Credential" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "type" "SenderType" NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Credential_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Credential_senderId_key" ON "Credential"("senderId");

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Sender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
