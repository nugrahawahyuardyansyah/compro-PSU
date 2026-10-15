import PageHeader from "../../../components/PageHeader";
import "./Ruang_lingkup_sertif_sistem.css";
import LocalizedText from "../../../components/LocalizedText";

export default function Ruanglingkupsertifsistem() {
  return (
    <>
      <PageHeader
        title="Ruang Lingkup"
        breadcrumbs={[
          { label: "Layanan", href: "/layanan" },
          { label: "Lembaga Sertifikasi Sistem Manajemen", href: "/layanan/sertif-manajemen" },
          { label: "Ruang Lingkup", href: "/layanan/sertif-manajemen/ruang-lingkup" }
        ]}
      />
      <section><LocalizedText as="h1">Ruang Lingkup</LocalizedText></section>
    </>
  );
}
