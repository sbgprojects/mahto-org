"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const links = [
  { href: "#why", label: "Founder" },
  { href: "#journey", label: "How it works" },
  { href: "#identity", label: "Founder Journey" },
  { href: "#funding", label: "Funding" },
  { href: "#network", label: "Campus Network" },
  { href: "#stories", label: "Founder Stories" },
  { href: "https://youtube.com", label: "YouTube" },
  { href: "#about", label: "About" },
];

const desktop = links.filter((l) =>
  ["Funding", "Campus Network", "Founder Stories", "About"].includes(l.label),
);

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
          scrolled || open
            ? "border-b border-line bg-paper/85 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between pl-10 pr-5 md:pl-16 md:pr-8">
          <a href="#top" className="text-[15px] font-semibold tracking-tight">
            mahto<span className="text-accent">.org</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
            {desktop.map((l) => (
              <a key={l.label} href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </a>
            ))}
            <a href="#apply" className="transition-colors hover:text-ink">
              Login
            </a>
            <a
              href="#apply"
              className="rounded-full bg-ink px-5 py-2 text-paper transition-transform hover:scale-[1.03]"
            >
              Apply
            </a>
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative h-10 w-10 md:hidden"
          >
            <motion.span
              className="absolute left-2.5 top-[15px] h-px w-5 bg-ink"
              animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="absolute left-2.5 top-[23px] h-px w-5 bg-ink"
              animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-30 bg-paper pl-10 pr-5 pt-24"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="display flex flex-col gap-1 text-[2.4rem]">
              {links.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.04 }}
                >
                  <a href={l.href} onClick={() => setOpen(false)}>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href="#apply"
              onClick={() => setOpen(false)}
              className="mt-8 inline-block rounded-full bg-accent px-8 py-3.5 text-paper"
            >
              Apply
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
