import PageHeader from "../../../components/PageHeader";
import "./Legalitas_sertif.css";
import LocalizedText from "../../../components/LocalizedText";
import LegalitasButtons from "../../../components/LegalitasButtons";

const accreditationScope = (
  <figure className="legalitas-document legalitas-document--pdf">
    <iframe
      className="legalitas-document__pdf"
      src={`${import.meta.env.BASE_URL}Lampiran-Akreditasi-LSPro.pdf#toolbar=0&navpanes=0`}
      title="Lampiran ruang lingkup akreditasi LSPr-051-IDN"
    />
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
<<<<<<< HEAD
        <LocalizedText as="h1">Legalitas</LocalizedText>
        <LegalitasButtons
          documentContent={{
            "Sertifikasi Akreditasi": accreditationCertificate,
            "Lampiran Ruang Lingkup": accreditationScope,
            NIB: businessLicense,
          }}
        />
=======
      <LocalizedText as="h1">Legalitas</LocalizedText>
      <LegalitasButtons
        documentContent={{
          "Sertifikasi Akreditasi": accreditationCertificate,
          "Lampiran Ruang Lingkup": accreditationScope,
          NIB: businessLicense,
        }}
      />
>>>>>>> ac303850326a99d5a425b69f26742b269be934ff
      </section>
    </>
  );
}
