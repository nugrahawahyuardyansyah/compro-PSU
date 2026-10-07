import { useState } from "react";
import clientData from "./Clientdata";
import "./Client.css";

const years = Object.keys(clientData).sort();

const columns = [
  { key: "no", label: "No", className: "col-no" },
  { key: "nomor", label: "Nomor Sertifikat Produk", className: "col-md" },
  { key: "perusahaan", label: "Nama Perusahaan / Pabrik", className: "col-lg" },
  { key: "alamatPerusahaan", label: "Alamat Perusahaan", className: "col-xl" },
  { key: "alamatPabrik", label: "Alamat Pabrik", className: "col-xl" },
  { key: "terbit", label: "Tanggal Terbit Sertifikat Produk", className: "col-md" },
  { key: "habis", label: "Tanggal Habis Sertifikat Produk", className: "col-md" },
  { key: "produk", label: "Nama Produk", className: "col-lg" },
  { key: "spesifikasi", label: "Jenis; Spesifikasi; Model", className: "col-lg" },
  { key: "merek", label: "Merek", className: "col-md" },
  { key: "standar", label: "Standar Produk", className: "col-md" },
  { key: "sistem", label: "Sistem Sertifikasi", className: "col-sm" },
  { key: "asal", label: "Keterangan (Dalam Negeri/ Impor)", className: "col-md" },
];

export default function Client() {
  const [year, setYear] = useState(years[years.length - 1]);
  const rows = clientData[year];

  return (
    <main className="client">
      <h1 className="client__title">Client</h1>

      <div className="client__tabs" role="tablist" aria-label="Tahun penerbitan">
        {years.map((y) => (
          <button
            key={y}
            id={`client-tab-${y}`}
            type="button"
            role="tab"
            className="client__tab"
            aria-selected={y === year}
            aria-controls="client-panel"
            onClick={() => setYear(y)}
          >
            {y}
          </button>
        ))}
      </div>

      <section
        id="client-panel"
        className="client__panel"
        role="tabpanel"
        aria-labelledby={`client-tab-${year}`}
        key={year}
      >
        <p className="client__summary">
          Penerbitan SPPT SNI dan/atau Sertifikat Kesesuaian Produk tahun {year}
          <span> · {rows.length} klien</span>
        </p>
        <p className="client__hint">Geser tabel ke samping untuk melihat kolom lainnya</p>

        <div
          className="client__scroll"
          role="region"
          aria-label={`Tabel klien tahun ${year}`}
          tabIndex={0}
        >
          <table className="client__table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key} scope="col" className={col.className}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.no}>
                  {columns.map((col) => (
                    <td key={col.key} className={col.className}>
                      {row[col.key] || "–"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}