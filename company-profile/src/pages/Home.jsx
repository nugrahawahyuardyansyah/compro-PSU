import "./Home.css";

export default function Home() {
  return (
    <main className="home">
      <img
        className="home__banner"
        src="/Logo_PSU_banner.jpg"
        alt="PT Penilai Standar Uji"
      />

      <section className="about">
        <div className="about__body">
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
            independen, kolaboratif, dan berkelanjutan untuk membantu industri,
            masyarakat, dan para pemangku kepentingan meningkatkan kualitas dan
            kepercayaan terhadap produk maupun layanan.
          </p>
        </div>

        <blockquote className="about__quote">
          “Solusi Penilaian Kesesuaian untuk Industri yang Lebih Maju.”
        </blockquote>
      </section>
    </main>
  );
}