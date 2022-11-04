-- CreateTable
CREATE TABLE "score" (
    "s_id" BIGSERIAL NOT NULL,
    "s_highestScore" INTEGER NOT NULL DEFAULT 0,
    "s_lowestScore" INTEGER NOT NULL DEFAULT 0,
    "s_lastScore" INTEGER NOT NULL DEFAULT 0,
    "s_nbGames" INTEGER NOT NULL DEFAULT 0,
    "u_id" BIGINT NOT NULL,

    CONSTRAINT "score_pkey" PRIMARY KEY ("s_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "score_u_id_key" ON "score"("u_id");

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_u_id_fkey" FOREIGN KEY ("u_id") REFERENCES "user"("u_id") ON DELETE RESTRICT ON UPDATE CASCADE;
