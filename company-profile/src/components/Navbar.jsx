import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderTop from "./HeaderTop";
import LangToggle from "./LangToggle";
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
  { label: "Profile", href: "/about/profile" },
  { label: "Struktur Organisasi", href: "/about/struktur-organisasi" },
];

const menuLayanan = [
  {
    label: "Lembaga Sertifikasi Produk",
    id: "sertifikasi-produk",
    href: "/layanan/sertifikasi-produk",
    children: [
      {
        label: "legalitas",
        href: "/layanan/sertifikasi-produk/legalitas",
      },
      {
        label: "ruang lingkup",
        href: "/layanan/sertifikasi-produk/ruang-lingkup",
      },
      {
        label: "permohonan sertifikasi",
        href: "/layanan/sertifikasi-produk/permohonan-sertifikasi",
      },
      {
        label: "proses sertifikasi",
        id: "sertifikasi-produk-proses",
        children: [
          {
            label: "tipe 1B",
            href: "/layanan/sertifikasi-produk/tipe-1b",
          },
          {
            label: "tipe 5",
            href: "/layanan/sertifikasi-produk/tipe-5",
          },
        ],
      },
      {
        label: "ketentuan dan tata cara pengunaan SNI",
        href: "/layanan/sertifikasi-produk/ketentuan-penggunaan-sni",
      },
      {
        label: "keluhan dan banding",
        href: "/layanan/sertifikasi-produk/keluhan-banding",
      },
      {
        label: "hak dan kewajiban klien",
        href: "/layanan/sertifikasi-produk/hak-kewajiban-klien",
      },
      {
        label: "biaya dan penawaran sertifikasi",
        href: "/layanan/sertifikasi-produk/biaya-penawaran",
      },
    ],
  },
  {
    label: "Lembaga Pengujian",
    id: "pengujian",
    href: "/layanan/pengujian",
    children: [
      {
        label: "legalitas",
        href: "/layanan/pengujian/legalitas",
      },
      {
        label: "ruang lingkup",
        id: "pengujian-ruang-lingkup",
        href: "/layanan/pengujian/ruang-lingkup",
      },
      {
        label: "proses pengujian",
        href: "/layanan/pengujian/proses-pengujian",
      },
      {
        label: "biaya dan penawaran pengujian",
        href: "/layanan/pengujian/biaya-penawaran",
      },
    ],
  },
  {
    label: "Lembaga Kalibrasi",
    id: "kalibrasi",
    href: "/layanan/kalibrasi",
    children: [
      { label: "legalitas", href: "/layanan/kalibrasi/legalitas" },
      {
        label: "ruang lingkup",
        id: "kalibrasi-ruang-lingkup",
        href: "/layanan/kalibrasi/ruang-lingkup",
        linkParent: true,
        children: [
          {
            label: "alat kesehatan",
            href: "/layanan/kalibrasi/ruang-lingkup/alat-kesehatan",
          },
        ],
      },
      {
        label: "biaya dan penawaran kalibrasi",
        href: "/layanan/kalibrasi/biaya-penawaran",
      },
    ],
  },
  {
    label: "Lembaga Sertifikasi Sistem Manajemen",
    id: "sertifikasi-sistem",
    href: "/layanan/sertifikasi-sistem-manajemen",
    children: [
      {
        label: "legalitas",
        href: "/layanan/sertifikasi-sistem-manajemen/legalitas",
      },
      {
        label: "ruang lingkup",
        href: "/layanan/sertifikasi-sistem-manajemen/ruang-lingkup",
      },
      {
        label: "proses sertifikasi",
        href: "/layanan/sertifikasi-sistem-manajemen/proses-sertifikasi",
      },
      {
        label: "keluhan dan banding",
        href: "/layanan/sertifikasi-sistem-manajemen/keluhan-banding",
      },
      {
        label: "hak dan kewajiban klien",
        href: "/layanan/sertifikasi-sistem-manajemen/hak-kewajiban-klien",
      },
      {
        label: "biaya dan penawaran sertifikasi",
        href: "/layanan/sertifikasi-sistem-manajemen/biaya-penawaran",
      },
    ],
  },
  {
    label: "Lembaga Pelatihan",
    id: "pelatihan",
    href: "/layanan/pelatihan",
    children: [
      {
        label: "general training",
        href: "/layanan/pelatihan/general-training",
      },
      {
        label: "inhouse training",
        href: "/layanan/pelatihan/inhouse-training",
      },
    ],
  },
];

const menuLinks = [
  { label: "Client", href: "/Client" },
  { label: "Portofolio", href: "/portofolio" },
  { label: "Sertifikasi", href: "/sertifikasi" },
  { label: "Artikel", href: "/artikel" },
  { label: "Kontak", href: "/kontak" },
  { label: "Login", href: "/login", cta: true, extraClass: "navbar__login" },
];

const SUBMENU_GAP = 10;
const VIEWPORT_MARGIN = 8;

function measureSubmenuWidth(li) {
  if (!li || window.innerWidth <= 1024) return undefined;
  const sub = li.querySelector(":scope > .navbar__subsub");
  if (!sub) return undefined;

  const previousMaxWidth = sub.style.maxWidth;
  const wasConstrained = sub.classList.contains("is-constrained");
  sub.style.maxWidth = "none";
  sub.classList.remove("is-constrained");
  const width = sub.offsetWidth;
  sub.style.maxWidth = previousMaxWidth;
  if (wasConstrained) sub.classList.add("is-constrained");

  const roomLeft = li.getBoundingClientRect().left - SUBMENU_GAP - VIEWPORT_MARGIN;
  return width > roomLeft ? Math.max(roomLeft, 140) : null;
}

const canHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (min-width: 1025px)").matches;

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubs, setOpenSubs] = useState(() => new Set());
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef(null);
  const isMobile = useIsMobile(1024);
  const [subMaxWidth, setSubMaxWidth] = useState({});

  const updateSubWidth = (id, li) => {
    const next = measureSubmenuWidth(li);
    if (next === undefined) return;
    setSubMaxWidth((previous) =>
      previous[id] === next ? previous : { ...previous, [id]: next }
    );
  };

  useLayoutEffect(() => {
    if (!openDropdown) return;
    document
      .querySelectorAll(".navbar__panel.is-open > .navbar__submenu > li[data-sub-id]")
      .forEach((li) => {
        const next = measureSubmenuWidth(li);
        if (next === undefined) return;
        const id = li.dataset.subId;
        setSubMaxWidth((previous) =>
          previous[id] === next ? previous : { ...previous, [id]: next }
        );
      });
  }, [openDropdown]);

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
        setOpenSubs(new Set());
      }
    };
    const onEscape = (e) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setOpenSubs(new Set());
        setMenuOpen(false);
      }
    };
    const onResize = () => {
      if (window.innerWidth > 1024) setMenuOpen(false);
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
    setOpenSubs(new Set());
  };

  const openSub = (id) => {
    setOpenSubs((previous) => new Set(previous).add(id));
  };

  const closeSubtree = (id) => {
    setOpenSubs((previous) => {
      const next = new Set(previous);
      for (const openId of next) {
        if (openId === id || openId.startsWith(`${id}-`)) next.delete(openId);
      }
      return next;
    });
  };

  const toggleSub = (id) => {
    setOpenSubs((previous) => {
      const next = new Set(previous);
      if (next.has(id)) {
        for (const openId of next) {
          if (openId === id || openId.startsWith(`${id}-`)) next.delete(openId);
        }
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleEnter = (id) => {
    if (!canHover()) return;
    clearTimeout(closeTimer.current);
    setOpenSubs(new Set());
    setOpenDropdown(id);
  };

  const handleLeave = () => {
    if (!canHover()) return;
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null);
      setOpenSubs(new Set());
    }, 140);
  };

  const handleTriggerClick = (id) => {
    setOpenSubs(new Set());
    if (canHover()) setOpenDropdown(id);
    else setOpenDropdown(openDropdown === id ? null : id);
  };

  const linkProps = (href) => ({
    to: href,
    onClick: closeAll,
    "aria-current": isActive(href) ? "page" : undefined,
    className: isActive(href) ? "is-active" : undefined,
  });

  const renderSubItem = (item, index) =>
    item.children ? (
      <li
        key={item.id}
        data-sub-id={item.id}
        onMouseEnter={(event) => {
          if (!canHover()) return;
          openSub(item.id);
          updateSubWidth(item.id, event.currentTarget);
        }}
        onMouseLeave={() => canHover() && closeSubtree(item.id)}
      >
        <div
          className={`navbar__subrow ${
            item.children.some(
              (child) =>
                (child.href && isActive(child.href)) ||
                child.children?.some((grandchild) => isActive(grandchild.href))
            )
              ? "is-active"
              : ""
          }`}
        >
          {item.linkParent && (
            <Link {...linkProps(item.href)} className="navbar__subheading-link">
              {item.label}
            </Link>
          )}
          <button
            type="button"
            className="navbar__subheading"
            aria-label={`${openSubs.has(item.id) ? "Tutup" : "Buka"} submenu ${item.label}`}
            aria-expanded={openSubs.has(item.id)}
            onClick={(event) => {
              updateSubWidth(item.id, event.currentTarget.closest("li"));
              toggleSub(item.id);
            }}
          >
            {!item.linkParent && <span>{item.label}</span>}
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              aria-hidden="true"
              style={{
                transform: isMobile
                  ? openSubs.has(item.id)
                    ? "rotate(180deg)"
                    : "none"
                  : "rotate(90deg)",
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
          className={[
            "navbar__subsub",
            openSubs.has(item.id) && "is-open",
            subMaxWidth[item.id] && "is-constrained",
          ]
            .filter(Boolean)
            .join(" ")}
          style={
            !isMobile && subMaxWidth[item.id]
              ? { maxWidth: subMaxWidth[item.id] }
              : undefined
          }
        >
          {item.children.map(renderSubItem)}
        </ul>
      </li>
    ) : (
      <li key={`${item.label}-${index}`}>
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
          <div className="navbar__language">
            <LangToggle />
          </div>

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