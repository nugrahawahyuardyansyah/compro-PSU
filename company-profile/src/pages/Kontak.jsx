import PageHeader from "../components/PageHeader";
import "./Kontak.css";
import { useLanguage } from "../context/useLanguage";

const MAPS_LINK =
  "https://maps.app.goo.gl/KAX2Pn4DxSPA5aiG6";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const PinIcon = () => (
  <svg {...iconProps}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const MailIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 7l8.5 6 8.5-6" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg {...iconProps}>
    <path d="M4 20l1.3-4.2A8 8 0 1 1 8.3 18.8L4 20z" />
    <path d="M9.2 8.8c.2 2.4 2.8 5 5.8 5.8l1.2-1.4-2-1-.9.8c-.9-.4-1.7-1.2-2.1-2.1l.8-.9-1-2-1.8.8z" />
  </svg>
);

const PhoneIcon = () => (
  <svg {...iconProps}>
    <path d="M6.5 4h3l1.5 4-2 1.3a11 11 0 0 0 5.7 5.7l1.3-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 4.5 6a2 2 0 0 1 2-2z" />
  </svg>
);

const InstagramIcon = () => (
  <svg {...iconProps}>
    <rect x="4" y="4" width="16" height="16" rx="4.5" />
    <circle cx="12" cy="12" r="3.5" />
    <circle cx="16.8" cy="7.2" r="0.6" fill="currentColor" />
  </svg>
);

const ClockIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

const QualityIcon = () => (
  <svg {...iconProps}>
    <path d="M12 3.5 19 6v5.2c0 4.3-2.8 7.4-7 9.3-4.2-1.9-7-5-7-9.3V6l7-2.5z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const SupportIcon = () => (
  <svg {...iconProps}>
    <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
    <path d="M4 13h3v6H6a2 2 0 0 1-2-2v-4zm16 0h-3v6h1a2 2 0 0 0 2-2v-4z" />
    <path d="M17 19c-.8 1.2-2.4 2-5 2" />
  </svg>
);

function ContactItem({ icon, label, children }) {
  const { t } = useLanguage();

  return (
    <li className="contact-item">
      <span className="contact-item__icon">{icon}</span>
      <div className="contact-item__body">
        <h4>{t(label)}</h4>
        {children}
      </div>
    </li>
  );
}

const contactHighlights = [
  {
    icon: <ClockIcon />,
    title: "Respons Terarah",
    description: "Kami siap membantu kebutuhan Anda",
  },
  {
    icon: <QualityIcon />,
    title: "Tim Kompeten",
    description: "Dukungan profesional dan informatif",
  },
  {
    icon: <SupportIcon />,
    title: "Informasi Terjaga",
    description: "Komunikasi ditangani dengan baik",
  },
];

export default function Kontak() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        title="Kontak"
        breadcrumbs={[
          { label: "Kontak", href: "/kontak" },
        ]}
      />
      <section className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <div className="contact-header__content">
            <span className="contact-header__eyebrow">
              {t("PT Penilai Standar Uji")}
            </span>
            <h2>{t("Mari Terhubung dengan PSU")}</h2>
            <p>
              {t(
                "Tim kami siap membantu kebutuhan pengujian, sertifikasi, dan informasi layanan Anda."
              )}
            </p>
          </div>
          <ul className="contact-header__highlights">
            {contactHighlights.map(({ icon, title, description }) => (
              <li key={title}>
                <span className="contact-header__highlight-icon">{icon}</span>
                <span className="contact-header__highlight-copy">
                  <strong>{t(title)}</strong>
                  <small>{t(description)}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="contact-card">
          <div className="contact-card__title">
            <PinIcon />
            <span>{t("PT PENILAI STANDAR UJI | Lembaga Penilaian Kesesuaian (LPK)")}</span>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <ul className="contact-list">
                <ContactItem icon={<PinIcon />} label="Alamat">
                  <p>
                    Jalan Cipinang Muara 1 No. 21 RT.006 / RW.03, Kel. Pondok
                    Bambu, Kec. Duren Sawit, Jakarta Timur – 13430
                  </p>
                </ContactItem>

                <ContactItem icon={<MailIcon />} label="Email">
                  <p>
                    <a href="mailto:psuindonesia.info@gmail.com">
                      psuindonesia.info@gmail.com
                    </a>
                  </p>
                </ContactItem>

                <ContactItem icon={<WhatsAppIcon />} label="WhatsApp">
                  <p>
                    <a
                      href="https://wa.me/6281908344114"
                      target="_blank"
                      rel="noreferrer"
                    >
                      +62 819-0834-4114
                    </a>
                  </p>
                </ContactItem>

                <ContactItem icon={<PhoneIcon />} label="Telepon">
                  <p>
                    <a href="tel:0218602367">021 – 8602367</a>
                  </p>
                </ContactItem>

                <ContactItem icon={<InstagramIcon />} label="Instagram">
                  <p>
                    <a
                      href="https://www.instagram.com/penilaistandar.nasional"
                      target="_blank"
                      rel="noreferrer"
                    >
                      @penilaistandarnasional
                    </a>
                  </p>
                </ContactItem>

                <ContactItem icon={<ClockIcon />} label="Jam Kerja">
                  <p>
                    {t("Senin – Jumat")}
                    <br />
                    08.00 – 16.00 WIB
                  </p>
                </ContactItem>
              </ul>

              <a
                className="contact-maps-button"
                href={MAPS_LINK}
                target="_blank"
                rel="noreferrer"
              >
                <PinIcon />
                <span>{t("Buka di Google Maps")}</span>
              </a>
            </div>

            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2658698346027!2d106.89303129999999!3d-6.228636600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f343bb14576b%3A0x475a1b2302f2980d!2sPT.%20Penilai%20Standar%20Nasional%20(PSN)!5e0!3m2!1sid!2sid!4v1791116230106!5m2!1sid!2sid"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t("Lokasi PT PENILAI STANDAR UJI")}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}