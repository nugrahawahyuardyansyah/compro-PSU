import PageHeader from "../../../components/PageHeader";
import "./Ruang_lingkup_penguji.css";
import LocalizedText from "../../../components/LocalizedText";

export default function Ruanglingkuppenguji() {
  return (
    <>
      <PageHeader
        title="Ruang Lingkup Pengujian"
        breadcrumbs={[
          { label: "Layanan" },
          { label: "Lembaga Pengujian" },
          { label: "Ruang Lingkup", href: "/layanan/penguji/ruang-lingkup" },
        ]}
      />
      <section><LocalizedText as="h1">Ruang Lingkup Pengujian</LocalizedText></section>
    </>
  );
}
