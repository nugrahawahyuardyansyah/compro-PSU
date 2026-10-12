import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const SECTORS = [
  {
    file: "1.pertanian.jpg",
    id: "Pertanian dan Perkebunan",
    en: "Agriculture and Plantation",
    descId: "Pengujian dan sertifikasi komoditas hasil bumi untuk memastikan kualitas, keamanan, dan pemenuhan standar regulasi.",
    descEn: "Testing and certification of agricultural commodities to ensure quality, safety, and regulatory compliance.",
    link: "/pertanian",
  },
  {
    file: "2.tanaman.jpg",
    id: "Produk Tanaman",
    en: "Plant Products and Derivatives",
    descId: "Layanan penilaian kesesuaian untuk berbagai produk olahan nabati dan turunannya guna menjaga standar mutu.",
    descEn: "Conformity assessment services for various plant-based processed products and derivatives to maintain quality standards.",
    link: "/tanaman",
  },
  {
    file: "3.pangan.jpg",
    id: "Produk Pangan",
    en: "Other Food Products",
    descId: "Analisis mutu fisik, kimia, dan cemaran pada produk makanan dan minuman untuk menjamin keamanan pangan.",
    descEn: "Physical, chemical, and contamination quality analysis of food and beverage products to guarantee food safety.",
    link: "/pangan",
  },
  {
    file: "4.kimia.jpg",
    id: "Bahan dan Produk Kimia",
    en: "Chemical Materials and Products",
    descId: "Pengujian parameter dan komposisi kimia pada bahan baku industri maupun produk akhir sesuai standar yang berlaku.",
    descEn: "Testing of parameters and chemical composition in industrial raw materials and final products according to applicable standards.",
    link: "/kimia",
  },
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
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
          <p className="home__hero-desc">
            {lang === "en"
              ? "Your trusted partner in conformity assessment, laboratory testing, and product certification. We empower industries to meet global standards with integrity and excellence."
              : "Mitra tepercaya Anda dalam penilaian kesesuaian, pengujian laboratorium, dan sertifikasi produk. Kami mendukung industri untuk mencapai standar kualitas global dengan keunggulan dan integritas."}
          </p>
        </div>
      </div>

      <section className="about">
        <div className="about__body">
          <p className="reveal reveal-fade" style={{ transitionDelay: "0.1s" }}>
            <strong>PT Penilai Standar Uji (PSU)</strong>{" "}
            {lang === "en"
              ? "is a company operating in the conformity assessment ecosystem and providing quality support services. We offer a range of services to help industries ensure their products, processes, and services meet applicable standards and requirements."
              : "merupakan perusahaan yang bergerak dalam ekosistem penilaian kesesuaian dan layanan pendukung mutu. Kami menyediakan berbagai layanan yang mendukung kebutuhan industri dalam memastikan produk, proses, dan layanan memenuhi standar serta persyaratan yang berlaku."}
          </p>
          <p className="reveal reveal-fade" style={{ transitionDelay: "0.3s" }}>
            {lang === "en"
              ? "Supported by professional, competent, and experienced personnel, PSU continues to develop its services in product certification, laboratory testing, calibration, training, and laboratory and compliance consulting."
              : "Didukung oleh tenaga profesional, kompeten, dan berpengalaman, PSU terus mengembangkan layanan melalui sertifikasi produk, pengujian laboratorium, kalibrasi, pelatihan, serta konsultasi laboratorium dan kepatuhan."}
          </p>
          <p className="reveal reveal-fade" style={{ transitionDelay: "0.5s" }}>
            {lang === "en"
              ? "We are committed to delivering services with integrity, competence, independence, collaboration, and sustainability, helping industries, communities, and stakeholders improve the quality and trustworthiness of products and services."
              : "Kami berkomitmen memberikan layanan yang integritas, kompeten, independen, kolaboratif, dan berkelanjutan untuk membantu industri, masyarakat, dan para pemangku kepentingan meningkatkan kualitas dan kepercayaan terhadap produk maupun layanan."}
          </p>
        </div>

        <blockquote className="about__quote reveal reveal-fade" style={{ transitionDelay: "0.7s" }}>
          {lang === "en"
            ? "“Conformity Assessment Solutions for a More Advanced Industry.”"
            : "“Solusi Penilaian Kesesuaian untuk Industri yang Lebih Maju.”"}
        </blockquote>
      </section>

      <section className="sectors" aria-labelledby="sectors-title">
        <h2 id="sectors-title" className="sectors__heading reveal reveal-fade" style={{ transitionDelay: "0.1s" }}>
          {lang === "en" ? "Our Service Sectors" : "PRODUK YANG DISERTIFIKASI"}
        </h2>

        <div className="sectors__container">
          {SECTORS.map((sector) => {
            const label = lang === "en" ? sector.en : sector.id;
            const desc = lang === "en" ? sector.descEn : sector.descId;

            return (
              <div 
                className="expanding-card reveal" 
                key={sector.file}
                style={{ backgroundImage: `url(/${sector.file})` }}
                tabIndex="0"
              >
                <div className="expanding-card__content">
                  <h3 className="expanding-card__title">{label}</h3>
                  
                  <span className="expanding-card__more">
                    {lang === "en" ? "Learn more \u2192" : "Selengkapnya \u2192"}
                  </span>
                  
                  <p className="expanding-card__desc">{desc}</p>
                  
                  <Link to={sector.link} className="expanding-card__btn">
                    {lang === "en" ? "See Details" : "Lihat Detail"}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}