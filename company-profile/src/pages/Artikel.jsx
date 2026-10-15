import PageHeader from "../components/PageHeader";
import LocalizedText from "../components/LocalizedText";

export default function Artikel() {
  return (
    <>
      <PageHeader
        title="Artikel"
        breadcrumbs={[
          { label: "Artikel", href: "/artikel" },
        ]}
      />
      <section style={{ maxWidth: "1180px", margin: "0 auto", padding: "48px 24px" }}>
        <LocalizedText as="h2">Artikel</LocalizedText>
      </section>
    </>
  );
}
