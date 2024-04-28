/*
  Warnings:

  - You are about to drop the column `receiverType` on the `Sender` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Recipients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[type,app]` on the table `Sender` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `app` to the `Sender` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientType` to the `Sender` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sender" DROP COLUMN "receiverType",
ADD COLUMN     "app" TEXT NOT NULL,
ADD COLUMN     "recipientType" "RecipientType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Recipients_name_key" ON "Recipients"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Sender_type_app_key" ON "Sender"("type", "app");
