import { useState } from "react";
import "./Legalitas.css";
import aktePendirian from "../assets/01-Akte-Pendirian.webp";
import nib from "../assets/02-NIB.webp";
import npwp from "../assets/03-NPWP.webp";

const documents = [
  { id: "akte", label: "Akte Pendirian", image: aktePendirian },
  { id: "nib", label: "Nomor Induk Berusaha", image: nib },
  { id: "npwp", label: "NPWP", image: npwp },
];

export default function Legalitas() {
  const [activeId, setActiveId] = useState(documents[0].id);
  const active = documents.find((doc) => doc.id === activeId);

  return (
    <main className="legalitas">
      <h1 className="legalitas__title">Dokumen Legalitas</h1>

      <div className="legalitas__tabs" role="tablist" aria-label="Dokumen legalitas">
        {documents.map((doc) => (
          <button
            key={doc.id}
            id={`tab-${doc.id}`}
            type="button"
            role="tab"
            className="legalitas__tab"
            aria-selected={doc.id === activeId}
            aria-controls="legalitas-panel"
            onClick={() => setActiveId(doc.id)}
          >
            {doc.label}
          </button>
        ))}
      </div>

      <div
        id="legalitas-panel"
        className="legalitas__panel"
        role="tabpanel"
        aria-labelledby={`tab-${active.id}`}
        key={active.id}
      >
        <div
          className={`legalitas__frame${
            active.id === "npwp" ? " legalitas__frame--wide" : ""
          }`}
        >
          {active.image ? (
            <img src={active.image} alt={`Dokumen ${active.label}`} />
          ) : (
            <div className="legalitas__empty">
              Foto {active.label} belum ditambahkan
            </div>
          )}
        </div>
      </div>
    </main>
  );
}