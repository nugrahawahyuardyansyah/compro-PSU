import PageHeader from "../../../components/PageHeader";
import "./Legalitas_penguji.css";
import LocalizedText from "../../../components/LocalizedText";
import LegalitasButtons from "../../../components/LegalitasButtons";

const testingScopeContent = (
  <figure className="testing-scope">
    <iframe
      className="testing-scope__pdf"
      src={`${import.meta.env.BASE_URL}Lampiran-Akreditasi-Pengujian.pdf#toolbar=0&navpanes=0`}
      title="Lampiran ruang lingkup akreditasi Laboratorium Pengujian LP-1554-IDN"
    />
  </figure>
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
    </>
  );
}
