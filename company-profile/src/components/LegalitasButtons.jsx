import { useState } from "react";
import { useLanguage } from "../context/useLanguage";
import "./LegalitasButtons.css";

const legalitasDocuments = [
  "Sertifikasi Akreditasi",
  "Lampiran Ruang Lingkup",
  "NIB",
];

export default function LegalitasButtons() {
  const { t } = useLanguage();
  const [activeDocument, setActiveDocument] = useState(legalitasDocuments[0]);

  return (
    <div className="legalitas-buttons" aria-label={t("Dokumen legalitas")}>
      {legalitasDocuments.map((document) => (
        <button
          key={document}
          type="button"
          className="legalitas-button"
          aria-pressed={document === activeDocument}
          onClick={() => setActiveDocument(document)}
        >
          {t(document)}
        </button>
      ))}
    </div>
  );
}
