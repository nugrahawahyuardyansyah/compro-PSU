import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

// Ganti dengan data asli perusahaan
const kontak = {
  alamat: "Jalan Cipinang Muara 1 No. 21 RT.006 / RW.03, Kel. Pondok Bambu, Kec. Duren Sawit, Jakarta Timur - 13430",
  email: "psnindonesia.info@gmail.com",
  telepon: "021 - 8602367",
};

// ---- Atur kesejajaran dengan konten halaman di sini ----
// LEBAR_HALAMAN : lebar area konten halaman (footer ditaruh di tengah dengan lebar ini,
//                 sehingga tepi kirinya sejajar dengan teks di atas)
// LEBAR_ISI     : lebar isi footer dari tepi kiri. Kecilkan agar kiri dan kanan
//                 footer lebih dekat, besarkan agar lebih berjauhan.
const LEBAR_HALAMAN = 1474;
const LEBAR_ISI = 1474;

// Di bawah lebar ini footer pakai tampilan HP (semua rata kiri, menumpuk)
const BATAS_MOBILE = 860;

// Mendeteksi layar HP/tablet langsung dari JavaScript,
// jadi tidak bergantung pada media query di file CSS.
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
  const isMobile = useIsMobile(BATAS_MOBILE);

  // Gaya ditulis inline supaya pasti terpakai walaupun ada CSS lama yang bentrok.
  const wrapperStyle = {
    boxSizing: "border-box",
    width: `min(${LEBAR_HALAMAN}px, calc(100% - 2 * clamp(20px, 4vw, 56px)))`,
    margin: "0 auto",
    padding: isMobile ? "40px 0 24px" : "56px 0 24px",
  };

  // Desktop: 3 kolom sama lebar (kiri brand, tengah alamat, kanan kontak).
  // HP: 1 kolom, semua rata kiri.
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
    alignItems: "start",
    gap: isMobile ? "32px" : "32px 48px",
    maxWidth: LEBAR_ISI,
  };

  const brandStyle = { justifySelf: "start", textAlign: "left" };

  const alamatStyle = isMobile
    ? { justifySelf: "start", textAlign: "left" }
    : { justifySelf: "center", textAlign: "center", maxWidth: 340 };

  const kontakStyle = isMobile
    ? { justifySelf: "start", textAlign: "left" }
    : { justifySelf: "end", textAlign: "right", maxWidth: 340 };

  // Garis bawah hover muncul dari sisi yang sesuai dengan rata teksnya
  const linkStyle = { backgroundPosition: isMobile ? "0 100%" : "100% 100%" };

  const barStyle = { maxWidth: LEBAR_ISI };

  return (
    <footer className="footer">
      <div className="footer__inner" style={wrapperStyle}>
        <div className="footer__grid" style={gridStyle}>
          <div className="footer__brand" style={brandStyle}>
            {/* Logo: ganti src dengan path foto logo kamu */}
            <Link to="/" aria-label="Kembali ke beranda">
              <img src="/Logo_PSU.png" alt="Logo" className="footer__logo" />
            </Link>
            <p className="footer__name">PT Penilai Standar Uji</p>
            <p className="footer__tagline">Lembaga Penilaian Kesesuaian</p>
          </div>

          <div className="footer__col" style={alamatStyle}>
            <h2 className="footer__title" style={titleStyle}>
              Alamat Kantor
            </h2>
            <address className="footer__list" style={addressStyle}>
              <p>{kontak.alamat}</p>
            </address>
          </div>

          <div className="footer__col" style={kontakStyle}>
            <h2 className="footer__title" style={titleStyle}>
              Hubungi Kami
            </h2>
            <address className="footer__list" style={addressStyle}>
              <p>
                <a href={`mailto:${kontak.email}`} style={linkStyle}>
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
            </address>
          </div>
        </div>

        <div className="footer__bar" style={barStyle}>
          <p>
            © {new Date().getFullYear()} PT Penilai Standar Uji. Seluruh hak
            cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}