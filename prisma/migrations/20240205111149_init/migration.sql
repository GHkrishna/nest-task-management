-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('ACTIVE', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "User1" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task1" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Task1_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User1_username_key" ON "User1"("username");
