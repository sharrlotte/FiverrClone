-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "userId" DROP DEFAULT;
DROP SEQUENCE "Account_userId_seq";

-- AlterTable
ALTER TABLE "FavoritePost" ALTER COLUMN "userId" DROP DEFAULT,
ALTER COLUMN "postId" DROP DEFAULT;
DROP SEQUENCE "FavoritePost_userId_seq";
DROP SEQUENCE "FavoritePost_postId_seq";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "postId" DROP DEFAULT;
DROP SEQUENCE "Order_postId_seq";

-- AlterTable
ALTER TABLE "Package" ALTER COLUMN "postId" DROP DEFAULT;
DROP SEQUENCE "Package_postId_seq";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "userId" DROP DEFAULT;
DROP SEQUENCE "Post_userId_seq";

-- AlterTable
ALTER TABLE "PostBrowsingHistory" ALTER COLUMN "postId" DROP DEFAULT;
DROP SEQUENCE "PostBrowsingHistory_postId_seq";

-- AlterTable
ALTER TABLE "PostCategory" ALTER COLUMN "postId" DROP DEFAULT,
ALTER COLUMN "categoryId" DROP DEFAULT;
DROP SEQUENCE "PostCategory_postId_seq";
DROP SEQUENCE "PostCategory_categoryId_seq";

-- AlterTable
ALTER TABLE "PostImage" ALTER COLUMN "postId" DROP DEFAULT;
DROP SEQUENCE "PostImage_postId_seq";

-- AlterTable
ALTER TABLE "PostTag" ALTER COLUMN "tagId" DROP DEFAULT,
ALTER COLUMN "postId" DROP DEFAULT;
DROP SEQUENCE "PostTag_tagId_seq";
DROP SEQUENCE "PostTag_postId_seq";

-- AlterTable
ALTER TABLE "Preview" ALTER COLUMN "userId" DROP DEFAULT,
ALTER COLUMN "postId" DROP DEFAULT;
DROP SEQUENCE "Preview_userId_seq";
DROP SEQUENCE "Preview_postId_seq";

-- AlterTable
ALTER TABLE "Skill" ALTER COLUMN "categoryId" DROP DEFAULT;
DROP SEQUENCE "Skill_categoryId_seq";

-- AlterTable
ALTER TABLE "UserAuthority" ALTER COLUMN "userId" DROP DEFAULT,
ALTER COLUMN "authorityId" DROP DEFAULT;
DROP SEQUENCE "UserAuthority_userId_seq";
DROP SEQUENCE "UserAuthority_authorityId_seq";

-- AlterTable
ALTER TABLE "UserRole" ALTER COLUMN "userId" DROP DEFAULT,
ALTER COLUMN "roleId" DROP DEFAULT;
DROP SEQUENCE "UserRole_userId_seq";
DROP SEQUENCE "UserRole_roleId_seq";
