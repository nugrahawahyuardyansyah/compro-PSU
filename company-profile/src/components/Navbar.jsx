import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderTop from "./HeaderTop";
import "./Navbar.css";

// Mendeteksi layar HP/tablet langsung dari JavaScript
function useIsMobile(breakpoint) {
  const query = `(max-width: ${breakpoint}px)`;
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return isMobile;
}

const menuTentangKami = [
  {
    id: "profile",
    label: "Profile",
    children: [
      { label: "Sejarah", href: "/about/sejarah" },
      { label: "Visi Misi", href: "/about/visi-misi" },
      { label: "Legalitas", href: "/about/legalitas" },
    ],
  },
  { label: "Struktur Organisasi", href: "/about/struktur-organisasi" },
];

const menuLinks = [
  { label: "Client", href: "/Client" },
  { label: "Portofolio", href: "/portofolio" },
  { label: "Sertifikasi", href: "/sertifikasi" },
  { label: "Artikel", href: "/artikel" },
  { label: "Kontak", href: "/kontak" },
  { label: "Login", href: "/login", cta: true },
];

// Hover hanya dipakai di layar lebar yang punya mouse.
// Di HP/tablet sentuh, dropdown tetap dibuka lewat ketukan.
const canHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (min-width: 861px)").matches;

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openSub, setOpenSub] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const closeTimer = useRef(null);
  const isMobile = useIsMobile(860);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Bayangan muncul setelah halaman di-scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Klik di luar / Escape menutup dropdown, resize ke desktop menutup drawer
  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setOpenSub(null);
      }
    };
    const onEscape = (e) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setOpenSub(null);
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
    setOpenSub(null);
  };

  const handleEnter = () => {
    if (!canHover()) return;
    clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };

  // Jeda singkat supaya dropdown tidak menutup saat kursor melintas
  const handleLeave = () => {
    if (!canHover()) return;
    closeTimer.current = setTimeout(() => {
      setDropdownOpen(false);
      setOpenSub(null);
    }, 140);
  };

  const handleTriggerClick = () => {
    if (canHover()) setDropdownOpen(true);
    else {
      if (dropdownOpen) setOpenSub(null);
      setDropdownOpen(!dropdownOpen);
    }
  };

  const linkProps = (href) => ({
    to: href,
    onClick: closeAll,
    "aria-current": isActive(href) ? "page" : undefined,
    className: isActive(href) ? "is-active" : undefined,
  });

  return (
    <>
      <HeaderTop hidden={scrolled} />
      <header className={`navbar ${scrolled ? "is-scrolled" : ""}`}>
        <nav className="navbar__inner" aria-label="Navigasi utama">
          {/* Logo: ganti src dengan path foto logo kamu */}
          <Link to="/" className="navbar__brand" onClick={closeAll}>
            <img src="/Logo_PSU1.png" alt="Logo" className="navbar__logo" />
          </Link>

          <button
            className={`navbar__toggle ${menuOpen ? "is-open" : ""}`}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>

          <ul className={`navbar__links ${menuOpen ? "is-open" : ""}`}>
            <li>
              <Link {...linkProps("/")}>Home</Link>
            </li>

            <li
              className="navbar__dropdown"
              ref={dropdownRef}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              <button
                className={`navbar__trigger ${
                  pathname.startsWith("/about/") ? "is-active" : ""
                }`}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                onClick={handleTriggerClick}
              >
                Tentang Kami
                <svg
                  className={`navbar__caret ${dropdownOpen ? "is-open" : ""}`}
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

              <div className={`navbar__panel ${dropdownOpen ? "is-open" : ""}`}>
                <ul className="navbar__submenu">
                  {menuTentangKami.map((item) =>
                    item.children ? (
                      <li
                        key={item.id}
                        onMouseEnter={() => canHover() && setOpenSub(item.id)}
                        onMouseLeave={() => canHover() && setOpenSub(null)}
                      >
                        <div
                          className={`navbar__subrow ${
                            item.children.some((child) => isActive(child.href))
                              ? "is-active"
                              : ""
                          }`}
                        >
                          <button
                            type="button"
                            className="navbar__subheading"
                            aria-label={`${openSub === item.id ? "Tutup" : "Buka"} submenu ${item.label}`}
                            aria-expanded={openSub === item.id}
                            onClick={() =>
                              setOpenSub(openSub === item.id ? null : item.id)
                            }
                          >
                            <span>{item.label}</span>
                            <svg
                              width="10"
                              height="6"
                              viewBox="0 0 10 6"
                              aria-hidden="true"
                              style={{
                                transform: isMobile
                                  ? openSub === item.href
                                    ? "rotate(180deg)"
                                    : "none"
                                  : "rotate(-90deg)",
                              }}
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
                        </div>

                        <ul
                          className={`navbar__subsub ${openSub === item.id ? "is-open" : ""}`}
                        >
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link {...linkProps(child.href)}>
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ) : (
                      <li key={item.href}>
                        <Link {...linkProps(item.href)}>
                          {item.label}
                          <svg
                            className="navbar__arrow"
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
                    ),
                  )}
                </ul>
              </div>
            </li>

            {menuLinks.map((item) => (
              <li key={item.href}>
                <Link
                  {...linkProps(item.href)}
                  className={
                    [
                      isActive(item.href) && "is-active",
                      item.cta && "navbar__cta",
                    ]
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
      {/* Pengganti ruang navbar (navbar memakai position: fixed) */}
      <div className="navbar__spacer" aria-hidden="true" />
    </>
  );
}