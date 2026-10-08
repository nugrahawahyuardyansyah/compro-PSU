import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderTop from "./HeaderTop";
import "./Navbar.css";
import "./NavbarLogin.css";

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

const menuLayanan = [
  { label: "Lembaga Sertifikasi Produk", href: "/layanan/sertifikasi-produk" },
  { label: "Lembaga Pengujian", href: "/layanan/pengujian" },
  { label: "Lembaga Kalibrasi", href: "/layanan/kalibrasi" },
  {
    label: "Lembaga Sertifikasi Sistem Manajemen",
    href: "/layanan/sertifikasi-sistem-manajemen",
  },
  { label: "Lembaga Pelatihan", href: "/layanan/pelatihan" },
];

const menuLinks = [
  { label: "Client", href: "/Client" },
  { label: "Portofolio", href: "/portofolio" },
  { label: "Sertifikasi", href: "/sertifikasi" },
  { label: "Artikel", href: "/artikel" },
  { label: "Kontak", href: "/kontak" },
  { label: "Login", href: "/login", cta: true, extraClass: "navbar__login" },
];

const canHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (min-width: 861px)").matches;

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSub, setOpenSub] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef(null);
  const isMobile = useIsMobile(860);

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
      if (!e.target.closest(".navbar__dropdown")) {
        setOpenDropdown(null);
        setOpenSub(null);
      }
    };
    const onEscape = (e) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
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
    setOpenDropdown(null);
    setOpenSub(null);
  };

  const handleEnter = (id) => {
    if (!canHover()) return;
    clearTimeout(closeTimer.current);
    setOpenSub(null);
    setOpenDropdown(id);
  };

  const handleLeave = () => {
    if (!canHover()) return;
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null);
      setOpenSub(null);
    }, 140);
  };

  const handleTriggerClick = (id) => {
    setOpenSub(null);
    if (canHover()) setOpenDropdown(id);
    else setOpenDropdown(openDropdown === id ? null : id);
  };

  const linkProps = (href) => ({
    to: href,
    onClick: closeAll,
    "aria-current": isActive(href) ? "page" : undefined,
    className: isActive(href) ? "is-active" : undefined,
  });

  const renderSubItem = (item) =>
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
            onClick={() => setOpenSub(openSub === item.id ? null : item.id)}
          >
            <span>{item.label}</span>
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              aria-hidden="true"
              style={{
                transform: isMobile
                  ? openSub === item.id
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
              <Link {...linkProps(child.href)}>{child.label}</Link>
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
    );

  const renderDropdown = ({ id, label, items, active }) => {
    const open = openDropdown === id;
    return (
      <li
        className="navbar__dropdown"
        onMouseEnter={() => handleEnter(id)}
        onMouseLeave={handleLeave}
      >
        <button
          className={`navbar__trigger ${active ? "is-active" : ""}`}
          aria-haspopup="true"
          aria-expanded={open}
          onClick={() => handleTriggerClick(id)}
        >
          {label}
          <svg
            className={`navbar__caret ${open ? "is-open" : ""}`}
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

        <div className={`navbar__panel ${open ? "is-open" : ""}`}>
          <ul className="navbar__submenu">{items.map(renderSubItem)}</ul>
        </div>
      </li>
    );
  };

  return (
    <>
      <HeaderTop hidden={scrolled} />
      <header className={`navbar ${scrolled ? "is-scrolled" : ""}`}>
        <nav className="navbar__inner" aria-label="Navigasi utama">
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

            {renderDropdown({
              id: "about",
              label: "Tentang Kami",
              items: menuTentangKami,
              active: pathname.startsWith("/about/"),
            })}

            {renderDropdown({
              id: "layanan",
              label: "Layanan",
              items: menuLayanan,
              active: pathname.startsWith("/layanan/"),
            })}

            {menuLinks.map((item) => (
              <li key={item.href}>
                <Link
                  {...linkProps(item.href)}
                  className={
                    [
                      isActive(item.href) && "is-active",
                      item.cta && "navbar__cta",
                      item.extraClass,
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
      <div className="navbar__spacer" aria-hidden="true" />
    </>
  );
}