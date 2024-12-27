/*
  Warnings:

  - A unique constraint covering the columns `[userId1,userId2]` on the table `ChatRoom` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ChatRoom_userId1_userId2_key" ON "ChatRoom"("userId1", "userId2");
