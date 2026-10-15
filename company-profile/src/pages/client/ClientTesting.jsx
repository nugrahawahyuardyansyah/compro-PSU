import { useState } from "react";
import LocalizedText from "../../components/LocalizedText";
import { useLanguage } from "../../context/useLanguage";
import "../Client.css";

const SUBMENU_KEY = "pengujian";

async function fetchCertificateFromApi(submenu, noSertifikat) {
  const encodedNo = encodeURIComponent(noSertifikat);
  const endpoints = [
    `http://127.0.0.1:5000/api/sertifikat/${submenu}?no_sertifikat=${encodedNo}`,
    `http://localhost:5000/api/sertifikat/${submenu}?no_sertifikat=${encodedNo}`,
    `/api/sertifikat/${submenu}?no_sertifikat=${encodedNo}`,
    `http://localhost/api/cek_sertifikat.php?submenu=${submenu}&no_sertifikat=${encodedNo}`,
  ];

  let lastError = null;
  for (const url of endpoints) {
    try {
      const response = await fetch(url);
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        continue;
      }
      const payload = await response.json();
      return { status: response.status, payload };
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error("Tidak dapat terhubung ke server API MySQL.");
}

function renderSumber(sumberText) {
  if (!sumberText) return "-";
  if (sumberText.includes("|")) {
    const [primary, sub] = sumberText.split("|").map((s) => s.trim());
    return (
      <div>
        <div className="cert-tracker__source-primary">{primary}</div>
        {sub && <div className="cert-tracker__source-sub">{sub}</div>}
      </div>
    );
  }
  return <div className="cert-tracker__source-primary">{sumberText}</div>;
}

export default function ClientTesting() {
  const { t } = useLanguage();
  const [noSertifikat, setNoSertifikat] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchedQuery, setSearchedQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmed = noSertifikat.trim();

    if (!trimmed) {
      setErrorMsg(t("Silakan masukkan nomor sertifikat terlebih dahulu."));
      setResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSearchedQuery(trimmed);

    try {
      const { status, payload } = await fetchCertificateFromApi(SUBMENU_KEY, trimmed);
      setHasSearched(true);

      if (status === 404 || !payload.found) {
        setResults([]);
      } else if (status >= 400 || !payload.success) {
        setResults([]);
        setErrorMsg(payload.message || "Terjadi kesalahan saat memeriksa sertifikat.");
      } else {
        setResults(Array.isArray(payload.data) ? payload.data : []);
      }
    } catch {
      setHasSearched(true);
      setResults([]);
      setErrorMsg(
        "Gagal terhubung ke server backend (port 5000). Pastikan Anda sudah menjalankan 'npm start' di dalam folder backend dan MySQL di XAMPP sudah Start."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setNoSertifikat("");
    setResults([]);
    setHasSearched(false);
    setSearchedQuery("");
    setErrorMsg("");
  };

  return (
    <section className="cert-tracker">
      <div className="cert-tracker__container">
        <header className="cert-tracker__header">
          <span className="cert-tracker__eyebrow">
            <LocalizedText>Tracking Status Sertifikat</LocalizedText>
          </span>
          <LocalizedText as="h1" className="cert-tracker__title">
            Lembaga Pengujian
          </LocalizedText>
          <LocalizedText as="p" className="cert-tracker__subtitle">
            Masukkan nomor sertifikat untuk mengecek status dan informasi sertifikat yang terdaftar pada layanan ini. Pencarian hanya menampilkan sertifikat yang sesuai dengan nomor yang diinputkan.
          </LocalizedText>
        </header>

        <div className="cert-tracker__card">
          <div className="cert-tracker__toolbar">
            <form className="cert-tracker__form" onSubmit={handleSearch}>
              <div className="cert-tracker__input-wrap">
                <span className="cert-tracker__search-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                    <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="cert-tracker__input"
                  placeholder={`Masukkan No. Sertifikat (contoh: PSU-SPPT-2026-0101)`}
                  value={noSertifikat}
                  onChange={(e) => setNoSertifikat(e.target.value)}
                  aria-label={t("No. sertifikat")}
                />
                {noSertifikat && (
                  <button
                    type="button"
                    className="cert-tracker__clear"
                    onClick={handleClear}
                    aria-label="Bersihkan input"
                  >
                    ×
                  </button>
                )}
              </div>

              <button type="submit" className="cert-tracker__btn" disabled={loading}>
                {loading ? t("Mencari...") : t("Cek Sertifikat")}
              </button>
            </form>

            {hasSearched && !errorMsg && (
              <div className="cert-tracker__meta">
                <span>
                  {results.length} {t("sertifikat")}
                </span>
              </div>
            )}
          </div>

          <div className="cert-tracker__format-hint">
            <LocalizedText>Format Nomor Sertifikat:</LocalizedText>{" "}
            <code>PSU-SPPT-2026-0101</code>
          </div>

          {errorMsg && (
            <div className="cert-tracker__state cert-tracker__state--error" role="alert">
              <p className="cert-tracker__state-title">Perhatian</p>
              <p>{errorMsg}</p>
            </div>
          )}

          {hasSearched && !errorMsg && results.length === 0 && (
            <div className="cert-tracker__state cert-tracker__state--notfound">
              <p className="cert-tracker__state-title">
                <LocalizedText>Data Sertifikat Tidak Ditemukan</LocalizedText>
              </p>
              <p>
                Nomor sertifikat <strong>{searchedQuery}</strong> tidak ditemukan pada database{" "}
                <strong>Lembaga Pengujian</strong>.
              </p>
            </div>
          )}

          {hasSearched && !errorMsg && results.length > 0 && (
            <div className="cert-tracker__table-wrap">
              <table className="cert-tracker__table">
                <thead>
                  <tr>
                    <th><LocalizedText>Nama pabrik</LocalizedText></th>
                    <th><LocalizedText>Alamat</LocalizedText></th>
                    <th><LocalizedText>Produk</LocalizedText></th>
                    <th><LocalizedText>No. SNI</LocalizedText></th>
                    <th><LocalizedText>No. sertifikat</LocalizedText></th>
                    <th><LocalizedText>Terbit</LocalizedText></th>
                    <th><LocalizedText>Status</LocalizedText></th>
                    <th><LocalizedText>Sumber</LocalizedText></th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((item) => {
                    const isActive =
                      String(item.status || "").toLowerCase() === "aktif";
                    return (
                      <tr key={item.id || item.no_sertifikat}>
                        <td className="cert-tracker__factory">{item.nama_pabrik}</td>
                        <td className="cert-tracker__address">{item.alamat}</td>
                        <td className="cert-tracker__product">{item.produk}</td>
                        <td className="cert-tracker__mono">{item.no_sni}</td>
                        <td className="cert-tracker__mono">{item.no_sertifikat}</td>
                        <td className="cert-tracker__date">{item.terbit}</td>
                        <td>
                          <span
                            className={`cert-tracker__badge ${
                              isActive
                                ? "cert-tracker__badge--active"
                                : "cert-tracker__badge--inactive"
                            }`}
                          >
                            <span className="cert-tracker__badge-dot" />
                            <LocalizedText>{item.status}</LocalizedText>
                          </span>
                        </td>
                        <td>{renderSumber(item.sumber)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
