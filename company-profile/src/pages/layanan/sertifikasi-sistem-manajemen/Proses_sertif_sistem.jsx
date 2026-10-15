import PageHeader from "../../../components/PageHeader";
import "./Proses_sertif_sistem.css";
import LocalizedText from "../../../components/LocalizedText";

export default function Prosessertifsistem() {
  return (
    <>
      <PageHeader
        title="Proses Sertifikasi"
        breadcrumbs={[
          { label: "Layanan", href: "/layanan" },
          { label: "Lembaga Sertifikasi Sistem Manajemen", href: "/layanan/sertif-manajemen" },
          { label: "Proses Sertifikasi", href: "/layanan/sertif-manajemen/proses-sertifikasi" }
        ]}
      />
      <section><LocalizedText as="h1">Proses Sertifikasi</LocalizedText></section>
    </>
  );
}
