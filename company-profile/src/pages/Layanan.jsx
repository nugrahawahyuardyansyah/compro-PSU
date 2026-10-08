import { Link } from "react-router-dom";
import { services } from "./services";
import "./Layanan.css";

export default function Layanan() {
  return (
    <main className="layanan">
      <header className="layanan__header">
        <h1 className="layanan__title">Layanan PT. Penilai Standar Uji</h1>
        <p className="layanan__intro">
          Pilih layanan yang Anda butuhkan dan tingkatkan kredibilitas bisnis
          bersama PT. Penilai Standar Uji.
        </p>
      </header>

      <ul className="layanan__list">
        {services.map((service, index) => (
          <li className="layanan__card" key={service.id}>
            <span className="layanan__no">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="layanan__card-title">{service.title}</h2>
            <p className="layanan__card-text">{service.description}</p>
            <Link
              className="layanan__link"
              to={service.path}
              aria-label={`Kunjungi halaman ${service.title}`}
            >
              Kunjungi Halaman ›
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}