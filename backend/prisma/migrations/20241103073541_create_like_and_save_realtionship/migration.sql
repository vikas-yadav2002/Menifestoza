-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "_likedPost" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_savedPost" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_likedPost_AB_unique" ON "_likedPost"("A", "B");

-- CreateIndex
CREATE INDEX "_likedPost_B_index" ON "_likedPost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_savedPost_AB_unique" ON "_savedPost"("A", "B");

-- CreateIndex
CREATE INDEX "_savedPost_B_index" ON "_savedPost"("B");

-- AddForeignKey
ALTER TABLE "_likedPost" ADD CONSTRAINT "_likedPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedPost" ADD CONSTRAINT "_likedPost_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_savedPost" ADD CONSTRAINT "_savedPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_savedPost" ADD CONSTRAINT "_savedPost_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
