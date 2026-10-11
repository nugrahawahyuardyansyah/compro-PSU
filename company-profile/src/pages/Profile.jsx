import "./Profile.css";
import { useLanguage } from "../context/useLanguage";

const ABOUT_IMAGE = "/about-regulations-gavel-scales.jpeg";

export default function Profile() {
  const { lang, t } = useLanguage();

  return (
    <main className="profile-page">
      <section aria-labelledby="about-title">
        <h1 id="about-title" className="profile-page__center-title">
          {t("About Us")}
        </h1>

        <div className="profile-panel">
          <div className="profile-panel__side">
            <img
              className="profile-panel__photo"
              src={ABOUT_IMAGE}
              alt={t("Palu hakim dan timbangan keadilan")}
            />
            <p className="profile-panel__accreditation">
              <strong>{t("Akreditasi KAN")}</strong>
              <span>LSPr-051-IDN</span>
              <span>LP-1554-IDN</span>
              <span>LSSM</span>
              <span>{t("Penunjukkan Kemenperin")}</span>
              <span>{t("Penunjukkan Kemendag")}</span>
              <span>{t("Penunjukkan Kementan")}</span>
            </p>
          </div>

          <div className="profile-panel__text">
            <p>
              <strong>PT Penilai Standar Uji (PSU)</strong>{" "}
              {lang === "en"
                ? "is a company operating in the conformity assessment ecosystem and providing quality support services. We offer a range of services to help industries ensure their products, processes, and services meet applicable standards and requirements."
                : "merupakan perusahaan yang bergerak dalam ekosistem penilaian kesesuaian dan layanan pendukung mutu. Kami menyediakan berbagai layanan yang mendukung kebutuhan industri dalam memastikan produk, proses, dan layanan memenuhi standar serta persyaratan yang berlaku."}
            </p>
            <p>
              {lang === "en"
                ? "Our certification scope covers products such as rice, cocoa, coffee, biscuits, sugar, cooking oil, water, fertilizers, cookware, flatware, and traditional markets."
                : "Ruang lingkup sertifikasi kami mencakup produk seperti Beras, Kakao, Kopi, Biskuit, Gula, Minyak, Air, Pupuk, Cookware, Flatware, dan Pasar Rakyat."}
            </p>
            <p>
              {lang === "en"
                ? "Supported by professional, competent, and experienced personnel, PSU continues to develop its services in product certification, laboratory testing, calibration, training, and laboratory and compliance consulting."
                : "Didukung oleh tenaga profesional, kompeten, dan berpengalaman, PSU terus mengembangkan layanan melalui sertifikasi produk, pengujian laboratorium, kalibrasi, pelatihan, serta konsultasi laboratorium dan kepatuhan."}
            </p>
            <p>
              {lang === "en"
                ? "We are committed to delivering services with integrity, competence, independence, collaboration, and sustainability, helping industries, communities, and stakeholders improve the quality and trustworthiness of products and services."
                : "Kami berkomitmen memberikan layanan yang integritas, kompeten, independen, kolaboratif, dan berkelanjutan untuk membantu industri, masyarakat, dan para pemangku kepentingan meningkatkan kualitas dan kepercayaan terhadap produk maupun layanan."}
            </p>
          </div>
        </div>
      </section>

      <h2 className="profile-page__section-title">
        {t("Sejarah PT Penilai Standar Uji (PSU)")}
      </h2>

      <p className="profile-page__intro">
        {lang === "en"
          ? "PT Penilai Standar Uji (formerly operating as PT Penilai Standar Nasional / PSN) was established to provide conformity assessment, standardization, and product testing services in Indonesia. The company operates a Product Certification Body (LSPro-PSU) and a Testing Laboratory responsible for issuing SNI Mark Product Certificates (SPPT-SNI) in accordance with Law No. 20 of 2014 on Standardization and Conformity Assessment."
          : <>PT Penilai Standar Uji (sebelumnya beroperasi dengan nama{" "}
            <strong>PT Penilai Standar Nasional / PSN</strong>) didirikan untuk
            bergerak di bidang penilaian kesesuaian, standarisasi, serta pengujian
            produk di Indonesia. Perusahaan ini mengoperasikan Lembaga Sertifikasi
            Produk (LSPro-PSU) dan Laboratorium Pengujian yang bertugas menerbitkan
            Sertifikat Produk Penggunaan Tanda Standar Nasional Indonesia (SPPT-SNI)
            sesuai acuan Undang-Undang No. 20 Tahun 2014 tentang Standardisasi dan
            Penilaian Kesesuaian.</>}
      </p>

      <h3 className="profile-page__subtitle">
        {t("Masa Perkembangan dan Milestones Utama")}
      </h3>

      <ol className="sejarah__timeline">
        <li className="sejarah__timeline-item">
          <span className="sejarah__timeline-period">2020 – 2030</span>
          <div className="sejarah__timeline-content">
            <h4>{t("Akreditasi Awal & Perluasan LSPro")}</h4>
            <p>
              {lang === "en"
                ? "The company received KAN accreditation as a Product Certification Body under number LSPr-051-IDN to SNI ISO/IEC 17065:2012 (internationally recognized through IAF MLA). Initial accreditation was granted on May 30, 2020 for the 2020–2025 period, followed by an amendment certificate issued on January 10, 2022. KAN subsequently extended the LSPro accreditation from June 30, 2025 through May 29, 2030, expanding its scope to agricultural and food commodities (rice, coffee beans, cocoa beans, biscuits, and crystal sugar)."
                : <>Perusahaan mengantongi akreditasi KAN sebagai Lembaga Sertifikasi
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
                </>}
            </p>
          </div>
        </li>

        <li className="sejarah__timeline-item">
          <span className="sejarah__timeline-period">2021</span>
          <div className="sejarah__timeline-content">
            <h4>{t("Akreditasi Laboratorium Pengujian")}</h4>
            <p>
              {lang === "en"
                ? "On November 24, 2021, the company received KAN accreditation for its Testing Laboratory, number LP-1554-IDN (valid through November 23, 2026). The laboratory operates under SNI ISO/IEC 17025:2017, the General Requirements for the Competence of Testing and Calibration Laboratories, and is globally recognized through ILAC MRA."
                : <>Pada <strong>24 November 2021</strong>, perusahaan memperoleh
              sertifikat akreditasi <strong>KAN</strong> untuk Laboratorium
              Penguji dengan nomor <strong>LP-1554-IDN</strong> (berlaku hingga{" "}
              <strong>23 November 2026</strong>). Laboratorium ini dioperasikan
              berdasarkan standar SNI <strong>ISO/IEC 17025:2017</strong> (
              <em>
                Persyaratan Umum Untuk Kompetensi Laboratorium Pengujian dan
                Laboratorium Kalibrasi
              </em>
              ) dan diakui secara global melalui <strong>ILAC MRA</strong>.
                </>}
            </p>
          </div>
        </li>

        <li className="sejarah__timeline-item">
          <span className="sejarah__timeline-period">2023</span>
          <div className="sejarah__timeline-content">
            <h4>{t("Perkembangan Lingkup Layanan Pengujian")}</h4>
            <p>
              {lang === "en"
                ? "Laboratory testing services include physical and chemical testing of cookware and stainless-steel flatware. On February 22, 2023, KAN issued a laboratory accreditation supplement expanding the testing scope to several fertilizer types (SP 36, natural phosphate, potassium chloride, and TSP fertilizers)."
                : <>Layanan pengujian laboratorium mencakup pengujian fisika/kimia
              peralatan masak (<strong>Cookware</strong>) dan peralatan makan
              baja tahan karat (<strong>Flatware</strong>). Pada{" "}
              <strong>22 Februari 2023</strong>, <strong>KAN</strong>{" "}
              menerbitkan suplemen akreditasi laboratorium untuk perluasan ruang
              lingkup pengujian berbagai jenis <strong>Pupuk</strong> (
              <em>
                Pupuk SP 36, Pupuk Fosfat Alam, Pupuk Kalium Klorida, dan TSP
              </em>
              ).
                  </>}
            </p>
          </div>
        </li>

        <li className="sejarah__timeline-item">
          <span className="sejarah__timeline-period">
            {lang === "en" ? "2024 – Present" : "2024 – Sekarang"}
          </span>
          <div className="sejarah__timeline-content">
            <h4>{t("Transformasi Identitas Perusahaan")}</h4>
            <p>
              {lang === "en"
                ? "Under Deed of Amendment No. 12 dated November 19, 2024, the company officially changed its name from PT Penilai Standar Nasional to PT Penilai Standar Uji. This transformation expanded its integrated service portfolio across five main areas: testing, certification, calibration, training, and consulting."
                : <>Berdasarkan{" "}
              <strong>Akta Perubahan No. 12 tanggal 19 November 2024</strong>,
              perusahaan secara resmi bertransformasi dan mengubah nama dari{" "}
              <strong>PT Penilai Standar Nasional</strong> menjadi{" "}
              <strong>PT Penilai Standar Uji</strong>. Transformasi ini
              memperluas portofolio layanan terintegrasi yang mencakup 5 bidang
              utama: <em>Testing (Pengujian)</em>,{" "}
              <em>Certification (Sertifikasi)</em>,{" "}
              <em>Calibration (Kalibrasi)</em>, <em>Training (Pelatihan)</em>,
              dan <em>Consulting (Konsultasi)</em>.
                </>}
            </p>
          </div>
        </li>
      </ol>

      <section aria-labelledby="visimisi-title">
        <h2
          id="visimisi-title"
          className="profile-page__center-title profile-page__center-title--spaced"
        >
          {t("Visi dan Misi")}
        </h2>

        <div className="profile-panel">
          <h3 className="profile-panel__label">{t("Visi")}</h3>
          <p className="profile-panel__vision">
            {lang === "en"
              ? t("Menjadi salah satu perusahaan jasa inspeksi dan sertifikasi standar nasional terbaik dan terpercaya di Indonesia dengan pelayanan prima dan berkualitas handal.")
              : <>Menjadi salah satu perusahaan jasa inspeksi dan sertifikasi standar
            nasional terbaik dan terpercaya di Indonesia dengan pelayanan prima
            dan berkualitas handal.</>}
          </p>
        </div>

        <div className="profile-panel profile-panel--top">
          <h3 className="profile-panel__label">{t("Misi")}</h3>
          <ul className="profile-panel__list">
            <li>{t("Meningkatkan profesionalisme perusahaan dan karyawan")}</li>
            <li>{t("Meningkatkan kualitas tenaga kerja dengan keahlian terbaik")}</li>
            <li>
              {t("Mendorong penciptaan tenaga kerja terampil yang dapat diandalkan bagi perusahaan, masyarakat dan negara")}
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}