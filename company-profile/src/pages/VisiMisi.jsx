import "./VisiMisi.css";

export default function VisiMisi() {
  return (
    <main className="visimisi">
      <h1 className="visimisi__title">Visi dan Misi</h1>

      <section className="visimisi__row">
        <h2 className="visimisi__label">Visi</h2>
        <p className="visimisi__vision">
          Meniadi salah satu perusahaan jasa inspeksi dan sertifikasi standar
          nasional terbaik dan terpercaya di Indonesia dengan pelayanan prima
          dan berkualitas handal. Meniadi salah satu perusahaan jasa inspeksi
          dan sertifikasi standar nasional terbaik dan terpercaya di Indonesia
          dengan pelayanan prima dan berkualitas handal.
        </p>
      </section>

      <section className="visimisi__row">
        <h2 className="visimisi__label">Misi</h2>
        <ul className="visimisi__missions">
          <li>Meningkatkan profesionalisme perusahaan dan karyawan</li>
          <li>Meningkatkan kualitas tenaga kerja dengan keahlian terbaik</li>
          <li>
            Mendorong penciptaan tenaga kerja terampil yang dapat diandalkan
            bagi perusahaan, masyarakat dan negara
          </li>
        </ul>
      </section>
    </main>
  );
}