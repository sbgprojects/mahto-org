"use client";

import Image from "next/image";
import Lenis from "lenis";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
  type MotionValue,
} from "motion/react";

import { brand } from "./data";

export const ease = [0.16, 1, 0.3, 1] as const;

/* ---------- smooth scrolling ---------- */
export function Smooth() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.12 });
    let raf = 0;
    const tick = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // In-page anchors (also "/websitevikreta#work" while on the page) glide.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']");
      if (!a) return;
      const url = new URL(a.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const el = document.querySelector<HTMLElement>(url.hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -72, duration: 1.1 });
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduce]);
  return null;
}

/** Thin yellow bar that tracks reading progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 30 });
  return <motion.div className="wv-progress" style={{ scaleX }} aria-hidden />;
}

/* ---------- imagery ---------- */
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
    <div className={`wv-photo ${className}`}>
      {!failed && (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} onError={() => setFailed(true)} />
      )}
    </div>
  );
}

/** Photo that wipes open as it enters, then drifts slightly with scroll. */
export function ParallaxPhoto({ src, alt, className = "", sizes }: { src: string; alt: string; className?: string; sizes?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);
  return (
    <motion.div
      ref={ref}
      className={`wv-pp ${className}`}
      initial={reduce ? false : { clipPath: "inset(12% 12% 12% 12% round 28px)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 28px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease }}
    >
      <motion.div className="wv-pp-in" style={{ y }}>
        <Photo src={src} alt={alt} sizes={sizes} />
      </motion.div>
    </motion.div>
  );
}

/* ---------- kinetic type ---------- */

/** Letters snap up out of a mask, staggered fast. Lines are passed as an array. */
export function KineticTitle({
  lines,
  className = "",
  delay = 0,
  as: Tag = "h2",
  accent,
}: {
  lines: string[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p";
  /** Index of the line to paint in the accent colour. */
  accent?: number;
}) {
  const reduce = useReducedMotion();
  let k = 0;
  return (
    <Tag className={`wv-kt ${className}`} aria-label={lines.join(" ")}>
      {lines.map((line, li) => (
        <motion.span
          key={li}
          aria-hidden
          className={`wv-kt-line${li === accent ? " is-accent" : ""}`}
          initial={reduce ? "show" : "hide"}
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        >
          {line.split(" ").map((word, wi) => (
            <span key={wi} className="wv-kt-word">
              {[...word].map((ch, ci) => {
                const i = k++;
                return (
                  <motion.span
                    key={ci}
                    className="wv-kt-ch"
                    variants={{
                      hide: { y: "105%", rotate: 8 },
                      show: {
                        y: "0%",
                        rotate: 0,
                        transition: { duration: 0.6, ease, delay: delay + li * 0.08 + i * 0.018 },
                      },
                    }}
                  >
                    {ch}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </motion.span>
      ))}
    </Tag>
  );
}

/** Word that cycles through options with a letter-by-letter flip. */
export function RotatingWord({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [reduce, words.length, interval]);
  const word = words[i];
  return (
    <span className="wv-rot" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={word} className="wv-rot-in" aria-label={word}>
          {[...word].map((ch, ci) => (
            <motion.span
              key={ci}
              aria-hidden
              className="wv-rot-ch"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1, transition: { duration: 0.42, ease, delay: ci * 0.022 } }}
              exit={{ y: "-100%", opacity: 0, transition: { duration: 0.24, ease: "easeIn", delay: ci * 0.008 } }}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Headline letters that lift and tint under the cursor. */
export function HoverLetters({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`wv-hl ${className}`} aria-label={text}>
      {text.split(" ").map((word, wi) => (
        <span key={wi} aria-hidden className="wv-hl-word">
          {[...word].map((ch, i) => (
            <span key={i} className="wv-hl-ch">
              {ch}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

/** Paragraph whose words light up as it scrolls through the viewport: a reading guide. */
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={`wv-sw ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <Word key={i} p={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, p, range }: { children: string; p: MotionValue<number>; range: [number, number] }) {
  const reduce = useReducedMotion();
  const opacity = useTransform(p, range, reduce ? [1, 1] : [0.16, 1]);
  const y = useTransform(p, range, reduce ? [0, 0] : [6, 0]);
  return (
    <span aria-hidden className="wv-sw-w">
      <motion.span style={{ opacity, y }}>{children}</motion.span>{" "}
    </span>
  );
}

/** Infinite marquee whose speed and direction follow scroll velocity. */
export function VelocityMarquee({
  items,
  baseVelocity = -3,
  className = "",
}: {
  items: string[];
  baseVelocity?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const v = useVelocity(scrollY);
  const smoothV = useSpring(v, { damping: 50, stiffness: 400 });
  const factor = useTransform(smoothV, [0, 1000], [0, 5], { clamp: false });
  const dir = useRef(1);
  const pct = useTransform(x, (val) => `${wrap(-50, 0, val)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * Math.abs(f);
    x.set(x.get() + move);
  });

  const row = (
    <>
      {items.map((t, i) => (
        <span key={i} className="wv-mq-item">
          {t}
          <Star />
        </span>
      ))}
    </>
  );
  return (
    <div className={`wv-mq ${className}`} aria-label={items.join(", ")}>
      <motion.div className="wv-mq-track" style={{ x: pct }} aria-hidden>
        {row}
        {row}
      </motion.div>
    </div>
  );
}

/* ---------- interaction ---------- */

/** Wrapper that pulls toward the cursor while hovered. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });
  return (
    <motion.span
      ref={ref}
      className="wv-mag"
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
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
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Number that counts up once when scrolled into view. */
export function CountUp({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => `${Number(v.toFixed(decimals)).toLocaleString("en-US")}${suffix}`);
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      mv.set(to);
      return;
    }
    const c = animate(mv, to, { duration: 1.4, ease });
    return () => c.stop();
  }, [inView, reduce, to, mv]);
  return (
    <span ref={ref} aria-label={`${to}${suffix}`}>
      <motion.span aria-hidden>{text}</motion.span>
    </span>
  );
}

/* ---------- icons ---------- */
/** The real Website Vikreta logo (horizontal lockup). */
export function Logo({ light = false, height = 30 }: { light?: boolean; height?: number }) {
  return (
    <Image
      src={light ? brand.logoLight : brand.logo}
      alt="Website Vikreta"
      width={Math.round((height * 1364) / 300)}
      height={height}
      unoptimized
      priority
      className="wv-logo-img"
    />
  );
}

export function Arrow({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={`wv-arrow ${className}`}>
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  );
}

export function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden className={className}>
      <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`wv-star ${className}`}>
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" fill="currentColor" />
    </svg>
  );
}
