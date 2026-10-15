import PageHeader from "../../../components/PageHeader";
import "./Legalitas_sertif.css";
import LocalizedText from "../../../components/LocalizedText";
import LegalitasButtons from "../../../components/LegalitasButtons";

export default function Legalitassertif() {
  return (
    <>
      <PageHeader
        title="Legalitas"
        breadcrumbs={[
          { label: "Layanan", href: "/layanan" },
          { label: "Lembaga Sertifikasi Produk", href: "/layanan/sertif-produk" },
          { label: "Legalitas", href: "/layanan/sertif-produk/legalitas" }
        ]}
      />
      <section className="service-detail--legalitas-sertif">
      <LocalizedText as="h1">Legalitas</LocalizedText>
      <LegalitasButtons />
      </section>
    </>
  );
}
