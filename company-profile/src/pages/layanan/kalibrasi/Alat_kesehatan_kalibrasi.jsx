import PageHeader from "../../../components/PageHeader";
import "./Alat_kesehatan_kalibrasi.css";
import LocalizedText from "../../../components/LocalizedText";

export default function Alatkesehatankalibrasi() {
  return (
    <>
      <PageHeader
        title="Alat Kesehatan"
        breadcrumbs={[
          { label: "Layanan" },
          { label: "Lembaga Kalibrasi" },
          { label: "Ruang Lingkup" },
          { label: "Alat Kesehatan", href: "/layanan/kalibrasi/ruang-lingkup/alat-kesehatan" },
        ]}
      />
      <section><LocalizedText as="h1">Alat Kesehatan</LocalizedText></section>
    </>
  );
}
