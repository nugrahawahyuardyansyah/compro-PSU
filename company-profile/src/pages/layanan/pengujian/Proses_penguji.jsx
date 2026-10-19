import PageHeader from "../../../components/PageHeader";
import "./Proses_penguji.css";
import LocalizedText from "../../../components/LocalizedText";

export default function Prosespenguji() {
  return (
    <>
      <PageHeader
        title="Proses Pengujian"
        breadcrumbs={[
          { label: "Layanan" },
          { label: "Lembaga Pengujian" },
          { label: "Proses Pengujian", href: "/layanan/penguji/proses-pengujian" },
        ]}
      />
      <section><LocalizedText as="h1">Proses Pengujian</LocalizedText></section>
    </>
  );
}
