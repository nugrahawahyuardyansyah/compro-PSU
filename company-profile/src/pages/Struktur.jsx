import arief from "../assets/arief.jpg";
import amanda from "../assets/amanda.jpg";
import winda from "../assets/winda.jpg";
import { useLanguage } from "../context/useLanguage";
import "./Struktur.css";

const leaders = [
  {
    no: "01",
    name: "Arief Prihardono Darmawan",
    role: "Direktur Utama",
    roleEn: "President Director",
    photo: arief,
    duty: "Memimpin arah strategis dan pengembangan bisnis PT Penilai Standar Uji secara berkelanjutan.",
    dutyEn:
      "Leads the strategic direction and sustainable business development of PT Penilai Standar Uji.",
  },
  {
    no: "02",
    name: "Amanda Putri",
    role: "Direktur",
    roleEn: "Director",
    photo: amanda,
    duty: "Mengelola operasional, keuangan, dan pengembangan organisasi untuk mendukung pencapaian tujuan perusahaan.",
    dutyEn:
      "Manages operations, finance, and organizational development to support the company's goals.",
  },
  {
    no: "03",
    name: "Winda Arliny",
    role: "Komisaris",
    roleEn: "Commissioner",
    photo: winda,
    duty: "Melakukan pengawasan dan memberikan arahan strategis demi memastikan tata kelola perusahaan berjalan dengan baik.",
    dutyEn:
      "Provides oversight and strategic guidance to ensure sound corporate governance.",
  },
];

export default function Struktur() {
  const { lang, t } = useLanguage();

  return (
    <main className="org">
      <h1 className="org__title">
        {lang === "en" ? "Leadership Structure" : "Struktur Kepemimpinan"}{" "}
        <br /> PT Penilai Standar Uji
      </h1>
      <p className="org__caption"></p>

      <ul className="org__list">
        {leaders.map((leader) => (
          <li className="leader" key={leader.no}>
            <img
              className="leader__photo"
              src={leader.photo}
              alt={`${leader.name}, ${t(leader.role)}`}
            />
            <h2 className="leader__name">
              {leader.no}. {leader.name}
            </h2>
            <p className="leader__role">
              {lang === "en" ? leader.roleEn : leader.role}
            </p>
            <p className="leader__duty">
              {lang === "en" ? leader.dutyEn : leader.duty}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
