/*
  Warnings:

  - The primary key for the `PostBrowsingHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PostBrowsingHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PostBrowsingHistory" DROP CONSTRAINT "PostBrowsingHistory_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "PostBrowsingHistory_pkey" PRIMARY KEY ("userId", "postId");
