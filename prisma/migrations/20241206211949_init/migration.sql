/*
  Warnings:

  - You are about to drop the column `luasKamar` on the `kamar` table. All the data in the column will be lost.
  - You are about to drop the column `tipeKamar` on the `kamar` table. All the data in the column will be lost.
  - You are about to drop the column `desa` on the `kosan` table. All the data in the column will be lost.
  - You are about to drop the column `deskripsi` on the `kosan` table. All the data in the column will be lost.
  - You are about to drop the column `fasilitas` on the `kosan` table. All the data in the column will be lost.
  - You are about to drop the column `hargaPerOrang` on the `kosan` table. All the data in the column will be lost.
  - You are about to drop the column `jumlahKamar` on the `kosan` table. All the data in the column will be lost.
  - You are about to drop the column `kabupaten` on the `kosan` table. All the data in the column will be lost.
  - You are about to drop the column `kecamatan` on the `kosan` table. All the data in the column will be lost.
  - You are about to drop the column `provinsi` on the `kosan` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `kosan` table. All the data in the column will be lost.
  - You are about to drop the column `alamat` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `desa` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `kabupaten` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `kecamatan` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `provinsi` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `pemesanan` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `Kamar` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageId]` on the table `Kosan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `harga` to the `Kamar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noWa` to the `Kosan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Kosan_status_idx` ON `kosan`;

-- AlterTable
ALTER TABLE `kamar` DROP COLUMN `luasKamar`,
    DROP COLUMN `tipeKamar`,
    ADD COLUMN `harga` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `imageId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `kosan` DROP COLUMN `desa`,
    DROP COLUMN `deskripsi`,
    DROP COLUMN `fasilitas`,
    DROP COLUMN `hargaPerOrang`,
    DROP COLUMN `jumlahKamar`,
    DROP COLUMN `kabupaten`,
    DROP COLUMN `kecamatan`,
    DROP COLUMN `provinsi`,
    DROP COLUMN `status`,
    ADD COLUMN `imageId` VARCHAR(191) NULL,
    ADD COLUMN `noWa` VARCHAR(15) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `alamat`,
    DROP COLUMN `desa`,
    DROP COLUMN `kabupaten`,
    DROP COLUMN `kecamatan`,
    DROP COLUMN `nama`,
    DROP COLUMN `provinsi`,
    ADD COLUMN `desaId` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(100) NOT NULL,
    ADD COLUMN `password` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `pemesanan`;

-- CreateTable
CREATE TABLE `Desa` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `kecamatanId` VARCHAR(191) NOT NULL,

    INDEX `Desa_kecamatanId_idx`(`kecamatanId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kecamatan` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `kabupatenId` VARCHAR(191) NOT NULL,

    INDEX `Kecamatan_kabupatenId_idx`(`kabupatenId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kabupaten` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `file` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Kamar_imageId_key` ON `Kamar`(`imageId`);

-- CreateIndex
CREATE INDEX `Kamar_imageId_idx` ON `Kamar`(`imageId`);

-- CreateIndex
CREATE UNIQUE INDEX `Kosan_imageId_key` ON `Kosan`(`imageId`);

-- CreateIndex
CREATE INDEX `Kosan_imageId_idx` ON `Kosan`(`imageId`);

-- CreateIndex
CREATE INDEX `User_desaId_idx` ON `User`(`desaId`);
