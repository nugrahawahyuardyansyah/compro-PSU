import PageHeader from "../../../components/PageHeader";
import "./Ruang_lingkup_sertif.css";
import LocalizedText from "../../../components/LocalizedText";

export default function Ruanglingkupsertif() {
  return (
    <>
      <PageHeader
        title="Ruang Lingkup"
        breadcrumbs={[
          { label: "Layanan" },
          { label: "Lembaga Sertifikasi Produk" },
          { label: "Ruang Lingkup", href: "/layanan/sertif-produk/ruang-lingkup" },
        ]}
      />
      <section><LocalizedText as="h1">Ruang Lingkup</LocalizedText></section>
    </>
  );
}
