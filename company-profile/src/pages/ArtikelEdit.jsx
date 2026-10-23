import { Navigate, useParams } from "react-router-dom";

export default function ArtikelEdit() {
<<<<<<< HEAD
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

=======
  const { slug } = useParams();
>>>>>>> 63cb655f132dc8776a756ece8c5590b207e9bfe5
  return (
    <Navigate
      to={slug ? `/dashboard-artikel/edit/${encodeURIComponent(slug)}` : "/dashboard-artikel/edit"}
      replace
    />
  );
}
