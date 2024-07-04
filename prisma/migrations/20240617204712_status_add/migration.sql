/*
  Warnings:

  - You are about to alter the column `status` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Int`.
  - You are about to alter the column `createdAt` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `category` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `category` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `status` on the `client` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Int`.
  - You are about to alter the column `createdAt` on the `client` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `client` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `investment` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `priceOffer` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `createdAt` on the `product` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `product` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `totalAmount` on the `sale` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `createdAt` on the `sale` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `sale` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `saleproduct` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `saleproduct` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `statusUser` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusUser` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusSale` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin` ADD COLUMN `statusUser` ENUM('Activo', 'Suspendido', 'Vacaciones') NOT NULL,
    MODIFY `status` INTEGER NOT NULL DEFAULT 1,
    MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `category` ADD COLUMN `status` INTEGER NOT NULL DEFAULT 1,
    MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `client` ADD COLUMN `statusUser` ENUM('Activo', 'Suspendido', 'Vacaciones') NOT NULL,
    MODIFY `status` INTEGER NOT NULL DEFAULT 1,
    MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `status` INTEGER NOT NULL DEFAULT 1,
    MODIFY `investment` DECIMAL NOT NULL,
    MODIFY `price` DECIMAL NOT NULL,
    MODIFY `priceOffer` DECIMAL NULL,
    MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `sale` ADD COLUMN `status` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `statusSale` ENUM('Pagado', 'Enviando', 'Culminado', 'Cancelado') NOT NULL,
    MODIFY `totalAmount` DECIMAL NOT NULL,
    MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `saleproduct` ADD COLUMN `status` INTEGER NOT NULL DEFAULT 1,
    MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `subcategory` ADD COLUMN `status` INTEGER NOT NULL DEFAULT 1;
