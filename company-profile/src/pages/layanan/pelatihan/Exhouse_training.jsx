import PageHeader from "../../../components/PageHeader";
import "./Exhouse_training.css";
import LocalizedText from "../../../components/LocalizedText";

export default function ExhouseTraining() {
  return (
    <>
      <PageHeader
        title="Exhouse Training"
        breadcrumbs={[
          { label: "Layanan", href: "/layanan" },
          { label: "Lembaga Pelatihan", href: "/layanan/pelatihan" },
          { label: "Exhouse Training", href: "/layanan/pelatihan/exhouse-training" }
        ]}
      />
      <section className="exhouse-training">
      <LocalizedText as="h1">Exhouse Training</LocalizedText>
      </section>
    </>
  );
}
