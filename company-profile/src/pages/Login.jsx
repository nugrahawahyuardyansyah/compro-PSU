import PageHeader from "../components/PageHeader";
import LocalizedText from "../components/LocalizedText";

export default function Login() {
  return (
    <>
      <PageHeader
        title="Login"
        breadcrumbs={[
          { label: "Login", href: "/login" },
        ]}
      />
      <section style={{ maxWidth: "1180px", margin: "0 auto", padding: "48px 24px" }}>
        <LocalizedText as="h2">Login</LocalizedText>
      </section>
    </>
  );
}
