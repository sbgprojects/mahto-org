"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
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
  clients,
  contact,
  faqs,
  heroWords,
  img,
  manifesto,
  marquee,
  posts,
  process,
  services,
  stats,
  svcHref,
  testimonials,
  tools,
  why,
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

function LogoItem({ name, src, h = 30 }: { name: string; src: string; h?: number }) {
  return (
    <span className="wv-client" style={{ height: h }}>
      <Image src={src} alt={name} width={160} height={h} unoptimized />
    </span>
  );
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
  const fade = useTransform(scrollY, [0, 600], [1, 0.25]);
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
              <span className="wv-dot" /> AI-first digital agency · Pune, India
            </p>
          </Reveal>
          <h1 className="wv-h1">
            <KineticTitle as="p" lines={["Websites, AI", "& systems that"]} className="wv-h1-a" delay={0.1} />
            <span className="wv-h1-rot">
              <RotatingWord words={heroWords} />
            </span>
          </h1>
          <Reveal delay={0.45} className="wv-hero-sub">
            <p>
              We design, build and grow the systems your business runs on: the website, the automation behind it, and
              the organic marketing that brings in leads. One team, from first audit to handover.
            </p>
            <div className="wv-cta-row">
              <Magnetic>
                <Link href={`${BASE}#contact`} className="wv-btn wv-btn-dark">
                  Book a free audit <Arrow size={15} />
                </Link>
              </Magnetic>
              <Link href={`${BASE}#work`} className="wv-btn wv-btn-ghost">
                See our work
              </Link>
            </div>
            <ul className="wv-hero-proof">
              <li>
                <Star /> Top Rated on Upwork
              </li>
              <li>100% Job Success</li>
              <li>68+ projects shipped</li>
            </ul>
          </Reveal>
        </div>

        <div className="wv-hero-art" aria-hidden>
          <motion.div
            className="wv-hero-img is-back"
            style={{ x: backX, y: backY }}
            initial={reduce ? false : { opacity: 0, y: 60, rotate: -8 }}
            animate={{ opacity: 1, y: 0, rotate: -4 }}
            transition={{ duration: 0.9, ease, delay: 0.25 }}
          >
            <Photo src={img.studio} alt="" priority sizes="(min-width: 960px) 28vw, 60vw" />
          </motion.div>
          <motion.div
            className="wv-hero-img is-front"
            style={{ x: frontX, y: frontY }}
            initial={reduce ? false : { opacity: 0, y: 80, rotate: 6 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ duration: 0.9, ease, delay: 0.4 }}
          >
            <Photo src={img.code} alt="" priority sizes="(min-width: 960px) 24vw, 50vw" />
          </motion.div>
          <motion.div
            className="wv-hero-tag is-a"
            style={{ x: frontX }}
            initial={reduce ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease, delay: 0.8 }}
          >
            <strong>6,360+</strong> hours saved for clients
          </motion.div>
          <motion.div
            className="wv-hero-tag is-b"
            style={{ x: backX, y: backY }}
            initial={reduce ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease, delay: 0.95 }}
          >
            <Star /> 20 hours cut to 1
          </motion.div>
          <motion.div
            className="wv-hero-spin"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 14, ease: "linear", repeat: Infinity }}
          >
            <svg viewBox="0 0 100 100">
              <defs>
                <path id="wv-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text>
                <textPath href="#wv-circle">BUILD · AUTOMATE · GROW · BUILD · AUTOMATE · GROW ·</textPath>
              </text>
            </svg>
            <Star className="wv-hero-spin-star" />
          </motion.div>
        </div>
      </motion.div>

      <div className="wv-hero-foot wv-wrap">
        <span>Trusted by founders and teams across the globe</span>
        <VelocityMarquee
          items={clients.map((c) => (
            <LogoItem key={c.name} name={c.name} src={c.src} />
          ))}
          label={`Clients: ${clients.map((c) => c.name).join(", ")}`}
          baseVelocity={-2}
          star={false}
          className="is-logos"
        />
      </div>
    </section>
  );
}

/* ================= 2 · marquee band ================= */
function Band() {
  return (
    <div className="wv-band" aria-label="Services">
      <VelocityMarquee items={marquee} baseVelocity={-4} className="is-band" />
    </div>
  );
}

/* ================= 3 · manifesto ================= */
function Manifesto() {
  return (
    <section className="wv-sec wv-manifesto" id="about">
      <div className="wv-wrap wv-manifesto-in">
        <div>
          <p className="wv-eyebrow">( Who we are )</p>
          <ScrollWords text={manifesto} className="wv-big-p" />
          <Reveal className="wv-manifesto-foot">
            <p>
              Split it across three vendors who have never spoken to each other, and the work falls apart. We keep it
              under one roof.
            </p>
            <Link href={`${BASE}/about`} className="wv-link">
              About the studio <Arrow size={14} />
            </Link>
          </Reveal>
        </div>
        <ParallaxPhoto
          src={img.huddle}
          alt="The Website Vikreta team in a planning session"
          className="wv-manifesto-img"
          sizes="(min-width: 960px) 34vw, 100vw"
        />
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
          <KineticTitle lines={["One team for", "every layer"]} accent={1} className="wv-h2" />
          <Reveal className="wv-sec-aside">
            <p>The automation, the website, and the organic growth that runs on it, built by the same people.</p>
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
            <Reveal key={s.id} delay={i * 0.04}>
              <Link href={svcHref(s)} className="wv-svc-row" onPointerEnter={() => setHover(i)}>
                <span className="wv-svc-n">0{i + 1}</span>
                <span className="wv-svc-t">
                  <HoverLetters text={s.title} />
                </span>
                <span className="wv-svc-d">
                  {s.blurb}
                  <span className="wv-svc-chips">
                    {s.chips.map((c) => (
                      <em key={c}>{c}</em>
                    ))}
                  </span>
                </span>
                <span className="wv-svc-go">
                  <Arrow size={22} />
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

        <Reveal className="wv-svc-note">
          <p>
            <strong>Not sure where to start?</strong> Book a free audit. We&apos;ll tell you honestly what&apos;s worth
            doing first, and what isn&apos;t.
          </p>
          <Link href={`${BASE}#contact`} className="wv-btn wv-btn-y wv-btn-sm">
            Book a free audit <Arrow size={14} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= 5 · stats ================= */
function Stats() {
  return (
    <section className="wv-stats" aria-label="The numbers so far">
      <div className="wv-wrap wv-stats-in">
        <KineticTitle lines={["Small team.", "Real results."]} className="wv-h2" />
        <div className="wv-stats-grid">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="wv-stat">
              <strong>
                <CountUp to={s.n} suffix={s.suffix} />
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
          <KineticTitle lines={["Work that", "moved numbers"]} accent={1} className="wv-h2" />
          <Reveal className="wv-sec-aside">
            <p>We don&apos;t pitch what we might do. Here&apos;s what we&apos;ve already shipped, and what it changed.</p>
            <Link href={`${BASE}/work`} className="wv-link">
              View all work <Arrow size={14} />
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
  const dim = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 0.35]);
  return (
    <div ref={ref} className="wv-stack-slot" style={{ top: `calc(96px + ${i * 22}px)` }}>
      <motion.article className="wv-card" style={{ scale }}>
        <Link href={`${BASE}/work/${w.slug}`} className="wv-card-link" aria-label={`${w.client}: ${w.title}`}>
          <div className="wv-card-img">
            <Photo src={w.image} alt="" sizes="(min-width: 960px) 55vw, 100vw" />
            <span className="wv-card-logo">
              <Image src={w.logo} alt={w.client} width={140} height={28} unoptimized />
            </span>
          </div>
          <div className="wv-card-body">
            <div className="wv-card-top">
              {w.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <div className="wv-card-metric">
              <strong>{w.from}</strong>
              <Arrow size={28} className="is-r" />
              <strong className="is-hl">{w.to}</strong>
            </div>
            <p className="wv-card-ml">{w.metricLabel}</p>
            <h3>{w.title}</h3>
            <p>{w.body}</p>
            <span className="wv-card-go">
              Read case study <Arrow size={14} />
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
          <KineticTitle lines={["How we", "work"]} accent={1} className="wv-h2" />
          <p className="wv-sec-aside">We listen before we touch anything. Four steps, the same on every project.</p>
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
            <Photo src={img.table} alt="Workshop with a client team" sizes="40vw" />
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

/* ================= 8 · why us + stack ================= */
function Why() {
  return (
    <section className="wv-sec wv-why">
      <div className="wv-wrap">
        <div className="wv-sec-head">
          <KineticTitle lines={["Why Website", "Vikreta"]} accent={1} className="wv-h2" />
        </div>
        <div className="wv-why-grid">
          {why.map((w, i) => (
            <Reveal key={w.t} delay={i * 0.06} className="wv-why-card">
              <span className="wv-why-n">0{i + 1}</span>
              <h3>{w.t}</h3>
              <p>{w.d}</p>
            </Reveal>
          ))}
        </div>
        <div className="wv-stack-row">
          <p className="wv-eyebrow">The AI stack we actually use</p>
          <VelocityMarquee
            items={tools.map((t) => (
              <LogoItem key={t.name} name={t.name} src={t.src} h={28} />
            ))}
            label={`Tools: ${tools.map((t) => t.name).join(", ")}`}
            baseVelocity={2}
            star={false}
            className="is-logos is-tools"
          />
        </div>
      </div>
    </section>
  );
}

/* ================= 9 · testimonials ================= */
function Testimonials() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6500);
    return () => clearInterval(t);
  }, [reduce, i]);
  const t = testimonials[i];
  return (
    <section className="wv-sec wv-quotes" aria-label="What our clients say">
      <div className="wv-wrap wv-quotes-in">
        <div>
          <p className="wv-eyebrow">( What our clients say )</p>
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
                    transition={{ duration: 0.35, delay: wi * 0.02 }}
                  >
                    {w}{" "}
                  </motion.span>
                ))}
              </p>
              <footer>
                <span className="wv-quote-av">
                  {t.avatar ? (
                    <Photo src={t.avatar} alt="" sizes="56px" />
                  ) : (
                    <span className="wv-quote-init">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  )}
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
          <a href={contact.upwork} target="_blank" rel="noreferrer" className="wv-link wv-quote-up">
            Top Rated on Upwork with 100% Job Success. Read our reviews <Arrow size={14} />
          </a>
        </div>
        <ParallaxPhoto
          src={img.review}
          alt="Client review session"
          className="wv-quotes-img"
          sizes="(min-width: 960px) 36vw, 100vw"
        />
      </div>
    </section>
  );
}

/* ================= 10 · FAQ ================= */
function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="wv-sec wv-faq">
      <div className="wv-wrap wv-faq-in">
        <div>
          <KineticTitle lines={["Questions,", "answered"]} accent={1} className="wv-h2" />
          <Reveal className="wv-sec-aside wv-faq-aside">
            <p>Still unsure? Ask us directly. We reply fast.</p>
            <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="wv-link">
              Message us on WhatsApp <Arrow size={14} />
            </a>
          </Reveal>
        </div>
        <div className="wv-faq-list">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04} className={`wv-faq-item${isOpen ? " is-open" : ""}`}>
                <button aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
                  <span>{f.q}</span>
                  <span className={`wv-plus${isOpen ? " is-open" : ""}`} aria-hidden />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="wv-faq-a"
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================= 11 · blog ================= */
function Blog() {
  return (
    <section className="wv-sec wv-blog">
      <div className="wv-wrap">
        <div className="wv-sec-head">
          <KineticTitle lines={["The thinking", "behind the work"]} accent={1} className="wv-h2" />
          <Reveal className="wv-sec-aside">
            <Link href={`${BASE}/blog`} className="wv-link">
              All articles <Arrow size={14} />
            </Link>
          </Reveal>
        </div>
        <div className="wv-blog-grid">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link href={`${BASE}/blog/${p.slug}`} className="wv-post">
                <div className="wv-post-img">
                  <Photo src={p.image} alt="" sizes="(min-width: 960px) 33vw, 100vw" />
                </div>
                <span className="wv-post-cat">
                  0{i + 1} · {p.cat}
                </span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
                <span className="wv-card-go">
                  Read article <Arrow size={14} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= 12 · contact ================= */
function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [
      `Name: ${f.get("name")}`,
      `Email: ${f.get("email")}`,
      `Phone: ${f.get("phone") || "-"}`,
      `Interested in: ${f.get("interest")}`,
      "",
      String(f.get("message") || ""),
    ].join("\n");
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      "New project enquiry",
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  return (
    <section className="wv-contact" id="contact">
      <VelocityMarquee items={["Let's talk", "Let's build", "Let's automate"]} baseVelocity={-3} className="is-cta" />
      <div className="wv-wrap">
        <div className="wv-contact-card">
          <div className="wv-contact-copy">
            <p className="wv-eyebrow is-y">Free 30-minute call</p>
            <KineticTitle lines={["Tell us what", "you're building"]} accent={1} className="wv-h2 is-contact" />
            <p className="wv-contact-lead">
              Or what isn&apos;t working. No pitch, no commitment. We&apos;ll look at what you&apos;re doing by hand and
              tell you exactly what we&apos;d fix first.
            </p>
            <ol className="wv-contact-steps">
              <li>Tell us what you&apos;re building, or what isn&apos;t working</li>
              <li>We map where the time and leads are leaking</li>
              <li>You leave with a clear next step, even if it&apos;s not us</li>
            </ol>
            <div className="wv-contact-links">
              <a href={contact.calendly} target="_blank" rel="noreferrer" className="wv-btn wv-btn-y">
                Book on Calendly <Arrow size={14} />
              </a>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="wv-btn wv-btn-ghost is-light">
                WhatsApp us
              </a>
            </div>
            <p className="wv-contact-meta">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
            </p>
          </div>
          <form className="wv-form" onSubmit={onSubmit}>
            <label>
              <span>Name</span>
              <input name="name" required autoComplete="name" />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" required autoComplete="email" />
            </label>
            <label>
              <span>Phone</span>
              <input name="phone" type="tel" autoComplete="tel" />
            </label>
            <label>
              <span>I&apos;m interested in</span>
              <select name="interest" defaultValue={services[0].title}>
                {services.map((s) => (
                  <option key={s.id}>{s.title}</option>
                ))}
                <option>Not sure yet</option>
              </select>
            </label>
            <label className="is-full">
              <span>What are you working on?</span>
              <textarea name="message" rows={4} />
            </label>
            <button type="submit" className="wv-btn wv-btn-y is-full">
              {sent ? "Opening your email app…" : "Send message"} <Arrow size={14} />
            </button>
          </form>
        </div>
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
      <Why />
      <Testimonials />
      <Faq />
      <Blog />
      <Contact />
    </main>
  );
}
