import { useEffect, useRef, useState } from "react";
import { LanguageContext } from "./LanguageContextBase";
import { translateText } from "./translations";

const SKIP_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "CODE",
  "PRE",
  "TEXTAREA",
  "INPUT",
  "NOSCRIPT",
]);

// Simpan teks asli (Indonesia) per node/atribut agar bisa dikembalikan saat toggle balik
const originalNodeText = new WeakMap();
const originalAttrs = new WeakMap();
let isApplying = false;
let currentLangRef = { current: "id" };

function translateNodeText(text, lang) {
  if (lang !== "en" || !text.trim()) return text;

  const leadingWhitespace = text.match(/^\s*/)?.[0] ?? "";
  const trailingWhitespace = text.match(/\s*$/)?.[0] ?? "";
  const normalized = text.trim().replace(/\s+/g, " ");
  const translated = translateText(normalized, lang);

  return translated === normalized
    ? text
    : `${leadingWhitespace}${translated}${trailingWhitespace}`;
}

function resolveOriginal(node) {
  const current = node.nodeValue;
  const prevOriginal = originalNodeText.get(node);

  if (prevOriginal == null) return current;
  if (current === prevOriginal) return prevOriginal;
  // Keep the source only when this node still contains its dictionary translation.
  if (translateNodeText(prevOriginal, "en") === current) return prevOriginal;
  return current;
}

function translateAttributes(root, lang) {
  if (!root.querySelectorAll) return;
  root
    .querySelectorAll("[placeholder],[title],[aria-label],[alt]")
    .forEach((el) => {
      for (const attr of ["placeholder", "title", "aria-label", "alt"]) {
        const value = el.getAttribute(attr);
        if (!value) continue;

        const store = originalAttrs.get(el) || {};
        const prevOriginal = store[attr];
        let original;

        if (prevOriginal == null) original = value;
        else if (value === prevOriginal) original = prevOriginal;
        else if (translateNodeText(prevOriginal, "en") === value) {
          original = prevOriginal;
        } else original = value;

        store[attr] = original;
        originalAttrs.set(el, store);

        const target = translateNodeText(original, lang);
        if (target !== value) el.setAttribute(attr, target);
      }
    });
}

function applyLanguageToDom(root, lang) {
  if (!root || typeof document === "undefined") return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
      if (parent.isContentEditable) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  let node;
  while ((node = walker.nextNode())) {
    const original = resolveOriginal(node);
    originalNodeText.set(node, original);

    const target = translateNodeText(original, lang);
    if (target !== node.nodeValue) node.nodeValue = target;
  }

  translateAttributes(root, lang);
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved =
      typeof window === "undefined"
        ? null
        : window.localStorage.getItem("psu-lang");
    return saved === "en" || saved === "id" ? saved : "id";
  });

  const observerRef = useRef(null);

  useEffect(() => {
    window.localStorage.setItem("psu-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // Terapkan bahasa ke seluruh teks halaman + pantau perubahan DOM
  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    const apply = () => {
      if (isApplying) return;
      isApplying = true;
      try {
        applyLanguageToDom(document.body, lang);
      } finally {
        isApplying = false;
      }
    };

    currentLangRef.current = lang;
    const raf = requestAnimationFrame(apply);

    if (!observerRef.current) {
      observerRef.current = new MutationObserver(() => {
        if (isApplying) return;
        isApplying = true;
        try {
          applyLanguageToDom(document.body, currentLangRef.current);
        } finally {
          isApplying = false;
        }
      });
      observerRef.current.observe(document.body, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }

    applyLanguageToDom(document.body, lang);

    return () => cancelAnimationFrame(raf);
  }, [lang]);

  useEffect(
    () => () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    },
    [],
  );

  const toggleLang = () => {
    setLang((prev) => (prev === "id" ? "en" : "id"));
  };

  const t = (text) => translateText(text, lang);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
