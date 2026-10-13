import "./Legalitas_kalibrasi.css";
import LocalizedText from "../../../components/LocalizedText";
import LegalitasButtons from "../../../components/LegalitasButtons";

export default function Legalitaskalibrasi() {
  return (
    <section className="service-detail--legalitas-kalibrasi">
      <LocalizedText as="h1">Legalitas</LocalizedText>
      <LegalitasButtons />
    </section>
  );
}
