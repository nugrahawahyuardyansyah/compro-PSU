import PageHeader from "../../../components/PageHeader";
import "./Tipe_1B.css";
import LocalizedText from "../../../components/LocalizedText";

export default function Tipe1B() {
  return (
    <>
      <PageHeader
        title="Tipe 1B"
        breadcrumbs={[
          { label: "Layanan", href: "/layanan" },
          { label: "Lembaga Sertifikasi Produk", href: "/layanan/sertif-produk" },
          { label: "Proses Sertifikasi", href: "/layanan/sertif-produk/proses" },
          { label: "Tipe 1B", href: "/layanan/sertif-produk/tipe-1b" }
        ]}
      />
      <section><LocalizedText as="h1">Tipe 1B</LocalizedText></section>
    </>
  );
}
