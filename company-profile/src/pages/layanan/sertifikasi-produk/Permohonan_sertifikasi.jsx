import PageHeader from "../../../components/PageHeader";
import "./Permohonan_sertifikasi.css";
import LocalizedText from "../../../components/LocalizedText";

export default function Permohonansertifikasi() {
  return (
    <>
      <PageHeader
        title="Permohonan Sertifikasi"
        breadcrumbs={[
          { label: "Layanan", href: "/layanan" },
          { label: "Lembaga Sertifikasi Produk", href: "/layanan/sertif-produk" },
          { label: "Permohonan Sertifikasi", href: "/layanan/sertif-produk/permohonan-sertifikasi" }
        ]}
      />
      <section><LocalizedText as="h1">Permohonan Sertifikasi</LocalizedText></section>
    </>
  );
}
