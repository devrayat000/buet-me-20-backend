/*
  Warnings:

  - The `type` column on the `Todo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TodoTypeType" AS ENUM ('ct', 'lab');

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "type",
ADD COLUMN     "type" "TodoTypeType";

-- DropTable
DROP TABLE "Notification";

-- CreateTable
CREATE TABLE "Announcement" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'',
    "created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" UUID NOT NULL,
    "studentId" TEXT NOT NULL DEFAULT E'',
    "email" TEXT NOT NULL DEFAULT E'',
    "name" TEXT NOT NULL DEFAULT E'',
    "photo_filesize" INTEGER,
    "photo_extension" TEXT,
    "photo_width" INTEGER,
    "photo_height" INTEGER,
    "photo_mode" TEXT,
    "photo_id" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentId_key" ON "Student"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
