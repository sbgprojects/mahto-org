"use client";

import { motion } from "motion/react";
import { Reveal, SafeImage, SplitWords } from "./motion";
import { WRAP } from "./Hero";

// Placeholder stories — written as samples until real founders are onboarded.
const stories = [
  {
    name: "Sample · Ananya",
    line: "I found my co-founder in week three.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=800&q=70",
  },
  {
    name: "Sample · Rohan",
    line: "The score showed me what to fix first.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&h=800&q=70",
  },
  {
    name: "Sample · Meera",
    line: "My pitch finally made sense to me.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&h=800&q=70",
  },
];

export function Stories() {
  return (
    <section id="stories" className="py-28 md:py-36">
      <div className={WRAP}>
        <h2 className="display text-[clamp(2.8rem,9vw,6.5rem)]">
          <SplitWords text="Founder stories." />
        </h2>
        <p className="mt-4 text-xs uppercase tracking-[0.25em] text-accent">
          Sample content — placeholders
        </p>
      </div>

      <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 pl-10 pr-5 md:pl-16 [scrollbar-width:none]">
        {stories.map((s, i) => (
          <motion.figure
            key={s.name}
            className="relative aspect-[3/4] w-[78vw] max-w-sm shrink-0 snap-center overflow-hidden rounded-3xl"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <SafeImage src={s.img} alt={s.name} tint={i} className="absolute inset-0" sizes="80vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <figcaption className="absolute bottom-0 p-6 text-paper">
              <p className="display text-3xl leading-tight">&ldquo;{s.line}&rdquo;</p>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-paper/70">{s.name}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="border-t border-line py-28 md:py-36">
      <div className={`${WRAP} grid items-center gap-10 md:grid-cols-[auto_1fr]`}>
        <Reveal>
          <div className="display grid h-32 w-32 place-items-center rounded-full bg-ink text-6xl text-paper md:h-44 md:w-44 md:text-8xl">
            M
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-xs uppercase tracking-[0.25em] text-muted">About</p>
          <p className="display mt-3 max-w-2xl text-[clamp(2rem,5.5vw,4rem)]">
            Built by Manoj Mahto, to build a{" "}
            <span className="italic text-accent">generation of builders.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const legal = [
  "Terms",
  "Privacy",
  "Refund",
  "Fees",
  "Founder Disclaimer",
  "Funding Disclaimer",
  "Contact",
];

export function Finale() {
  return (
    <section id="apply" className="relative overflow-hidden bg-accent py-28 text-paper md:py-44">
      <motion.div
        aria-hidden
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-paper/30 md:h-[28rem] md:w-[28rem]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.2, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className={`${WRAP} relative`}>
        <h2 className="display text-[clamp(3.4rem,14vw,10rem)]">
          <SplitWords text="Start from" />
          <br />
          <span className="italic">
            <SplitWords text="Year 1." delay={0.25} />
          </span>
        </h2>
        <Reveal delay={0.4} className="mt-12">
          <a
            href="mailto:hello@mahto.org?subject=Apply"
            className="group inline-flex items-center gap-3 rounded-full bg-paper px-8 py-4 text-ink transition-transform hover:scale-[1.04]"
          >
            Apply now
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink py-10 text-paper/60">
      <div className={`${WRAP} flex flex-col gap-6 text-xs md:flex-row md:items-center md:justify-between`}>
        <p className="text-sm text-paper">
          mahto<span className="text-accent">.org</span>
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {legal.map((l) => (
            <li key={l}>
              <a href="#top" className="transition-colors hover:text-paper">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <p>© {new Date().getFullYear()} Mahto.org</p>
      </div>
    </footer>
  );
}
