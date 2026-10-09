import "./Profile.css";

const ABOUT_IMAGE = "/about-regulations-gavel-scales.jpeg";

export default function Profile() {
  return (
    <main className="profile-page">
      <section aria-labelledby="about-title">
        <h1 id="about-title" className="profile-page__center-title">
          About Us
        </h1>

        <div className="profile-panel">
          <div className="profile-panel__side">
            <img
              className="profile-panel__photo"
              src={ABOUT_IMAGE}
              alt="Palu hakim dan timbangan keadilan"
            />
            <p className="profile-panel__accreditation">
              <strong>Akreditasi KAN</strong>
              <span>LSPr-051-IDN</span>
              <span>LP-1554-IDN</span>
              <span>LSSM</span>
              <span>Penunjukkan Kemenperin</span>
              <span>Penunjukkan Kemendag</span>
              <span>Penunjukkan Kementan</span>
            </p>
          </div>

          <div className="profile-panel__text">
            <p>
              <strong>PT Penilai Standar Uji (PSU)</strong> merupakan perusahaan
              yang bergerak dalam ekosistem penilaian kesesuaian dan layanan
              pendukung mutu. Kami menyediakan berbagai layanan yang mendukung
              kebutuhan industri dalam memastikan produk, proses, dan layanan
              memenuhi standar serta persyaratan yang berlaku.
            </p>
            <p>
              Didukung oleh tenaga profesional, kompeten, dan berpengalaman, PSU
              terus mengembangkan layanan melalui sertifikasi produk, pengujian
              laboratorium, kalibrasi, pelatihan, serta konsultasi laboratorium
              dan kepatuhan.
            </p>
            <p>
              Kami berkomitmen memberikan layanan yang integritas, kompeten,
              independen, kolaboratif, dan berkelanjutan untuk membantu
              industri, masyarakat, dan para pemangku kepentingan meningkatkan
              kualitas dan kepercayaan terhadap produk maupun layanan.
            </p>
            <blockquote className="profile-panel__quote">
              “Solusi Penilaian Kesesuaian untuk Industri yang Lebih Maju.”
            </blockquote>
          </div>
        </div>
      </section>

      <h2 className="profile-page__section-title">
        Sejarah PT Penilai Standar Uji (PSU)
      </h2>

      <p className="profile-page__intro">
        PT Penilai Standar Uji (sebelumnya beroperasi dengan nama{" "}
        <strong>PT Penilai Standar Nasional / PSN</strong>) didirikan untuk
        bergerak di bidang penilaian kesesuaian, standarisasi, serta pengujian
        produk di Indonesia. Perusahaan ini mengoperasikan Lembaga Sertifikasi
        Produk (LSPro-PSU) dan Laboratorium Pengujian yang bertugas menerbitkan
        Sertifikat Produk Penggunaan Tanda Standar Nasional Indonesia (SPPT-SNI)
        sesuai acuan Undang-Undang No. 20 Tahun 2014 tentang Standardisasi dan
        Penilaian Kesesuaian.
      </p>

      <h3 className="profile-page__subtitle">
        Masa Perkembangan dan Milestones Utama
      </h3>

      <ol className="sejarah__timeline">
        <li className="sejarah__timeline-item">
          <span className="sejarah__timeline-period">2020 – 2030</span>
          <div className="sejarah__timeline-content">
            <h4>Akreditasi Awal &amp; Perluasan LSPro</h4>
            <p>
              Perusahaan mengantongi akreditasi KAN sebagai Lembaga Sertifikasi
              Produk dengan nomor <strong>LSPr-051-IDN</strong> berbasis standar{" "}
              <strong>SNI ISO/IEC 17065:2012</strong> (
              <em>
                diakui internasional via <strong>IAF MLA</strong>
              </em>
              ). Penetapan akreditasi awal dilakukan pada{" "}
              <strong>30 Mei 2020</strong> untuk periode 2020–2025, dengan
              Sertifikat Perubahan (Amandemen) diterbitkan pada{" "}
              <strong>10 Januari 2022</strong>. Selanjutnya, KAN resmi
              memperpanjang masa akreditasi LSPro mulai{" "}
              <strong>30 Juni 2025 hingga 29 Mei 2030</strong> dengan perluasan
              lingkup komoditas pertanian dan pangan (
              <em>Beras, Biji Kopi, Biji Kakao, Biskuit, dan Gula Kristal</em>).
            </p>
          </div>
        </li>

        <li className="sejarah__timeline-item">
          <span className="sejarah__timeline-period">2021</span>
          <div className="sejarah__timeline-content">
            <h4>Akreditasi Laboratorium Pengujian</h4>
            <p>
              Pada <strong>24 November 2021</strong>, perusahaan memperoleh
              sertifikat akreditasi <strong>KAN</strong> untuk Laboratorium
              Penguji dengan nomor <strong>LP-1554-IDN</strong> (berlaku hingga{" "}
              <strong>23 November 2026</strong>). Laboratorium ini dioperasikan
              berdasarkan standar SNI <strong>ISO/IEC 17025:2017</strong> (
              <em>
                Persyaratan Umum Untuk Kompetensi Laboratorium Pengujian dan
                Laboratorium Kalibrasi
              </em>
              ) dan diakui secara global melalui <strong>ILAC MRA</strong>.
            </p>
          </div>
        </li>

        <li className="sejarah__timeline-item">
          <span className="sejarah__timeline-period">2023</span>
          <div className="sejarah__timeline-content">
            <h4>Perkembangan Lingkup Layanan Pengujian</h4>
            <p>
              Layanan pengujian laboratorium mencakup pengujian fisika/kimia
              peralatan masak (<strong>Cookware</strong>) dan peralatan makan
              baja tahan karat (<strong>Flatware</strong>). Pada{" "}
              <strong>22 Februari 2023</strong>, <strong>KAN</strong>{" "}
              menerbitkan suplemen akreditasi laboratorium untuk perluasan ruang
              lingkup pengujian berbagai jenis <strong>Pupuk</strong> (
              <em>
                Pupuk SP 36, Pupuk Fosfat Alam, Pupuk Kalium Klorida, dan TSP
              </em>
              ).
            </p>
          </div>
        </li>

        <li className="sejarah__timeline-item">
          <span className="sejarah__timeline-period">2024 – Sekarang</span>
          <div className="sejarah__timeline-content">
            <h4>Transformasi Identitas Perusahaan</h4>
            <p>
              Berdasarkan{" "}
              <strong>Akta Perubahan No. 12 tanggal 19 November 2024</strong>,
              perusahaan secara resmi bertransformasi dan mengubah nama dari{" "}
              <strong>PT Penilai Standar Nasional</strong> menjadi{" "}
              <strong>PT Penilai Standar Uji</strong>. Transformasi ini
              memperluas portofolio layanan terintegrasi yang mencakup 5 bidang
              utama: <em>Testing (Pengujian)</em>,{" "}
              <em>Certification (Sertifikasi)</em>,{" "}
              <em>Calibration (Kalibrasi)</em>, <em>Training (Pelatihan)</em>,
              dan <em>Consulting (Konsultasi)</em>.
            </p>
          </div>
        </li>
      </ol>

      <section aria-labelledby="visimisi-title">
        <h2
          id="visimisi-title"
          className="profile-page__center-title profile-page__center-title--spaced"
        >
          Visi dan Misi
        </h2>

        <div className="profile-panel">
          <h3 className="profile-panel__label">Visi</h3>
          <p className="profile-panel__vision">
            Menjadi salah satu perusahaan jasa inspeksi dan sertifikasi standar
            nasional terbaik dan terpercaya di Indonesia dengan pelayanan prima
            dan berkualitas handal.
          </p>
        </div>

        <div className="profile-panel profile-panel--top">
          <h3 className="profile-panel__label">Misi</h3>
          <ul className="profile-panel__list">
            <li>Meningkatkan profesionalisme perusahaan dan karyawan</li>
            <li>Meningkatkan kualitas tenaga kerja dengan keahlian terbaik</li>
            <li>
              Mendorong penciptaan tenaga kerja terampil yang dapat diandalkan
              bagi perusahaan, masyarakat dan negara
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}