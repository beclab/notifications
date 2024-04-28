/*
  Warnings:

  - You are about to drop the `channels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `integrations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `jobs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscribers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `templates` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SenderType" AS ENUM ('TermiPass', 'Desktop');

-- CreateEnum
CREATE TYPE "RecipientType" AS ENUM ('Firebase', 'User', 'Application');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('Pending', 'Succeed', 'Failed');

-- CreateEnum
CREATE TYPE "ActiveStatus" AS ENUM ('Active', 'Suspend');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('Pending', 'Running', 'Finished');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('Pending', 'Senting', 'Succeed', 'Failed');

-- DropTable
DROP TABLE "channels";

-- DropTable
DROP TABLE "integrations";

-- DropTable
DROP TABLE "jobs";

-- DropTable
DROP TABLE "messages";

-- DropTable
DROP TABLE "subscribers";

-- DropTable
DROP TABLE "templates";

-- CreateTable
CREATE TABLE "Sender" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SenderType" NOT NULL,
    "receiverType" "RecipientType" NOT NULL,
    "credential" JSONB,
    "isEditable" BOOLEAN NOT NULL DEFAULT true,
    "status" "ActiveStatus" NOT NULL DEFAULT 'Active',
    "user" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "RecipientType" NOT NULL,
    "isEditable" BOOLEAN NOT NULL DEFAULT true,
    "status" "ActiveStatus" NOT NULL DEFAULT 'Active',
    "user" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recipients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipientAddress" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "RecipientType" NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "RecipientAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotifyGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "status" "ActiveStatus" NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotifyGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notify" (
    "id" SERIAL NOT NULL,
    "notifyGroupId" INTEGER NOT NULL,
    "sender" INTEGER NOT NULL,
    "recipients" INTEGER NOT NULL,
    "status" "ActiveStatus" NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notify_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Template" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "app" TEXT NOT NULL,
    "defaultLanguage" TEXT NOT NULL,
    "variables" JSONB NOT NULL,
    "channel" INTEGER NOT NULL,
    "user" TEXT NOT NULL,
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
    "content" TEXT NOT NULL,

    CONSTRAINT "TemplateContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "templateId" INTEGER NOT NULL,
    "notifyGroupId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "messageNum" INTEGER NOT NULL DEFAULT 0,
    "sentNum" INTEGER NOT NULL DEFAULT 0,
    "successNum" INTEGER NOT NULL DEFAULT 0,
    "rawdata" JSONB NOT NULL,
    "user" TEXT NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "message" JSONB NOT NULL,
    "senderType" "SenderType" NOT NULL,
    "sender" JSONB NOT NULL,
    "recipientType" "RecipientType" NOT NULL,
    "recipient" JSONB NOT NULL,
    "user" TEXT NOT NULL,
    "status" "MessageStatus" NOT NULL DEFAULT 'Pending',
    "statusInfo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RecipientAddressToRecipients" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RecipientAddressToRecipients_AB_unique" ON "_RecipientAddressToRecipients"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipientAddressToRecipients_B_index" ON "_RecipientAddressToRecipients"("B");

-- AddForeignKey
ALTER TABLE "Notify" ADD CONSTRAINT "Notify_notifyGroupId_fkey" FOREIGN KEY ("notifyGroupId") REFERENCES "NotifyGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateContent" ADD CONSTRAINT "TemplateContent_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_notifyGroupId_fkey" FOREIGN KEY ("notifyGroupId") REFERENCES "NotifyGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipientAddressToRecipients" ADD CONSTRAINT "_RecipientAddressToRecipients_A_fkey" FOREIGN KEY ("A") REFERENCES "RecipientAddress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipientAddressToRecipients" ADD CONSTRAINT "_RecipientAddressToRecipients_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
