"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { host, nav, type NavItem } from "./site";
import { Arrow, smooth } from "./ui";

const HOME = ["/capabl", "/capabl.in"];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={`cb-chev ${open ? "is-open" : ""}`}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** One top-level item: plain link, or a button that opens a dropdown. */
function NavMenu({
  item,
  open,
  setOpen,
  pathname,
  variant = "link",
}: {
  item: NavItem;
  open: string | null;
  setOpen: (v: string | null) => void;
  pathname: string;
  variant?: "link" | "cta";
}) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isOpen = open === item.label;
  const active =
    item.href === "/capabl"
      ? HOME.includes(pathname)
      : item.href
        ? pathname === item.href
        : !!item.children?.some((c) => c.href === pathname);

  const enter = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(item.label);
  };
  const leave = () => {
    timer.current = setTimeout(() => setOpen(null), 140);
  };

  if (!item.children) {
    return (
      <li>
        <Link href={item.href!} className={`cb-navlink ${active ? "is-active" : ""}`} aria-current={active ? "page" : undefined}>
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="cb-hasmenu" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        type="button"
        className={variant === "cta" ? "cb-btn cb-btn-solid cb-hostbtn" : `cb-navlink ${active ? "is-active" : ""}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setOpen(isOpen ? null : item.label)}
      >
        {item.label}
        <Chevron open={isOpen} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`cb-menu ${variant === "cta" ? "cb-menu-right" : ""}`}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul>
              {item.children.map((c) => (
                <li key={c.href + c.label}>
                  <Link href={c.href} onClick={() => setOpen(null)} aria-current={pathname === c.href ? "page" : undefined}>
                    {c.label}
                    <Arrow size={14} />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function Header() {
  const pathname = usePathname();
  const onHome = HOME.includes(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [acc, setAcc] = useState<string | null>(null);
  const bar = useRef<HTMLElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 48);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Close dropdowns on outside click / Escape.
  useEffect(() => {
    if (!menu) return;
    const click = (e: MouseEvent) => {
      if (bar.current && !bar.current.contains(e.target as Node)) setMenu(null);
    };
    const key = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    document.addEventListener("mousedown", click);
    window.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", click);
      window.removeEventListener("keydown", key);
    };
  }, [menu]);

  useEffect(() => {
    if (drawer) smooth.lenis?.stop();
    else smooth.lenis?.start();
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      smooth.lenis?.start();
      document.body.style.overflow = "";
    };
  }, [drawer]);

  const solid = !onHome || scrolled;
  const close = () => setDrawer(false);

  return (
    <>
      <header ref={bar} className={`cb-header ${solid && !drawer ? "is-solid" : ""} ${drawer ? "is-open" : ""}`}>
        <div className="cb-wrap cb-header-in">
          <Link href="/capabl" className="cb-logo" aria-label="Capabl home" onClick={close}>
            capabl<i />
          </Link>

          <nav aria-label="Primary" className="cb-navwrap">
            <ul className="cb-nav">
              {nav.map((n) => (
                <NavMenu key={n.label} item={n} open={menu} setOpen={setMenu} pathname={pathname} />
              ))}
            </ul>
          </nav>

          <ul className="cb-host">
            <NavMenu item={host} open={menu} setOpen={setMenu} pathname={pathname} variant="cta" />
          </ul>

          <button
            type="button"
            className="cb-burger"
            aria-label={drawer ? "Close menu" : "Open menu"}
            aria-expanded={drawer}
            onClick={() => setDrawer((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {drawer && (
          <motion.div
            className="cb-drawer"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <ul className="cb-acc">
              {nav.map((n, i) => (
                <motion.li
                  key={n.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.04, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {n.children ? (
                    <>
                      <button
                        type="button"
                        className="cb-acc-btn"
                        aria-expanded={acc === n.label}
                        onClick={() => setAcc(acc === n.label ? null : n.label)}
                      >
                        {n.label}
                        <span className={`cb-plus ${acc === n.label ? "is-open" : ""}`} aria-hidden />
                      </button>
                      <AnimatePresence initial={false}>
                        {acc === n.label && (
                          <motion.ul
                            className="cb-acc-sub"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          >
                            {n.children.map((c) => (
                              <li key={c.href + c.label}>
                                <Link href={c.href} onClick={close}>
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link href={n.href!} className="cb-acc-btn" onClick={close}>
                      {n.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>

            <div className="cb-drawer-host">
              <p className="cb-label cb-label-light">{host.label}</p>
              {host.children!.map((c) => (
                <Link key={c.href} href={c.href} className="cb-btn cb-btn-light" onClick={close}>
                  {c.label} <Arrow />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
