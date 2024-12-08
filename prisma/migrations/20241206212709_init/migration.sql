/*
  Warnings:

  - You are about to drop the column `desaId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `desa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kabupaten` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kecamatan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `User_desaId_idx` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `desaId`,
    ADD COLUMN `desa` VARCHAR(100) NULL,
    ADD COLUMN `kabupaten` VARCHAR(100) NULL,
    ADD COLUMN `kecamatan` VARCHAR(100) NULL;

-- DropTable
DROP TABLE `desa`;

-- DropTable
DROP TABLE `kabupaten`;

-- DropTable
DROP TABLE `kecamatan`;
