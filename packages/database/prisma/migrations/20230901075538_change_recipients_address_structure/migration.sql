/*
  Warnings:

  - You are about to drop the `_RecipientAddressToRecipients` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `recipientsId` to the `RecipientAddress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_RecipientAddressToRecipients" DROP CONSTRAINT "_RecipientAddressToRecipients_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecipientAddressToRecipients" DROP CONSTRAINT "_RecipientAddressToRecipients_B_fkey";

-- AlterTable
ALTER TABLE "RecipientAddress" ADD COLUMN     "recipientsId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_RecipientAddressToRecipients";

-- AddForeignKey
ALTER TABLE "RecipientAddress" ADD CONSTRAINT "RecipientAddress_recipientsId_fkey" FOREIGN KEY ("recipientsId") REFERENCES "Recipients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
