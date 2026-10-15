"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import { Reveal, SplitWords } from "./motion";

export const WRAP = "mx-auto w-full max-w-6xl pl-10 pr-5 md:pl-16 md:pr-8";

const stages = ["Discover", "Build", "Validate", "Sell", "Prove", "Pitch"];

/** Six stages that light up in sequence, with a thread running between them. */
function StageStrip() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % stages.length), 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <ol className="relative grid grid-cols-3 gap-y-6 sm:grid-cols-6">
      <div
        aria-hidden
        className="absolute left-0 right-0 top-[7px] hidden h-px bg-line sm:block"
      >
        <motion.div
          className="h-full origin-left bg-accent"
          animate={{ scaleX: (active + 0.5) / stages.length }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      {stages.map((s, i) => {
        const on = i <= active;
        return (
          <li key={s} className="relative flex flex-col items-start gap-3">
            <motion.span
              className="relative z-10 block h-[15px] w-[15px] rounded-full border border-ink bg-paper"
              animate={{
                backgroundColor: on ? "#e2571f" : "#faf7f2",
                borderColor: on ? "#e2571f" : "#0e1a2b",
                scale: i === active ? 1.35 : 1,
              }}
              transition={{ duration: 0.5 }}
            />
            <span
              className={`text-[11px] uppercase tracking-[0.2em] transition-colors duration-500 ${
                on ? "text-ink" : "text-muted"
              }`}
            >
              {s}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** Slowly rotating circular stamp. */
function Stamp() {
  const text = "BUILD A GENERATION OF BUILDERS • ";
  return (
    <div className="relative h-28 w-28 shrink-0 md:h-36 md:w-36">
      <motion.svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        <defs>
          <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-ink text-[8.4px] font-medium tracking-[0.18em]">
          <textPath href="#circle">{text}</textPath>
        </text>
      </motion.svg>
      <span className="display absolute inset-0 grid place-items-center text-3xl text-accent md:text-4xl">
        Y1
      </span>
    </div>
  );
}

const cycle = ["yourself.", "a team.", "a product.", "a company.", "a legacy."];

function CyclingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % cycle.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      <motion.span
        key={i}
        className="inline-block italic text-accent"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {cycle[i]}
      </motion.span>
    </span>
  );
}

export function Hero() {
  // Soft spotlight that follows the pointer (and eases back to centre on touch devices).
  const x = useSpring(useMotionValue(50), { stiffness: 60, damping: 20 });
  const y = useSpring(useMotionValue(40), { stiffness: 60, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(520px circle at ${x}% ${y}%, rgba(226,87,31,0.16), transparent 60%)`;

  return (
    <section
      id="top"
      className="relative flex min-h-dvh items-center overflow-hidden pb-16 pt-28"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width) * 100);
        y.set(((e.clientY - r.top) / r.height) * 100);
      }}
    >
      <motion.div aria-hidden className="absolute inset-0" style={{ background: glow }} />

      <div className={`${WRAP} relative`}>
        <Reveal>
          <p className="mb-8 text-[11px] uppercase tracking-[0.28em] text-muted">
            Build your founder profile from Year 1
          </p>
        </Reveal>

        <h1 className="display text-[clamp(3.4rem,15vw,10.5rem)]">
          <SplitWords text="Build" delay={0.1} />
          <br />
          <CyclingWord />
        </h1>

        <Reveal delay={0.5} className="mt-8 flex items-end justify-between gap-6">
          <p className="display max-w-md text-2xl italic text-muted md:text-3xl">
            Don&rsquo;t just build a startup.
            <br />
            <span className="not-italic text-ink">Build yourself.</span>
          </p>
          <Stamp />
        </Reveal>

        <Reveal delay={0.7} className="mt-14">
          <StageStrip />
        </Reveal>

        <Reveal delay={0.9} className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href="#apply"
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm text-paper transition-transform hover:scale-[1.03]"
          >
            Apply
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a href="#journey" className="px-2 text-sm text-muted transition-colors hover:text-ink">
            See how it works
          </a>
        </Reveal>
      </div>
    </section>
  );
}

const marqueeWords = ["Discover", "Build", "Validate", "Sell", "Prove", "Pitch"];

/** Giant outlined type that drifts sideways. */
export function Marquee() {
  const row = [...marqueeWords, ...marqueeWords];
  return (
    <div aria-hidden className="overflow-hidden border-y border-line py-6">
      <div
        className="flex w-max gap-10"
        style={{ animation: "marquee 38s linear infinite" }}
      >
        {[...row, ...row].map((w, i) => (
          <span
            key={i}
            className="display flex items-center gap-10 whitespace-nowrap text-[clamp(3rem,10vw,7rem)] text-transparent [-webkit-text-stroke:1px_var(--ink)]"
          >
            {w}
            <span className="text-accent [-webkit-text-stroke:0]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
