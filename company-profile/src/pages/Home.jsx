import { useEffect, useState } from "react";
import "./Home.css";

const BANNERS = [
  { desktop: "/Logo_PSU_banner1.jpeg", mobile: "/Logo_PSU_banner1.jpeg" },
  { desktop: "/Logo_PSU_banner2.jpeg", mobile: "/Logo_PSU_banner2_hp.jpeg" },
  { desktop: "/Logo_PSU_banner3.jpeg", mobile: "/Logo_PSU_banner3_hp.jpeg" },
  { desktop: "/Logo_PSU_banner4.jpeg", mobile: "/Logo_PSU_banner4_hp.jpeg" },
  { desktop: "/Logo_PSU_banner5.jpeg", mobile: "/Logo_PSU_banner5_hp.jpeg" },
  { desktop: "/Logo_PSU_banner6.jpeg", mobile: "/Logo_PSU_banner6_hp.jpeg" },
];

const isMobile = () => window.matchMedia("(max-width: 860px)").matches;

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="home">
      <div className="home__hero">
        {BANNERS.map((banner, i) => (
          <img
            key={banner.desktop}
            className={`home__banner${i === current ? " home__banner--active" : ""}`}
            src={isMobile() ? banner.mobile : banner.desktop}
            alt={`PT Penilai Standar Uji ${i + 1}`}
          />
        ))}
        <div className="home__hero-text">
          <span className="home__hero-title">Company Profile</span>
          <br />
          <span className="home__hero-subtitle">PT. PENILAI STANDAR UJI</span>
        </div>
      </div>

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