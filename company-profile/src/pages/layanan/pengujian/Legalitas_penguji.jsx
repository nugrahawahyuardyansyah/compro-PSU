import PageHeader from "../../../components/PageHeader";
import "./Legalitas_penguji.css";
import LocalizedText from "../../../components/LocalizedText";
import LegalitasButtons from "../../../components/LegalitasButtons";

export default function Legalitaspenguji() {
  return (
    <>
      <PageHeader
        title="Legalitas"
        breadcrumbs={[
          { label: "Layanan", href: "/layanan" },
          { label: "Lembaga Pengujian", href: "/layanan/penguji" },
          { label: "Legalitas", href: "/layanan/penguji/legalitas" }
        ]}
      />
      <section className="service-detail--legalitas-penguji">
      <LocalizedText as="h1">Legalitas</LocalizedText>
      <LegalitasButtons />
      </section>
    </>
  );
}
