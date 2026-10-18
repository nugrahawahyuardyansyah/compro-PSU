import PageHeader from "../../../components/PageHeader";
import "./Permohonan_sertifikasi.css";
import LocalizedText from "../../../components/LocalizedText";

export default function Permohonansertifikasi() {
  return (
    <>
      <PageHeader
        title="Permohonan Sertifikasi"
        breadcrumbs={[
          { label: "Layanan" },
          { label: "Lembaga Sertifikasi Produk" },
          { label: "Permohonan Sertifikasi", href: "/layanan/sertif-produk/permohonan-sertifikasi" },
        ]}
      />
      <section><LocalizedText as="h1">Permohonan Sertifikasi</LocalizedText></section>
    </>
  );
}
