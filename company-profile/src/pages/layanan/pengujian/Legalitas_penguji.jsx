import PageHeader from "../../../components/PageHeader";
import "./Legalitas_penguji.css";
import LocalizedText from "../../../components/LocalizedText";
import LegalitasButtons from "../../../components/LegalitasButtons";

const testingScopeTables = [
  {
    title:
      "LAMPIRAN SERTIFIKAT AKREDITASI LABORATORIUM NO. LP-1554-IDN - SNI ISO/IEC 17025:2017 (ISO/IEC 17025:2017)",
    headers: [
      "Bidang pengujian",
      "Bahan atau produk yang diuji",
      "Jenis pengujian atau sifat-sifat yang diukur",
      "Metode pengujian, teknik yang digunakan",
      "Keterangan",
    ],
    rows: [
      ["Fisika/Kimia", "Peralatan masak (Cookware) dari logam", "Sifat tampak dan uji", "SNI 8752:2020 butir 6.1.1", ""],
      ["Fisika/Kimia", "Peralatan masak (Cookware) dari logam", "Ketajaman permukaan", "SNI 8752:2020 butir 6.1.2", ""],
      ["Fisika/Kimia", "Peralatan masak (Cookware) dari logam", "Bentuk (Ukuran)", "SNI 8752:2020 butir 6.2", ""],
      ["Fisika/Kimia", "Peralatan masak (Cookware) dari logam", "Ketebalan bahan dasar", "SNI 8752:2020 butir 6.3", ""],
      ["Fisika/Kimia", "Peralatan masak (Cookware) dari logam", "Kekuatan penyambungan (tes fatigue)", "SNI 8752:2020 butir 6.4", ""],
      ["Fisika/Kimia", "Peralatan masak (Cookware) dari logam", "Kapasitas volume air", "SNI 8752:2020 butir 6.5", ""],
      ["Fisika/Kimia", "Peralatan masak (Cookware) dari logam", "Kelekatan Lapisan Anti Lengket", "SNI 8752:2020 butir 6.6", ""],
      ["Fisika/Kimia", "Peralatan masak (Cookware) dari logam", "Ketahanan lapisan terhadap kejut panas (Thermal Shock)", "SNI 8752:2020 butir 6.7", ""],
      ["Fisika/Kimia", "Peralatan masak (Cookware) dari logam", "Ketebalan Lapisan", "SNI 8752:2020 butir 6.8", ""],
      ["Fisika/Kimia", "Peralatan masak (Cookware) dari logam", "Kestabilan Produk", "SNI 8752:2020 butir 6.10", ""],
      ["Fisika/Kimia", "Peralatan masak (Cookware) dari logam", "Ketahanan terhadap asam", "SNI 8752:2020 butir 6.9", ""],
      ["Fisika/Kimia", "Peralatan makan dan perlengkapan masak dari baja tahan karat (stainless steel flatware)", "Sifat tampak dan uji ketajaman permukaan", "SNI 8753:2020 butir 8.1", ""],
      ["Fisika/Kimia", "Peralatan makan dan perlengkapan masak dari baja tahan karat (stainless steel flatware)", "Ketebalan", "SNI 8753:2020 butir 8,2", ""],
      ["Fisika/Kimia", "Peralatan makan dan perlengkapan masak dari baja tahan karat (stainless steel flatware)", "Ukuran Panjang", "SNI 8753:2020 butir 8.3", ""],
      ["Fisika/Kimia", "Peralatan makan dan perlengkapan masak dari baja tahan karat (stainless steel flatware)", "Kapasitas Volume", "SNI 8753:2020 butir 8.4", ""],
      ["Fisika/Kimia", "Peralatan makan dan perlengkapan masak dari baja tahan karat (stainless steel flatware)", "Ketahanan terhadap pembebanan", "SNI 8753:2020 butir 8.6", ""],
    ],
  },
  {
    title:
      "SUPLEMEN LAMPIRAN SERTIFIKAT AKREDITASI LABORATORIUM NO. LP-1554-IDN - SNI ISO/IEC 17025:2017 (ISO/IEC 17025:2017)",
    headers: [
      "Bidang pengujian",
      "Bahan atau produk yang diuji",
      "Jenis pengujian atau sifat-sifat yang diukur",
      "Metode pengujian, teknik yang digunakan",
      "Keterangan",
    ],
    rows: [
      ["Kimia/Fisika", "Pupuk SP 36", "Kadar unsur hara Fosfor sebagai P2O5: 1. P2O5 total", "AOAC Ed 20 Tahun 2016 butir 2.3.01 dan butir 2.3.02", ""],
      ["Kimia/Fisika", "Pupuk SP 36", "Kadar unsur hara Fosfor sebagai P2O5: 2. P2O5 larut dalam asam sitrat 2%", "SNI 02-3769-2005 butir 6.1.2", ""],
      ["Kimia/Fisika", "Pupuk SP 36", "Kadar unsur hara Fosfor sebagai P2O5: 3. P2O5 larut dalam air", "AOAC Ed 20 Tahun 2016 butir 2.3.06 dan butir 2.3.09", ""],
      ["Kimia/Fisika", "Pupuk SP 36", "Kadar belerang (sebagai S)", "IKM-Lab-PSN-01 (Spektrofotometri)", ""],
      ["Kimia/Fisika", "Pupuk SP 36", "Kadar Asam Bebas sebagai H3PO4", "SNI 02-3769-2005 butir 6.3", ""],
      ["Kimia/Fisika", "Pupuk SP 36", "Kadar Air", "AOAC Ed 20 Tahun 2016 butir 2.2.01", ""],
      ["Kimia/Fisika", "Pupuk Fosfat Alam Untuk Pertanian", "Kadar unsur hara Fosfor sebagai P2O5: 1. P2O5 total", "AOAC Ed 20 Tahun 2016 butir 2.3.01 dan butir 2.3.02", ""],
      ["Kimia/Fisika", "Pupuk Fosfat Alam Untuk Pertanian", "Kadar unsur hara Fosfor sebagai P2O5: 2. P2O5 larut dalam asam sitrat 2%", "SNI 02-3776-2005 butir 6.1.2", ""],
      ["Kimia/Fisika", "Pupuk Fosfat Alam Untuk Pertanian", "Kadar air", "AOAC Ed 20 Tahun 2016 butir 2.2.01", ""],
      ["Kimia/Fisika", "Pupuk Fosfat Alam Untuk Pertanian", "Kehalusan: 1. Kehalusan Lolos 80 Mesh Tyler", "SNI 02-3776-2005 butir 6.3", ""],
      ["Kimia/Fisika", "Pupuk Fosfat Alam Untuk Pertanian", "Kehalusan: 2. Kehalusan Lolos 25 Mesh Tyler", "SNI 02-3776-2005 butir 6.3", ""],
      ["Kimia/Fisika", "Pupuk Fosfat Alam Untuk Pertanian", "Cemaran Logam: 1. Cadmium (Cd)", "SNI 02-3776-2005 butir 6.4.1", ""],
      ["Kimia/Fisika", "Pupuk Fosfat Alam Untuk Pertanian", "Cemaran Logam: 2. Timbal (Pb)", "SNI 02-3776-2005 butir 6.4.2", ""],
      ["Kimia/Fisika", "Pupuk Kalium Klorida", "Kadar Kalium sebagai K2O", "AOAC Ed 20 Tahun 2016 butir 2.5.07", ""],
      ["Kimia/Fisika", "Pupuk Kalium Klorida", "Kadar Air", "AOAC Ed 20 Tahun 2016 butir 2.2.01", ""],
      ["Kimia/Fisika", "Pupuk Triple Super Fosfat / TSP", "Kadar unsur hara Fosfor sebagai P2O5: 1. P2O5 total", "AOAC Ed 20 Tahun 2016 butir 2.3.01 dan butir 2.3.02", ""],
      ["Kimia/Fisika", "Pupuk Triple Super Fosfat / TSP", "Kadar unsur hara Fosfor sebagai P2O5: 2. P2O5 larut dalam asam sitrat 2%", "SNI 02-0086-2005 butir 6.1.2", ""],
      ["Kimia/Fisika", "Pupuk Triple Super Fosfat / TSP", "Kadar unsur hara Fosfor sebagai P2O5: 3. P2O5 larut dalam air", "AOAC Ed 20 Tahun 2016 butir 2.3.06 dan butir 2.3.09", ""],
      ["Kimia/Fisika", "Pupuk Triple Super Fosfat / TSP", "Kadar Asam Bebas sebagai H3PO4", "SNI 02-0086-2005 butir 6.2", ""],
      ["Kimia/Fisika", "Pupuk Triple Super Fosfat / TSP", "Kadar Air", "AOAC Ed 20 Tahun 2016 butir 2.2.01", ""],
    ],
  },
  {
    title:
      "SUPLEMEN LAMPIRAN SERTIFIKAT AKREDITASI LABORATORIUM NO. LP-1554-IDN - SNI ISO/IEC 17025:2017 (ISO/IEC 17025:2017)",
    headers: [
      "Bidang pengujian",
      "Bahan atau produk yang diuji",
      "Jenis pengujian atau sifat-sifat yang diukur",
      "Metode pengujian, teknik yang digunakan",
      "Keterangan",
    ],
    rows: [
      ["Kimia/Fisika", "Pupuk Triple Super Fosfat / TSP", "Cemaran Logam: 1. Cadmium (Cd)", "SNI 02-0086-2005 butir 6.4.1", ""],
      ["Kimia/Fisika", "Pupuk Triple Super Fosfat / TSP", "Cemaran Logam: 2. Timbal (Pb)", "SNI 02-0086-2005 butir 6.4.2", ""],
      ["Kimia", "Pupuk NPK Padat", "Nitrogen Total", "SNI 2803:2012 butir 6.2", ""],
      ["Kimia", "Pupuk NPK Padat", "Fosfor total sebagai P2O5", "SNI 2803:2012 butir 6.3", ""],
      ["Kimia", "Pupuk NPK Padat", "Kadar Kalium sebagai K2O", "SNI 2803:2012 butir 6.4.1", ""],
      ["Kimia", "Pupuk NPK Padat", "Jumlah Kadar N, P2O5, K2O", "SNI 2803:2012", ""],
      ["Kimia", "Pupuk NPK Padat", "Cemaran Logam: 1. Cadmium (Cd)", "SNI 2803:2012 butir 6.6.2", ""],
      ["Kimia", "Pupuk NPK Padat", "Cemaran Logam: 2. Timbal (Pb)", "SNI 2803:2012 butir 6.6.3", ""],
      ["Kimia", "Pupuk Amonium Sulfat / ZA", "Kadar Nitrogen", "ISO 3332 Ed 1 1975-07-15", ""],
      ["Kimia", "Pupuk Amonium Sulfat / ZA", "Kadar belerang sebagai S", "SNI 02-1760-2005 butir 6.2.2", ""],
      ["Kimia", "Pupuk Amonium Sulfat / ZA", "Asam bebas sebagai H2SO4", "ISO 2993 Ed 1 1974-04-01", ""],
      ["Kimia", "Pupuk Amonium Sulfat / ZA", "Kadar air", "AOAC Ed 20 Tahun 2016 butir 2.2.01", ""],
      ["Kimia", "Pupuk Urea", "Kadar Nitrogen", "SNI 2801:2010 butir 6.1.1", ""],
      ["Kimia", "Pupuk Urea", "Ukuran: a. 1,00 mm - 3,35 mm", "SNI 2801:2010 butir 6.4", ""],
      ["Kimia", "Pupuk Urea", "Ukuran: b. 2,00 mm - 4,75 mm", "SNI 2801:2010 butir 6.4", ""],
    ],
  },
  {
    title: "Pemutakhiran Ruang Lingkup Akreditasi",
    showScopeHeading: false,
    mergeColumns: [0, 3],
    headers: [
      "Bahan atau Produk yang Diuji",
      "Jenis Pengujian atau Sifat-Sifat yang Diukur",
      "Metode Pengujian, Teknik yang Digunakan (Termutakhir)",
      "Keterangan Revisi",
    ],
    rows: [
      [
        "Pupuk NPK Padat",
        "Nitrogen Total",
        "SNI 2803:2024 butir 6.2.1",
        "Update metode pengujian sesuai dengan rekomendasi ruang lingkup asesor dan surat laboratorium nomor 0657/SK/IV/2025",
      ],
      [
        "Pupuk NPK Padat",
        "Fosfor Total sebagai P2O5",
        "SNI 2803:2024 butir 6.3.1",
        "Update metode pengujian sesuai dengan rekomendasi ruang lingkup asesor dan surat laboratorium nomor 0657/SK/IV/2025",
      ],
      [
        "Pupuk NPK Padat",
        "Kadar Kalium sebagai K2O",
        "SNI 2803:2024 butir 6.4.1",
        "Update metode pengujian sesuai dengan rekomendasi ruang lingkup asesor dan surat laboratorium nomor 0657/SK/IV/2025",
      ],
      [
        "Pupuk NPK Padat",
        "Jumlah Kadar N, P2O5, K2O",
        "SNI 2803:2024",
        "Update metode pengujian sesuai dengan rekomendasi ruang lingkup asesor dan surat laboratorium nomor 0657/SK/IV/2025",
      ],
      [
        "Pupuk NPK Padat",
        "Cemaran Logam: 1. Cadmium (Cd)",
        "SNI 2803:2024 butir 6.6.2",
        "Update metode pengujian sesuai dengan rekomendasi ruang lingkup asesor dan surat laboratorium nomor 0657/SK/IV/2025",
      ],
      [
        "Pupuk NPK Padat",
        "Cemaran Logam: 2. Timbal (Pb)",
        "SNI 2803:2024 butir 6.6.3",
        "Update metode pengujian sesuai dengan rekomendasi ruang lingkup asesor dan surat laboratorium nomor 0657/SK/IV/2025",
      ],
    ],
  },
  {
    title:
      "SUPLEMEN LAMPIRAN SERTIFIKAT AKREDITASI LABORATORIUM PENGUJIAN NO. LP-1554-IDN - SNI ISO/IEC 17025:2017 (ISO/IEC 17025:2017)",
    headers: [
      "Bidang pengujian",
      "Bahan atau produk yang diuji",
      "Jenis pengujian atau sifat-sifat yang diukur",
      "Metode pengujian, teknik yang digunakan",
      "Keterangan",
    ],
    rows: [
      ["Kimia", "Pupuk NPK Padat", "Kadar Air", "SNI 2803:2024\nSNI 2803:2012", ""],
      ["Kimia", "Pupuk Urea", "Kadar Air", "SNI 2801:2010", ""],
      ["Kimia", "Pupuk Urea", "Kadar Biuret", "", ""],
    ],
  },
];

function getMergedCellRowSpan(rows, rowIndex, cellIndex) {
  const value = rows[rowIndex][cellIndex];
  let rowSpan = 1;

  while (
    rowIndex + rowSpan < rows.length &&
    rows[rowIndex + rowSpan][cellIndex] === value
  ) {
    rowSpan += 1;
  }

  return rowSpan;
}

const chemicalFormulaPattern = /(P2O5|K2O|H3PO4|H2SO4)/g;
const chemicalFormulas = {
  P2O5: <>P<sub>2</sub>O<sub>5</sub></>,
  K2O: <>K<sub>2</sub>O</>,
  H3PO4: <>H<sub>3</sub>PO<sub>4</sub></>,
  H2SO4: <>H<sub>2</sub>SO<sub>4</sub></>,
};

function renderTableCellContent(text) {
  const lines = text.split("\n");

  return lines.map((line, lineIndex) => (
    <span key={`line-${lineIndex}`}>
      {line.split(chemicalFormulaPattern).map((part, partIndex) =>
        chemicalFormulas[part] ? (
          <span key={`formula-${partIndex}`}>{chemicalFormulas[part]}</span>
        ) : (
          part
        ),
      )}
      {lineIndex < lines.length - 1 && <br />}
    </span>
  ));
}

const testingScopeContent = (
  <div className="testing-scope">
    {testingScopeTables.map(
      (
        {
          title,
          headers,
          rows,
          showScopeHeading = true,
          mergeColumns = [0, 1],
        },
        tableIndex,
      ) => (
        <section
          className={`testing-scope__section${showScopeHeading ? "" : " testing-scope__section--no-heading"}`}
          key={`${title}-${tableIndex}`}
        >
          <h2 className="testing-scope__title">{title}</h2>
          {showScopeHeading && (
            <h3 className="testing-scope__heading">Lingkup Akreditasi</h3>
          )}
          <div
            className="testing-scope__table-wrap"
            tabIndex="0"
            aria-label={`Tabel ${title}`}
          >
            <table className="testing-scope__table">
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th scope="col" key={header}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={`${title}-${rowIndex}`}>
                    {row.map((cell, cellIndex) => {
                      const isMergedColumn = mergeColumns.includes(cellIndex);
                      const continuesPreviousRow =
                        isMergedColumn &&
                        rowIndex > 0 &&
                        cell === rows[rowIndex - 1][cellIndex];

                      if (continuesPreviousRow) {
                        return null;
                      }

                      return (
                        <td
                          key={`${title}-${rowIndex}-${cellIndex}`}
                          rowSpan={
                            isMergedColumn
                              ? getMergedCellRowSpan(rows, rowIndex, cellIndex)
                              : 1
                          }
                        >
                          {renderTableCellContent(cell)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ),
    )}
  </div>
);

export default function Legalitaspenguji() {
  return (
    <>
      <PageHeader
        title="Legalitas"
        breadcrumbs={[
          { label: "Layanan" },
          { label: "Lembaga Pengujian" },
          { label: "Legalitas", href: "/layanan/penguji/legalitas" },
        ]}
      />
      <section className="service-detail--legalitas-penguji">
      <LocalizedText as="h1">Legalitas</LocalizedText>
<<<<<<< HEAD
      <LegalitasButtons
        documentContent={{
          "Sertifikasi Akreditasi": (
            <figure className="legalitas-document">
              <a
                className="legalitas-document__link"
                href={`${import.meta.env.BASE_URL}Akreditas%20Pengujian.jpeg`}
                target="_blank"
                rel="noreferrer"
                aria-label="Buka sertifikat akreditasi laboratorium penguji ukuran penuh di tab baru"
              >
                <img
                  className="legalitas-document__image"
                  src={`${import.meta.env.BASE_URL}Akreditas%20Pengujian.jpeg`}
                  alt="Sertifikat akreditasi Laboratorium Penguji LP-1554-IDN"
                />
              </a>
              <figcaption className="legalitas-document__caption">
                Klik gambar untuk membuka dokumen asli di tab baru.
              </figcaption>
            </figure>
          ),
          "Lampiran Ruang Lingkup": testingScopeContent,
        }}
      />
    </section>
=======
      <LegalitasButtons />
      </section>
    </>
>>>>>>> 95c60f8348182c20096ca0edbffd0408c40a40fc
  );
}
