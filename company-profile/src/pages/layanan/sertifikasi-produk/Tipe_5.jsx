import { useState } from "react";
import "./Tipe_5.css";

const certificationStages = [
  "Sertifikasi Awal",
  "Surveilan",
  "Perubahan Ruang Lingkup",
];

export default function Tipe5() {
  const [activeStage, setActiveStage] = useState(certificationStages[0]);

  return (
    <section className="service-detail--tipe-5">
      <h1>Tipe 5</h1>
      <div className="tipe-5__buttons" aria-label="Tahapan sertifikasi">
        {certificationStages.map((stage) => (
          <button
            key={stage}
            type="button"
            className="tipe-5__button"
            aria-pressed={stage === activeStage}
            onClick={() => setActiveStage(stage)}
          >
            {stage}
          </button>
        ))}
      </div>
    </section>
  );
}
