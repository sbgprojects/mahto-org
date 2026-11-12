"use client";

import Image from "next/image";
import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cart } from "./cart";
import type { Item } from "./data";

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------- shell context: cart drawer + "added" toast ---------- */
type Shell = { open: boolean; setOpen: (v: boolean) => void; added: (name: string) => void };
const Ctx = createContext<Shell>({ open: false, setOpen: () => {}, added: () => {} });
export const useShell = () => useContext(Ctx);

export function ShellProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  const added = (name: string) => {
    setToast(name);
    if (t.current) clearTimeout(t.current);
    t.current = setTimeout(() => setToast(null), 2600);
  };
  return (
    <Ctx.Provider value={{ open, setOpen, added }}>
      {children}
      <div className={`ch-added ${toast ? "is-on" : ""}`} role="status" aria-live="polite">
        {toast && (
          <>
            <span>
              <b>{toast}</b> added to your table
            </span>
            <button type="button" onClick={() => setOpen(true)}>
              View
            </button>
          </>
        )}
      </div>
    </Ctx.Provider>
  );
}

/** "+ Add" button that drops an item into the reservation cart. */
export function AddButton({ item, label = "Add", className = "" }: { item: Item; label?: string; className?: string }) {
  const { added } = useShell();
  return (
    <button
      type="button"
      className={`ch-add ${className}`}
      onClick={() => {
        cart.add(item);
        added(item.name);
      }}
      aria-label={`Add ${item.name} to your reservation`}
    >
      <Plus /> {label}
    </button>
  );
}

/* ---------- media + motion ---------- */
export function Photo({
  src,
  alt,
  sizes = "(min-width: 900px) 50vw, 100vw",
  priority,
  className = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`ch-photo ${className}`}>
      {!failed && <Image src={src} alt={alt} fill sizes={sizes} priority={priority} onError={() => setFailed(true)} />}
    </div>
  );
}

export function Reveal({ children, className = "", delay = 0, y = 26 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- brand ---------- */
/** Brass seal: the restaurant's mark. */
export function Seal({ size = 120, spin = false, className = "" }: { size?: number; spin?: boolean; className?: string }) {
  const id = `seal-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={`ch-seal ${spin ? "is-spin" : ""} ${className}`} role="img" aria-label="Chauve Irish Restaurant, Atlanta">
      <defs>
        <path id={id} d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
      </defs>
      <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="currentColor" strokeWidth="1" />
      <g className="ch-seal-ring">
        <text fontSize="15.5" letterSpacing="5.2" fill="currentColor" fontFamily="var(--ch-sans)" fontWeight="600">
          <textPath href={`#${id}`}>CHAUVE · IRISH RESTAURANT · ATLANTA · EST. 2026 ·</textPath>
        </text>
      </g>
      <text x="100" y="121" textAnchor="middle" fontSize="64" fill="currentColor" fontFamily="var(--ch-serif)" fontStyle="italic">
        C
      </text>
    </svg>
  );
}

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className={`ch-word ${light ? "is-light" : ""}`}>
      <span className="ch-word-name">Chauve</span>
      <span className="ch-word-sub">Irish Restaurant · Atlanta</span>
    </span>
  );
}

/* ---------- icons ---------- */
export const Plus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const Minus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
    <path d="M5 12h14" />
  </svg>
);
export const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="ch-arrow">
    <path d="M4 12h15m-6-6 6 6-6 6" />
  </svg>
);
export const Bag = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 8h14l-1.2 12H6.2Z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </svg>
);
export const Close = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);
