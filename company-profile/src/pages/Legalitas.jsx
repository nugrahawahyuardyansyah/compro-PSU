import "./Sejarah.css";

export default function Legalitas() {
  return (
    <main className="about-page">
      <h1 className="about-page__title">Legalitas dan Akreditasi</h1>

      <section>
        <h2 className="about-page__subtitle">Identitas Perusahaan</h2>
        <p className="about-page__intro">
          Berdasarkan Akta Perubahan No. 12 tanggal 19 November 2024, PT Penilai
          Standar Nasional resmi berubah nama menjadi PT Penilai Standar Uji
          (PSU).
        </p>
      </section>

      <section>
        <h2 className="about-page__subtitle">Akreditasi</h2>
        <p className="about-page__intro">
          Lembaga Sertifikasi Produk PSU terakreditasi KAN dengan nomor
          LSPR-051-IDN berdasarkan SNI ISO/IEC 17065:2012.
        </p>
        <p className="about-page__intro">
          Laboratorium Pengujian PSU terakreditasi KAN dengan nomor LP-1554-IDN
          berdasarkan SNI ISO/IEC 17025:2017.
        </p>
      </section>
    </main>
  );
}
