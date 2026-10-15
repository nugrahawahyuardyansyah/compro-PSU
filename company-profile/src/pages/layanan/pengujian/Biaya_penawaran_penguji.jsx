import PageHeader from "../../../components/PageHeader";
import "./Biaya_penawaran_penguji.css";
import LocalizedText from "../../../components/LocalizedText";

export default function Biayapenawaranpenguji() {
  return (
    <>
      <PageHeader
        title="Biaya dan Penawaran Pengujian"
        breadcrumbs={[
          { label: "Layanan", href: "/layanan" },
          { label: "Lembaga Pengujian", href: "/layanan/penguji" },
          { label: "Biaya dan Penawaran Pengujian", href: "/layanan/penguji/biaya-sertif" }
        ]}
      />
      <section><LocalizedText as="h1">Biaya dan Penawaran Pengujian</LocalizedText></section>
    </>
  );
}
