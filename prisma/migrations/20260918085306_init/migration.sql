-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entrada" (
    "id" TEXT NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "posterPath" TEXT,
    "year" INTEGER,
    "watchedDate" DATE NOT NULL,
    "rating" DOUBLE PRECISION,
    "review" TEXT,
    "rewatch" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Entrada_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_user_key" ON "Usuario"("user");

-- CreateIndex
CREATE INDEX "Entrada_userId_watchedDate_idx" ON "Entrada"("userId", "watchedDate");

-- AddForeignKey
ALTER TABLE "Entrada" ADD CONSTRAINT "Entrada_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
