import arief from "../assets/arief.jpg";
import amanda from "../assets/amanda.jpg";
import winda from "../assets/winda.jpg";
import "./Struktur.css";

const leaders = [
  {
    no: "01",
    name: "Arief Prihardono Darmawan",
    role: "Direktur Utama",
    photo: arief,
    duty: "Memimpin arah strategis dan pengembangan bisnis PT Penilai Standar Uji secara berkelanjutan.",
  },
  {
    no: "02",
    name: "Amanda Putri",
    role: "Direktur",
    photo: amanda,
    duty: "Mengelola operasional, keuangan, dan pengembangan organisasi untuk mendukung pencapaian tujuan perusahaan.",
  },
  {
    no: "03",
    name: "Winda Arliny",
    role: "Komisaris",
    photo: winda,
    duty: "Melakukan pengawasan dan memberikan arahan strategis demi memastikan tata kelola perusahaan berjalan dengan baik.",
  },
];

export default function Struktur() {
  return (
    <main className="org">
      <h1 className="org__title">Struktur Kepemimpinan PT Penilai Standar Uji</h1>
      <p className="org__caption"></p>

      <ul className="org__list">
        {leaders.map((leader) => (
          <li className="leader" key={leader.no}>
            <img
              className="leader__photo"
              src={leader.photo}
              alt={`${leader.name}, ${leader.role}`}
            />
            <h2 className="leader__name">
              {leader.no}. {leader.name}
            </h2>
            <p className="leader__role">{leader.role}</p>
            <p className="leader__duty">{leader.duty}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}