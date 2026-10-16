import PageHeader from "../../../components/PageHeader";
import "./Legalitas_sertif.css";
import LocalizedText from "../../../components/LocalizedText";
import LegalitasButtons from "../../../components/LegalitasButtons";

const accreditationScope = (
  <figure className="legalitas-document legalitas-document--pdf">
    <iframe
      className="legalitas-document__pdf"
      src={`${import.meta.env.BASE_URL}Lampiran-Akreditasi-LSPro.pdf`}
      title="Lampiran ruang lingkup akreditasi LSPr-051-IDN"
    />
    <figcaption className="legalitas-document__caption">
      Halaman sertifikat utama telah dihapus.{" "}
      <a
        className="legalitas-document__download"
        href={`${import.meta.env.BASE_URL}Lampiran-Akreditasi-LSPro.pdf`}
        target="_blank"
        rel="noreferrer"
      >
        Buka atau unduh lampiran ruang lingkup
      </a>
    </figcaption>
  </figure>
);

const accreditationCertificate = (
  <figure className="legalitas-document">
    <a
      className="legalitas-document__link"
      href={`${import.meta.env.BASE_URL}Akreditas%20LSPro.jpeg`}
      target="_blank"
      rel="noreferrer"
      aria-label="Buka sertifikat akreditasi ukuran penuh di tab baru"
    >
      <img
        className="legalitas-document__image"
        src={`${import.meta.env.BASE_URL}Akreditas%20LSPro.jpeg`}
        alt="Sertifikat akreditasi LSPr-051-IDN dari Komite Akreditasi Nasional"
      />
    </a>
    <figcaption className="legalitas-document__caption">
      Klik gambar untuk membuka dokumen asli di tab baru.
    </figcaption>
  </figure>
);

const businessLicense = (
  <figure className="legalitas-document">
    <a
      className="legalitas-document__link"
      href={`${import.meta.env.BASE_URL}NIB.jpeg`}
      target="_blank"
      rel="noreferrer"
      aria-label="Buka gambar NIB ukuran penuh di tab baru"
    >
      <img
        className="legalitas-document__image"
        src={`${import.meta.env.BASE_URL}NIB.jpeg`}
        alt="Dokumen Nomor Induk Berusaha PT PENILAI STANDAR UJI"
      />
    </a>
    <figcaption className="legalitas-document__caption">
      Klik gambar untuk membuka dokumen asli di tab baru.
    </figcaption>
  </figure>
);

export default function Legalitassertif() {
  return (
    <>
      <PageHeader
        title="Legalitas"
        breadcrumbs={[
          { label: "Layanan" },
          { label: "Lembaga Sertifikasi Produk" },
          { label: "Legalitas", href: "/layanan/sertif-produk/legalitas" },
        ]}
      />
      <section className="service-detail--legalitas-sertif">
      <LocalizedText as="h1">Legalitas</LocalizedText>
<<<<<<< HEAD
      <LegalitasButtons
        documentContent={{
          "Sertifikasi Akreditasi": accreditationCertificate,
          "Lampiran Ruang Lingkup": accreditationScope,
          NIB: businessLicense,
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
