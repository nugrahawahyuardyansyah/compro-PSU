import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/useLanguage";
import "./footer.css";

const kontak = {
  alamat: "Jalan Cipinang Muara 1 No. 21 RT.006 / RW.03, Kel. Pondok Bambu, Kec. Duren Sawit, Jakarta Timur - 13430",
  email: "psuindonesia.info@gmail.com",
  telepon: "021 - 8602367",
  whatsapp: "+6281908344114",
};

const LEBAR_HALAMAN = 1474;
const LEBAR_ISI = 1474;

const BATAS_MOBILE = 860;

function useIsMobile(breakpoint) {
  const query = `(max-width: ${breakpoint}px)`;
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return isMobile;
}

const titleStyle = {
  margin: "0 0 14px",
  fontSize: 15,
  fontWeight: 600,
  color: "#14233b",
};

const addressStyle = {
  fontStyle: "normal",
  color: "#14233b",
};

export default function Footer() {
  const { t } = useLanguage();
  const isMobile = useIsMobile(BATAS_MOBILE);

  const wrapperStyle = {
    boxSizing: "border-box",
    width: `min(${LEBAR_HALAMAN}px, calc(100% - 2 * clamp(20px, 4vw, 56px)))`,
    margin: "0 auto",
    padding: isMobile ? "28px 0 20px" : "56px 0 24px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
    alignItems: "start",
    gap: isMobile ? "14px" : "0 48px",
    maxWidth: LEBAR_ISI,
  };

  const responsiveTitleStyle = isMobile
    ? { ...titleStyle, marginBottom: 2, fontSize: 15 }
    : titleStyle;

  const brandStyle = isMobile
    ? { justifySelf: "start", textAlign: "left" }
    : { display: "contents" };

  const logoLinkStyle = isMobile
    ? undefined
    : { gridColumn: 1, gridRow: 1, justifySelf: "start" };

  const brandTextStyle = isMobile
    ? undefined
    : { gridColumn: 1, gridRow: 2, alignSelf: "baseline", textAlign: "left" };

  const alamatStyle = isMobile
    ? { justifySelf: "start", textAlign: "left" }
    : {
        gridColumn: 2,
        gridRow: 2,
        alignSelf: "baseline",
        justifySelf: "center",
        textAlign: "center",
        maxWidth: 340,
        paddingTop: 0,
      };

  const kontakStyle = isMobile
    ? { justifySelf: "start", textAlign: "left" }
    : {
        gridColumn: 3,
        gridRow: 2,
        alignSelf: "baseline",
        justifySelf: "end",
        textAlign: "right",
        maxWidth: 340,
        paddingTop: 0,
      };

  const linkStyle = { backgroundPosition: isMobile ? "0 100%" : "100% 100%" };

  const barStyle = { maxWidth: LEBAR_ISI };

  return (
    <footer className="footer">
      <div className="footer__inner" style={wrapperStyle}>
        <div className="footer__grid" style={gridStyle}>
          <div className="footer__brand" style={brandStyle}>
            <Link
              to="/"
              className="footer__logo-link"
              aria-label={t("Kembali ke beranda")}
              style={logoLinkStyle}
            >
              <img src="/Logo_PSU.png" alt="Logo" className="footer__logo" />
            </Link>

            <div className="footer__brand-text" style={brandTextStyle}>
              <p className="footer__name">PT Penilai Standar Uji</p>
              <p className="footer__tagline">
                {t("Lembaga Penilaian Kesesuaian")}
              </p>
              <p className="footer__tagline">LSPr-051-IDN</p>
              <p className="footer__tagline">LP-1554-IDN</p>
            </div>
          </div>

          <div className="footer__col" style={alamatStyle}>
            <h2 className="footer__title" style={responsiveTitleStyle}>
              {t("Alamat Kantor")}
            </h2>
            <address className="footer__list" style={addressStyle}>
              <p>{kontak.alamat}</p>
            </address>
          </div>

          <div className="footer__col" style={kontakStyle}>
            <h2 className="footer__title" style={responsiveTitleStyle}>
              {t("Hubungi Kami")}
            </h2>
            <address className="footer__list" style={addressStyle}>
              <p>
                <a
                  className="footer__email"
                  href={`mailto:${kontak.email}`}
                  style={linkStyle}
                >
                  {kontak.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${kontak.telepon.replace(/[\s-]/g, "")}`}
                  style={linkStyle}
                >
                  {kontak.telepon}
                </a>
              </p>
              <p>
                <a
                  href={`https://wa.me/${kontak.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  {kontak.whatsapp}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="footer__bar" style={barStyle}>
          <p>
            © {new Date().getFullYear()} PT Penilai Standar Uji.{" "}
            {t("Seluruh hak cipta dilindungi.")}
          </p>
        </div>
      </div>
    </footer>
  );
}