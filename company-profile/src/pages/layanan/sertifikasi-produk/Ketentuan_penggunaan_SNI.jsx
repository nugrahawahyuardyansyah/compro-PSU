import PageHeader from "../../../components/PageHeader";
import "./Ketentuan_penggunaan_SNI.css";
import LocalizedText from "../../../components/LocalizedText";

export default function KetentuanpenggunaanSNI() {
  return (
    <>
      <PageHeader
        title="Ketentuan dan Tata Cara Penggunaan SNI"
        breadcrumbs={[
          { label: "Layanan" },
          { label: "Lembaga Sertifikasi Produk" },
          { label: "Ketentuan dan Tata Cara Penggunaan SNI", href: "/layanan/sertif-produk/penggunaan-sni" },
        ]}
      />
      <section><LocalizedText as="h1">Ketentuan dan Tata Cara Penggunaan SNI</LocalizedText></section>
    </>
  );
}
