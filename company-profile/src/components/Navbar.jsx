import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const menuTentangKami = [
  { label: "Profile", href: "/tentang-kami/profile" },
  { label: "Struktural", href: "/tentang-kami/struktural" },
];

const menuLinks = [
  { label: "Mitra", href: "/mitra" },
  { label: "Sertifikasi", href: "/sertifikasi" },
  { label: "Artikel", href: "/artikel" },
  { label: "Kontak", href: "/kontak", cta: true },
];

const canHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (min-width: 861px)").matches;

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const closeTimer = useRef(null);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    const onEscape = (e) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMenuOpen(false);
      }
    };
    const onResize = () => {
      if (window.innerWidth > 860) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
      window.removeEventListener("resize", onResize);
      clearTimeout(closeTimer.current);
    };
  }, []);

  const closeAll = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleEnter = () => {
    if (!canHover()) return;
    clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };

  const handleLeave = () => {
    if (!canHover()) return;
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 140);
  };

  const handleTriggerClick = () => {
    if (canHover()) setDropdownOpen(true);
    else setDropdownOpen((v) => !v);
  };

  const linkProps = (href) => ({
    to: href,
    onClick: closeAll,
    "aria-current": isActive(href) ? "page" : undefined,
    className: isActive(href) ? "is-active" : undefined,
  });

  return (
    <>
      <header className={`navbar ${scrolled ? "is-scrolled" : ""}`}>
        <nav className="navbar_inner" aria-label="Navigasi utama">
          <Link to="/" className="navbar_brand" onClick={closeAll}>
            <img src="/Logo_PSU.png" alt="Logo" className="navbar_logo" />
          </Link>

          <button
            className={`navbar_toggle ${menuOpen ? "is-open" : ""}`}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>

          <ul className={`navbar_links ${menuOpen ? "is-open" : ""}`}>
            <li>
              <Link {...linkProps("/")}>Home</Link>
            </li>

            <li
              className="navbar_dropdown"
              ref={dropdownRef}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              <button
                className={`navbar_trigger ${
                  isActive("/tentang-kami") ? "is-active" : ""
                }`}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                onClick={handleTriggerClick}
              >
                Tentang Kami
                <svg
                  className={`navbar_caret ${dropdownOpen ? "is-open" : ""}`}
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1l4 4 4-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className={`navbar_panel ${dropdownOpen ? "is-open" : ""}`}>
                <ul className="navbar_submenu">
                  {menuTentangKami.map((item) => (
                    <li key={item.href}>
                      <Link {...linkProps(item.href)}>
                        {item.label}
                        <svg
                          className="navbar_arrow"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {menuLinks.map((item) => (
              <li key={item.href}>
                <Link
                  {...linkProps(item.href)}
                  className={
                    [isActive(item.href) && "is-active", item.cta && "navbar_cta"]
                      .filter(Boolean)
                      .join(" ") || undefined
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <div className="navbar_spacer" aria-hidden="true" />
    </>
  );
}