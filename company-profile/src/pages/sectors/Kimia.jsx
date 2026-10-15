import PageHeader from "../../components/PageHeader";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/useLanguage";
import "./Kimia.css";

export default function Kimia() {
  const { lang } = useLanguage();
  const title =
    lang === "en"
      ? "Chemical Materials and Products"
      : "Bahan dan Produk Kimia";

  return (
    <section className="sector-detail-page">
      <PageHeader title="Bahan dan Produk Kimia" breadcrumbs={[{ label: "Bahan dan Produk Kimia", href: "/kimia" }]} />
      <Link className="sector-detail-page__back" to="/">
        {lang === "en" ? "Back to Home" : "Kembali ke Beranda"}
      </Link>
    </section>
  );
}
