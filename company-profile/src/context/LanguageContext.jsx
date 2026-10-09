import { useEffect, useState } from "react";
import { LanguageContext } from "./LanguageContextBase";

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved =
      typeof window === "undefined"
        ? null
        : window.localStorage.getItem("psu-lang");
    return saved === "en" || saved === "id" ? saved : "id";
  });

  useEffect(() => {
    window.localStorage.setItem("psu-lang", lang);
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === "id" ? "en" : "id"));
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
