/*
  Warnings:

  - You are about to drop the column `stars` on the `Post` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `PostBrowsingHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `PostBrowsingHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "stars",
ADD COLUMN     "starsCount" INTEGER DEFAULT 0,
ADD COLUMN     "totalStars" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "PostBrowsingHistory" ADD COLUMN     "updatedAt" TIMESTAMP(6) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "PostBrowsingHistory_postId_idx" ON "PostBrowsingHistory"("postId");

-- CreateIndex
CREATE INDEX "PostBrowsingHistory_userId_idx" ON "PostBrowsingHistory"("userId");

-- CreateIndex
CREATE INDEX "PostBrowsingHistory_updatedAt_idx" ON "PostBrowsingHistory"("updatedAt");

-- AddForeignKey
ALTER TABLE "PostBrowsingHistory" ADD CONSTRAINT "PostBrowsingHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
