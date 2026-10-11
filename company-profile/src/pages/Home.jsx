import { useEffect, useState } from "react";
import { useLanguage } from "../context/useLanguage";
import "./Home.css";

const BANNERS = [
  "/Logo_PSU_banner1.jpeg",
  "/Logo_PSU_banner2.jpeg",
  "/Logo_PSU_banner3.jpeg",
  "/Logo_PSU_banner4.jpeg",
  "/Logo_PSU_banner5.jpeg",
  "/Logo_PSU_banner6.jpeg",
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const { lang } = useLanguage();

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
            key={banner}
            className={`home__banner${i === current ? " home__banner--active" : ""}${
              i === 0 ? " home__banner--office" : ""
            }`}
            src={banner}
            alt={`PT Penilai Standar Uji ${i + 1}`}
          />
        ))}
        <div className="home__hero-text">
          <span className="home__hero-subtitle">PT. PENILAI STANDAR UJI</span>
        </div>
      </div>

      <section className="about">
        <div className="about__body">
          <p>
            <strong>PT Penilai Standar Uji (PSU)</strong>{" "}
            {lang === "en"
              ? "is a company operating in the conformity assessment ecosystem and providing quality support services. We offer a range of services to help industries ensure their products, processes, and services meet applicable standards and requirements."
              : "merupakan perusahaan yang bergerak dalam ekosistem penilaian kesesuaian dan layanan pendukung mutu. Kami menyediakan berbagai layanan yang mendukung kebutuhan industri dalam memastikan produk, proses, dan layanan memenuhi standar serta persyaratan yang berlaku."}
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

        <blockquote className="about__quote">
          {lang === "en"
            ? "“Conformity Assessment Solutions for a More Advanced Industry.”"
            : "“Solusi Penilaian Kesesuaian untuk Industri yang Lebih Maju.”"}
        </blockquote>
      </section>

    </main>
  );
}