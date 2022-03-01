-- CreateEnum
CREATE TYPE "UserRoleType" AS ENUM ('admin', 'moderator');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRoleType";
