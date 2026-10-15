"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Reveal, SplitWords } from "./motion";
import { WRAP } from "./Hero";

const plans = [
  { name: "Student Founder", price: "₹10,000", note: "per startup" },
  { name: "Graduate Founder", price: "₹25,000", note: "per startup" },
  { name: "Startup Evaluation", price: "₹10,000", note: "per startup" },
];

/** Slide the number of founders: the people multiply, the payment never does. */
function FounderSlider() {
  const [n, setN] = useState(3);
  return (
    <div className="rounded-3xl border border-line bg-white p-6 md:p-10">
      <p className="text-xs uppercase tracking-[0.25em] text-muted">Try it</p>
      <div className="mt-6 flex h-16 items-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.span
            key={i}
            className="grid h-12 w-12 place-items-center rounded-full border border-ink text-xs"
            animate={{
              opacity: i < n ? 1 : 0.12,
              scale: i < n ? 1 : 0.7,
              backgroundColor: i < n ? "#0e1a2b" : "#faf7f2",
              color: i < n ? "#faf7f2" : "#0e1a2b",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            F{i + 1}
          </motion.span>
        ))}
      </div>
      <input
        type="range"
        min={1}
        max={5}
        value={n}
        onChange={(e) => setN(Number(e.target.value))}
        aria-label="Number of founders"
        className="mt-4 w-full accent-[#e2571f]"
      />
      <p className="display mt-6 text-4xl md:text-5xl">
        {n} {n === 1 ? "founder" : "founders"}.{" "}
        <span className="italic text-accent">One payment.</span>
      </p>
    </div>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="py-28 md:py-40">
      <div className={WRAP}>
        <h2 className="display text-[clamp(2.8rem,9vw,6.5rem)]">
          <SplitWords text="Per startup." />
          <br />
          <span className="italic text-muted">
            <SplitWords text="Never per head." delay={0.25} />
          </span>
        </h2>

        <Reveal className="mt-14">
          <FounderSlider />
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div className="group h-full rounded-3xl border border-line bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-ink">
                <p className="text-sm text-muted">{p.name}</p>
                <p className="display mt-10 text-6xl">{p.price}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">{p.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-xl text-xs leading-relaxed text-muted">
          One-time membership with long-term access to the Mahto Founder Network and Founder
          Passport, subject to the terms applicable to specific services and programmes.
        </p>
      </div>
    </section>
  );
}
