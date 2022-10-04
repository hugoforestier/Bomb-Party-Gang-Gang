/*
  Warnings:

  - A unique constraint covering the columns `[u_id]` on the table `score` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "score_u_id_key" ON "score"("u_id");
