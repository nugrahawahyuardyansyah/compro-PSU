import { Link } from "react-router-dom";
import { useLanguage } from "../../context/useLanguage";
import "./Kimia.css";

export default function Kimia() {
  const { lang } = useLanguage();
<<<<<<< HEAD
  const rowsRef = useRef(null);
  const [cardsPerRow, setCardsPerRow] = useState(() =>
    window.matchMedia("(max-width: 992px)").matches ? 2 : 3
  );
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(FERTILIZERS.length / ITEMS_PER_PAGE);
  const [page, setPage] = useState(1);
  const cardsRef = useRef(null);
=======
>>>>>>> 1b1dc834e99716f849af79d5930baed1c93c42c7
  const title =
    lang === "en"
      ? "Chemical Materials and Products"
      : "Bahan dan Produk Kimia";

<<<<<<< HEAD
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 992px)");
    const updateCardsPerRow = (event) => {
      setCardsPerRow(event.matches ? 2 : 3);
    };

    mediaQuery.addEventListener("change", updateCardsPerRow);
    return () => mediaQuery.removeEventListener("change", updateCardsPerRow);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [cardsPerRow]);

  useEffect(() => {
    const rows = rowsRef.current?.querySelectorAll(".kimia-card-row");
    if (!rows) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [cardsPerRow]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    cardsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pageItems = FERTILIZERS.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

=======
>>>>>>> 1b1dc834e99716f849af79d5930baed1c93c42c7
  return (
    <section className="sector-detail-page">
      <div className="sector-detail-page__hero">
        <img
          className="sector-detail-page__image"
          src="/4.kimia.jpg"
          alt={title}
        />
        <div className="sector-detail-page__hero-text">
          <h1 className="sector-detail-page__title">{title}</h1>
        </div>
      </div>
<<<<<<< HEAD
      <div className="kimia-cards" ref={cardsRef}>
        <div ref={rowsRef} className="kimia-cards__inner">
        {Array.from(
          { length: Math.ceil(pageItems.length / cardsPerRow) },
          (_, rowIndex) => {
            const rowItems = pageItems.slice(
              rowIndex * cardsPerRow,
              rowIndex * cardsPerRow + cardsPerRow
            );

            return (
              <div
                className={`kimia-card-row${cardsPerRow === 3 && rowItems.length === 2 ? " kimia-card-row--centered" : ""}`}
                key={rowIndex}
              >
                {rowItems.map((item) => (
                  <article className="kimia-card" key={item.id}>
                    <img
                      src={item.image}
                      alt={lang === "en" ? item.en : item.id}
                      className="kimia-card__img"
                    />
                    <div className="kimia-card__overlay"></div>
                    <div className="kimia-card__content">
                      <h3 className="kimia-card__title">
                        {lang === "en" ? item.en : item.id}
                      </h3>
                    </div>
                  </article>
                ))}
              </div>
            );
          }
        )}
        </div>
        {totalPages > 1 && (
          <nav className="kimia-pagination" aria-label="Pagination">
            <button
              type="button"
              className="kimia-pagination__btn"
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
              aria-label="Previous page"
            >
              &lsaquo;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                type="button"
                key={p}
                className={`kimia-pagination__btn${p === page ? " kimia-pagination__btn--active" : ""}`}
                onClick={() => handlePageChange(p)}
                aria-current={p === page ? "page" : undefined}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              className="kimia-pagination__btn"
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
              aria-label="Next page"
            >
              &rsaquo;
            </button>
          </nav>
        )}
      </div>
=======
>>>>>>> 1b1dc834e99716f849af79d5930baed1c93c42c7
      <Link className="sector-detail-page__back" to="/">
        {lang === "en" ? "Back to Home" : "Kembali ke Beranda"}
      </Link>
    </section>
  );
}
