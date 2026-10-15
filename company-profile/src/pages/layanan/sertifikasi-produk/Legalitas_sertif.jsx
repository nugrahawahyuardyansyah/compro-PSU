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
          { label: "Layanan" },
          { label: "Lembaga Sertifikasi Produk" },
          { label: "Legalitas", href: "/layanan/sertif-produk/legalitas" },
        ]}
      />
      <section className="service-detail--legalitas-sertif">
      <LocalizedText as="h1">Legalitas</LocalizedText>
      <LegalitasButtons />
      </section>
    </>
  );
}
