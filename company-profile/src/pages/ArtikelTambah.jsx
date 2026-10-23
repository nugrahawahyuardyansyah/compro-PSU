import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { useLanguage } from "../context/useLanguage";
import { AUTHOR_OPTIONS } from "../data/articlesFallback";
import "./Artikel.css";

const PRESET_IMAGES = [
  { label: "Banner Kantor PSU 1", value: "/Logo_PSU_banner1.webp" },
  { label: "Banner Kantor PSU 2", value: "/Logo_PSU_banner2.webp" },
  { label: "Banner Kantor PSU 3", value: "/Logo_PSU_banner3.webp" },
  { label: "Banner Kantor PSU 4", value: "/Logo_PSU_banner4.webp" },
  { label: "Layanan LSPro", value: "/LSPro.webp" },
  { label: "Laboratorium Pengujian", value: "/lab_pengujian.webp" },
  { label: "Laboratorium Kalibrasi", value: "/lab_kalibrasi.webp" },
  { label: "Lembaga Pelatihan", value: "/_pelatihan.webp" },
  { label: "Sistem Manajemen Mutu", value: "/sistem_manajemen_mutu.webp" },
];

export default function ArtikelTambah() {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const today = new Date().toISOString().slice(0, 10);

  const [titleId, setTitleId] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [category, setCategory] = useState("News");
  const [author, setAuthor] = useState(AUTHOR_OPTIONS[0]);
  const [publishedAt, setPublishedAt] = useState(today);
  const [status, setStatus] = useState("Published");
  const [imageUrl, setImageUrl] = useState("/Logo_PSU_banner1.webp");
  const [tagsInput, setTagsInput] = useState("News, PT Penilai Standar Uji, SNI, LSPro PSU");
  const [excerptId, setExcerptId] = useState("");
  const [excerptEn] = useState("");
  const [contentId, setContentId] = useState("");
  const [contentEn, setContentEn] = useState("");

  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const parsedTags = tagsInput
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setErrorMsg("");

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result;
      try {
        const endpoints = [
          "/api/upload-gambar",
        ];
        let uploadedPath = "";
        for (const url of endpoints) {
          try {
            const res = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ filename: file.name, dataUrl }),
            });
            const json = await res.json();
            if (res.ok && json.success && json.image_url) {
              uploadedPath = json.image_url;
              break;
            }
          } catch {
            // Coba endpoint berikutnya
          }
        }
        if (uploadedPath) {
          setImageUrl(uploadedPath);
        } else {
          setImageUrl(String(dataUrl));
        }
      } finally {
        setUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!titleId.trim()) {
      setErrorMsg(t("Judul berita/artikel wajib diisi."));
      return;
    }
    if (!contentId.trim()) {
      setErrorMsg(t("Isi berita/artikel wajib diisi."));
      return;
    }

    setSubmitting(true);
    const payload = {
      title_id: titleId.trim(),
      title_en: (titleEn || titleId).trim(),
      category,
      author,
      published_at: publishedAt,
      status,
      image_url: imageUrl.trim() || "/Logo_PSU_banner1.webp",
      tags: parsedTags.length > 0 ? parsedTags : [category, "PT Penilai Standar Uji"],
      excerpt_id:
        excerptId.trim() ||
        contentId.trim().replace(/\s+/g, " ").slice(0, 190) + "...",
      excerpt_en:
        (excerptEn || excerptId).trim() ||
        (contentEn || contentId).trim().replace(/\s+/g, " ").slice(0, 190) + "...",
      content_id: contentId.trim(),
      content_en: (contentEn || contentId).trim(),
    };

    try {
      const endpoints = [
        "/api/artikel",
      ];
      let savedData = null;
      let lastMessage = "";

      for (const url of endpoints) {
        try {
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          const ct = res.headers.get("content-type") || "";
          if (!ct.includes("application/json")) continue;
          const json = await res.json();
          if (res.ok && json.success) {
            savedData = json.data;
            break;
          } else {
            lastMessage = json.message || t("Gagal menyimpan artikel.");
          }
        } catch (err) {
          lastMessage = err.message;
        }
      }

      if (!savedData) {
        throw new Error(
          lastMessage ||
            t("Gagal terhubung ke server MySQL (port 5000). Pastikan 'npm start' dan MySQL di XAMPP sedang berjalan.")
        );
      }

      setSuccessMsg(t("Berita/artikel baru berhasil disimpan dan dipublikasikan!"));
      setTimeout(() => {
        navigate(`/artikel/${savedData.slug}`);
      }, 900);
    } catch (err) {
      setErrorMsg(t(err.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Tambah Artikel"
        breadcrumbs={[
          { label: "Artikel", href: "/artikel" },
          { label: "Tambah Artikel", href: "/artikel/tambah" },
        ]}
      />

      <section className="news-form-section">
        <div className="news-form-container">
          <div className="news-form-card">
            <div className="news-form-header">
              <div>
                <h2>{t("Form Tambah Berita & Artikel Baru")}</h2>
                <p>{t("Isi formulir di bawah ini untuk mempublikasikan berita atau artikel baru ke halaman Beranda dan halaman Artikel.")}</p>
              </div>
              <Link to="/artikel" className="news-btn news-btn--secondary">
                &larr; {t("Kembali ke Artikel")}
              </Link>
            </div>

            {errorMsg && (
              <div className="news-form-alert news-form-alert--error" role="alert">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="news-form-alert news-form-alert--success" role="status">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="news-form-grid">
                <div className="news-form-field news-form-field--full">
                  <label className="news-form-label" htmlFor="title_id">
                    {t("Judul Berita / Artikel (Bahasa Indonesia)")}<span>*</span>
                  </label>
                  <input
                    id="title_id"
                    type="text"
                    className="news-form-input"
                    placeholder={t("Masukkan judul berita/artikel...")}
                    value={titleId}
                    onChange={(e) => setTitleId(e.target.value)}
                    required
                  />
                </div>

                <div className="news-form-field news-form-field--full">
                  <label className="news-form-label" htmlFor="title_en">
                    {t("Judul Berita / Artikel (Bahasa Inggris - Opsional)")}
                  </label>
                  <input
                    id="title_en"
                    type="text"
                    className="news-form-input"
                    placeholder={t("Kosongkan jika ingin disamakan dengan judul Bahasa Indonesia...")}
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                  />
                </div>

                <div className="news-form-field">
                  <label className="news-form-label" htmlFor="author">
                    {t("Author / Penulis")}<span>*</span>
                  </label>
                  <select
                    id="author"
                    className="news-form-select"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  >
                    {AUTHOR_OPTIONS.map((name) => (
                      <option key={name} value={name}>
                        {t(name)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="news-form-field">
                  <label className="news-form-label" htmlFor="category">
                    {t("Kategori Utama")}<span>*</span>
                  </label>
                  <select
                    id="category"
                    className="news-form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="News">{lang === "en" ? "News" : "Berita"}</option>
                    <option value="Article">{lang === "en" ? "Article" : "Artikel"}</option>
                    <option value="Press Release">{lang === "en" ? "Press Release" : "Siaran Pers"}</option>
                  </select>
                </div>

                <div className="news-form-field">
                  <label className="news-form-label" htmlFor="published_at">
                    {t("Tanggal Publikasi")}<span>*</span>
                  </label>
                  <input
                    id="published_at"
                    type="date"
                    className="news-form-input"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    required
                  />
                </div>

                <div className="news-form-field">
                  <label className="news-form-label" htmlFor="status">
                    {t("Status Publikasi")}
                  </label>
                  <select
                    id="status"
                    className="news-form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Published">{t("Published (Tampil di Website)")}</option>
                    <option value="Draft">{t("Draft (Simpan sebagai Konsep)")}</option>
                  </select>
                </div>

                <div className="news-form-field news-form-field--full">
                  <label className="news-form-label">
                    {t("Gambar Utama Artikel (Otomatis Disesuaikan ke Rasio 16:9)")}<span>*</span>
                  </label>
                  <div className="news-form-image-box">
                    <div className="news-form-grid">
                      <div>
                        <span className="news-form-hint">
                          {t("Upload file gambar dari komputer Anda:")}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="news-form-input"
                          onChange={handleFileUpload}
                          style={{ marginTop: "6px" }}
                        />
                      </div>
                      <div>
                        <span className="news-form-hint">
                          {t("Atau pilih gambar sampul yang tersedia:")}
                        </span>
                        <select
                          className="news-form-select"
                          value={
                            PRESET_IMAGES.some((p) => p.value === imageUrl)
                              ? imageUrl
                              : ""
                          }
                          onChange={(e) => {
                            if (e.target.value) setImageUrl(e.target.value);
                          }}
                          style={{ marginTop: "6px" }}
                        >
                          <option value="">{t("-- Pilih Gambar Sampul --")}</option>
                          {PRESET_IMAGES.map((img) => (
                            <option key={img.value} value={img.value}>
                              {t(img.label)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {uploadingImage && (
                      <span className="news-form-hint">{t("Mengunggah gambar...")}</span>
                    )}

                    {imageUrl && (
                      <div>
                        <span className="news-form-hint">
                          {t("Pratinjau Gambar (Rasio Seragam 16:9):")}
                        </span>
                        <div
                          className="news-form-image-preview-wrap"
                          style={{ marginTop: "8px" }}
                        >
                          <img
                            src={imageUrl}
                            alt="Preview Artikel"
                            className="news-form-image-preview"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="news-form-field news-form-field--full">
                  <label className="news-form-label" htmlFor="tags">
                    {t("Daftar Tag / Tagline (Pisahkan dengan tanda koma)")}
                  </label>
                  <input
                    id="tags"
                    type="text"
                    className="news-form-input"
                    placeholder={t("Contoh: Press Release, Sertifikasi Produk, SNI, LSPro PSU, Kalibrasi")}
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                  />
                  {parsedTags.length > 0 && (
                    <div className="news-form-tag-preview">
                      {parsedTags.map((tg, i) => (
                        <span key={`${tg}-${i}`} className="news-detail__tag-pill">
                          {tg}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="news-form-field news-form-field--full">
                  <label className="news-form-label" htmlFor="excerpt_id">
                    {t("Ringkasan Singkat / Excerpt (Tampil di Kartu Beranda)")}
                  </label>
                  <textarea
                    id="excerpt_id"
                    className="news-form-textarea"
                    placeholder={t("Ringkasan singkat 1-2 kalimat (jika dikosongkan akan diambil otomatis dari paragraf pertama)...")}
                    value={excerptId}
                    onChange={(e) => setExcerptId(e.target.value)}
                  />
                </div>

                <div className="news-form-field news-form-field--full">
                  <label className="news-form-label" htmlFor="content_id">
                    {t("Isi Lengkap Berita / Artikel (Bahasa Indonesia)")}<span>*</span>
                  </label>
                  <span className="news-form-hint">
                    {t("Gunakan baris kosong (Enter 2x) untuk memisahkan antar paragraf.")}
                  </span>
                  <textarea
                    id="content_id"
                    className="news-form-textarea news-form-textarea--large"
                    placeholder={t("Jakarta — Tuliskan isi berita atau artikel lengkap di sini...")}
                    value={contentId}
                    onChange={(e) => setContentId(e.target.value)}
                    required
                  />
                </div>

                <div className="news-form-field news-form-field--full">
                  <label className="news-form-label" htmlFor="content_en">
                    {t("Isi Lengkap Berita / Artikel (Bahasa Inggris - Opsional)")}
                  </label>
                  <textarea
                    id="content_en"
                    className="news-form-textarea news-form-textarea--large"
                    placeholder={t("Kosongkan jika ingin menggunakan teks yang sama dengan Bahasa Indonesia...")}
                    value={contentEn}
                    onChange={(e) => setContentEn(e.target.value)}
                  />
                </div>
              </div>

              <div className="news-form-actions">
                <Link to="/artikel" className="news-btn news-btn--secondary">
                  {t("Batal")}
                </Link>
                <div className="news-form-actions__right">
                  <button
                    type="submit"
                    className="news-btn news-btn--primary"
                    disabled={submitting || uploadingImage}
                  >
                    {submitting ? t("Menyimpan...") : t("Simpan & Publikasikan Artikel")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
