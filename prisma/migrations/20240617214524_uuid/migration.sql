/*
  Warnings:

  - You are about to alter the column `createdAt` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `category` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `category` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
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
  - A unique constraint covering the columns `[codeSale]` on the table `Sale` will be added. If there are existing duplicate values, this will fail.
  - Made the column `isVerify` on table `client` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `codeSale` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin` MODIFY `isVerify` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL DEFAULT 'Habilitado',
    MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `statusUser` ENUM('Activo', 'Suspendido', 'Vacaciones') NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE `category` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL DEFAULT 'Habilitado';

-- AlterTable
ALTER TABLE `client` MODIFY `isVerify` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL DEFAULT 'Habilitado',
    MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `statusUser` ENUM('Activo', 'Suspendido', 'Vacaciones') NOT NULL DEFAULT 'Activo';

-- AlterTable
ALTER TABLE `product` MODIFY `investment` DECIMAL NOT NULL,
    MODIFY `price` DECIMAL NOT NULL,
    MODIFY `priceOffer` DECIMAL NULL,
    MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL DEFAULT 'Habilitado';

-- AlterTable
ALTER TABLE `sale` ADD COLUMN `codeSale` VARCHAR(255) NOT NULL,
    MODIFY `totalAmount` DECIMAL NOT NULL,
    MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL DEFAULT 'Habilitado',
    MODIFY `statusSale` ENUM('Pagado', 'Enviando', 'Culminado', 'Cancelado') NOT NULL DEFAULT 'Pagado';

-- AlterTable
ALTER TABLE `saleproduct` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL DEFAULT 'Habilitado';

-- AlterTable
ALTER TABLE `subcategory` MODIFY `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL DEFAULT 'Habilitado';

-- CreateIndex
CREATE UNIQUE INDEX `Sale_codeSale_key` ON `Sale`(`codeSale`);
