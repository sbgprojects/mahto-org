"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  BASE,
  contact,
  heroWords,
  img,
  manifesto,
  marqueeA,
  marqueeB,
  process,
  services,
  stats,
  team,
  testimonials,
  work,
} from "./data";
import {
  Arrow,
  CountUp,
  HoverLetters,
  KineticTitle,
  Magnetic,
  ParallaxPhoto,
  Photo,
  Reveal,
  RotatingWord,
  ScrollWords,
  Star,
  VelocityMarquee,
  ease,
} from "./ui";

function useWide(query = "(min-width: 960px)") {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setWide(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [query]);
  return wide;
}

/* ================= 1 · hero ================= */
function Hero() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const backX = useTransform(sx, (v) => v * -18);
  const backY = useTransform(sy, (v) => v * -18);
  const frontX = useTransform(sx, (v) => v * 26);
  const frontY = useTransform(sy, (v) => v * 26);

  const { scrollY } = useScroll();
  const fade = useTransform(scrollY, [0, 600], [1, 0.2]);
  const lift = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -80]);

  return (
    <section
      id="top"
      className="wv-hero"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      <div className="wv-grid-bg" aria-hidden />
      <motion.div className="wv-wrap wv-hero-in" style={{ opacity: fade, y: lift }}>
        <div className="wv-hero-copy">
          <Reveal y={12}>
            <p className="wv-pill">
              <span className="wv-dot" /> Digital marketing &amp; creative studio · Pune
            </p>
          </Reveal>
          <h1 className="wv-h1">
            <KineticTitle as="p" lines={["We make", "brands"]} className="wv-h1-a" delay={0.1} />
            <span className="wv-h1-rot">
              <RotatingWord words={heroWords} />
            </span>
          </h1>
          <Reveal delay={0.45} className="wv-hero-sub">
            <p>
              Strategy, creative and paid media under one roof. We build the idea, make the work and buy the
              media, then show you exactly what it sold.
            </p>
            <div className="wv-cta-row">
              <Magnetic>
                <Link href={`${BASE}#contact`} className="wv-btn wv-btn-y">
                  Start a project <Arrow size={15} />
                </Link>
              </Magnetic>
              <Link href={`${BASE}#work`} className="wv-btn wv-btn-ghost">
                See the work
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="wv-hero-art" aria-hidden>
          <motion.div className="wv-hero-img is-back" style={{ x: backX, y: backY }}
            initial={reduce ? false : { opacity: 0, y: 60, rotate: -8 }}
            animate={{ opacity: 1, y: 0, rotate: -5 }}
            transition={{ duration: 0.9, ease, delay: 0.25 }}
          >
            <Photo src={img.crew} alt="" priority sizes="(min-width: 960px) 28vw, 60vw" />
          </motion.div>
          <motion.div className="wv-hero-img is-front" style={{ x: frontX, y: frontY }}
            initial={reduce ? false : { opacity: 0, y: 80, rotate: 6 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ duration: 0.9, ease, delay: 0.4 }}
          >
            <Photo src={img.lipstick} alt="" priority sizes="(min-width: 960px) 24vw, 50vw" />
          </motion.div>
          <motion.div className="wv-hero-tag is-a" style={{ x: frontX }}
            initial={reduce ? false : { opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease, delay: 0.8 }}
          >
            <strong>4.6×</strong> avg. ROAS
          </motion.div>
          <motion.div className="wv-hero-tag is-b" style={{ x: backX, y: backY }}
            initial={reduce ? false : { opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease, delay: 0.95 }}
          >
            <Star /> 38M views on one drop
          </motion.div>
          <motion.div className="wv-hero-spin" animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 14, ease: "linear", repeat: Infinity }}>
            <svg viewBox="0 0 100 100">
              <defs>
                <path id="wv-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text>
                <textPath href="#wv-circle">SCROLL-STOPPING WORK · SCROLL-STOPPING WORK ·</textPath>
              </text>
            </svg>
            <Star className="wv-hero-spin-star" />
          </motion.div>
        </div>
      </motion.div>

      <div className="wv-hero-foot wv-wrap">
        <span>Trusted by teams at</span>
        <VelocityMarquee items={marqueeB} baseVelocity={-2} className="is-logos" />
      </div>
    </section>
  );
}

/* ================= 2 · marquee band ================= */
function Band() {
  return (
    <div className="wv-band" aria-label="What we do">
      <VelocityMarquee items={marqueeA} baseVelocity={-4} className="is-band" />
      <VelocityMarquee items={[...marqueeA].reverse()} baseVelocity={3} className="is-band is-outline" />
    </div>
  );
}

/* ================= 3 · manifesto ================= */
function Manifesto() {
  return (
    <section className="wv-sec wv-manifesto" id="about">
      <div className="wv-wrap wv-manifesto-in">
        <div>
          <p className="wv-eyebrow is-y">( Who we are )</p>
          <ScrollWords text={manifesto} className="wv-big-p" />
          <Reveal className="wv-manifesto-foot">
            <Link href={`${BASE}#team`} className="wv-link">
              Meet the studio <Arrow size={14} />
            </Link>
          </Reveal>
        </div>
        <ParallaxPhoto src={img.huddle} alt="The Website Vikreta team planning a campaign" className="wv-manifesto-img" sizes="(min-width: 960px) 34vw, 100vw" />
      </div>
    </section>
  );
}

/* ================= 4 · services (hover-reveal rows) ================= */
function Services() {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 350, damping: 30 });
  const sy = useSpring(y, { stiffness: 350, damping: 30 });
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section className="wv-sec wv-services" id="services">
      <div className="wv-wrap">
        <div className="wv-sec-head">
          <KineticTitle lines={["What we", "do best"]} accent={1} className="wv-h2" />
          <Reveal className="wv-sec-aside">
            <p>Four practices, one team. Pick one or let us run the whole growth engine for you.</p>
          </Reveal>
        </div>

        <div
          ref={ref}
          className="wv-svc-list"
          onPointerMove={(e) => {
            if (!ref.current) return;
            const r = ref.current.getBoundingClientRect();
            x.set(e.clientX - r.left);
            y.set(e.clientY - r.top);
          }}
          onPointerLeave={() => setHover(null)}
        >
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <Link href={s.href} className="wv-svc-row" onPointerEnter={() => setHover(i)}>
                <span className="wv-svc-n">0{i + 1}</span>
                <span className="wv-svc-t">
                  <HoverLetters text={s.title} />
                </span>
                <span className="wv-svc-d">{s.blurb}</span>
                <span className="wv-svc-go">
                  <Arrow size={22} />
                </span>
                <span className="wv-svc-mobile-img">
                  <Photo src={s.image} alt="" sizes="100vw" />
                </span>
              </Link>
            </Reveal>
          ))}
          <AnimatePresence>
            {hover !== null && !reduce && (
              <motion.div
                className="wv-svc-float"
                style={{ x: sx, y: sy }}
                initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25, ease }}
              >
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={hover}
                    className="wv-svc-float-in"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.35, ease }}
                  >
                    <Photo src={services[hover].image} alt="" sizes="320px" />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ================= 5 · stats ================= */
function Stats() {
  return (
    <section className="wv-stats" aria-label="Results">
      <div className="wv-wrap wv-stats-in">
        <KineticTitle lines={["Results that", "make noise"]} className="wv-h2 is-dark" />
        <div className="wv-stats-grid">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="wv-stat">
              <strong>
                <CountUp to={s.n} suffix={s.suffix} decimals={s.decimals} />
              </strong>
              <span>{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= 6 · work (sticky stacking cards) ================= */
function Work() {
  return (
    <section className="wv-sec wv-work" id="work">
      <div className="wv-wrap">
        <div className="wv-sec-head">
          <KineticTitle lines={["Featured", "projects"]} accent={1} className="wv-h2" />
          <Reveal className="wv-sec-aside">
            <p>A few launches we are proud of. Every one came with a number attached.</p>
            <Link href={`${BASE}/work`} className="wv-link">
              All case studies <Arrow size={14} />
            </Link>
          </Reveal>
        </div>
        <div className="wv-stack">
          {work.map((w, i) => (
            <WorkCard key={w.client} w={w} i={i} total={work.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({ w, i, total }: { w: (typeof work)[number]; i: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1 - (total - i) * 0.035]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 0.5]);
  return (
    <div ref={ref} className="wv-stack-slot" style={{ top: `calc(96px + ${i * 22}px)` }}>
      <motion.article className="wv-card" style={{ scale }}>
        <Link href={`${BASE}/work`} className="wv-card-link" aria-label={`${w.client}: ${w.title}`}>
          <div className="wv-card-img">
            <Photo src={w.image} alt={`${w.client} campaign`} sizes="(min-width: 960px) 60vw, 100vw" />
          </div>
          <div className="wv-card-body">
            <div className="wv-card-top">
              <span className="wv-card-client">{w.client}</span>
              <span className="wv-card-year">{w.year}</span>
            </div>
            <h3>{w.title}</h3>
            <div className="wv-card-tags">
              {w.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <div className="wv-card-metric">
              <strong>{w.metric}</strong>
              <span>{w.metricLabel}</span>
            </div>
            <span className="wv-card-go">
              View case <Arrow size={14} />
            </span>
          </div>
        </Link>
        <motion.div className="wv-card-dim" style={{ opacity: dim }} aria-hidden />
      </motion.article>
    </div>
  );
}

/* ================= 7 · process (pinned horizontal scroll) ================= */
function Process() {
  const wide = useWide();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (el) setDist(Math.max(0, el.scrollWidth - window.innerWidth + 48));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [wide]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -dist]);
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const pinned = wide && !reduce;

  return (
    <section ref={ref} id="process" className={`wv-process${pinned ? " is-pinned" : ""}`}>
      <div className="wv-process-sticky">
        <div className="wv-wrap wv-process-head">
          <KineticTitle lines={["How we", "get results"]} accent={1} className="wv-h2" />
          <p className="wv-sec-aside">Four steps. No mystery. You always know what we are doing this week and why.</p>
        </div>
        <motion.div ref={trackRef} className="wv-process-track" style={pinned ? { x } : undefined}>
          {process.map((p, i) => (
            <Reveal key={p.n} delay={pinned ? 0 : i * 0.05} className="wv-step">
              <span className="wv-step-n">{p.n}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </Reveal>
          ))}
          <div className="wv-step is-img">
            <Photo src={img.table} alt="Strategy session around a table" sizes="40vw" />
          </div>
        </motion.div>
        {pinned && (
          <div className="wv-wrap">
            <div className="wv-process-rail">
              <motion.i style={{ scaleX: line }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ================= 8 · testimonials ================= */
function Testimonials() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, [reduce, i]);
  const t = testimonials[i];
  return (
    <section className="wv-sec wv-quotes" aria-label="What clients say">
      <div className="wv-wrap wv-quotes-in">
        <div>
          <p className="wv-eyebrow is-y">( Client words )</p>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              className="wv-quote"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease }}
            >
              <p>
                {t.quote.split(" ").map((w, wi) => (
                  <motion.span
                    key={wi}
                    initial={reduce ? false : { opacity: 0, filter: "blur(6px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.35, delay: wi * 0.025 }}
                  >
                    {w}{" "}
                  </motion.span>
                ))}
              </p>
              <footer>
                <span className="wv-quote-av">
                  <Photo src={t.avatar} alt="" sizes="56px" />
                </span>
                <span>
                  <strong>{t.name}</strong>
                  <em>{t.role}</em>
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
          <div className="wv-quote-nav" role="tablist" aria-label="Choose testimonial">
            {testimonials.map((q, qi) => (
              <button
                key={q.name}
                role="tab"
                aria-selected={qi === i}
                aria-label={q.name}
                onClick={() => setI(qi)}
                className={qi === i ? "is-on" : ""}
              >
                <i />
              </button>
            ))}
          </div>
        </div>
        <ParallaxPhoto src={img.review} alt="Client review session at the studio" className="wv-quotes-img" sizes="(min-width: 960px) 36vw, 100vw" />
      </div>
    </section>
  );
}

/* ================= 9 · team ================= */
function Team() {
  return (
    <section className="wv-sec wv-team" id="team">
      <div className="wv-wrap">
        <div className="wv-sec-head">
          <KineticTitle lines={["Meet the", "makers"]} accent={1} className="wv-h2" />
          <Reveal className="wv-sec-aside">
            <p>Strategists, designers, editors and media buyers who sit at the same table and ship together.</p>
            <Link href={`${BASE}/careers`} className="wv-link">
              We are hiring <Arrow size={14} />
            </Link>
          </Reveal>
        </div>
        <div className="wv-team-grid">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.06} className="wv-member">
              <div className="wv-member-img">
                <Photo src={m.image} alt={m.name} sizes="(min-width: 960px) 25vw, 50vw" />
              </div>
              <div className="wv-member-tx">
                <strong>{m.name}</strong>
                <span>{m.role}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= 10 · CTA ================= */
function Cta() {
  return (
    <section className="wv-cta" id="contact">
      <VelocityMarquee items={["Let's talk", "Let's build", "Let's launch"]} baseVelocity={-3} className="is-cta" />
      <div className="wv-wrap wv-cta-in">
        <KineticTitle lines={["Got a brand", "worth shouting about?"]} accent={1} className="wv-h2" />
        <Reveal className="wv-cta-row is-center">
          <Magnetic strength={0.5}>
            <a href={`mailto:${contact.email}`} className="wv-cta-orb">
              <span>Start a project</span>
              <Arrow size={26} />
            </a>
          </Magnetic>
        </Reveal>
        <Reveal className="wv-cta-meta">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
          <span>{contact.city}</span>
        </Reveal>
      </div>
    </section>
  );
}

export function Vikreta() {
  return (
    <main>
      <Hero />
      <Band />
      <Manifesto />
      <Services />
      <Stats />
      <Work />
      <Process />
      <Testimonials />
      <Team />
      <Cta />
    </main>
  );
}
