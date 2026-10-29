"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { BASE, contact, navLinks, services } from "./data";
import { Arrow, Chevron, Magnetic, Photo, ease } from "./ui";

export function Header() {
  const [open, setOpen] = useState(false); // desktop mega menu
  const [active, setActive] = useState(services[0].id);
  const [drawer, setDrawer] = useState(false); // mobile
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const closeT = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 24);
    setHidden(y > 240 && y > prev && !open && !drawer);
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (open) triggerRef.current?.focus();
      setOpen(false);
      setDrawer(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.documentElement.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [drawer]);

  const show = () => {
    if (closeT.current) clearTimeout(closeT.current);
    setOpen(true);
  };
  const hideSoon = () => {
    closeT.current = setTimeout(() => setOpen(false), 160);
  };
  const close = () => {
    setOpen(false);
    setDrawer(false);
  };

  const svc = services.find((s) => s.id === active)!;

  return (
    <>
      <motion.header
        className={`wv-header${solid || open ? " is-solid" : ""}`}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.35, ease }}
        onMouseLeave={hideSoon}
        onMouseEnter={() => closeT.current && clearTimeout(closeT.current)}
      >
        <div className="wv-bar">
          <Link href={BASE} className="wv-logo" onClick={close} aria-label="Website Vikreta home">
            <span className="wv-logo-mark" aria-hidden>
              W<i />
            </span>
            <span className="wv-logo-word">
              Website<b>Vikreta</b>
            </span>
          </Link>

          <nav className="wv-nav" aria-label="Primary">
            <button
              ref={triggerRef}
              className={`wv-nav-link${open ? " is-open" : ""}`}
              aria-expanded={open}
              aria-controls="wv-mega"
              onMouseEnter={show}
              onClick={() => setOpen((v) => !v)}
            >
              Services <Chevron className="wv-chev" />
            </button>
            {navLinks.map((l) => (
              <Link key={l.t} href={l.href} className="wv-nav-link" onMouseEnter={() => setOpen(false)} onClick={close}>
                <span className="wv-roll" data-text={l.t}>
                  <span>{l.t}</span>
                </span>
              </Link>
            ))}
          </nav>

          <div className="wv-bar-cta">
            <Magnetic>
              <Link href={`${BASE}#contact`} className="wv-btn wv-btn-y wv-btn-sm" onClick={close}>
                Start a project <Arrow size={14} />
              </Link>
            </Magnetic>
            <button
              className={`wv-burger${drawer ? " is-x" : ""}`}
              aria-label={drawer ? "Close menu" : "Open menu"}
              aria-expanded={drawer}
              aria-controls="wv-drawer"
              onClick={() => setDrawer((v) => !v)}
            >
              <i />
              <i />
            </button>
          </div>
        </div>

        {/* ---------- desktop mega menu ---------- */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="wv-mega"
              className="wv-mega"
              initial={{ opacity: 0, y: -12, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
              exit={{ opacity: 0, y: -8, clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.38, ease }}
              onMouseEnter={show}
            >
              <div className="wv-mega-in">
                <div className="wv-mega-list" role="tablist" aria-orientation="vertical" aria-label="Services">
                  <p className="wv-eyebrow">What we do</p>
                  {services.map((s, i) => (
                    <button
                      key={s.id}
                      role="tab"
                      id={`wv-tab-${s.id}`}
                      aria-selected={s.id === active}
                      aria-controls={`wv-panel-${s.id}`}
                      className="wv-mega-tab"
                      onMouseEnter={() => setActive(s.id)}
                      onFocus={() => setActive(s.id)}
                      onClick={() => setActive(s.id)}
                    >
                      <span className="wv-mega-num">0{i + 1}</span>
                      <span className="wv-mega-tt">{s.title}</span>
                      <Arrow size={14} />
                    </button>
                  ))}
                  <Link href={`${BASE}/services`} className="wv-mega-all" onClick={close}>
                    All services <Arrow size={14} />
                  </Link>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={svc.id}
                    role="tabpanel"
                    id={`wv-panel-${svc.id}`}
                    aria-labelledby={`wv-tab-${svc.id}`}
                    className="wv-mega-panel"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.22, ease }}
                  >
                    <div className="wv-mega-head">
                      <div>
                        <p className="wv-eyebrow is-y">{svc.kicker}</p>
                        <h3>{svc.title}</h3>
                        <p>{svc.blurb}</p>
                      </div>
                      <Link href={svc.href} className="wv-link" onClick={close}>
                        Explore {svc.title} <Arrow size={14} />
                      </Link>
                    </div>
                    <div className="wv-mega-groups">
                      {svc.groups.map((g) => (
                        <div key={g.title} className="wv-mega-group">
                          <Link href={g.href} className="wv-mega-gt" onClick={close}>
                            {g.title}
                          </Link>
                          <p>{g.blurb}</p>
                          <ul>
                            {g.leaves.map((l) => (
                              <li key={l.t}>
                                <Link href={l.href} onClick={close}>
                                  {l.t}
                                </Link>
                                {l.tag && <span className="wv-chip">{l.tag}</span>}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={svc.id}
                    className="wv-mega-card"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    <Photo src={svc.image} alt="" sizes="320px" />
                    <div className="wv-mega-card-tx">
                      <span className="wv-eyebrow">Case study</span>
                      <strong>{svc.proof.metric}</strong>
                      <span>{svc.proof.label}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ---------- mobile drawer ---------- */}
      <AnimatePresence>
        {drawer && (
          <motion.div
            id="wv-drawer"
            className="wv-drawer"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 36px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 36px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 36px)" }}
            transition={{ duration: 0.55, ease }}
          >
            <MobileMenu onNavigate={close} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const [openSvc, setOpenSvc] = useState<string | null>(null);
  const item = (i: number) => ({
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.12 + i * 0.05, duration: 0.5, ease } },
  });
  return (
    <div className="wv-drawer-in">
      <p className="wv-eyebrow">Services</p>
      {services.map((s, i) => {
        const isOpen = openSvc === s.id;
        return (
          <motion.div key={s.id} {...item(i)} className="wv-acc">
            <button className="wv-acc-btn" aria-expanded={isOpen} onClick={() => setOpenSvc(isOpen ? null : s.id)}>
              {s.title}
              <span className={`wv-plus${isOpen ? " is-open" : ""}`} aria-hidden />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="wv-acc-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease }}
                >
                  <div className="wv-acc-pad">
                    {s.groups.map((g) => (
                      <div key={g.title} className="wv-acc-group">
                        <Link href={g.href} className="wv-acc-gt" onClick={onNavigate}>
                          {g.title}
                        </Link>
                        <ul>
                          {g.leaves.map((l) => (
                            <li key={l.t}>
                              <Link href={l.href} onClick={onNavigate}>
                                {l.t}
                              </Link>
                              {l.tag && <span className="wv-chip">{l.tag}</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <Link href={s.href} className="wv-link" onClick={onNavigate}>
                      Explore {s.title} <Arrow size={14} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
      <div className="wv-drawer-links">
        {navLinks.map((l, i) => (
          <motion.div key={l.t} {...item(services.length + i)}>
            <Link href={l.href} onClick={onNavigate} className="wv-drawer-big">
              {l.t}
            </Link>
          </motion.div>
        ))}
      </div>
      <motion.div {...item(services.length + navLinks.length)} className="wv-drawer-foot">
        <Link href={`${BASE}#contact`} className="wv-btn wv-btn-y" onClick={onNavigate}>
          Start a project <Arrow size={14} />
        </Link>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </motion.div>
    </div>
  );
}
