import "./HeaderTop.css";

// Ganti dengan data asli perusahaan
const kontak = {
  email: "psnindonesia.info@gmail.com",
  telepon: "021 - 8602367",
  jam: "Sen - Jum 08.00 - 16.00 WIB",
};

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

// hidden = true saat halaman di-scroll (bar naik ke atas, navbar menempel di puncak)
export default function HeaderTop({ hidden = false }) {
  const tabIndex = hidden ? -1 : undefined;

  return (
    <div className={`header-top ${hidden ? "is-hidden" : ""}`} aria-hidden={hidden}>
      <div className="header-top__inner">
        <a
          className="header-top__item header-top__item--email"
          href={`mailto:${kontak.email}`}
          tabIndex={tabIndex}
        >
          <svg {...iconProps}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
          <span>{kontak.email}</span>
        </a>

        <a
          className="header-top__item header-top__item--phone"
          href={`tel:${kontak.telepon.replace(/[\s-]/g, "")}`}
          tabIndex={tabIndex}
        >
          <svg {...iconProps}>
            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
          </svg>
          <span>{kontak.telepon}</span>
        </a>

        {/* Jam operasional: paling kanan di desktop */}
        <div className="header-top__item header-top__hours">
          <svg {...iconProps}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
          <span>{kontak.jam}</span>
        </div>
      </div>
    </div>
  );
}