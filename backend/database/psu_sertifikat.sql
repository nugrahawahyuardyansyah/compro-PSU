-- ============================================================================
-- DATABASE: psu_company_profile
-- Sistem Tracking Status Sertifikat - PT PENILAI STANDAR UJI (PSU)
-- Empat tabel terpisah untuk masing-masing Sub Menu Client agar pencarian
-- terisolasi per sub menu (Sub Menu A tidak bisa mencari data Sub Menu B).
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `psu_company_profile`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `psu_company_profile`;

-- ----------------------------------------------------------------------------
-- 1. Tabel Sub Menu: Lembaga Sertifikasi Produk (sertifikat_produk)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `sertifikat_produk`;
CREATE TABLE `sertifikat_produk` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama_pabrik` VARCHAR(255) NOT NULL COMMENT 'Nama pabrik',
  `alamat` TEXT NOT NULL COMMENT 'Alamat pabrik',
  `produk` VARCHAR(255) NOT NULL COMMENT 'Nama produk',
  `no_sni` VARCHAR(100) NOT NULL COMMENT 'No. SNI',
  `no_sertifikat` VARCHAR(100) NOT NULL UNIQUE COMMENT 'No. sertifikat (Format: PSU-SPPT-YYYY-XXXX)',
  `terbit` VARCHAR(50) NOT NULL COMMENT 'Tanggal terbit',
  `status` ENUM('Aktif', 'Tidak Aktif') NOT NULL DEFAULT 'Aktif' COMMENT 'Status sertifikat',
  `sumber` VARCHAR(150) NOT NULL COMMENT 'Sumber sertifikat (SILAPP / Sebelum SILAPP)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `sertifikat_produk` (`nama_pabrik`, `alamat`, `produk`, `no_sni`, `no_sertifikat`, `terbit`, `status`, `sumber`) VALUES
('PT Sinar Contoh Abadi - Pabrik Cikarang', 'Kab. Bekasi, Jawa Barat', 'Minyak goreng sawit', 'SNI 7709:2019', 'PSU-SPPT-2026-0001', '08 Okt 2026', 'Aktif', 'SILAPP | PSU-SP-2608-0003'),
('PT Contoh Pangan Lestari', 'Kab. Bekasi, Jawa Barat', 'Biskuit', 'SNI 2973:2011', 'PSU-SPPT-2023-0012', '14 Mar 2023', 'Aktif', 'Sebelum SILAPP'),
('CV Kopi Nusantara Contoh', 'Kab. Temanggung, Jawa Tengah', 'Kopi instan', 'SNI 2983:2014', 'PSU-SPPT-2022-0031', '02 Agu 2022', 'Aktif', 'Sebelum SILAPP'),
('PT Gula Manis Contoh', 'Kab. Lampung Tengah, Lampung', 'Gula kristal putih', 'SNI 3140.3:2020', 'PSU-SPPT-2021-0007', '19 Mei 2021', 'Tidak Aktif', 'Sebelum SILAPP');

-- ----------------------------------------------------------------------------
-- 2. Tabel Sub Menu: Lembaga Pengujian (sertifikat_pengujian)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `sertifikat_pengujian`;
CREATE TABLE `sertifikat_pengujian` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama_pabrik` VARCHAR(255) NOT NULL COMMENT 'Nama pabrik',
  `alamat` TEXT NOT NULL COMMENT 'Alamat pabrik',
  `produk` VARCHAR(255) NOT NULL COMMENT 'Nama produk',
  `no_sni` VARCHAR(100) NOT NULL COMMENT 'No. SNI',
  `no_sertifikat` VARCHAR(100) NOT NULL UNIQUE COMMENT 'No. sertifikat (Format: PSU-SPPT-YYYY-XXXX)',
  `terbit` VARCHAR(50) NOT NULL COMMENT 'Tanggal terbit',
  `status` ENUM('Aktif', 'Tidak Aktif') NOT NULL DEFAULT 'Aktif' COMMENT 'Status sertifikat',
  `sumber` VARCHAR(150) NOT NULL COMMENT 'Sumber sertifikat (SILAPP / Sebelum SILAPP)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `sertifikat_pengujian` (`nama_pabrik`, `alamat`, `produk`, `no_sni`, `no_sertifikat`, `terbit`, `status`, `sumber`) VALUES
('PT Tirta Murni Sejahtera', 'Kota Bogor, Jawa Barat', 'Air mineral kemasan', 'SNI 3553:2015', 'PSU-SPPT-2026-0101', '12 Sep 2026', 'Aktif', 'SILAPP | PSU-LP-2609-0014'),
('PT Agro Pupuk Mandiri', 'Kab. Gresik, Jawa Timur', 'Pupuk NPK padat', 'SNI 2803:2012', 'PSU-SPPT-2025-0102', '20 Nov 2025', 'Aktif', 'SILAPP | PSU-LP-2511-0008'),
('CV Pangan Makmur Jaya', 'Kota Semarang, Jawa Tengah', 'Tepung terigu', 'SNI 3751:2018', 'PSU-SPPT-2024-0103', '05 Mei 2024', 'Tidak Aktif', 'Sebelum SILAPP');

-- ----------------------------------------------------------------------------
-- 3. Tabel Sub Menu: Lembaga Kalibrasi (sertifikat_kalibrasi)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `sertifikat_kalibrasi`;
CREATE TABLE `sertifikat_kalibrasi` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama_pabrik` VARCHAR(255) NOT NULL COMMENT 'Nama pabrik / instansi',
  `alamat` TEXT NOT NULL COMMENT 'Alamat pabrik / instansi',
  `produk` VARCHAR(255) NOT NULL COMMENT 'Nama alat / produk',
  `no_sni` VARCHAR(100) NOT NULL COMMENT 'No. SNI / Standar acuan',
  `no_sertifikat` VARCHAR(100) NOT NULL UNIQUE COMMENT 'No. sertifikat (Format: PSU-SPPT-YYYY-XXXX)',
  `terbit` VARCHAR(50) NOT NULL COMMENT 'Tanggal terbit',
  `status` ENUM('Aktif', 'Tidak Aktif') NOT NULL DEFAULT 'Aktif' COMMENT 'Status sertifikat',
  `sumber` VARCHAR(150) NOT NULL COMMENT 'Sumber sertifikat (SILAPP / Sebelum SILAPP)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `sertifikat_kalibrasi` (`nama_pabrik`, `alamat`, `produk`, `no_sni`, `no_sertifikat`, `terbit`, `status`, `sumber`) VALUES
('RS Harapan Sehat Sentosa', 'Jakarta Timur, DKI Jakarta', 'Tensimeter Digital (Sphygmomanometer)', 'SNI IEC 80601-2-30', 'PSU-SPPT-2026-0201', '18 Okt 2026', 'Aktif', 'SILAPP | PSU-LK-2610-0021'),
('PT Medika Alat Utama', 'Kota Bandung, Jawa Barat', 'Inkubator Bayi (Infant Incubator)', 'SNI IEC 60601-2-19', 'PSU-SPPT-2025-0202', '11 Jul 2025', 'Aktif', 'SILAPP | PSU-LK-2507-0009'),
('Klinik Utama Permata', 'Kota Bekasi, Jawa Barat', 'Timbangan Pasien Elektronik', 'OIML R76-1', 'PSU-SPPT-2023-0203', '22 Agu 2023', 'Tidak Aktif', 'Sebelum SILAPP');

-- ----------------------------------------------------------------------------
-- 4. Tabel Sub Menu: Lembaga Sertifikasi Sistem Manajemen (sertifikat_sistem_manajemen)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `sertifikat_sistem_manajemen`;
CREATE TABLE `sertifikat_sistem_manajemen` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama_pabrik` VARCHAR(255) NOT NULL COMMENT 'Nama pabrik / organisasi',
  `alamat` TEXT NOT NULL COMMENT 'Alamat pabrik / organisasi',
  `produk` VARCHAR(255) NOT NULL COMMENT 'Ruang lingkup / produk',
  `no_sni` VARCHAR(100) NOT NULL COMMENT 'No. SNI / ISO',
  `no_sertifikat` VARCHAR(100) NOT NULL UNIQUE COMMENT 'No. sertifikat (Format: PSU-SPPT-YYYY-XXXX)',
  `terbit` VARCHAR(50) NOT NULL COMMENT 'Tanggal terbit',
  `status` ENUM('Aktif', 'Tidak Aktif') NOT NULL DEFAULT 'Aktif' COMMENT 'Status sertifikat',
  `sumber` VARCHAR(150) NOT NULL COMMENT 'Sumber sertifikat (SILAPP / Sebelum SILAPP)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `sertifikat_sistem_manajemen` (`nama_pabrik`, `alamat`, `produk`, `no_sni`, `no_sertifikat`, `terbit`, `status`, `sumber`) VALUES
('PT Konstruksi Karya Nusantara', 'Jakarta Selatan, DKI Jakarta', 'Sistem Manajemen Mutu Konstruksi', 'SNI ISO 9001:2015', 'PSU-SPPT-2026-0301', '01 Okt 2026', 'Aktif', 'SILAPP | PSU-LSSM-2610-0005'),
('PT Hijau Lestari Industri', 'Kab. Karawang, Jawa Barat', 'Sistem Manajemen Lingkungan', 'SNI ISO 14001:2015', 'PSU-SPPT-2025-0302', '15 Jun 2025', 'Aktif', 'SILAPP | PSU-LSSM-2506-0011'),
('PT Pangan Aman Sentosa', 'Kab. Sidoarjo, Jawa Timur', 'Sistem Manajemen Keamanan Pangan', 'SNI ISO 22000:2018', 'PSU-SPPT-2024-0303', '09 Feb 2024', 'Tidak Aktif', 'Sebelum SILAPP');