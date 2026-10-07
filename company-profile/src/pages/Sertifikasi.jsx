import { useState } from "react";
import "./Sertifikasi.css";
import type1B from "../assets/Type-1B.jpg";

const documents = [
  { id: "type-1b", label: "Type 1B", image: type1B },
  { id: "type-5", label: "Type 5", image: type1B },
];

export default function Sertifikasi() {
  const [activeId, setActiveId] = useState(documents[0].id);
  const active = documents.find((doc) => doc.id === activeId);

  return (
    <main className="sertifikasi">
      <h1 className="sertifikasi__title">Sertifikasi</h1>

      <div className="sertifikasi__tabs" role="tablist" aria-label="Sertifikasi">
        {documents.map((doc) => (
          <button
            key={doc.id}
            id={`tab-${doc.id}`}
            type="button"
            role="tab"
            className="sertifikasi__tab"
            aria-selected={doc.id === activeId}
            aria-controls="sertifikasi-panel"
            onClick={() => setActiveId(doc.id)}
          >
            {doc.label}
          </button>
        ))}
      </div>

      <div
        id="sertifikasi-panel"
        className="sertifikasi__panel"
        role="tabpanel"
        aria-labelledby={`tab-${active.id}`}
        key={active.id}
      >
        <div className="sertifikasi__frame">
          {active.image ? (
            <img src={active.image} alt={`Dokumen ${active.label}`} />
          ) : (
            <div className="sertifikasi__empty">
              Foto {active.label} belum ditambahkan
            </div>
          )}
        </div>
      </div>
    </main>
  );
}