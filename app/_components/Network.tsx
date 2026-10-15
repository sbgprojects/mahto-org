"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal, SplitWords } from "./motion";
import { WRAP } from "./Hero";

type Pt = { x: number; y: number };

const core: { label: string; p: Pt }[] = [
  { label: "Campus", p: { x: 50, y: 12 } },
  { label: "Mentor", p: { x: 88, y: 50 } },
  { label: "Investor", p: { x: 50, y: 88 } },
  { label: "Co-founder", p: { x: 12, y: 50 } },
];

const extras: Pt[] = [
  { x: 24, y: 22 },
  { x: 76, y: 22 },
  { x: 76, y: 78 },
  { x: 24, y: 78 },
];

const C: Pt = { x: 50, y: 50 };

function Link({ to, delay = 0 }: { to: Pt; delay?: number }) {
  return (
    <>
      <motion.line
        x1={C.x}
        y1={C.y}
        x2={to.x}
        y2={to.y}
        stroke="var(--ink)"
        strokeOpacity={0.35}
        strokeWidth={0.35}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay }}
      />
      <motion.circle
        r={0.9}
        fill="#e2571f"
        animate={{ cx: [C.x, to.x], cy: [C.y, to.y], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, delay: delay + 1, ease: "easeInOut" }}
      />
    </>
  );
}

export function Network() {
  const [added, setAdded] = useState(0);

  return (
    <section id="network" className="py-28 md:py-40">
      <div className={`${WRAP} grid items-center gap-12 md:grid-cols-2`}>
        <div>
          <h2 className="display text-[clamp(2.8rem,9vw,6.5rem)]">
            <SplitWords text="Nobody builds" />
            <br />
            <span className="italic text-accent">
              <SplitWords text="alone." delay={0.25} />
            </span>
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-xs text-muted">
              Co-founders, campuses, mentors, investors. Single founders welcome.
            </p>
            <button
              type="button"
              onClick={() => setAdded((n) => (n + 1) % (extras.length + 1))}
              className="mt-8 rounded-full border border-ink px-6 py-3 text-sm transition-colors hover:bg-ink hover:text-paper"
            >
              {added < extras.length ? "+ Invite a co-founder" : "Reset"}
            </button>
          </Reveal>
        </div>

        <Reveal>
          <svg viewBox="0 0 100 100" className="mx-auto w-full max-w-md" role="img" aria-label="Network of founders">
            {core.map((n, i) => (
              <Link key={n.label} to={n.p} delay={i * 0.15} />
            ))}
            <AnimatePresence>
              {extras.slice(0, added).map((p, i) => (
                <motion.g
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Link to={p} />
                  <motion.circle
                    cx={p.x}
                    cy={p.y}
                    r={3.4}
                    fill="var(--paper)"
                    stroke="#e2571f"
                    strokeWidth={0.6}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                    transition={{ type: "spring", stiffness: 300, damping: 14 }}
                  />
                </motion.g>
              ))}
            </AnimatePresence>
            {core.map((n) => (
              <g key={n.label}>
                <circle cx={n.p.x} cy={n.p.y} r={3.4} fill="var(--paper)" stroke="var(--ink)" strokeWidth={0.5} />
                <text
                  x={n.p.x < 30 ? 3 : n.p.x > 70 ? 97 : n.p.x}
                  y={n.p.y + (n.p.y > 50 ? 9 : n.p.y < 50 ? -6 : 8)}
                  textAnchor={n.p.x < 30 ? "start" : n.p.x > 70 ? "end" : "middle"}
                  className="fill-muted text-[3px] uppercase tracking-[0.3em]"
                >
                  {n.label}
                </text>
              </g>
            ))}
            <circle cx={C.x} cy={C.y} r={8} fill="#e2571f" opacity={0.12} />
            <circle cx={C.x} cy={C.y} r={5.2} fill="var(--ink)" />
            <text x={C.x} y={C.y + 1.1} textAnchor="middle" className="fill-paper text-[3px]">
              you
            </text>
          </svg>
        </Reveal>
      </div>
    </section>
  );
}

const rungs = ["Pitch Lab", "Readiness", "Introduction"];

export function Funding() {
  return (
    <section id="funding" className="border-y border-line py-28 md:py-36">
      <div className={WRAP}>
        <h2 className="display max-w-4xl text-[clamp(2.4rem,8vw,6rem)]">
          <SplitWords text="Investor-ready." />{" "}
          <span className="italic text-muted">
            <SplitWords text="Not investor-promised." delay={0.3} />
          </span>
        </h2>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-3">
          {rungs.map((r, i) => (
            <li key={r} className="relative">
              <motion.div
                className="mb-5 h-px origin-left bg-accent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="text-xs text-muted">0{i + 1}</span>
              <p className="display text-4xl">{r}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-md text-xs text-muted">
          Mahto prepares founders for investors. It does not guarantee funding.
        </p>
      </div>
    </section>
  );
}
