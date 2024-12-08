-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `alamat` TEXT NULL,
    `noWa` VARCHAR(15) NOT NULL,
    `role` ENUM('ADMIN', 'PEMILIK', 'PENYEWA') NOT NULL DEFAULT 'PENYEWA',
    `desa` VARCHAR(100) NULL,
    `kecamatan` VARCHAR(100) NULL,
    `kabupaten` VARCHAR(100) NULL,
    `provinsi` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_noWa_key`(`noWa`),
    INDEX `User_email_idx`(`email`),
    INDEX `User_role_idx`(`role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kosan` (
    `id` VARCHAR(191) NOT NULL,
    `pemilikId` VARCHAR(191) NOT NULL,
    `namaKosan` VARCHAR(100) NOT NULL,
    `alamat` VARCHAR(255) NOT NULL,
    `desa` VARCHAR(100) NULL,
    `kecamatan` VARCHAR(100) NULL,
    `kabupaten` VARCHAR(100) NULL,
    `provinsi` VARCHAR(100) NULL,
    `jumlahKamar` INTEGER UNSIGNED NOT NULL,
    `fasilitas` TEXT NULL,
    `deskripsi` TEXT NULL,
    `hargaPerOrang` DECIMAL(10, 2) NOT NULL,
    `status` ENUM('TERSEDIA', 'PENUH', 'DALAM_RENOVASI') NOT NULL DEFAULT 'TERSEDIA',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Kosan_pemilikId_idx`(`pemilikId`),
    INDEX `Kosan_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kamar` (
    `id` VARCHAR(191) NOT NULL,
    `kosanId` VARCHAR(191) NOT NULL,
    `nomorKamar` VARCHAR(20) NOT NULL,
    `tipeKamar` VARCHAR(50) NULL,
    `luasKamar` DECIMAL(5, 2) NULL,
    `kapasitas` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Kamar_kosanId_idx`(`kosanId`),
    UNIQUE INDEX `Kamar_kosanId_nomorKamar_key`(`kosanId`, `nomorKamar`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pemesanan` (
    `id` VARCHAR(191) NOT NULL,
    `penyewaId` VARCHAR(191) NOT NULL,
    `kamarId` VARCHAR(191) NOT NULL,
    `tanggalMulai` DATETIME(3) NOT NULL,
    `tanggalSelesai` DATETIME(3) NOT NULL,
    `durasiSewa` INTEGER NOT NULL,
    `jumlahOrang` INTEGER NOT NULL DEFAULT 1,
    `totalBiaya` DECIMAL(10, 2) NOT NULL,
    `status` ENUM('MENUNGGU', 'DIKONFIRMASI', 'DITOLAK', 'SELESAI', 'DIBATALKAN') NOT NULL DEFAULT 'MENUNGGU',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Pemesanan_penyewaId_idx`(`penyewaId`),
    INDEX `Pemesanan_kamarId_idx`(`kamarId`),
    INDEX `Pemesanan_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
