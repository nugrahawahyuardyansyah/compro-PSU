import { Link } from "react-router-dom";
import { useLanguage } from "../../context/useLanguage";
import "./SectorDetail.css";

export default function Pangan() {
  const { lang } = useLanguage();
  const title =
    lang === "en" ? "Other Food Products" : "Produk Pangan";

  return (
    <section className="sector-detail-page">
      <div className="sector-detail-page__hero">
        <img
          className="sector-detail-page__image"
          src="/3.pangan.jpg"
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
