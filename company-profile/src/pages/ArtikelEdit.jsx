import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { useLanguage } from "../context/useLanguage";
import { AUTHOR_OPTIONS, FALLBACK_ARTICLES } from "../data/articlesFallback";
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

export default function ArtikelEdit() {
  const { slug: routeSlug } = useParams();
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  const [articlesList, setArticlesList] = useState(FALLBACK_ARTICLES);
  const [selectedSlug, setSelectedSlug] = useState(
    routeSlug || (FALLBACK_ARTICLES[0] ? FALLBACK_ARTICLES[0].slug : "")
  );

  const [articleId, setArticleId] = useState(null);
  const [titleId, setTitleId] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [category, setCategory] = useState("News");
  const [author, setAuthor] = useState(AUTHOR_OPTIONS[0]);
  const [publishedAt, setPublishedAt] = useState("");
  const [status, setStatus] = useState("Published");
  const [imageUrl, setImageUrl] = useState("/Logo_PSU_banner1.webp");
  const [tagsInput, setTagsInput] = useState("");
  const [excerptId, setExcerptId] = useState("");
  const [excerptEn, setExcerptEn] = useState("");
  const [contentId, setContentId] = useState("");
  const [contentEn, setContentEn] = useState("");

  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const populateForm = (item) => {
    if (!item) return;
    setArticleId(item.id || null);
    setTitleId(item.title_id || "");
    setTitleEn(item.title_en || "");
    setCategory(item.category || "News");
    setAuthor(
      AUTHOR_OPTIONS.includes(item.author) ? item.author : AUTHOR_OPTIONS[0]
    );
    setPublishedAt(
      item.published_at ? String(item.published_at).slice(0, 10) : ""
    );
    setStatus(item.status || "Published");
    setImageUrl(item.image_url || "/Logo_PSU_banner1.webp");
    const tagsArr = Array.isArray(item.tags) ? item.tags : [];
    setTagsInput(tagsArr.join(", "));
    setExcerptId(item.excerpt_id || "");
    setExcerptEn(item.excerpt_en || "");
    setContentId(item.content_id || "");
    setContentEn(item.content_en || "");
  };

  // Muat daftar seluruh artikel dari database MySQL
  useEffect(() => {
    let active = true;
    async function loadAllArticles() {
      const endpoints = [
        "/api/artikel?limit=500&all=1",
      ];
      for (const url of endpoints) {
        try {
          const res = await fetch(url);
          const ct = res.headers.get("content-type") || "";
          if (!res.ok || !ct.includes("application/json")) continue;
          const json = await res.json();
          if (active && json.success && Array.isArray(json.data) && json.data.length > 0) {
            setArticlesList(json.data);
            const targetSlug = routeSlug || json.data[0].slug;
            setSelectedSlug(targetSlug);
            const found =
              json.data.find((a) => a.slug === targetSlug) || json.data[0];
            populateForm(found);
            return;
          }
        } catch {
          // Gunakan fallback jika server belum merespons
        }
      }
      const fallbackFound =
        FALLBACK_ARTICLES.find((a) => a.slug === (routeSlug || selectedSlug)) ||
        FALLBACK_ARTICLES[0];
      if (fallbackFound) populateForm(fallbackFound);
    }
    loadAllArticles();
    return () => {
      active = false;
    };
  }, [routeSlug]);

  const handleSelectArticleChange = (e) => {
    const newSlug = e.target.value;
    setSelectedSlug(newSlug);
    setErrorMsg("");
    setSuccessMsg("");
    const found = articlesList.find((a) => a.slug === newSlug);
    if (found) populateForm(found);
  };

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!selectedSlug) {
      setErrorMsg(t("Silakan pilih artikel yang akan diedit terlebih dahulu."));
      return;
    }

    setSubmitting(true);
    const targetIdentifier = articleId || selectedSlug;
    const payload = {
      title_id: titleId.trim(),
      title_en: (titleEn || titleId).trim(),
      category,
      author,
      published_at: publishedAt,
      status,
      image_url: imageUrl.trim(),
      tags: parsedTags,
      excerpt_id: excerptId.trim(),
      excerpt_en: (excerptEn || excerptId).trim(),
      content_id: contentId.trim(),
      content_en: (contentEn || contentId).trim(),
    };

    try {
      const endpoints = [
        `/api/artikel/${encodeURIComponent(targetIdentifier)}`,
      ];
      let updated = null;
      let lastMessage = "";

      for (const url of endpoints) {
        try {
          const res = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          const ct = res.headers.get("content-type") || "";
          if (!ct.includes("application/json")) continue;
          const json = await res.json();
          if (res.ok && json.success) {
            updated = json.data;
            break;
          } else {
            lastMessage = json.message || t("Gagal memperbarui artikel.");
          }
        } catch (err) {
          lastMessage = err.message;
        }
      }

      if (!updated) {
        throw new Error(
          lastMessage ||
            t("Gagal terhubung ke server MySQL (port 5000). Pastikan 'npm start' dan MySQL di XAMPP sedang berjalan.")
        );
      }

      setSuccessMsg(t("Perubahan berita/artikel berhasil disimpan!"));
      setArticlesList((prev) =>
        prev.map((item) => (item.slug === selectedSlug ? updated : item))
      );
      setTimeout(() => {
        navigate(`/artikel/${updated.slug}`);
      }, 900);
    } catch (err) {
      setErrorMsg(t(err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedSlug) return;
    setDeleting(true);
    setErrorMsg("");
    setSuccessMsg("");

    const targetIdentifier = articleId || selectedSlug;
    try {
      const endpoints = [
        `/api/artikel/${encodeURIComponent(targetIdentifier)}`,
      ];
      let deletedOk = false;
      let lastMessage = "";

      for (const url of endpoints) {
        try {
          const res = await fetch(url, { method: "DELETE" });
          const ct = res.headers.get("content-type") || "";
          if (!ct.includes("application/json")) continue;
          const json = await res.json();
          if (res.ok && json.success) {
            deletedOk = true;
            break;
          } else {
            lastMessage = json.message || t("Gagal menghapus artikel.");
          }
        } catch (err) {
          lastMessage = err.message;
        }
      }

      if (!deletedOk) {
        throw new Error(
          lastMessage ||
            t("Gagal terhubung ke server MySQL (port 5000). Pastikan 'npm start' dan MySQL di XAMPP sedang berjalan.")
        );
      }

      setShowDeleteModal(false);
      setSuccessMsg(t("Berita/artikel berhasil dihapus secara permanen."));
      const remaining = articlesList.filter((a) => a.slug !== selectedSlug);
      setArticlesList(remaining);

      setTimeout(() => {
        navigate("/artikel");
      }, 900);
    } catch (err) {
      setShowDeleteModal(false);
      setErrorMsg(t(err.message));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Edit Artikel"
        breadcrumbs={[
          { label: "Artikel", href: "/artikel" },
          { label: "Edit Artikel", href: "/artikel/edit" },
        ]}
      />

      <section className="news-form-section">
        <div className="news-form-container">
          <div className="news-form-card">
            <div className="news-form-header">
              <div>
                <h2>{t("Edit atau Hapus Berita & Artikel")}</h2>
                <p>{t("Pilih berita/artikel yang ingin diperbarui atau dihapus dari database.")}</p>
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

            {/* Dropdown Pemilih Artikel yang Sudah Ada */}
            <div className="news-form-selector-box">
              <label htmlFor="select-existing-article">
                {t("Pilih Berita / Artikel yang Akan Diedit:")}
              </label>
              <select
                id="select-existing-article"
                className="news-form-select"
                value={selectedSlug}
                onChange={handleSelectArticleChange}
              >
                {articlesList.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    [{item.published_at}]{" "}
                    {lang === "en"
                      ? item.title_en || t("English translation not available yet.")
                      : item.title_id} (
                    {t(item.author || "Corporate Secretary PSU")})
                  </option>
                ))}
              </select>
            </div>

            <form onSubmit={handleUpdate}>
              <div className="news-form-grid">
                <div className="news-form-field news-form-field--full">
                  <label className="news-form-label" htmlFor="edit_title_id">
                    {t("Judul Berita / Artikel (Bahasa Indonesia)")}<span>*</span>
                  </label>
                  <input
                    id="edit_title_id"
                    type="text"
                    className="news-form-input"
                    value={titleId}
                    onChange={(e) => setTitleId(e.target.value)}
                    required
                  />
                </div>

                <div className="news-form-field news-form-field--full">
                  <label className="news-form-label" htmlFor="edit_title_en">
                    {t("Judul Berita / Artikel (Bahasa Inggris)")}
                  </label>
                  <input
                    id="edit_title_en"
                    type="text"
                    className="news-form-input"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                  />
                </div>

                <div className="news-form-field">
                  <label className="news-form-label" htmlFor="edit_author">
                    {t("Author / Penulis")}<span>*</span>
                  </label>
                  <select
                    id="edit_author"
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
                  <label className="news-form-label" htmlFor="edit_category">
                    {t("Kategori Utama")}<span>*</span>
                  </label>
                  <select
                    id="edit_category"
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
                  <label className="news-form-label" htmlFor="edit_published_at">
                    {t("Tanggal Publikasi")}<span>*</span>
                  </label>
                  <input
                    id="edit_published_at"
                    type="date"
                    className="news-form-input"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    required
                  />
                </div>

                <div className="news-form-field">
                  <label className="news-form-label" htmlFor="edit_status">
                    {t("Status Publikasi")}
                  </label>
                  <select
                    id="edit_status"
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
                    {t("Gambar Utama Artikel (Otomatis Disesuaikan ke Rasio 16:9)")}
                  </label>
                  <div className="news-form-image-box">
                    <div className="news-form-grid">
                      <div>
                        <span className="news-form-hint">
                          {t("Ganti gambar dari komputer Anda:")}
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
                          {t("Pratinjau Gambar Saat Ini (Rasio Seragam 16:9):")}
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
                  <label className="news-form-label" htmlFor="edit_tags">
                    {t("Daftar Tag / Tagline (Pisahkan dengan tanda koma)")}
                  </label>
                  <input
                    id="edit_tags"
                    type="text"
                    className="news-form-input"
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
                  <label className="news-form-label" htmlFor="edit_excerpt_id">
                    {t("Ringkasan Singkat / Excerpt")}
                  </label>
                  <textarea
                    id="edit_excerpt_id"
                    className="news-form-textarea"
                    value={excerptId}
                    onChange={(e) => setExcerptId(e.target.value)}
                  />
                </div>

                <div className="news-form-field news-form-field--full">
                  <label className="news-form-label" htmlFor="edit_content_id">
                    {t("Isi Lengkap Berita / Artikel (Bahasa Indonesia)")}<span>*</span>
                  </label>
                  <textarea
                    id="edit_content_id"
                    className="news-form-textarea news-form-textarea--large"
                    value={contentId}
                    onChange={(e) => setContentId(e.target.value)}
                    required
                  />
                </div>

                <div className="news-form-field news-form-field--full">
                  <label className="news-form-label" htmlFor="edit_content_en">
                    {t("Isi Lengkap Berita / Artikel (Bahasa Inggris)")}
                  </label>
                  <textarea
                    id="edit_content_en"
                    className="news-form-textarea news-form-textarea--large"
                    value={contentEn}
                    onChange={(e) => setContentEn(e.target.value)}
                  />
                </div>
              </div>

              <div className="news-form-actions">
                <button
                  type="button"
                  className="news-btn news-btn--danger"
                  onClick={() => setShowDeleteModal(true)}
                  disabled={submitting || deleting}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{t("Hapus Berita / Artikel")}</span>
                </button>

                <div className="news-form-actions__right">
                  <Link to="/artikel" className="news-btn news-btn--secondary">
                    {t("Batal")}
                  </Link>
                  <button
                    type="submit"
                    className="news-btn news-btn--primary"
                    disabled={submitting || uploadingImage}
                  >
                    {submitting ? t("Menyimpan...") : t("Simpan Perubahan")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Pop-up Modal Peringatan Konfirmasi Hapus */}
      {showDeleteModal && (
        <div
          className="news-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-modal-title"
        >
          <div className="news-modal">
            <div className="news-modal__icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 id="delete-modal-title" className="news-modal__title">
              {t("Peringatan Hapus Artikel")}
            </h3>
            <p className="news-modal__desc">
              {t("Apakah Anda yakin ingin menghapus artikel")}{" "}
              <strong>&ldquo;{titleId}&rdquo;</strong>? {t("Data yang dihapus tidak dapat dikembalikan lagi.")}
            </p>
            <div className="news-modal__actions">
              <button
                type="button"
                className="news-btn news-btn--secondary"
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
              >
                {t("Batal")}
              </button>
              <button
                type="button"
                className="news-btn news-btn--danger"
                onClick={handleConfirmDelete}
                disabled={deleting}
              >
                {deleting ? t("Menghapus...") : t("Ya, Hapus Artikel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
