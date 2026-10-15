import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/useLanguage";
import "./Pangan.css";

const COMMODITIES = [
  {
    id: "Air Mineral",
    en: "Mineral Water",
    image: "/Air Mineral.webp",
  },
  {
    id: "Air Demineral",
    en: "Demineralized Water",
    image: "/Air Demineral.webp",
  },
  {
    id: "Air Mineral Alami",
    en: "Natural Mineral Water",
    image: "/Air Mineral Alami.webp",
  },
  {
    id: "Air Minum Embun",
    en: "Rainwater",
    image: "/Air Minum Embun.webp",
  }
];

export default function Pangan() {
  const { lang } = useLanguage();
  const cardsRef = useRef(null);
  const title =
    lang === "en" ? "Other Food Products" : "Produk Pangan";

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
          src="/3.pangan.webp"
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
