import PageHeader from "../../../components/PageHeader";
import "./Legalitas_kalibrasi.css";
import LocalizedText from "../../../components/LocalizedText";
import LegalitasButtons from "../../../components/LegalitasButtons";

export default function Legalitaskalibrasi() {
  return (
    <>
      <PageHeader
        title="Legalitas"
        breadcrumbs={[
          { label: "Layanan" },
          { label: "Lembaga Kalibrasi" },
          { label: "Legalitas", href: "/layanan/kalibrasi/legalitas" },
        ]}
      />
      <section className="service-detail--legalitas-kalibrasi">
      <LocalizedText as="h1">Legalitas</LocalizedText>
      <LegalitasButtons />
      </section>
    </>
  );
}
