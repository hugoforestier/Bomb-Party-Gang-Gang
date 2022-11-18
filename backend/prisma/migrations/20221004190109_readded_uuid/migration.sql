/*
  Warnings:

  - A unique constraint covering the columns `[u_uuid]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `u_uuid` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "u_uuid" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_u_uuid_key" ON "user"("u_uuid");
