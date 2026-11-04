"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SITE = "https://harrytang.xyz";
const nav = ["About", "Articles", "Projects", "Expertise", "Gear"];

const footer = [
  ["Cookie Policy", `${SITE}/cookie-policy`],
  ["Disclaimer", `${SITE}/disclaimer`],
  ["Privacy Policy", `${SITE}/privacy-policy`],
  ["Terms of Use", `${SITE}/terms-of-use`],
  ["Credits", `${SITE}/credits`],
  ["Buy Me a Coffee", "https://buymeacoffee.com/harrytang"],
] as const;

const Sun = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
const Moon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 13.5A8.5 8.5 0 1 1 10.5 3a6.7 6.7 0 0 0 10.5 10.5Z" />
  </svg>
);

/** Same behaviour as the live site: follows the system, the toggle overrides and is remembered. */
function useTheme() {
  useEffect(() => {
    try {
      const s = localStorage.getItem("ht-theme");
      if (s === "light" || s === "dark") document.querySelector(".ht")?.setAttribute("data-theme", s);
    } catch {}
  }, []);
  const toggle = () => {
    const root = document.querySelector(".ht");
    const current =
      root?.getAttribute("data-theme") ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root?.setAttribute("data-theme", next);
    try {
      localStorage.setItem("ht-theme", next);
    } catch {}
  };
  return { toggle };
}

export function Header() {
  const { toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [noAvatar, setNoAvatar] = useState(false);

  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a href="#main-content" className="ht-skip">
        Skip to content
      </a>
      <header className="ht-header">
        <div className="ht-wrap ht-header-in">
          <a href={SITE} aria-label="Home" className="ht-avatar">
            {noAvatar ? (
              <span className="ht-mono" aria-hidden>
                H
              </span>
            ) : (
              <Image src="https://assets.harrytang.xyz/avatar.jpg" alt="" width={40} height={40} priority onError={() => setNoAvatar(true)} />
            )}
          </a>

          <nav aria-label="Primary" className="ht-pill">
            <a href={SITE}>Home</a>
            {nav.map((n) => (
              <a key={n} href={`${SITE}/${n.toLowerCase()}`}>
                {n}
              </a>
            ))}
          </nav>

          <div className="ht-actions">
            <button type="button" className="ht-round" onClick={toggle} aria-label="Switch colour theme">
              <span className="ht-sun">
                <Sun />
              </span>
              <span className="ht-moon">
                <Moon />
              </span>
            </button>
            <button type="button" className="ht-menu" aria-expanded={open} aria-controls="ht-sheet" onClick={() => setOpen(true)}>
              Menu
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
                <path d="M4 8h16M4 12h16M4 16h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="ht-sheet-wrap" onClick={() => setOpen(false)}>
          <div id="ht-sheet" role="dialog" aria-modal="true" aria-label="Navigation" className="ht-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="ht-sheet-top">
              <span>Navigation</span>
              <button type="button" className="ht-sheet-x" aria-label="Close menu" onClick={() => setOpen(false)} autoFocus>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
                  <path d="m6 6 12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <ul>
              <li>
                <a href={SITE}>Home</a>
              </li>
              {nav.map((n) => (
                <li key={n}>
                  <a href={`${SITE}/${n.toLowerCase()}`}>{n}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export function Footer() {
  return (
    <footer className="ht-footer">
      <div className="ht-wrap ht-footer-in">
        <nav aria-label="Footer">
          {footer.slice(0, 5).map(([l, h]) => (
            <a key={l} href={h}>
              {l}
            </a>
          ))}
          {/* Proposed: promote support next to the existing coffee link. */}
          <a href="/harrytang.xyz" aria-current="page" className="ht-footer-donate">
            Donate
          </a>
          <a href={footer[5][1]} target="_blank" rel="noopener noreferrer">
            {footer[5][0]}
          </a>
        </nav>
        <p>© {new Date().getFullYear()} Harry Tang. All rights reserved.</p>
      </div>
    </footer>
  );
}
