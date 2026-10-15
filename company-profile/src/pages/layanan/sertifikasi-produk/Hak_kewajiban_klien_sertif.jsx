import PageHeader from "../../../components/PageHeader";
import "./Hak_kewajiban_klien_sertif.css";
import LocalizedText from "../../../components/LocalizedText";

export default function Hakkewajibankliensertif() {
  return (
    <>
      <PageHeader
        title="Hak dan Kewajiban Klien"
        breadcrumbs={[
          { label: "Layanan", href: "/layanan" },
          { label: "Lembaga Sertifikasi Produk", href: "/layanan/sertif-produk" },
          { label: "Hak dan Kewajiban Klien", href: "/layanan/sertif-produk/hak-kewajiban-klien" }
        ]}
      />
      <section><LocalizedText as="h1">Hak dan Kewajiban Klien</LocalizedText></section>
    </>
  );
}
