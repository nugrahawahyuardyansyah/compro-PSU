import { useState } from "react";
import { useLanguage } from "../../../context/useLanguage";
import "./Tipe_5.css";

const certificationStages = [
  "Sertifikasi Awal",
  "Surveilan",
  "Perubahan Ruang Lingkup",
];

export default function Tipe5() {
  const { t } = useLanguage();
  const [activeStage, setActiveStage] = useState(certificationStages[0]);

  return (
    <section className="service-detail--tipe-5">
      <h1>{t("Tipe 5")}</h1>
      <div className="tipe-5__buttons" aria-label={t("Tahapan sertifikasi")}>
        {certificationStages.map((stage) => (
          <button
            key={stage}
            type="button"
            className="tipe-5__button"
            aria-pressed={stage === activeStage}
            onClick={() => setActiveStage(stage)}
          >
            {t(stage)}
          </button>
        ))}
      </div>
    </section>
  );
}
