import "./Biaya_penawaran_sertif_sistem.css";
import LocalizedText from "../../../components/LocalizedText";
import { useLanguage } from "../../../context/useLanguage";

const WHATSAPP_NUMBER = "6281908344114";
const WHATSAPP_MESSAGE =
  "Halo, saya ingin berkonsultasi mengenai biaya dan penawaran sertifikasi sistem manajemen. Mohon informasi mengenai standar sertifikasi yang sesuai, persyaratan, tahapan audit, estimasi biaya, dan proses pengajuan untuk perusahaan kami. Terima kasih.";

export default function Biayapenawaransertifsistem() {
  const { t } = useLanguage();
  const whatsappMessage = encodeURIComponent(t(WHATSAPP_MESSAGE));
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div className="management-fees-page">
      <section className="management-fees-intro">
        <LocalizedText as="p">
          Untuk memenuhi kebutuhan sertifikasi sistem manajemen yang beragam,{" "}
          <strong>
            PT Penilai Standar Uji (PSU) menjalin kerja sama dengan lembaga sertifikasi yang telah
            terakreditasi, baik di dalam maupun luar negeri.
          </strong>
        </LocalizedText>
        <LocalizedText as="p">
          Melalui kerja sama ini, PSU membantu perusahaan dan organisasi memperoleh akses terhadap
          layanan sertifikasi sistem manajemen sesuai standar nasional maupun internasional,
          kebutuhan operasional, dan ruang lingkup kegiatan usaha.
        </LocalizedText>
        <LocalizedText as="p">
          <strong>
            Dengan dukungan mitra sertifikasi yang kompeten dan terakreditasi, PSU berkomitmen
            memberikan solusi sertifikasi yang profesional, terpercaya, dan sesuai kebutuhan
            perusahaan Anda.
          </strong>
        </LocalizedText>
      </section>

      <section className="service-detail--biaya-penawaran-sertif-sistem">
        <header className="management-fees__heading">
          <svg
            className="management-fees__heading-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M12 3.5 14.2 5l2.7-.1.7 2.6 2 1.8-1 2.5.5 2.7-2.3 1.5-.9 2.6-2.7-.2L12 20l-2.2-1.6-2.7.2-.9-2.6-2.3-1.5.5-2.7-1-2.5 2-1.8.7-2.6 2.7.1L12 3.5Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path
              d="m9 12 2 2 4-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <LocalizedText as="h1">Biaya dan Penawaran Sertifikasi Sistem Manajemen</LocalizedText>
        </header>

        <LocalizedText as="p" className="management-fees__tagline">
          Tingkatkan Kredibilitas, Kinerja, dan Kepercayaan terhadap Organisasi Anda melalui
          Sertifikasi Sistem Manajemen.
        </LocalizedText>

        <LocalizedText as="p">
          Lembaga Sertifikasi Sistem Manajemen (LSSM) PT Penilai Standar Uji (PSU) menyediakan
          layanan sertifikasi sistem manajemen untuk mendukung organisasi dalam meningkatkan
          efektivitas pengelolaan, konsistensi penerapan standar, serta daya saing di tingkat
          nasional maupun internasional.
        </LocalizedText>

        <LocalizedText as="p">
          Dengan mengutamakan prinsip kompetensi, ketidakberpihakan, independensi, dan
          profesionalisme, LSSM PSU berkomitmen memberikan layanan sertifikasi yang objektif,
          transparan, dan sesuai dengan persyaratan standar serta ketentuan yang berlaku.
        </LocalizedText>

        <LocalizedText as="p">
          <strong>Biaya sertifikasi sistem manajemen</strong> ditentukan berdasarkan jenis standar
          sertifikasi, ruang lingkup kegiatan organisasi, jumlah personel efektif, jumlah lokasi
          operasional, kompleksitas proses, serta kebutuhan waktu audit sesuai dengan ketentuan
          skema sertifikasi yang berlaku.
        </LocalizedText>

        <LocalizedText as="p">
          Untuk memperoleh informasi mengenai persyaratan sertifikasi, tahapan audit, estimasi
          biaya, dan penawaran resmi, silakan menghubungi tim layanan pelanggan LSSM PSU.
        </LocalizedText>

        <aside className="management-fees__consultation">
          <div className="management-fees__consultation-heading">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M7 3.75h8l4 4V19a1.25 1.25 0 0 1-1.25 1.25h-10.5A1.25 1.25 0 0 1 6 19V5a1.25 1.25 0 0 1 1-1.25Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path
                d="M14.5 4v4h4M9 12h6M9 15.5h6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <LocalizedText as="h2">
              Konsultasikan Kebutuhan Sertifikasi Sistem Manajemen Anda
            </LocalizedText>
          </div>

          <LocalizedText as="p">
            Tim kami siap membantu memberikan informasi dan penawaran sertifikasi yang disesuaikan
            dengan kebutuhan, karakteristik, dan ruang lingkup kegiatan organisasi Anda.
          </LocalizedText>

          <a
            className="management-fees__whatsapp-button"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LocalizedText as="span">Ajukan Permintaan Penawaran</LocalizedText>
            <span aria-hidden="true">→</span>
          </a>
        </aside>
      </section>
    </div>
  );
}
