-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "rawMesssage" JSONB;

-- CreateIndex
CREATE INDEX "Job_status_idx" ON "Job"("status");

-- CreateIndex
CREATE INDEX "Message_status_idx" ON "Message"("status");
