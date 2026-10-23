"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import {
  built,
  img,
  initiatives,
  media,
  nav,
  news,
  outcomes,
  partners,
  recognitions,
  stats,
  voices,
  why,
} from "./data";
import { Arrow, CountUp, ImageReveal, Lines, Photo, Play, Reveal, Smooth, smooth } from "./ui";

/* ================= header ================= */
function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 48);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (open) smooth.lenis?.stop();
    else smooth.lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      smooth.lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={`cb-header ${solid && !open ? "is-solid" : ""} ${open ? "is-open" : ""}`}>
        <div className="cb-wrap cb-header-in">
          <a href="#top" className="cb-logo" aria-label="Capabl home" onClick={() => setOpen(false)}>
            capabl<i />
          </a>
          <nav className="cb-nav" aria-label="Primary">
            {nav.map((n) => (
              <a key={n.h} href={n.h}>
                {n.l}
              </a>
            ))}
          </nav>
          <a href="#meet" className="cb-btn cb-btn-solid cb-header-cta">
            Book an Institutional Meeting
          </a>
          <button
            type="button"
            className="cb-burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="cb-drawer"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <ul>
              {nav.map((n, i) => (
                <motion.li
                  key={n.h}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a href={n.h} onClick={() => setOpen(false)}>
                    {n.l}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href="#meet" className="cb-btn cb-btn-light" onClick={() => setOpen(false)}>
              Book an Institutional Meeting <Arrow />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================= 1 · hero ================= */
function Hero() {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 900], [1.04, 1.16]);
  const shift = useTransform(scrollY, [0, 900], ["0%", "8%"]);
  return (
    <section id="top" className="cb-hero">
      <motion.div className="cb-hero-bg" style={{ scale, y: shift }}>
        <Photo src={img.hero} alt="Students walking across a university campus" priority sizes="100vw" />
      </motion.div>
      <div className="cb-hero-shade" />
      <div className="cb-wrap cb-hero-in">
        <Lines
          as="h1"
          className="cb-h1"
          lines={["Building", "Future-Ready", "Institutions"]}
          delay={0.15}
        />
        <Reveal delay={0.55} className="cb-hero-sub">
          <p>
            Helping institutions prepare students, empower faculty and foster innovation through AI
            and EV.
          </p>
          <div className="cb-cta-row">
            <a href="#meet" className="cb-btn cb-btn-light">
              Book an Institutional Meeting <Arrow />
            </a>
            <a href="#initiatives" className="cb-link cb-link-light">
              Explore Initiatives <Arrow />
            </a>
          </div>
        </Reveal>
      </div>
      <span className="cb-scrollcue" aria-hidden>
        <i />
      </span>
    </section>
  );
}

/* ================= 2 · recognitions ================= */
function Recognitions() {
  const row = [...recognitions, ...recognitions];
  return (
    <section className="cb-trust" aria-label="Trusted by">
      <div className="cb-wrap cb-trust-in">
        <p className="cb-label">Trusted by</p>
        <div className="cb-marquee" aria-hidden>
          <div className="cb-marquee-track">
            {[...row, ...row].map((r, i) => (
              <span key={i} className="cb-mark">
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= 3 · the campus we help build ================= */
function Campus() {
  return (
    <section className="cb-section cb-campus">
      <div className="cb-wrap cb-campus-in">
        <div className="cb-campus-head">
          <Lines lines={["The Campus", "We Help Build"]} className="cb-h2" />
          <Reveal delay={0.2}>
            <p className="cb-lead">
              Institutions thrive when students gain practical exposure, faculty continuously evolve
              and innovation becomes part of campus life.
            </p>
            <p className="cb-lead cb-strong">Capabl exists to help build exactly that.</p>
          </Reveal>
          <Reveal delay={0.3} className="cb-bottomline">
            Every Capabl initiative contributes to these three outcomes.
          </Reveal>
        </div>

        <ol className="cb-outcomes">
          {outcomes.map((o) => (
            <li key={o.n} className="cb-outcome">
              <ImageReveal className="cb-outcome-img">
                <Photo src={o.img} alt={o.t} sizes="(min-width: 900px) 40vw, 100vw" />
              </ImageReveal>
              <Reveal className="cb-outcome-txt">
                <span className="cb-num">{o.n}</span>
                <h3>{o.t}</h3>
                <p>{o.d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ================= 4 · impact ================= */
function Impact() {
  return (
    <section id="impact" className="cb-impact">
      <div className="cb-wrap">
        <p className="cb-label cb-label-light">Our Impact</p>
        <div className="cb-lead-stat">
          <span className="cb-big">
            <CountUp to={stats.lead.v} suffix={stats.lead.s} />
            <em>{stats.lead.u}</em>
          </span>
          <span className="cb-stat-l">{stats.lead.l}</span>
        </div>
        <dl className="cb-stats">
          {stats.rest.map((s) => (
            <Reveal key={s.l} className="cb-stat">
              <dt>{s.l}</dt>
              <dd>
                <CountUp to={s.v} suffix={s.s} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ================= 5 · initiatives ================= */
function Initiatives() {
  return (
    <section id="initiatives" className="cb-section">
      <div className="cb-wrap">
        <div className="cb-split-head">
          <Lines lines={["Our", "Initiatives"]} className="cb-h2" />
          <Reveal delay={0.15}>
            <p className="cb-lead">Choose the initiative that best fits your institution’s goals.</p>
          </Reveal>
        </div>

        <div className="cb-products">
          {initiatives.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.12} className="cb-product-wrap">
              <article className="cb-product">
                <Photo src={p.img} alt={p.t} sizes="(min-width: 900px) 50vw, 100vw" />
                <div className="cb-product-shade" />
                <span className="cb-tag">{p.k}</span>
                <div className="cb-product-body">
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                  <div className="cb-chips">
                    <a href="#meet" className="cb-chip">
                      {p.a}
                    </a>
                    <a href="#meet" className="cb-chip cb-chip-solid">
                      {p.b}
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="cb-center">
          <a href="#meet" className="cb-btn cb-btn-solid">
            Host Capabl at your Campus <Arrow />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= 6 · across campuses ================= */
function Updates() {
  return (
    <section id="updates" className="cb-section cb-tint">
      <div className="cb-wrap">
        <div className="cb-split-head">
          <Lines lines={["Latest Across", "Campuses"]} className="cb-h2" />
          <Reveal delay={0.15}>
            <p className="cb-lead">Recent collaborations and initiatives across India.</p>
          </Reveal>
        </div>
      </div>
      <div className="cb-news">
        {news.map((n, i) => (
          <Reveal key={n.t} delay={i * 0.1} className="cb-news-item">
            <a href="#updates" className="cb-card-link">
              <div className="cb-news-img">
                <Photo src={n.img} alt={n.t} sizes="(min-width: 900px) 33vw, 80vw" />
              </div>
              <span className="cb-label">{n.tag}</span>
              <h3>{n.t}</h3>
              <span className="cb-link">
                Read Story <Arrow />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
      <div className="cb-wrap cb-right">
        <a href="#updates" className="cb-link">
          View All Updates <Arrow />
        </a>
      </div>
    </section>
  );
}

/* ================= 7 · why institutions choose capabl ================= */
function Why() {
  return (
    <section className="cb-section cb-why">
      <div className="cb-wrap cb-why-in">
        <div className="cb-why-head">
          <Lines lines={["Why Institutions", "Choose Capabl"]} className="cb-h2" />
          <Reveal delay={0.15}>
            <p className="cb-lead">
              Designed to make implementation easy while delivering meaningful learning experiences.
            </p>
            <a href="#meet" className="cb-btn cb-btn-solid">
              Host an Initiative at Your Institution <Arrow />
            </a>
          </Reveal>
        </div>
        <ul className="cb-why-list">
          {why.map((w, i) => (
            <li key={w.t}>
              <Reveal className="cb-why-item">
                <span className="cb-num">0{i + 1}</span>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ================= 8 · voices ================= */
function Voices() {
  const [open, setOpen] = useState<number | null>(null);
  const v = open === null ? null : voices[open];

  useEffect(() => {
    if (open === null) return;
    smooth.lenis?.stop();
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", key);
    return () => {
      smooth.lenis?.start();
      window.removeEventListener("keydown", key);
    };
  }, [open]);

  return (
    <section id="stories" className="cb-section">
      <div className="cb-wrap">
        <div className="cb-split-head">
          <Lines lines={["Hear From", "Our Partners"]} className="cb-h2" />
          <Reveal delay={0.15}>
            <p className="cb-lead">Stories from institutional leaders, faculty members and students.</p>
          </Reveal>
        </div>
      </div>
      <div className="cb-voices">
        {voices.map((s, i) => (
          <Reveal key={s.role} delay={i * 0.1} className="cb-voice-item">
            <button type="button" className="cb-voice" onClick={() => setOpen(i)} aria-label={`Play ${s.role}`}>
              <Photo src={s.img} alt={s.role} sizes="(min-width: 900px) 33vw, 78vw" />
              <span className="cb-voice-shade" />
              <span className="cb-play">
                <Play />
              </span>
              <span className="cb-voice-cap">
                <strong>{s.role}</strong>
                <small>{s.who}</small>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {v && (
          <motion.div
            className="cb-modal"
            role="dialog"
            aria-modal="true"
            aria-label={v.role}
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <div className="cb-modal-box" onClick={(e) => e.stopPropagation()}>
              {v.video ? (
                <iframe
                  src={`https://www.youtube.com/embed/${v.video}?autoplay=1&rel=0`}
                  title={v.role}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <Photo src={v.img} alt={v.role} sizes="90vw" />
                  <div className="cb-modal-note">
                    <strong>{v.role}</strong>
                    <span>Video to be added</span>
                  </div>
                </>
              )}
              <button type="button" className="cb-close" aria-label="Close video" onClick={() => setOpen(null)}>
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ================= 9 · built at capabl ================= */
function Built() {
  return (
    <section className="cb-section cb-built">
      <div className="cb-wrap">
        <div className="cb-split-head">
          <Lines lines={["Built at", "Capabl"]} className="cb-h2" />
          <Reveal delay={0.15}>
            <p className="cb-lead">
              Every initiative creates something participants can build, demonstrate or take forward.
            </p>
          </Reveal>
        </div>
        <div className="cb-bento">
          {built.map((b, i) => (
            <ImageReveal key={b.t} className={`cb-tile cb-tile-${i + 1}`}>
              <Photo src={b.img} alt={b.t} sizes="(min-width: 900px) 40vw, 100vw" />
              <span className="cb-tile-shade" />
              <span className="cb-tile-cap">{b.t}</span>
            </ImageReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= 10 · partner institutions ================= */
function Partners() {
  return (
    <section className="cb-section cb-partners">
      <div className="cb-wrap">
        <Lines lines={["Trusted by Leading", "Institutions"]} className="cb-h2" />
        <Reveal className="cb-wall">
          {partners.map((p) => {
            const mono = p
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 3);
            return (
              <div key={p} className="cb-crest">
                <span>{mono}</span>
                <small>{p}</small>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/* ================= 11 · media ================= */
function Media() {
  const [hover, setHover] = useState(0);
  return (
    <section id="media" className="cb-section cb-media">
      <div className="cb-wrap">
        <div className="cb-split-head">
          <Lines lines={["Capabl", "in Media"]} className="cb-h2" />
          <Reveal delay={0.15}>
            <p className="cb-lead">Featured across national and regional media.</p>
          </Reveal>
        </div>

        <div className="cb-media-grid">
          <ul className="cb-media-list">
            {media.map((m, i) => (
              <li key={m.t} onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)}>
                <a href="#media" className={hover === i ? "is-on" : ""}>
                  <span className="cb-num">0{i + 1}</span>
                  <span className="cb-media-t">{m.t}</span>
                  <span className="cb-media-thumb" aria-hidden>
                    <Photo src={m.img} alt="" sizes="96px" />
                  </span>
                  <Arrow size={22} />
                </a>
              </li>
            ))}
          </ul>
          <div className="cb-media-preview" aria-hidden>
            {media.map((m, i) => (
              <div key={m.t} className={`cb-preview ${hover === i ? "is-on" : ""}`}>
                <Photo src={m.img} alt="" sizes="40vw" />
              </div>
            ))}
          </div>
        </div>

        <div className="cb-right">
          <a href="#media" className="cb-link">
            View All Media <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ================= 12 · final CTA + footer ================= */
function Finale() {
  return (
    <section id="meet" className="cb-final">
      <Photo src={img.crowd} alt="" sizes="100vw" className="cb-final-bg" />
      <div className="cb-final-shade" />
      <div className="cb-wrap cb-final-in">
        <Lines
          lines={["Let’s Build a", "Future-Ready Campus", "Together."]}
          className="cb-h1 cb-h1-final"
        />
        <Reveal delay={0.3}>
          <p className="cb-final-p">
            Whether you’re planning an AI initiative, an EV programme or a long-term Centre of
            Excellence, we’d love to understand your institution and recommend the right approach.
          </p>
          <a href="mailto:hello@capabl.in?subject=Host%20Capabl%20at%20our%20campus" className="cb-btn cb-btn-light">
            Host Capabl at your Campus <Arrow />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="cb-footer">
      <div className="cb-wrap cb-footer-in">
        <a href="#top" className="cb-logo cb-logo-light" aria-label="Capabl home">
          capabl<i />
        </a>
        <nav aria-label="Footer">
          {nav.map((n) => (
            <a key={n.h} href={n.h}>
              {n.l}
            </a>
          ))}
        </nav>
        <p>© {new Date().getFullYear()} Capabl. Institution transformation partner.</p>
      </div>
    </footer>
  );
}

export function Capabl() {
  return (
    <>
      <Smooth />
      <Header />
      <main>
        <Hero />
        <Recognitions />
        <Campus />
        <Impact />
        <Initiatives />
        <Updates />
        <Why />
        <Voices />
        <Built />
        <Partners />
        <Media />
        <Finale />
      </main>
      <Footer />
    </>
  );
}
