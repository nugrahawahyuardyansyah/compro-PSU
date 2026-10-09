import { useLanguage } from "../context/useLanguage";
import "./LangToggle.css";

export default function LangToggle({ tabIndex }) {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={toggleLang}
      title={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
      tabIndex={tabIndex}
    >
      {lang === "id" ? (
        <>
          <img src="/flag-id.svg" alt="Bahasa Indonesia" />
          <span>ID</span>
          <span className="lang-toggle__arrow">→</span>
          <img src="/flag-en.svg" alt="English" />
          <span>EN</span>
        </>
      ) : (
        <>
          <img src="/flag-en.svg" alt="English" />
          <span>EN</span>
          <span className="lang-toggle__arrow">→</span>
          <img src="/flag-id.svg" alt="Bahasa Indonesia" />
          <span>ID</span>
        </>
      )}
    </button>
  );
}
