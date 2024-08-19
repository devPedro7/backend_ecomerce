-- CreateTable
CREATE TABLE "products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "session" TEXT,
    "category" TEXT,
    "brand" TEXT,
    "gender" TEXT,
    "price" REAL NOT NULL,
    "discount" INTEGER,
    "size" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");
