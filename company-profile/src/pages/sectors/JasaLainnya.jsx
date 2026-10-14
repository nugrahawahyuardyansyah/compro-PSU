import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/useLanguage";
import "./JasaLainnya.css";

const COMMODITIES = [
  {
    id: "Kalibrasi Alat Laboratorium",
    en: "Laboratory Equipment Calibration",
    image: "/lab_kalibrasi.webp",
    descId: "Layanan kalibrasi untuk berbagai alat laboratorium termasuk pipet, buret, termometer, dan alat analisis lainnya. Memastikan akurasi dan traceability pengukuran sesuai standar nasional dan internasional.",
    descEn: "Calibration services for various laboratory equipment including pipettes, burettes, thermometers, and other analytical instruments. Ensuring measurement accuracy and traceability according to national and international standards."
  },
  {
    id: "Pelatihan Teknis Laboratorium",
    en: "Laboratory Technical Training",
    image: "/_pelatihan.webp",
    descId: "Program pelatihan teknis untuk staf laboratorium mencakup Good Laboratory Practice (GLP), Standard Operating Procedure (SOP), dan teknik analisis khusus. Dirancang untuk meningkatkan kompetensi dan mutu hasil pengujian.",
    descEn: "Technical training programs for laboratory staff covering Good Laboratory Practice (GLP), Standard Operating Procedure (SOP), and specialized analysis techniques. Designed to enhance competency and quality of test results."
  }
];

export default function JasaLainnya() {
  const { lang } = useLanguage();
  const cardsRef = useRef(null);
  const title =
    lang === "en" ? "Other Services" : "Jasa Lainnya";

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll(".pangan-card");
    if (!cards) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="sector-detail-page">
      <div className="sector-detail-page__hero">
        <img
          className="sector-detail-page__image"
          src="/Banner_Jasa.webp"
          alt={title}
        />
        <div className="sector-detail-page__hero-text">
          <h1 className="sector-detail-page__title">{title}</h1>
        </div>
      </div>
      <div className="pangan-cards" ref={cardsRef}>
        {COMMODITIES.map((item, index) => (
          <div className="pangan-card" key={index}>
            <img 
              src={item.image} 
              alt={lang === "en" ? item.en : item.id} 
              className="pangan-card__img" 
            />
            
            <div className="pangan-card__overlay"></div>
            
            <div className="pangan-card__content">
              <h3 className="pangan-card__title">
                {lang === "en" ? item.en : item.id}
              </h3>
              <p className="pangan-card__desc">
                {lang === "en" ? item.descEn : item.descId}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link className="sector-detail-page__back" to="/">
        {lang === "en" ? "Back to Home" : "Kembali ke Beranda"}
      </Link>
    </section>
  );
}