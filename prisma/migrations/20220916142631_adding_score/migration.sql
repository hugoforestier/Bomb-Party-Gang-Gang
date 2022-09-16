-- CreateTable
CREATE TABLE "score" (
    "s_id" BIGSERIAL NOT NULL,
    "s_highestScore" INTEGER NOT NULL,
    "s_lowestScore" INTEGER NOT NULL,
    "s_lastScore" INTEGER NOT NULL,
    "s_nbGames" INTEGER NOT NULL,
    "u_uuid" UUID NOT NULL,

    CONSTRAINT "score_pkey" PRIMARY KEY ("s_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "score_u_uuid_key" ON "score"("u_uuid");
