import PageHeader from "../../../components/PageHeader";
import "./Keluhan_banding_sertif.css";
import LocalizedText from "../../../components/LocalizedText";

export default function Keluhanbandingsertif() {
  return (
    <>
      <PageHeader
        title="Keluhan dan Banding"
        breadcrumbs={[
          { label: "Layanan", href: "/layanan" },
          { label: "Lembaga Sertifikasi Produk", href: "/layanan/sertif-produk" },
          { label: "Keluhan dan Banding", href: "/layanan/sertif-produk/keluhan-banding" }
        ]}
      />
      <section><LocalizedText as="h1">Keluhan dan Banding</LocalizedText></section>
    </>
  );
}
