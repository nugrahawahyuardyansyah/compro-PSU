import "../sertifikasi-produk/Ruang_lingkup_sertif.css";
import LocalizedText from "../../../components/LocalizedText";
import { useLanguage } from "../../../context/useLanguage";
import { FaDownload } from "react-icons/fa";

const dataPengujian = [
  {
    no: 1,
    bidang: "Pertanian, perkebunan, peternakan dan perikanan",
    jenis: "Pupuk super fosfat SP-36",
    sni: "SNI 02-3769-2005",
  },
  {
    no: 2,
    bidang: "Pertanian, perkebunan, peternakan dan perikanan",
    jenis: "Pupuk fosfat alam untuk pertanian",
    sni: "SNI 02-3776-2005",
  },
  {
    no: 3,
    bidang: "Pertanian, perkebunan, peternakan dan perikanan",
    jenis: "Pupuk kalium klorida",
    sni: "SNI 02-2805-2005",
  },
  {
    no: 4,
    bidang: "Pertanian, perkebunan, peternakan dan perikanan",
    jenis: "Pupuk tripel super fosfat (TSP)",
    sni: "SNI 02-0086-2005",
  },
  {
    no: 5,
    bidang: "Pertanian, perkebunan, peternakan dan perikanan",
    jenis: "Pupuk NPK padat",
    sni: "SNI 2803:2012",
  },
  {
    no: 6,
    bidang: "Pertanian, perkebunan, peternakan dan perikanan",
    jenis: "Pupuk amonium sulfat (ZA)",
    sni: "SNI 02-1760-2005",
  },
  {
    no: 7,
    bidang: "Pertanian, perkebunan, peternakan dan perikanan",
    jenis: "Pupuk urea",
    sni: "SNI 2801:2010",
  },
  {
    no: 8,
    bidang: "Pertanian, perkebunan, peternakan dan perikanan",
    jenis: "Pupuk mono amonium fosfat (MAP)",
    sni: "SNI 02-2810-2005",
  },
  {
    no: 9,
    bidang: "Pertanian, perkebunan, peternakan dan perikanan",
    jenis: "Pupuk diamonium fosfat",
    sni: "SNI 02-2855-2005",
  },
  {
    no: 10,
    bidang: "Pertanian, perkebunan, peternakan dan perikanan",
    jenis: "Pupuk urea amonium fosfat",
    sni: "SNI 02-2811-2005",
  },
  {
    no: 11,
    bidang: "Pertanian, perkebunan, peternakan dan perikanan",
    jenis: "Pupuk tripel super fosfat plus zinc",
    sni: "SNI 02-2800-2005",
  },
  {
    no: 12,
    bidang: "Pertanian, perkebunan, peternakan dan perikanan",
    jenis: "Pupuk super fosfat plus zinc",
    sni: "SNI 02-4873-1998",
  },
  {
    no: 13,
    bidang: "Pertanian, perkebunan, peternakan dan perikanan",
    jenis: "Pupuk super fosfat tunggal",
    sni: "SNI 6246:2010",
  },
  {
    no: 14,
    bidang: "Pertanian, perkebunan, peternakan dan perikanan",
    jenis: "Pupuk dolomit",
    sni: "SNI 02-2804-2005",
  },
  {
    no: 15,
    bidang: "Pertanian, perkebunan, peternakan dan perikanan",
    jenis: "Pupuk borat",
    sni: "SNI 02-4599-1999",
  },
];

export default function Ruanglingkuppenguji() {
  const { t } = useLanguage();

  return (
    <section className="ruang-lingkup">
      <div className="ruang-lingkup__header">
        <LocalizedText as="h1">
          Ruang Lingkup Pengujian
        </LocalizedText>
      </div>

      <div className="ruang-lingkup__content">
        <div className="ruang-lingkup__table-wrapper">
          <table className="ruang-lingkup__table">
            <thead>
              <tr>
                <th>No</th>
                <th>{t("Bidang Pengujian")}</th>
                <th>{t("Jenis Pengujian")}</th>
                <th>{t("Buku SNI")}</th>
              </tr>
            </thead>

            <tbody>
              {dataPengujian.map((item) => (
                <tr key={item.no}>
                  <td className="ruang-lingkup__no">
                    {item.no}
                  </td>

                  <td>{t(item.bidang)}</td>
                  <td>{t(item.jenis)}</td>

                  <td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
