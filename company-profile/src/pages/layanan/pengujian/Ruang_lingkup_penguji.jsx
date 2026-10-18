import PageHeader from "../../../components/PageHeader";
import "./Ruang_lingkup_penguji.css";
import { useLanguage } from "../../../context/useLanguage";

const dataPengujian = [
  {
    bidang: "Fisika/Kimia",
    items: [
      {
        jenis: "Peralatan masak (Cookware) dari logam",
      },
      {
        jenis: "Peralatan makan dan perlengkapan masak dari baja tahan karat",
      },
    ],
  },
  {
    bidang: "Pertanian, perkebunan, peternakan dan perikanan",
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
        jenis: "Pupuk Fosfat Alam Untuk Pertanian",
      },
      {
        jenis: "Pupuk Kalium Klorida",
      },
      {
        jenis: "Pupuk Tripel Super Fosfat / (TSP)",
      },
    ],
  },
];

export default function Ruanglingkuppenguji() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        title="Ruang Lingkup Pengujian"
        breadcrumbs={[
          { label: "Layanan" },
          { label: "Lembaga Pengujian" },
          { label: "Ruang Lingkup", href: "/layanan/penguji/ruang-lingkup" },
        ]}
      />
      <main className="service-detail--ruang-lingkup-penguji">
        <div className="ruang-lingkup__table-wrapper">
          <table className="ruang-lingkup__table">
            <thead>
              <tr>
                <th>{t("Bidang Pengujian")}</th>
                <th>{t("Bahan atau Produk yang Diuji")}</th>
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}