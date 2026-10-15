const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "psu_company_profile",
  port: Number(process.env.DB_PORT) || 3306,
};

// Daftar whitelist tabel masing-masing Sub Menu Client
const TABLE_MAP = {
  "sertifikasi-produk": "sertifikat_produk",
  "pengujian": "sertifikat_pengujian",
  "kalibrasi": "sertifikat_kalibrasi",
  "sertifikasi-sistem-manajemen": "sertifikat_sistem_manajemen",
};

let pool;

// Otomatis memastikan database, ke-4 tabel, dan data awal tersedia saat server dijalankan
async function initDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      port: dbConfig.port,
    });

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    await connection.end();

    pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    const createTableQueries = [
      `CREATE TABLE IF NOT EXISTS sertifikat_produk (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama_pabrik VARCHAR(255) NOT NULL,
        alamat TEXT NOT NULL,
        produk VARCHAR(255) NOT NULL,
        no_sni VARCHAR(100) NOT NULL,
        no_sertifikat VARCHAR(100) NOT NULL UNIQUE,
        terbit VARCHAR(50) NOT NULL,
        status ENUM('Aktif', 'Tidak Aktif') NOT NULL DEFAULT 'Aktif',
        sumber VARCHAR(150) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
      `CREATE TABLE IF NOT EXISTS sertifikat_pengujian (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama_pabrik VARCHAR(255) NOT NULL,
        alamat TEXT NOT NULL,
        produk VARCHAR(255) NOT NULL,
        no_sni VARCHAR(100) NOT NULL,
        no_sertifikat VARCHAR(100) NOT NULL UNIQUE,
        terbit VARCHAR(50) NOT NULL,
        status ENUM('Aktif', 'Tidak Aktif') NOT NULL DEFAULT 'Aktif',
        sumber VARCHAR(150) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
      `CREATE TABLE IF NOT EXISTS sertifikat_kalibrasi (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama_pabrik VARCHAR(255) NOT NULL,
        alamat TEXT NOT NULL,
        produk VARCHAR(255) NOT NULL,
        no_sni VARCHAR(100) NOT NULL,
        no_sertifikat VARCHAR(100) NOT NULL UNIQUE,
        terbit VARCHAR(50) NOT NULL,
        status ENUM('Aktif', 'Tidak Aktif') NOT NULL DEFAULT 'Aktif',
        sumber VARCHAR(150) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
      `CREATE TABLE IF NOT EXISTS sertifikat_sistem_manajemen (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama_pabrik VARCHAR(255) NOT NULL,
        alamat TEXT NOT NULL,
        produk VARCHAR(255) NOT NULL,
        no_sni VARCHAR(100) NOT NULL,
        no_sertifikat VARCHAR(100) NOT NULL UNIQUE,
        terbit VARCHAR(50) NOT NULL,
        status ENUM('Aktif', 'Tidak Aktif') NOT NULL DEFAULT 'Aktif',
        sumber VARCHAR(150) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
    ];

    for (const q of createTableQueries) {
      await pool.query(q);
    }

    // Seed data awal (INSERT IGNORE agar tidak menimpa data yang sudah ada)
    await pool.query(`
      INSERT IGNORE INTO sertifikat_produk (nama_pabrik, alamat, produk, no_sni, no_sertifikat, terbit, status, sumber) VALUES
      ('PT Sinar Contoh Abadi - Pabrik Cikarang', 'Kab. Bekasi, Jawa Barat', 'Minyak goreng sawit', 'SNI 7709:2019', 'PSU-SPPT-2026-0001', '08 Okt 2026', 'Aktif', 'SILAPP | PSU-SP-2608-0003'),
      ('PT Contoh Pangan Lestari', 'Kab. Bekasi, Jawa Barat', 'Biskuit', 'SNI 2973:2011', 'PSU-SPPT-2023-0012', '14 Mar 2023', 'Aktif', 'Sebelum SILAPP'),
      ('CV Kopi Nusantara Contoh', 'Kab. Temanggung, Jawa Tengah', 'Kopi instan', 'SNI 2983:2014', 'PSU-SPPT-2022-0031', '02 Agu 2022', 'Aktif', 'Sebelum SILAPP'),
      ('PT Gula Manis Contoh', 'Kab. Lampung Tengah, Lampung', 'Gula kristal putih', 'SNI 3140.3:2020', 'PSU-SPPT-2021-0007', '19 Mei 2021', 'Tidak Aktif', 'Sebelum SILAPP')
    `);

    await pool.query(`
      INSERT IGNORE INTO sertifikat_pengujian (nama_pabrik, alamat, produk, no_sni, no_sertifikat, terbit, status, sumber) VALUES
      ('PT Tirta Murni Sejahtera', 'Kota Bogor, Jawa Barat', 'Air mineral kemasan', 'SNI 3553:2015', 'PSU-SPPT-2026-0101', '12 Sep 2026', 'Aktif', 'SILAPP | PSU-LP-2609-0014'),
      ('PT Agro Pupuk Mandiri', 'Kab. Gresik, Jawa Timur', 'Pupuk NPK padat', 'SNI 2803:2012', 'PSU-SPPT-2025-0102', '20 Nov 2025', 'Aktif', 'SILAPP | PSU-LP-2511-0008'),
      ('CV Pangan Makmur Jaya', 'Kota Semarang, Jawa Tengah', 'Tepung terigu', 'SNI 3751:2018', 'PSU-SPPT-2024-0103', '05 Mei 2024', 'Tidak Aktif', 'Sebelum SILAPP')
    `);

    await pool.query(`
      INSERT IGNORE INTO sertifikat_kalibrasi (nama_pabrik, alamat, produk, no_sni, no_sertifikat, terbit, status, sumber) VALUES
      ('RS Harapan Sehat Sentosa', 'Jakarta Timur, DKI Jakarta', 'Tensimeter Digital (Sphygmomanometer)', 'SNI IEC 80601-2-30', 'PSU-SPPT-2026-0201', '18 Okt 2026', 'Aktif', 'SILAPP | PSU-LK-2610-0021'),
      ('PT Medika Alat Utama', 'Kota Bandung, Jawa Barat', 'Inkubator Bayi (Infant Incubator)', 'SNI IEC 60601-2-19', 'PSU-SPPT-2025-0202', '11 Jul 2025', 'Aktif', 'SILAPP | PSU-LK-2507-0009'),
      ('Klinik Utama Permata', 'Kota Bekasi, Jawa Barat', 'Timbangan Pasien Elektronik', 'OIML R76-1', 'PSU-SPPT-2023-0203', '22 Agu 2023', 'Tidak Aktif', 'Sebelum SILAPP')
    `);

    await pool.query(`
      INSERT IGNORE INTO sertifikat_sistem_manajemen (nama_pabrik, alamat, produk, no_sni, no_sertifikat, terbit, status, sumber) VALUES
      ('PT Konstruksi Karya Nusantara', 'Jakarta Selatan, DKI Jakarta', 'Sistem Manajemen Mutu Konstruksi', 'SNI ISO 9001:2015', 'PSU-SPPT-2026-0301', '01 Okt 2026', 'Aktif', 'SILAPP | PSU-LSSM-2610-0005'),
      ('PT Hijau Lestari Industri', 'Kab. Karawang, Jawa Barat', 'Sistem Manajemen Lingkungan', 'SNI ISO 14001:2015', 'PSU-SPPT-2025-0302', '15 Jun 2025', 'Aktif', 'SILAPP | PSU-LSSM-2506-0011'),
      ('PT Pangan Aman Sentosa', 'Kab. Sidoarjo, Jawa Timur', 'Sistem Manajemen Keamanan Pangan', 'SNI ISO 22000:2018', 'PSU-SPPT-2024-0303', '09 Feb 2024', 'Tidak Aktif', 'Sebelum SILAPP')
    `);

    console.log("==========================================");
    console.log("Koneksi MySQL Berhasil! Database:", dbConfig.database);
    for (const [sub, tbl] of Object.entries(TABLE_MAP)) {
      const [cnt] = await pool.query(`SELECT COUNT(*) AS total FROM \`${tbl}\``);
      console.log(`- Submenu [${sub}] -> Tabel [${tbl}]: ${cnt[0].total} data sertifikat`);
    }
    console.log("==========================================");
  } catch (err) {
    console.error("==========================================");
    console.error("PERINGATAN: Gagal terhubung ke MySQL saat startup!");
    console.error("Pesan Error:", err.message);
    console.error("Pastikan modul MySQL di XAMPP sudah di-Start.");
    console.error("==========================================");
    pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
}

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Server API Tracking Sertifikat PT PENILAI STANDAR UJI aktif.",
  });
});

app.get("/api/sertifikat/:submenu", async (req, res) => {
  const { submenu } = req.params;
  const noSertifikat = (req.query.no_sertifikat || "").trim();

  const tableName = TABLE_MAP[submenu];
  if (!tableName) {
    return res.status(400).json({
      success: false,
      message: "Kategori sub menu client tidak valid.",
    });
  }

  if (!noSertifikat) {
    return res.status(400).json({
      success: false,
      message: "Nomor sertifikat wajib diisi.",
    });
  }

  try {
    const sql = `
      SELECT
        id,
        nama_pabrik,
        alamat,
        produk,
        no_sni,
        no_sertifikat,
        terbit,
        status,
        sumber
      FROM \`${tableName}\`
      WHERE REPLACE(REPLACE(UPPER(TRIM(no_sertifikat)), ' ', ''), '–', '-') = REPLACE(REPLACE(UPPER(TRIM(?)), ' ', ''), '–', '-')
      LIMIT 1
    `;
    const [rows] = await pool.execute(sql, [noSertifikat]);

    console.log(
      `[CEK SERTIFIKAT] Submenu: ${submenu} | Tabel: ${tableName} | Input: "${noSertifikat}" -> Ditemukan: ${rows.length} data`
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        found: false,
        data: [],
        message: `Nomor sertifikat "${noSertifikat}" tidak ditemukan pada layanan ini.`,
      });
    }

    return res.json({
      success: true,
      found: true,
      data: rows,
    });
  } catch (error) {
    console.error("Database query error:", error.message);
    return res.status(500).json({
      success: false,
      message:
        "Gagal terhubung ke database MySQL (" +
        error.message +
        "). Pastikan MySQL di XAMPP sudah Start.",
      error: error.message,
    });
  }
});

initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server API Tracking Sertifikat berjalan di http://127.0.0.1:${PORT}`);
  });
});
