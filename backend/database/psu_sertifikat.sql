-- ============================================================================
-- DATABASE: psu_company_profile
-- Sistem Tracking Sertifikat (4 Sub Menu Client Terpisah) & News/Artikel
-- PT PENILAI STANDAR UJI (PSU)
-- Kolom Tabel Sertifikat:
--   1. Nama Pabrik (nama_pabrik)
--   2. Produk (produk)
--   3. Nomor SNI (no_sni)
--   4. Nomor Sertifikat (no_sertifikat)
--   5. Terbit (terbit)
--   6. Berlaku s.d. (berlaku_sd)
--   7. Status (status: 'Aktif', 'Ditangguhkan', 'Dicabut')
-- Aturan: Sertifikat pada Tabel A tidak dapat dilacak di Halaman Client B, dst.
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `psu_compro`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `psu_compro`;

-- ----------------------------------------------------------------------------
-- 1. Tabel Sub Menu: Lembaga Sertifikasi Produk (sertifikat_produk)
--    Halaman: /client/sertifikasi-produk
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `sertifikat_produk`;
CREATE TABLE `sertifikat_produk` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama_pabrik` VARCHAR(255) NOT NULL COMMENT 'Nama Pabrik (Format: Nama Pabrik | Kota)',
  `produk` VARCHAR(255) NOT NULL COMMENT 'Produk',
  `no_sni` VARCHAR(100) NOT NULL COMMENT 'Nomor SNI',
  `no_sertifikat` VARCHAR(100) NOT NULL UNIQUE COMMENT 'Nomor Sertifikat',
  `terbit` VARCHAR(50) NOT NULL COMMENT 'Tanggal Terbit',
  `berlaku_sd` VARCHAR(50) NOT NULL COMMENT 'Berlaku s.d. (Tanggal Berakhir)',
  `status` ENUM('Aktif', 'Ditangguhkan', 'Dicabut') NOT NULL DEFAULT 'Aktif' COMMENT 'Status'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `sertifikat_produk` (`nama_pabrik`, `produk`, `no_sni`, `no_sertifikat`, `terbit`, `berlaku_sd`, `status`) VALUES
('PT. Simaju | Bekasi', 'Kakao Bubuk', 'SNI 3747:2009', 'PSU-SPPT-2026-GAHA', '14 Okt 2026', '13 Okt 2030', 'Aktif'),
('Pasar ABC | Jakarta', 'Pasar Rakyat', 'SNI 8152:2021', 'PSU-2026-PPWIQADA', '14 Okt 2026', '13 Okt 2030', 'Aktif'),
('PT. Sinar Abadi | Bekasi', 'Minyak Goreng Sawit', 'SNI 7709:2019', 'PSU-SPPT-2026-0001', '08 Okt 2026', '07 Okt 2030', 'Aktif'),
('PT. Pangan Lestari | Tangerang', 'Biskuit', 'SNI 2973:2022', 'PSU-SPPT-2025-0012', '14 Mar 2025', '13 Mar 2029', 'Ditangguhkan'),
('PT. Gula Manis Nusantara | Lampung', 'Gula Kristal Putih', 'SNI 3140.3:2020', 'PSU-SPPT-2024-0007', '19 Mei 2024', '18 Mei 2028', 'Dicabut');

-- ----------------------------------------------------------------------------
-- 2. Tabel Sub Menu: Lembaga Pengujian (sertifikat_pengujian)
--    Halaman: /client/pengujian
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `sertifikat_pengujian`;
CREATE TABLE `sertifikat_pengujian` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama_pabrik` VARCHAR(255) NOT NULL COMMENT 'Nama Pabrik (Format: Nama Pabrik | Kota)',
  `produk` VARCHAR(255) NOT NULL COMMENT 'Produk',
  `no_sni` VARCHAR(100) NOT NULL COMMENT 'Nomor SNI',
  `no_sertifikat` VARCHAR(100) NOT NULL UNIQUE COMMENT 'Nomor Sertifikat',
  `terbit` VARCHAR(50) NOT NULL COMMENT 'Tanggal Terbit',
  `berlaku_sd` VARCHAR(50) NOT NULL COMMENT 'Berlaku s.d. (Tanggal Berakhir)',
  `status` ENUM('Aktif', 'Ditangguhkan', 'Dicabut') NOT NULL DEFAULT 'Aktif' COMMENT 'Status'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `sertifikat_pengujian` (`nama_pabrik`, `produk`, `no_sni`, `no_sertifikat`, `terbit`, `berlaku_sd`, `status`) VALUES
('PT. Tirta Murni Sejahtera | Bogor', 'Air Mineral', 'SNI 3553:2015', 'PSU-LP-2026-BKLN', '14 Okt 2026', '13 Okt 2029', 'Aktif'),
('PT. Agro Pupuk Mandiri | Gresik', 'Pupuk NPK Padat', 'SNI 2803:2012', 'PSU-LP-2026-MNPQ', '14 Okt 2026', '13 Okt 2029', 'Aktif'),
('PT. Baja Mas Utama | Surabaya', 'Foodtray Baja Tahan Karat', 'SNI 9369:2025', 'PSU-SPPT-2026-0101', '12 Sep 2026', '11 Sep 2029', 'Ditangguhkan'),
('CV. Pangan Makmur Jaya | Semarang', 'Tepung Terigu', 'SNI 3751:2018', 'PSU-LP-2024-RTYU', '05 Mei 2024', '04 Mei 2027', 'Dicabut');

-- ----------------------------------------------------------------------------
-- 3. Tabel Sub Menu: Lembaga Kalibrasi (sertifikat_kalibrasi)
--    Halaman: /client/kalibrasi
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `sertifikat_kalibrasi`;
CREATE TABLE `sertifikat_kalibrasi` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama_pabrik` VARCHAR(255) NOT NULL COMMENT 'Nama Pabrik / Instansi (Format: Nama Pabrik | Kota)',
  `produk` VARCHAR(255) NOT NULL COMMENT 'Produk / Alat',
  `no_sni` VARCHAR(100) NOT NULL COMMENT 'Nomor SNI / Standar',
  `no_sertifikat` VARCHAR(100) NOT NULL UNIQUE COMMENT 'Nomor Sertifikat',
  `terbit` VARCHAR(50) NOT NULL COMMENT 'Tanggal Terbit',
  `berlaku_sd` VARCHAR(50) NOT NULL COMMENT 'Berlaku s.d. (Tanggal Berakhir)',
  `status` ENUM('Aktif', 'Ditangguhkan', 'Dicabut') NOT NULL DEFAULT 'Aktif' COMMENT 'Status'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `sertifikat_kalibrasi` (`nama_pabrik`, `produk`, `no_sni`, `no_sertifikat`, `terbit`, `berlaku_sd`, `status`) VALUES
('RS. Harapan Sehat Sentosa | Jakarta', 'Tensimeter Digital', 'SNI IEC 80601-2-30', 'PSU-LK-2026-KLMN', '14 Okt 2026', '13 Okt 2027', 'Aktif'),
('PT. Medika Alat Utama | Bandung', 'Inkubator Bayi', 'SNI IEC 60601-2-19', 'PSU-LK-2026-PQRS', '14 Okt 2026', '13 Okt 2027', 'Aktif'),
('PT. Presisi Industri Teknika | Cikarang', 'Neraca Analitik Digital', 'SNI ISO/IEC 17025:2017', 'PSU-SPPT-2026-0201', '18 Okt 2026', '17 Okt 2027', 'Ditangguhkan'),
('Klinik Utama Permata | Bekasi', 'Timbangan Pasien Elektronik', 'SNI OIML R76-1', 'PSU-LK-2024-WXYZ', '22 Agu 2024', '21 Agu 2025', 'Dicabut');

-- ----------------------------------------------------------------------------
-- 4. Tabel Sub Menu: Lembaga Sertifikasi Sistem Manajemen (sertifikat_sistem_manajemen)
--    Halaman: /client/sertifikasi-sistem-manajemen
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `sertifikat_sistem_manajemen`;
CREATE TABLE `sertifikat_sistem_manajemen` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama_pabrik` VARCHAR(255) NOT NULL COMMENT 'Nama Pabrik / Organisasi (Format: Nama Pabrik | Kota)',
  `produk` VARCHAR(255) NOT NULL COMMENT 'Produk / Ruang Lingkup',
  `no_sni` VARCHAR(100) NOT NULL COMMENT 'Nomor SNI / ISO',
  `no_sertifikat` VARCHAR(100) NOT NULL UNIQUE COMMENT 'Nomor Sertifikat',
  `terbit` VARCHAR(50) NOT NULL COMMENT 'Tanggal Terbit',
  `berlaku_sd` VARCHAR(50) NOT NULL COMMENT 'Berlaku s.d. (Tanggal Berakhir)',
  `status` ENUM('Aktif', 'Ditangguhkan', 'Dicabut') NOT NULL DEFAULT 'Aktif' COMMENT 'Status'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `sertifikat_sistem_manajemen` (`nama_pabrik`, `produk`, `no_sni`, `no_sertifikat`, `terbit`, `berlaku_sd`, `status`) VALUES
('PT. Konstruksi Karya Nusantara | Jakarta', 'Sistem Manajemen Mutu', 'SNI ISO 9001:2015', 'PSU-LSSM-2026-ABCD', '14 Okt 2026', '13 Okt 2029', 'Aktif'),
('PT. Hijau Lestari Industri | Karawang', 'Sistem Manajemen Lingkungan', 'SNI ISO 14001:2015', 'PSU-LSSM-2026-EFGH', '14 Okt 2026', '13 Okt 2029', 'Aktif'),
('PT. Pangan Aman Sentosa | Sidoarjo', 'Sistem Manajemen Keamanan Pangan', 'SNI ISO 22000:2018', 'PSU-SPPT-2026-0301', '01 Okt 2026', '30 Sep 2029', 'Ditangguhkan'),
('PT. Mitra Logistik Terpadu | Surabaya', 'Sistem Manajemen Mutu', 'SNI ISO 9001:2015', 'PSU-LSSM-2024-IJKL', '09 Feb 2024', '08 Feb 2027', 'Dicabut');
