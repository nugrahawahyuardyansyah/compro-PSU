import PageHeader from "../../../components/PageHeader";
import "./Keluhan_banding_sertif.css";
import LocalizedText from "../../../components/LocalizedText";

export default function Keluhanbandingsertif() {
  return (
    <>
      <PageHeader
        title="Keluhan dan Banding"
        breadcrumbs={[
          { label: "Layanan" },
          { label: "Lembaga Sertifikasi Produk" },
          { label: "Keluhan dan Banding", href: "/layanan/sertif-produk/keluhan-banding" },
        ]}
      />
      <section><LocalizedText as="h1">Keluhan dan Banding</LocalizedText></section>
    </>
  );
}
