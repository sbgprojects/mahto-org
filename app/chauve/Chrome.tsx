"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { cart, money, totals, useCart } from "./cart";
import { BASE, DOMAIN, nav, site } from "./data";
import { Arrow, Bag, Close, Minus, Plus, Seal, Wordmark, useShell } from "./ui";


export function Header() {
  const pathname = usePathname();
  const lines = useCart();
  const { count } = totals(lines);
  const { setOpen } = useShell();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <>
      <header className={`ch-header ${scrolled && !menu ? "is-solid" : ""} ${menu ? "is-menu" : ""}`}>
        <div className="ch-wrap ch-header-in">
          <Link href={BASE} className="ch-brand" aria-label="Chauve Irish Restaurant, home" onClick={() => setMenu(false)}>
            <Seal size={44} />
            <Wordmark light />
          </Link>
          <nav className="ch-nav" aria-label="Primary">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} aria-current={pathname === n.href ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="ch-header-r">
            <button type="button" className="ch-bag" onClick={() => setOpen(true)} aria-label={`Your table, ${count} item${count === 1 ? "" : "s"}`}>
              <Bag />
              {count > 0 && <span className="ch-bag-n">{count}</span>}
            </button>
            <Link href={`${BASE}/reserve`} className="ch-btn ch-btn-brass ch-header-cta">
              Reserve
            </Link>
            <button type="button" className="ch-burger" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} onClick={() => setMenu((v) => !v)}>
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div className="ch-drawer" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <ul>
              {[{ label: "Home", href: BASE }, ...nav, { label: "Reserve a table", href: `${BASE}/reserve` }].map((n, i) => (
                <motion.li key={n.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                  <Link href={n.href} onClick={() => setMenu(false)}>
                    {n.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="ch-drawer-foot">
              <p>{site.city}</p>
              <p>{site.hours[0][0]} · {site.hours[0][1]}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function CartDrawer() {
  const { open, setOpen } = useShell();
  const lines = useCart();
  const { subtotal, count } = totals(lines);
  const pathname = usePathname();
  const onReserve = pathname === `${BASE}/reserve`;

  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="ch-cart-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
          <motion.aside
            className="ch-cart"
            role="dialog"
            aria-modal="true"
            aria-label="Your table"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ch-cart-head">
              <div>
                <p className="ch-eyebrow">Your table</p>
                <h2>{count ? `${count} item${count === 1 ? "" : "s"}` : "Nothing yet"}</h2>
              </div>
              <button type="button" className="ch-icon-btn" onClick={() => setOpen(false)} aria-label="Close" autoFocus>
                <Close />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="ch-cart-empty">
                <p>Add dishes, a whiskey flight or a party package and they’ll be ready when you arrive.</p>
                <Link href={`${BASE}/menu`} className="ch-link" onClick={() => setOpen(false)}>
                  Browse the menu <Arrow />
                </Link>
              </div>
            ) : (
              <ul className="ch-cart-list">
                {lines.map((l) => (
                  <li key={l.id}>
                    <div>
                      <p className="ch-cart-name">{l.name}</p>
                      <p className="ch-cart-price">{money(l.price)} each</p>
                    </div>
                    <div className="ch-qty" role="group" aria-label={`Quantity of ${l.name}`}>
                      <button type="button" onClick={() => cart.setQty(l.id, l.qty - 1)} aria-label="One fewer">
                        <Minus />
                      </button>
                      <span aria-live="polite">{l.qty}</span>
                      <button type="button" onClick={() => cart.setQty(l.id, l.qty + 1)} aria-label="One more">
                        <Plus />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="ch-cart-foot">
              <div className="ch-cart-total">
                <span>Subtotal</span>
                <strong>{money(subtotal)}</strong>
              </div>
              <p className="ch-small">Pre-orders are attached to your reservation. Tax and gratuity are added at the table.</p>
              {onReserve ? (
                <button type="button" className="ch-btn ch-btn-brass ch-btn-block" onClick={() => setOpen(false)}>
                  Back to your reservation
                </button>
              ) : (
                <Link href={`${BASE}/reserve`} className="ch-btn ch-btn-brass ch-btn-block" onClick={() => setOpen(false)}>
                  Reserve with these <Arrow />
                </Link>
              )}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Floating "Reserve" button whose pint fills as you scroll the page. */
export function PintReserve() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [44, 10]);
  if (pathname === `${BASE}/reserve`) return null;
  return (
    <Link href={`${BASE}/reserve`} className="ch-pint" aria-label="Reserve a table">
      <svg width="22" height="30" viewBox="0 0 22 30" aria-hidden>
        <defs>
          <clipPath id="pint-glass">
            <path d="M2 2h18l-2.2 26H4.2Z" />
          </clipPath>
        </defs>
        <g clipPath="url(#pint-glass)">
          <rect x="0" y="0" width="22" height="30" fill="rgba(242,234,217,.12)" />
          <motion.rect x="0" width="22" height="40" fill="#1a110a" style={{ y }} />
          <motion.rect x="0" width="22" height="3.2" fill="#efe2c4" style={{ y }} />
        </g>
        <path d="M2 2h18l-2.2 26H4.2Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
      <span>Reserve</span>
    </Link>
  );
}

/** A quiet corner card — the benchmark used a blocking pop-up for this. */
export function SeasonNote() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      let seen = false;
      try {
        seen = sessionStorage.getItem("chauve-season") === "1";
      } catch {}
      if (!seen) setShow(true);
    }, 4500);
    return () => clearTimeout(t);
  }, []);
  const close = () => {
    setShow(false);
    try {
      sessionStorage.setItem("chauve-season", "1");
    } catch {}
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.aside
          className="ch-season"
          aria-label="Holiday parties"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <button type="button" className="ch-season-x" onClick={close} aria-label="Dismiss">
            <Close />
          </button>
          <p className="ch-eyebrow">Now booking</p>
          <p className="ch-season-t">Holiday &amp; New Year parties</p>
          <p className="ch-small">The Snug, the front bar, or the whole house.</p>
          <Link href={`${BASE}/parties`} className="ch-link" onClick={close}>
            Plan a party <Arrow />
          </Link>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export function Footer() {
  return (
    <footer className="ch-footer">
      <div className="ch-wrap">
        <div className="ch-footer-top">
          <Seal size={96} className="ch-footer-seal" />
          <p className="ch-footer-line">
            A hundred thousand welcomes,
            <br />
            <em>one pint at a time.</em>
          </p>
          <Link href={`${BASE}/reserve`} className="ch-btn ch-btn-brass">
            Reserve a table <Arrow />
          </Link>
        </div>
        <div className="ch-footer-grid">
          <div>
            <h3>Visit</h3>
            <p>{site.full}</p>
            <p>{site.address}</p>
            <p>{site.city}</p>
            <a href={site.social.google} target="_blank" rel="noopener noreferrer" className="ch-link">
              Get directions <Arrow />
            </a>
          </div>
          <div>
            <h3>Hours</h3>
            {site.hours.map(([d, h]) => (
              <p key={d}>
                <span className="ch-dim">{d}</span> {h}
              </p>
            ))}
            <p className="ch-small">{site.kitchen}</p>
          </div>
          <div>
            <h3>Contact</h3>
            <p>{site.phone}</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <div className="ch-social">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </div>
          </div>
          <div>
            <h3>Explore</h3>
            {nav.map((n) => (
              <p key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </p>
            ))}
          </div>
        </div>
        <p className="ch-domain" aria-hidden>
          {DOMAIN}
        </p>
        <div className="ch-footer-base">
          <span>© {new Date().getFullYear()} {site.full}. Please drink responsibly.</span>
          <span>{DOMAIN}</span>
        </div>
      </div>
    </footer>
  );
}
