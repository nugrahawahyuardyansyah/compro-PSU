import PageHeader from "../../../components/PageHeader";
import "./Biaya_penawaran_sertif.css";
import LocalizedText from "../../../components/LocalizedText";

export default function Biayapenawaransertif() {
  return (
    <>
      <PageHeader
        title="Biaya dan Penawaran Sertifikasi"
        breadcrumbs={[
          { label: "Layanan" },
          { label: "Lembaga Sertifikasi Produk" },
          { label: "Biaya dan Penawaran Sertifikasi", href: "/layanan/sertif-produk/biaya-sertif" },
        ]}
      />
      <section><LocalizedText as="h1">Biaya dan Penawaran Sertifikasi</LocalizedText></section>
    </>
  );
}
