import PageHeader from "../../../components/PageHeader";
import "./Keluhan_banding_sertif_sistem.css";
import LocalizedText from "../../../components/LocalizedText";

export default function Keluhanbandingsertifsistem() {
  return (
    <>
      <PageHeader
        title="Keluhan dan Banding"
        breadcrumbs={[
          { label: "Layanan", href: "/layanan" },
          { label: "Lembaga Sertifikasi Sistem Manajemen", href: "/layanan/sertif-manajemen" },
          { label: "Keluhan dan Banding", href: "/layanan/sertif-manajemen/keluhan-banding" }
        ]}
      />
      <section><LocalizedText as="h1">Keluhan dan Banding</LocalizedText></section>
    </>
  );
}
