"use client";

import Image from "next/image";
import Lenis from "lenis";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------- smooth scrolling ---------- */
export const smooth: { lenis: Lenis | null } = { lenis: null };

export function Smooth() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95 });
    smooth.lenis = lenis;
    let raf = 0;
    const tick = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // In-page anchors glide, offset for the fixed header.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!;
      const el = id === "#top" ? document.body : document.querySelector<HTMLElement>(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: id === "#top" ? 0 : -64, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
      smooth.lenis = null;
    };
  }, [reduce]);
  return null;
}

/* ---------- imagery ---------- */
/** Photo that settles to a calm tint if it can't load. */
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
    <div className={`cb-photo ${className}`}>
      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

/** Photo revealed with a soft curtain as it enters the viewport. */
export function ImageReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1.1, ease }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- text + motion primitives ---------- */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
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

/** Headline whose lines rise out of a mask, one after another. */
export function Lines({
  lines,
  className = "",
  delay = 0,
  as: Tag = "h2",
}: {
  lines: string[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2";
}) {
  const reduce = useReducedMotion();
  return (
    <Tag className={className} aria-label={lines.join(" ")}>
      {lines.map((l, i) => (
        // The (static) mask is what we observe — a translated child can sit fully
        // outside its own clip and never register as visible.
        <motion.span
          key={i}
          aria-hidden
          className="cb-mask"
          initial={reduce ? "show" : "hide"}
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -6% 0px" }}
        >
          <motion.span
            className="cb-mask-in"
            variants={{
              hide: { y: "108%" },
              show: { y: 0, transition: { duration: 1.05, ease, delay: delay + i * 0.11 } },
            }}
          >
            {l}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}

const fmt = new Intl.NumberFormat("en-IN");

/** Number that counts up once when scrolled into view. */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => `${fmt.format(Math.round(v))}${suffix}`);
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      mv.set(to);
      return;
    }
    const c = animate(mv, to, { duration: 2.2, ease });
    return () => c.stop();
  }, [inView, reduce, to, mv]);
  return (
    <span ref={ref} aria-label={`${fmt.format(to)}${suffix}`}>
      <motion.span aria-hidden>{text}</motion.span>
    </span>
  );
}

/* ---------- icons ---------- */
export function Arrow({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="cb-arrow">
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  );
}

export function Play() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.2v13.6L19 12Z" />
    </svg>
  );
}
