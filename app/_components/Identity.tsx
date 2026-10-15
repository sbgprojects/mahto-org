"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { Reveal, SafeImage, SplitWords } from "./motion";
import { WRAP } from "./Hero";

const tests = [
  "Motivation",
  "Critical thinking",
  "Decision-making",
  "Leadership",
  "Integrity",
  "Resilience",
  "Communication",
  "Co-founder fit",
  "Sales",
  "Customer discovery",
  "Business case",
  "Financial thinking",
  "Resourcefulness",
  "Pitch",
  "Execution",
];

const stamps = ["Discover", "Build", "Validate", "Sell", "Prove", "Pitch"];

function FounderCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [flipped, setFlipped] = useState(false);

  // Pointer tilt + moving sheen.
  const rx = useSpring(useMotionValue(0), { stiffness: 140, damping: 16 });
  const ry = useSpring(useMotionValue(0), { stiffness: 140, damping: 16 });
  const sheenX = useMotionValue(50);
  const sheen = useMotionTemplate`linear-gradient(115deg, transparent calc(${sheenX}% - 20%), rgba(255,255,255,0.14) ${sheenX}%, transparent calc(${sheenX}% + 20%))`;

  // Score counter + ring.
  const score = useMotionValue(0);
  const rounded = useTransform(score, (v) => Math.round(v));
  const ring = useTransform(score, (v) => v / 100);
  useEffect(() => {
    if (!inView) return;
    const c = animate(score, 68, { duration: 2.2, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
  }, [inView, score]);

  return (
    <div
      ref={ref}
      className="mx-auto w-full max-w-sm [perspective:1200px]"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry.set((px - 0.5) * 18);
        rx.set((0.5 - py) * 14);
        sheenX.set(px * 100);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
        sheenX.set(50);
      }}
    >
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="[transform-style:preserve-3d]">
        <motion.button
          type="button"
          aria-label="Flip card"
          onClick={() => setFlipped((f) => !f)}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative block aspect-[1.586/1] w-full text-left [transform-style:preserve-3d]"
        >
          {/* Front */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl bg-ink p-5 text-paper shadow-2xl [backface-visibility:hidden]">
            <motion.div aria-hidden className="absolute inset-0" style={{ background: sheen }} />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-paper/60">
                  Founder Card
                </p>
                <p className="display mt-1 text-xl">mahto.org</p>
              </div>
              <svg viewBox="0 0 48 48" className="h-14 w-14 -rotate-90">
                <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(250,247,242,.18)" strokeWidth="3" />
                <motion.circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="#e2571f"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{ pathLength: ring }}
                />
              </svg>
            </div>
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div className="flex items-center gap-3">
                <SafeImage
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=70"
                  alt="Sample founder portrait"
                  sizes="56px"
                  className="h-14 w-14 rounded-full"
                />
                <div>
                  <p className="display text-2xl">Sample Founder</p>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-paper/60">
                    MH · 0001 · sample
                  </p>
                </div>
              </div>
              <div className="text-right">
                <motion.p className="display text-5xl leading-none text-accent">{rounded}</motion.p>
                <p className="text-[9px] uppercase tracking-[0.25em] text-paper/60">Score</p>
              </div>
            </div>
          </div>

          {/* Back — the passport */}
          <div className="absolute inset-0 rounded-2xl bg-paper p-5 shadow-2xl ring-1 ring-line [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted">Founder Passport</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {stamps.map((s, i) => (
                <motion.div
                  key={s}
                  initial={false}
                  animate={flipped ? { opacity: 1, scale: 1, rotate: (i % 2 ? 6 : -6) } : { opacity: 0, scale: 1.6, rotate: 0 }}
                  transition={{ delay: flipped ? 0.5 + i * 0.12 : 0, type: "spring", stiffness: 260, damping: 14 }}
                  className="grid aspect-square place-items-center rounded-full border-2 border-accent/70 text-center text-[9px] font-semibold uppercase leading-tight tracking-wider text-accent"
                >
                  {s}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.button>
      </motion.div>
      <p className="mt-6 text-center text-xs text-muted">Tap the card</p>
    </div>
  );
}

export function Identity() {
  return (
    <section id="identity" className="bg-ink py-28 text-paper md:py-40">
      <div className={`${WRAP} grid items-center gap-16 md:grid-cols-2`}>
        <div>
          <h2 className="display text-[clamp(2.8rem,9vw,6.5rem)]">
            <SplitWords text="Your score." />
            <br />
            <SplitWords text="Your passport." delay={0.2} />
            <br />
            <span className="italic text-accent">
              <SplitWords text="Your card." delay={0.4} />
            </span>
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-sm text-paper/60">
              16 tests. 6 stages. One identity that grows with you.
            </p>
          </Reveal>
        </div>
        <Reveal>
          <FounderCard />
        </Reveal>
      </div>

      <div aria-hidden className="mt-24 overflow-hidden">
        <div className="flex w-max gap-3" style={{ animation: "marquee 50s linear infinite" }}>
          {[...tests, ...tests, ...tests, ...tests].map((t, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-paper/20 px-5 py-2 text-sm text-paper/70"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
