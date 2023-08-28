-- CreateTable
CREATE TABLE "Post" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "title" STRING NOT NULL,
    "content" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOL NOT NULL DEFAULT false,
    "author" STRING NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
