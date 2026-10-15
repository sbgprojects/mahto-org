"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ScrollWords } from "./motion";
import { WRAP } from "./Hero";

const steps = [
  { t: "Student", d: "Year 1. Start here." },
  { t: "Idea", d: "Name the problem." },
  { t: "Co-founder", d: "Find your people." },
  { t: "MVP", d: "Ship something real." },
  { t: "First customer", d: "A stranger says yes." },
  { t: "Revenue", d: "Proof, in rupees." },
  { t: "Funding", d: "Be investor-ready." },
  { t: "Mentor", d: "Pay it forward." },
];

const ROW = 100; // viewBox units per row
const H = steps.length * ROW;

function xAt(i: number) {
  return i % 2 === 0 ? 18 : 82;
}

function buildPath() {
  let d = `M ${xAt(0)} ${ROW / 2}`;
  for (let i = 1; i < steps.length; i++) {
    const y0 = (i - 1) * ROW + ROW / 2;
    const y1 = i * ROW + ROW / 2;
    d += ` C ${xAt(i - 1)} ${y0 + ROW * 0.55}, ${xAt(i)} ${y1 - ROW * 0.55}, ${xAt(i)} ${y1}`;
  }
  return d;
}

const PATH = buildPath();

function Node({
  i,
  progress,
}: {
  i: number;
  progress: MotionValue<number>;
}) {
  const at = (i + 0.2) / steps.length;
  const fill = useTransform(progress, [at - 0.04, at], ["#faf7f2", "#e2571f"]);
  const scale = useTransform(progress, [at - 0.04, at, at + 0.06], [1, 1.5, 1]);
  const align = i % 2 === 0;
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${xAt(i)}%`, top: `${((i * ROW + ROW / 2) / H) * 100}%` }}
    >
      <motion.span
        className="block h-4 w-4 rounded-full border border-ink"
        style={{ backgroundColor: fill, scale }}
      />
      <div
        className={`absolute top-1/2 w-[46vw] max-w-[22rem] -translate-y-1/2 ${
          align ? "left-7" : "right-7 text-right"
        }`}
      >
        <p className="display text-[clamp(1.9rem,6.5vw,3.6rem)]">{steps[i].t}</p>
        <p className="mt-1 text-xs text-muted md:text-sm">{steps[i].d}</p>
      </div>
    </div>
  );
}

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 55%"],
  });

  // The "founder" marker rides the path as you scroll; the orange trail is clipped to its height.
  const point = (p: number) => {
    const el = pathRef.current;
    if (!el) return { x: xAt(0), y: ROW / 2 };
    return el.getPointAtLength(p * el.getTotalLength());
  };
  const markerY = useTransform(scrollYProgress, (p) => point(p).y);
  const left = useTransform(scrollYProgress, (p) => `${point(p).x}%`);
  const top = useTransform(markerY, (y) => `${(y / H) * 100}%`);

  return (
    <section id="journey" className="py-28 md:py-40">
      <div className={WRAP}>
        <ScrollWords
          className="display max-w-4xl text-[clamp(2rem,6vw,4.4rem)]"
          text="One path. From the first day of college to the day you hand it on."
        />

        <div
          ref={ref}
          className="relative mt-16 h-[1500px] md:mt-24 md:h-[1900px]"
        >
          <svg
            viewBox={`0 0 100 ${H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
            aria-hidden
          >
            <path
              d={PATH}
              fill="none"
              stroke="var(--line)"
              strokeWidth={2}
              strokeDasharray="2 7"
              vectorEffect="non-scaling-stroke"
            />
            <clipPath id="trail">
              <motion.rect x={-10} y={0} width={120} height={markerY} />
            </clipPath>
            <path
              ref={pathRef}
              d={PATH}
              fill="none"
              stroke="#e2571f"
              strokeWidth={2.5}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              clipPath="url(#trail)"
            />
          </svg>

          {steps.map((_, i) => (
            <Node key={i} i={i} progress={scrollYProgress} />
          ))}

          <motion.div
            aria-hidden
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left, top }}
          >
            <span className="absolute inset-0 -m-3 rounded-full bg-accent/25 [animation:pulse-ring_1.8s_ease-out_infinite]" />
            <span className="relative grid h-7 w-7 place-items-center rounded-full bg-ink text-[10px] text-paper shadow-lg">
              you
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
