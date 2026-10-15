import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/useLanguage";
import "./PageHeader.css";

/**
 * Komponen Header Halaman (Digunakan di seluruh halaman kecuali Home)
 * Menampilkan latar belakang /bg_header.jpg, judul halaman (uppercase),
 * dan kotak breadcrumb navigasi: Beranda > ... > Nama Halaman.
 *
 * @param {Object} props
 * @param {string} props.title - Judul utama yang tampil besar di atas kotak breadcrumb
 * @param {Array<{label: string, href: string}>} [props.breadcrumbs] - Daftar urutan link halaman setelah "Beranda"
 */
export default function PageHeader({ title, breadcrumbs = [] }) {
  const { t } = useLanguage();
  const { pathname } = useLocation();

  // Jika breadcrumbs tidak dikirim manual, gunakan title halaman saat ini sebagai link aktif
  const trail =
    Array.isArray(breadcrumbs) && breadcrumbs.length > 0
      ? breadcrumbs
      : title
        ? [{ label: title, href: pathname }]
        : [];

  return (
    <header className="page-header">
      <div className="page-header__overlay" aria-hidden="true" />
      <div className="page-header__inner">
        <h1 className="page-header__title">{t(title)}</h1>

        <nav className="page-header__breadcrumb-box" aria-label="Breadcrumb">
          <ol className="page-header__breadcrumb-list">
            <li className="page-header__breadcrumb-item">
              <Link to="/" className="page-header__crumb-link">
                {t("Beranda")}
              </Link>
            </li>

            {trail.map((item, index) => {
              const isLast = index === trail.length - 1;
              const targetHref = item.href || pathname;
              return (
                <li
                  key={`${item.label}-${index}`}
                  className="page-header__breadcrumb-item"
                >
                  <span className="page-header__crumb-sep" aria-hidden="true">
                    &gt;
                  </span>
                  <Link
                    to={targetHref}
                    className={`page-header__crumb-link${
                      isLast ? " page-header__crumb-link--current" : ""
                    }`}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {t(item.label)}
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </header>
  );
}