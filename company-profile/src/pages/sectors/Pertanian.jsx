import { Link } from "react-router-dom";
import { useLanguage } from "../../context/useLanguage";
import "./SectorDetail.css";

export default function Pertanian() {
  const { lang } = useLanguage();
  const title =
    lang === "en" ? "Agriculture and Plantation" : "Pertanian dan Perkebunan";

  return (
    <section className="sector-detail-page">
      <div className="sector-detail-page__hero">
        <img
          className="sector-detail-page__image"
          src="/1.pertanian.jpg"
          alt={title}
        />
        <div className="sector-detail-page__hero-text">
          <h1 className="sector-detail-page__title">{title}</h1>
        </div>
      </div>
      <Link className="sector-detail-page__back" to="/">
        {lang === "en" ? "Back to Home" : "Kembali ke Beranda"}
      </Link>
    </section>
  );
}
