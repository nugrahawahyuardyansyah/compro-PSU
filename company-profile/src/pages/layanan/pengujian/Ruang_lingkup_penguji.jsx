
import "../pengujian/Ruang_lingkup_penguji.css";
import LocalizedText from "../../../components/LocalizedText";
import { FaDownload } from "react-icons/fa";

const dataPengujian = [
  {
    bidang: "Fisika/Kimia",
    items: [
      {
        jenis: "Peralatan masak (Cookware) dari logam",
      },
       {
      jenis: "Peralatan makan dan perlengkapan masak dari baja tahan karat ",
      },
    ],
  },
  {
    bidang:
      "Pertanian, perkebunan, peternakan dan perikanan",
    items: [
     
      {
        jenis: "Pupuk kalsium nitrat",
      
      },
    ],
  },
    {
    bidang: "Fisika/Kimia",
    items: [
      {
        jenis: "Pupuk SP 36",
      },
       {
      jenis: "Pupuk Fosfat Alam Untuk Pertanian ",
      },
      {
        jenis:"Pupuk Kalium Klorida",
      },
      {
        jeni:"Pupuk Tripel Super Fosfat / (TSP)",
      }
    ],
  },
];

export default function Ruanglingkuppenguji() {
  return (
    <section className="ruang-lingkup">
      <div className="ruang-lingkup__header">
        <LocalizedText as="h2">
          Ruang Lingkup Pengujian
        </LocalizedText>
      </div>

      <div className="ruang-lingkup__content">
        <div className="ruang-lingkup__table-wrapper">
          <table className="ruang-lingkup__table">
            <thead>
              <tr>
                <th>Bidang Pengujian</th>
                <th>Bahan atau Produk yang Diuji</th>
                <th>Buku SNI</th>
              </tr>
            </thead>

            <tbody>
              {dataPengujian.map((kelompok) =>
                kelompok.items.map((item, index) => (
                  <tr key={`${kelompok.bidang}-${item.jenis}`}>
                    {index === 0 && (
                      <td
                        rowSpan={kelompok.items.length}
                        className="ruang-lingkup__bidang"
                      >
                        {kelompok.bidang}
                      </td>
                    )}

                    <td className="ruang-lingkup__produk">
                      {item.jenis}
                    </td>

                    <td className="ruang-lingkup__buku">
                      <div className="ruang-lingkup__sni">
                        <span>{item.sni}</span>

                        <a
                          href="#"
                          className="ruang-lingkup__download"
                          aria-label={`Download dokumen ${item.sni}`}
                          title={`Download ${item.sni}`}
                          onClick={(e) => e.preventDefault()}
                        >
                          <FaDownload />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
