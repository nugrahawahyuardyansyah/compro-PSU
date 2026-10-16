import { useState } from "react";
import { useLanguage } from "../context/useLanguage";
import "./LegalitasButtons.css";

const legalitasDocuments = [
  "Sertifikasi Akreditasi",
  "Lampiran Ruang Lingkup",
  "NIB",
];

const defaultNibContent = (
  <figure className="legalitas-document">
    <a
      className="legalitas-document__link"
      href={`${import.meta.env.BASE_URL}NIB.jpeg`}
      target="_blank"
      rel="noreferrer"
      aria-label="Buka gambar NIB ukuran penuh di tab baru"
    >
      <img
        className="legalitas-document__image"
        src={`${import.meta.env.BASE_URL}NIB.jpeg`}
        alt="Dokumen Nomor Induk Berusaha PT PENILAI STANDAR UJI"
      />
    </a>
    <figcaption className="legalitas-document__caption">
      Klik gambar untuk membuka dokumen asli di tab baru.
    </figcaption>
  </figure>
);

export default function LegalitasButtons({ documentContent = {} }) {
  const { t } = useLanguage();
  const [activeDocument, setActiveDocument] = useState(legalitasDocuments[0]);
  const activeContent =
    documentContent[activeDocument] ??
    (activeDocument === "NIB" ? defaultNibContent : null);

  return (
    <>
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
      {activeContent && (
        <div className="legalitas-document-content">
          {activeContent}
        </div>
      )}
    </>
  );
}
