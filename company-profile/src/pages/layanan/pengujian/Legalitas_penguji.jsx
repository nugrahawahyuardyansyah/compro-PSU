import "./Legalitas_penguji.css";
import LocalizedText from "../../../components/LocalizedText";
import LegalitasButtons from "../../../components/LegalitasButtons";

export default function Legalitaspenguji() {
  return (
    <section className="service-detail--legalitas-penguji">
      <LocalizedText as="h1">Legalitas</LocalizedText>
      <LegalitasButtons />
    </section>
  );
}
