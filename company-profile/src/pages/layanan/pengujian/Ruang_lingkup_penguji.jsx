import "../pengujian/Ruang_lingkup_penguji.css";
import LocalizedText from "../../../components/LocalizedText";
import { useLanguage } from "../../../context/useLanguage";
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
  const { t } = useLanguage();

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
                <th>{t("Bidang Pengujian")}</th>
                <th>{t("Bahan atau Produk yang Diuji")}</th>
                <th>{t("Buku SNI")}</th>
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
                        {t(kelompok.bidang)}
                      </td>
                    )}

                    <td className="ruang-lingkup__produk">
                      {t(item.jenis)}
                    </td>

                    <td className="ruang-lingkup__buku">
                      <div className="ruang-lingkup__sni">
                        <span>{item.sni}</span>

                        <a
                          href="#"
                          className="ruang-lingkup__download"
                          aria-label={`${t("Download dokumen")} ${item.sni}`}
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