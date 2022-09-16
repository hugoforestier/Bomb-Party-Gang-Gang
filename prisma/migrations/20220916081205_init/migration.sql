-- CreateTable
CREATE TABLE "user" (
    "u_id" BIGSERIAL NOT NULL,
    "u_email" VARCHAR NOT NULL,
    "u_password" VARCHAR,
    "u_username" VARCHAR(30) NOT NULL,
    "u_salt" VARCHAR,
    "u_uuid" UUID NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("u_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_u_email_key" ON "user"("u_email");

-- CreateIndex
CREATE UNIQUE INDEX "user_u_username_key" ON "user"("u_username");

-- CreateIndex
CREATE UNIQUE INDEX "user_u_uuid_key" ON "user"("u_uuid");
