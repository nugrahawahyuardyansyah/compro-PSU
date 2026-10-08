import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { services } from "./services";
import "./Home.css";

const BANNERS = [
  { desktop: "/Logo_PSU_banner1.jpeg", mobile: "/Logo_PSU_banner1.jpeg" },
  { desktop: "/Logo_PSU_banner2.jpeg", mobile: "/Logo_PSU_banner2_hp.jpeg" },
  { desktop: "/Logo_PSU_banner3.jpeg", mobile: "/Logo_PSU_banner3_hp.jpeg" },
  { desktop: "/Logo_PSU_banner4.jpeg", mobile: "/Logo_PSU_banner4_hp.jpeg" },
  { desktop: "/Logo_PSU_banner5.jpeg", mobile: "/Logo_PSU_banner5_hp.jpeg" },
  { desktop: "/Logo_PSU_banner6.jpeg", mobile: "/Logo_PSU_banner6_hp.jpeg" },
];

const iconProps = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const icons = {
  "sertifikasi-produk": (
    <svg {...iconProps}>
      <path d="M8 8h32v22H8z" />
      <path d="M14 15h16M14 21h9" />
      <circle cx="32" cy="26" r="5" />
      <path d="M29 30.5L27.5 41l4.5-2.5 4.5 2.5L35 30.5" />
    </svg>
  ),
  pengujian: (
    <svg {...iconProps}>
      <path d="M19 6h10M21 6v13L10 38a3 3 0 0 0 2.6 4.5h22.8A3 3 0 0 0 38 38L27 19V6" />
      <path d="M14 31h20" />
    </svg>
  ),
  kalibrasi: (
    <svg {...iconProps}>
      <path d="M8 34A16 16 0 0 1 40 34" />
      <path d="M24 34l8-10" />
      <circle cx="24" cy="34" r="2.5" />
      <path d="M12 34h3M33 34h3M24 20v3" />
    </svg>
  ),
  "sertifikasi-sistem-manajemen": (
    <svg {...iconProps}>
      <rect x="11" y="9" width="26" height="31" rx="3" />
      <path d="M18 9V7h12v2" />
      <path d="M17 24l5 5 9-10" />
    </svg>
  ),
  pelatihan: (
    <svg {...iconProps}>
      <path d="M4 18L24 8l20 10-20 10z" />
      <path d="M12 23v10c0 3 6 6 12 6s12-3 12-6V23" />
      <path d="M44 18v12" />
    </svg>
  ),
};

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
      </div>      <section className="about">
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

      <section className="services">
        <div className="services__intro">
          <h2 className="services__heading">
            Layanan PT. Penilai Standar Uji melingkupi berbagai sektor
          </h2>
          <Link className="services__button" to="/layanan">
            Selengkapnya
          </Link>
        </div>

        {services.map((service) => (
          <article className="service-card" key={service.id}>
            <span className="service-card__icon">{icons[service.id]}</span>
            <h3 className="service-card__title">{service.title}</h3>
            <p className="service-card__text">{service.description}</p>
            <Link
              className="service-card__link"
              to={service.path}
              aria-label={`Selengkapnya tentang ${service.title}`}
            >
              Selengkapnya ›
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}