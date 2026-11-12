"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { money } from "./cart";
import { BASE, food, houseRules, img, site, ticker } from "./data";
import { AddButton, Arrow, Photo, Reveal, Seal } from "./ui";

function Hero() {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 900], [1.05, 1.18]);
  const fade = useTransform(scrollY, [0, 500], [1, 0]);
  return (
    <section className="ch-hero">
      <motion.div className="ch-hero-bg" style={{ scale }}>
        <Photo src={img.hero} alt="Warm, wood-panelled dining room" priority sizes="100vw" />
      </motion.div>
      <div className="ch-hero-shade" />
      <motion.div className="ch-wrap ch-hero-in" style={{ opacity: fade }}>
        <Reveal y={16}>
          <Seal size={112} spin className="ch-hero-seal" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="ch-eyebrow ch-eyebrow-light">Irish restaurant &amp; bar · {site.city}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <h1 className="ch-display">
            A proper Irish welcome,
            <br />
            <em>in the heart of Atlanta.</em>
          </h1>
        </Reveal>
        <Reveal delay={0.35} className="ch-hero-cta">
          <Link href={`${BASE}/reserve`} className="ch-btn ch-btn-brass">
            Reserve a table <Arrow />
          </Link>
          <Link href={`${BASE}/menu`} className="ch-btn ch-btn-ghost">
            See the menu
          </Link>
        </Reveal>
      </motion.div>
      <div className="ch-ticker" aria-label="Today at Chauve">
        <div className="ch-ticker-track">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i}>
              {t}
              <i aria-hidden>✦</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Welcome() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);
  return (
    <section className="ch-section ch-welcome">
      <div className="ch-wrap ch-welcome-in" ref={ref}>
        <Reveal className="ch-welcome-txt">
          <p className="ch-eyebrow">Céad míle fáilte</p>
          <h2 className="ch-h2 ch-h2-big">
            A hundred thousand welcomes, <em>and a seat by the fire.</em>
          </h2>
          <p className="ch-lead-p">
            Chauve is an Irish restaurant built for long dinners and short visits that turn into long ones. Honest
            Irish cooking, a slow-poured stout, and a room that remembers your name.
          </p>
          <div className="ch-welcome-links">
            <Link href={`${BASE}/menu`} className="ch-link">
              The menu <Arrow />
            </Link>
            <Link href={`${BASE}/drinks`} className="ch-link">
              The bar <Arrow />
            </Link>
          </div>
        </Reveal>
        <div className="ch-welcome-art">
          <motion.div className="ch-welcome-a" style={{ y: y1 }}>
            <Photo src={img.stew} alt="Beef and stout stew" sizes="(min-width: 900px) 30vw, 60vw" />
          </motion.div>
          <motion.div className="ch-welcome-b" style={{ y: y2 }}>
            <Photo src={img.stout} alt="A pint of stout" sizes="(min-width: 900px) 22vw, 45vw" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const doors = [
  { k: "01", t: "The Menu", s: "Breakfast, lunch & dinner", href: `${BASE}/menu`, img: img.fish },
  { k: "02", t: "The Bar", s: "Pints, whiskey & cocktails", href: `${BASE}/drinks`, img: img.taps },
  { k: "03", t: "Specials", s: "Happy hour & the week ahead", href: `${BASE}/specials`, img: img.breakfast },
  { k: "04", t: "Parties", s: "From the Snug to a full buyout", href: `${BASE}/parties`, img: img.friends },
];

function Doors() {
  return (
    <section className="ch-section ch-doors-sec">
      <div className="ch-wrap">
        <Reveal className="ch-split-head">
          <h2 className="ch-h2">Come in through any door</h2>
          <p className="ch-dim">Four ways to spend an evening at Chauve.</p>
        </Reveal>
      </div>
      <div className="ch-doors">
        {doors.map((d, i) => (
          <Reveal key={d.t} delay={i * 0.08} className="ch-door-wrap">
            <Link href={d.href} className="ch-door">
              <Photo src={d.img} alt="" sizes="(min-width: 900px) 25vw, 80vw" />
              <span className="ch-door-shade" />
              <span className="ch-door-k">{d.k}</span>
              <span className="ch-door-txt">
                <strong>{d.t}</strong>
                <small>{d.s}</small>
              </span>
              <span className="ch-door-go" aria-hidden>
                <Arrow />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Signatures() {
  const picks = [food[1].items[0], food[1].items[1], food[3].items[0]];
  const pics = [img.fishTea, img.stew2, img.breakfast2];
  return (
    <section className="ch-section ch-sig">
      <div className="ch-wrap">
        <Reveal className="ch-split-head">
          <div>
            <p className="ch-eyebrow">From the kitchen</p>
            <h2 className="ch-h2">Three to start with</h2>
          </div>
          <p className="ch-dim">Add any of them to your reservation and they’ll be on the pass when you sit down.</p>
        </Reveal>
        <div className="ch-sig-grid">
          {picks.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1} className="ch-sig-card">
              <div className="ch-sig-img">
                <Photo src={pics[i]} alt={p.name} sizes="(min-width: 900px) 30vw, 90vw" />
              </div>
              <div className="ch-sig-body">
                <div className="ch-item-top">
                  <h3>{p.name}</h3>
                  <span className="ch-lead" aria-hidden />
                  <span className="ch-price">{money(p.price)}</span>
                </div>
                <p className="ch-item-desc">{p.desc}</p>
                <AddButton item={p} label="Pre-order" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartiesBand() {
  return (
    <section className="ch-band">
      <Photo src={img.friends2} alt="" sizes="100vw" className="ch-band-bg" />
      <div className="ch-band-shade" />
      <div className="ch-wrap ch-band-in">
        <Reveal>
          <p className="ch-eyebrow ch-eyebrow-light">Groups &amp; private parties</p>
          <h2 className="ch-h2 ch-h2-big ch-light">
            Your party,
            <br />
            <em>our snug.</em>
          </h2>
          <p className="ch-band-p">Birthdays, team nights, rehearsal dinners, wakes and welcomes. Ten guests or a hundred and twenty, we’ll build the evening around you.</p>
          <Link href={`${BASE}/parties`} className="ch-btn ch-btn-brass">
            Plan a party <Arrow />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Rules() {
  return (
    <section className="ch-section ch-rules">
      <div className="ch-wrap">
        <Reveal>
          <p className="ch-eyebrow">House rules</p>
        </Reveal>
        <ol className="ch-rules-list">
          {houseRules.map(([t, d], i) => (
            <li key={t}>
              <Reveal delay={i * 0.08}>
                <span className="ch-rules-n">{["I", "II", "III"][i]}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Gallery() {
  const shots = [
    [img.bar, "The bar"],
    [img.pour, "The pour"],
    [img.music, "Thursday session"],
    [img.whiskey, "Whiskey"],
    [img.room, "The room"],
    [img.pint, "The first pint"],
  ];
  return (
    <section className="ch-section ch-gallery-sec">
      <div className="ch-wrap">
        <Reveal className="ch-split-head">
          <h2 className="ch-h2">Inside Chauve</h2>
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="ch-link">
            Follow on Instagram <Arrow />
          </a>
        </Reveal>
        <div className="ch-gallery">
          {shots.map(([src, cap], i) => (
            <Reveal key={cap} delay={i * 0.06} className={`ch-g ch-g-${i + 1}`}>
              <Photo src={src} alt={cap} sizes="(min-width: 900px) 33vw, 50vw" />
              <span className="ch-g-cap">{cap}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section className="ch-section ch-visit">
      <div className="ch-wrap ch-visit-in">
        <Reveal className="ch-visit-card">
          <p className="ch-eyebrow">Find us</p>
          <h2 className="ch-h2">{site.city}</h2>
          <p className="ch-dim">{site.address}</p>
          <dl className="ch-hours">
            {site.hours.map(([d, h]) => (
              <div key={d}>
                <dt>{d}</dt>
                <dd>{h}</dd>
              </div>
            ))}
          </dl>
          <p className="ch-small">{site.kitchen}</p>
          <div className="ch-visit-cta">
            <Link href={`${BASE}/reserve`} className="ch-btn ch-btn-green">
              Reserve a table <Arrow />
            </Link>
            <a href={site.social.google} target="_blank" rel="noopener noreferrer" className="ch-link">
              Directions <Arrow />
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="ch-news">
          <p className="ch-eyebrow ch-eyebrow-light">The Chauve letter</p>
          <h3>Sessions, specials and the odd free pint.</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const f = e.currentTarget;
              f.querySelector(".ch-news-done")?.removeAttribute("hidden");
              f.reset();
            }}
          >
            <label htmlFor="news-email" className="ch-sr">
              Email address
            </label>
            <input id="news-email" type="email" required placeholder="you@example.com" autoComplete="email" />
            <button type="submit" className="ch-btn ch-btn-brass">
              Sign up
            </button>
            <p className="ch-news-done" hidden role="status">
              Thank you. You’re on the list.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <Doors />
      <Signatures />
      <PartiesBand />
      <Rules />
      <Gallery />
      <Visit />
    </>
  );
}
