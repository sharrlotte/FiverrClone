-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Pending', 'Accepted', 'Rejected');

-- CreateEnum
CREATE TYPE "DurationType" AS ENUM ('Hour', 'Day', 'Week', 'Month', 'Year');

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "provider" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Authority" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Authority_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "parentId" INTEGER,
    "updatedAt" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoritePost" (
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "FavoritePost_pkey" PRIMARY KEY ("userId","postId")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "revision" INTEGER NOT NULL DEFAULT 0,
    "deliveryTime" INTEGER NOT NULL DEFAULT 0,
    "durationType" "DurationType" NOT NULL DEFAULT 'Day',
    "price" BIGINT NOT NULL DEFAULT 0,
    "special" JSON,
    "updatedAt" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "totalStars" INTEGER NOT NULL DEFAULT 0,
    "starsCount" INTEGER NOT NULL DEFAULT 0,
    "favorites" INTEGER NOT NULL DEFAULT 0,
    "thumbnail" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostCategory" (
    "postId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "PostCategory_pkey" PRIMARY KEY ("postId","categoryId")
);

-- CreateTable
CREATE TABLE "PostImage" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "PostImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostTag" (
    "tagId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "PostTag_pkey" PRIMARY KEY ("tagId","postId")
);

-- CreateTable
CREATE TABLE "Preview" (
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "star" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Preview_pkey" PRIMARY KEY ("userId","postId")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) NOT NULL,
    "avatar" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAuthority" (
    "userId" INTEGER NOT NULL,
    "authorityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "UserAuthority_pkey" PRIMARY KEY ("userId","authorityId")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "revision" INTEGER NOT NULL DEFAULT 0,
    "deliveryTime" TIME(6) NOT NULL,
    "price" BIGINT NOT NULL DEFAULT 0,
    "special" JSON,
    "status" "OrderStatus" DEFAULT 'Pending',
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostBrowsingHistory" (
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "PostBrowsingHistory_pkey" PRIMARY KEY ("userId","postId")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "SkillCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Account_providerId_idx" ON "Account"("providerId");

-- CreateIndex
CREATE INDEX "Account_provider_idx" ON "Account"("provider");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Authority_name_key" ON "Authority"("name");

-- CreateIndex
CREATE INDEX "Authority_name_idx" ON "Authority"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "Category_name_idx" ON "Category"("name");

-- CreateIndex
CREATE INDEX "Category_parentId_idx" ON "Category"("parentId");

-- CreateIndex
CREATE INDEX "FavoritePost_postId_idx" ON "FavoritePost"("postId");

-- CreateIndex
CREATE INDEX "FavoritePost_userId_idx" ON "FavoritePost"("userId");

-- CreateIndex
CREATE INDEX "Package_postId_title_idx" ON "Package"("postId", "title");

-- CreateIndex
CREATE INDEX "PostCategory_categoryId_idx" ON "PostCategory"("categoryId");

-- CreateIndex
CREATE INDEX "PostCategory_postId_idx" ON "PostCategory"("postId");

-- CreateIndex
CREATE INDEX "PostImage_postId_idx" ON "PostImage"("postId");

-- CreateIndex
CREATE INDEX "PostTag_postId_idx" ON "PostTag"("postId");

-- CreateIndex
CREATE INDEX "PostTag_tagId_idx" ON "PostTag"("tagId");

-- CreateIndex
CREATE INDEX "Preview_postId_idx" ON "Preview"("postId");

-- CreateIndex
CREATE INDEX "Preview_userId_idx" ON "Preview"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE INDEX "Role_name_idx" ON "Role"("name");

-- CreateIndex
CREATE INDEX "Tag_name_idx" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "UserAuthority_authorityId_idx" ON "UserAuthority"("authorityId");

-- CreateIndex
CREATE INDEX "UserAuthority_userId_idx" ON "UserAuthority"("userId");

-- CreateIndex
CREATE INDEX "UserRole_roleId_idx" ON "UserRole"("roleId");

-- CreateIndex
CREATE INDEX "UserRole_userId_idx" ON "UserRole"("userId");

-- CreateIndex
CREATE INDEX "Order_postId_idx" ON "Order"("postId");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE INDEX "PostBrowsingHistory_postId_idx" ON "PostBrowsingHistory"("postId");

-- CreateIndex
CREATE INDEX "PostBrowsingHistory_userId_idx" ON "PostBrowsingHistory"("userId");

-- CreateIndex
CREATE INDEX "PostBrowsingHistory_updatedAt_idx" ON "PostBrowsingHistory"("updatedAt");

-- CreateIndex
CREATE INDEX "Skill_categoryId_idx" ON "Skill"("categoryId");

-- CreateIndex
CREATE INDEX "Skill_name_idx" ON "Skill"("name");

-- CreateIndex
CREATE INDEX "SkillCategory_name_idx" ON "SkillCategory"("name");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FavoritePost" ADD CONSTRAINT "FavoritePost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FavoritePost" ADD CONSTRAINT "FavoritePost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PostCategory" ADD CONSTRAINT "PostCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PostCategory" ADD CONSTRAINT "PostCategory_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PostImage" ADD CONSTRAINT "PostImage_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Preview" ADD CONSTRAINT "Preview_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Preview" ADD CONSTRAINT "Preview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserAuthority" ADD CONSTRAINT "UserAuthority_authorityId_fkey" FOREIGN KEY ("authorityId") REFERENCES "Authority"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserAuthority" ADD CONSTRAINT "UserAuthority_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PostBrowsingHistory" ADD CONSTRAINT "PostBrowsingHistory_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PostBrowsingHistory" ADD CONSTRAINT "PostBrowsingHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "SkillCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
