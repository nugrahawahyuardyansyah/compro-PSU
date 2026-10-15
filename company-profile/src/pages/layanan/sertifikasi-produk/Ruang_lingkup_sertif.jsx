import PageHeader from "../../../components/PageHeader";
import "./Ruang_lingkup_sertif.css";
import LocalizedText from "../../../components/LocalizedText";

export default function Ruanglingkupsertif() {
  return (
    <>
      <PageHeader
        title="Ruang Lingkup"
        breadcrumbs={[
          { label: "Layanan", href: "/layanan" },
          { label: "Lembaga Sertifikasi Produk", href: "/layanan/sertif-produk" },
          { label: "Ruang Lingkup", href: "/layanan/sertif-produk/ruang-lingkup" }
        ]}
      />
      <section><LocalizedText as="h1">Ruang Lingkup</LocalizedText></section>
    </>
  );
}
