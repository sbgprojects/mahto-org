"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { couple, events, families, img, MAIN_EVENT, type Event } from "./data";

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------- personalisation: /wedding-invite?to=Name ---------- */
const noop = () => () => {};
function useGuest() {
  return useSyncExternalStore(
    noop,
    () => (new URLSearchParams(window.location.search).get("to") || "").trim().slice(0, 40),
    () => "",
  );
}

/* ---------- live clock for the countdown ---------- */
function useNow() {
  return useSyncExternalStore(
    (cb) => {
      const id = setInterval(cb, 1000);
      return () => clearInterval(id);
    },
    () => Math.floor(Date.now() / 1000),
    () => 0,
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 26, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- small hand-drawn motifs ---------- */
function Motif({ name }: { name: Event["icon"] }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 48 48" width="44" height="44" aria-hidden className={`wi-motif wi-motif-${name}`}>
      {name === "leaf" && (
        <g {...p}>
          <path d="M24 42C10 32 10 14 24 6c14 8 14 26 0 36Z" />
          <path d="M24 10v30M24 18l-6-4M24 24l7-5M24 30l-7-4M24 35l6-4" />
        </g>
      )}
      {name === "dhol" && (
        <g {...p}>
          <ellipse cx="10" cy="24" rx="5" ry="11" />
          <ellipse cx="38" cy="24" rx="5" ry="11" />
          <path d="M10 13h28M10 35h28M14 14l8 20M22 14l8 20M30 14l6 18M18 34l8-20M26 34l8-20" />
        </g>
      )}
      {name === "gaagar" && (
        <g {...p}>
          <path d="M14 30c0 7 4 12 10 12s10-5 10-12-4-10-10-10-10 3-10 10ZM19 21l1-4h8l1 4" />
          <path className="wi-flame" d="M24 4c3 4 3 7 0 9-3-2-3-5 0-9Z" fill="currentColor" />
          <path className="wi-flame wi-flame-2" d="M15 9c2 3 2 5 0 6-2-1-2-3 0-6ZM33 9c2 3 2 5 0 6-2-1-2-3 0-6Z" fill="currentColor" />
          <path d="M14 30h20" />
        </g>
      )}
      {name === "bangles" && (
        <g {...p}>
          <ellipse cx="24" cy="14" rx="16" ry="5" />
          <ellipse cx="24" cy="21" rx="16" ry="5" />
          <ellipse cx="24" cy="28" rx="16" ry="5" />
          <ellipse cx="24" cy="35" rx="16" ry="5" />
        </g>
      )}
      {name === "laavan" && (
        <g {...p}>
          <circle cx="24" cy="24" r="19" />
          <circle cx="24" cy="24" r="14" />
          <circle cx="24" cy="24" r="9" />
          <circle cx="24" cy="24" r="4" />
        </g>
      )}
      {name === "lights" && (
        <g {...p}>
          <path d="M4 10c10 8 30 8 40 0" />
          {[9, 17, 24, 31, 39].map((x, i) => (
            <g key={x}>
              <path d={`M${x} ${12 + (i % 2 ? 2 : 0)}v6`} />
              <circle cx={x} cy={21 + (i % 2 ? 2 : 0)} r="2.6" fill="currentColor" className="wi-twinkle" style={{ animationDelay: `${i * 0.3}s` }} />
            </g>
          ))}
          <path d="M14 44l4-12h12l4 12" />
        </g>
      )}
    </svg>
  );
}

/** A diya flame — the "light" in Roshan. */
function Flame({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 110" className={`wi-diya ${className}`} aria-hidden>
      <defs>
        <radialGradient id="wi-fl" cx="50%" cy="65%" r="60%">
          <stop offset="0%" stopColor="#fff6d8" />
          <stop offset="45%" stopColor="#ffcf6b" />
          <stop offset="100%" stopColor="#e2851f" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="30" cy="52" rx="26" ry="40" fill="url(#wi-fl)" opacity=".55" />
      <path className="wi-flicker" d="M30 14c10 16 14 26 14 36a14 14 0 0 1-28 0c0-10 4-20 14-36Z" fill="#ffd27a" />
      <path className="wi-flicker" d="M30 32c5 8 7 13 7 18a7 7 0 0 1-14 0c0-5 2-10 7-18Z" fill="#fff4d6" />
      <path d="M8 84c0 12 10 20 22 20s22-8 22-20H8Z" fill="#c9a24a" />
      <path d="M8 84h44" stroke="#8a6a23" strokeWidth="2" />
    </svg>
  );
}

/* ---------- 0 · shagun envelope ---------- */
function Envelope({ guest, onOpen }: { guest: string; onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const reduce = useReducedMotion();
  const open = () => {
    setOpening(true);
    setTimeout(onOpen, reduce ? 50 : 1700);
  };
  return (
    <motion.div className="wi-env-wrap" exit={{ opacity: 0 }} transition={{ duration: 0.9 }}>
      <div className="wi-env-stage">
        <p className="wi-env-to">{guest ? `For ${guest}` : "For you & your family"}</p>
        <div className={`wi-env ${opening ? "is-open" : ""}`}>
          <div className="wi-env-back" />
          <div className="wi-env-card">
            <span className="wi-pa">ੴ</span>
            <span>Roshan &amp; Roshan</span>
          </div>
          <div className="wi-env-front" />
          <div className="wi-env-flap" />
          <button type="button" className="wi-seal" onClick={open} disabled={opening} aria-label="Open the invitation">
            <span>R</span>
            <i>&amp;</i>
            <span>R</span>
          </button>
        </div>
        <p className="wi-env-hint">{opening ? "With love…" : "Tap the seal to open"}</p>
      </div>
    </motion.div>
  );
}

/* ---------- 1 · blessing + names ---------- */
function Opening({ guest }: { guest: string }) {
  return (
    <section className="wi-open">
      <div className="wi-frame" aria-hidden />
      <Reveal className="wi-blessing">
        <p className="wi-onkar">ੴ</p>
        <p className="wi-pa wi-fateh">ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖ਼ਾਲਸਾ ॥ ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫ਼ਤਹਿ ॥</p>
        <p className="wi-small">With the blessings of Waheguru</p>
      </Reveal>
      <Reveal delay={0.2} className="wi-names-wrap">
        <p className="wi-kicker">{guest ? `Dear ${guest}, you are invited to the wedding of` : "You are invited to the wedding of"}</p>
        <h1 className="wi-names">
          <span>
            Roshan <em>Singh</em>
          </span>
          <span className="wi-amp">&amp;</span>
          <span>
            Roshan <em>Kaur</em>
          </span>
        </h1>
        <p className="wi-pa wi-names-pa">
          {couple.groom.pa} <span>ਅਤੇ</span> {couple.bride.pa}
        </p>
        <div className="wi-dateline">
          <span>{couple.dateLine}</span>
          <i aria-hidden>✦</i>
          <span>{couple.city}</span>
        </div>
      </Reveal>
      <p className="wi-scroll" aria-hidden>
        scroll slowly
      </p>
    </section>
  );
}

/* ---------- 2 · two lights become one ---------- */
function TwoLights() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Px offsets: start well apart (capped on wide screens), end almost touching.
  const gap = (p: number) => {
    const t = Math.min(1, Math.max(0, p / 0.75));
    const start = typeof window === "undefined" ? 120 : Math.min(window.innerWidth * 0.24, 260);
    return start + (28 - start) * t;
  };
  const left = useTransform(scrollYProgress, (p) => -gap(p));
  const right = useTransform(scrollYProgress, (p) => gap(p));
  const names = useTransform(scrollYProgress, [0.5, 0.66], [1, 0]);
  const glow = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);
  const l1 = useTransform(scrollYProgress, [0, 0.12, 0.3, 0.4], [0, 1, 1, 0]);
  const l2 = useTransform(scrollYProgress, [0.35, 0.45, 0.62, 0.7], [0, 1, 1, 0]);
  const l3 = useTransform(scrollYProgress, [0.72, 0.85], [0, 1]);
  return (
    <section ref={ref} className="wi-lights" aria-label="Roshan means light">
      <div className="wi-lights-stick">
        <div className="wi-lines">
          <motion.p style={{ opacity: l1 }}>
            <span className="wi-pa">ਰੋਸ਼ਨ</span> means <em>light.</em>
          </motion.p>
          <motion.p style={{ opacity: l2 }}>
            He is a Roshan. <em>So is she.</em>
          </motion.p>
          <motion.p style={{ opacity: l3 }}>
            Two lights, <em>one home.</em>
          </motion.p>
        </div>
        <div className="wi-flames">
          <motion.div className="wi-glow" style={{ opacity: glow }} />
          <motion.p className="wi-flame-one" style={{ opacity: l3 }}>
            Roshan &amp; Roshan
          </motion.p>
          <motion.div style={{ x: left }}>
            <Flame />
            <motion.span className="wi-flame-name" style={{ opacity: names }}>
              Roshan Singh
            </motion.span>
          </motion.div>
          <motion.div style={{ x: right }}>
            <Flame />
            <motion.span className="wi-flame-name" style={{ opacity: names }}>
              Roshan Kaur
            </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3 · the letter ---------- */
function Letter({ guest }: { guest: string }) {
  return (
    <section className="wi-letter-sec">
      <Reveal className="wi-letter">
        <p className="wi-pa wi-letter-pa">ਸੱਦਾ ਪੱਤਰ</p>
        <p className="wi-letter-hi">{guest ? `Dear ${guest},` : "Dear friends and family,"}</p>
        <p>
          With the blessings of Waheguru and the love of both our families, we joyfully invite you to celebrate the
          Anand Karaj of our children, <b>Roshan Singh</b> and <b>Roshan Kaur</b>.
        </p>
        <p>Three days of mehndi, music, a midnight jaggo and four sacred rounds. It would not feel complete without you.</p>
        <div className="wi-families">
          <div>
            <p className="wi-fam">{families.groom.name}</p>
            <p className="wi-small">{families.groom.parents}</p>
          </div>
          <span aria-hidden>❦</span>
          <div>
            <p className="wi-fam">{families.bride.name}</p>
            <p className="wi-small">{families.bride.parents}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- 4 · the thread of events ---------- */
function toICS(list: Event[]) {
  const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const body = list
    .map(
      (e) =>
        `BEGIN:VEVENT\r\nUID:${e.id}@two-roshans\r\nDTSTAMP:${stamp(new Date().toISOString())}\r\nDTSTART:${stamp(e.start)}\r\nDTEND:${stamp(e.end)}\r\nSUMMARY:${e.en} · Roshan & Roshan\r\nLOCATION:${e.venue}\\, ${e.area}\r\nDESCRIPTION:Dress: ${e.dress}\r\nEND:VEVENT`,
    )
    .join("\r\n");
  return `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Two Roshans//Invite//EN\r\n${body}\r\nEND:VCALENDAR`;
}
function downloadICS(list: Event[], name: string) {
  const url = URL.createObjectURL(new Blob([toICS(list)], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const mapsUrl = (e: Event) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${e.venue}, ${e.area}`)}`;

function Thread() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  return (
    <section className="wi-events" aria-labelledby="wi-ev-h">
      <Reveal className="wi-sec-head">
        <p className="wi-kicker">Three days in Amritsar</p>
        <h2 id="wi-ev-h" className="wi-h2">
          The celebrations, <em>stitched together</em>
        </h2>
      </Reveal>
      <div ref={ref} className="wi-thread-wrap">
        <div className="wi-thread" aria-hidden>
          <motion.div className="wi-thread-fill" style={{ scaleY: scrollYProgress }} />
        </div>
        <ol className="wi-ev-list">
          {events.map((e, i) => (
            <li key={e.id} className={`wi-ev ${i % 2 ? "is-right" : ""}`} style={{ "--acc": e.accent } as React.CSSProperties}>
              <span className="wi-knot" aria-hidden />
              <Reveal className="wi-card">
                <div className="wi-card-top">
                  <Motif name={e.icon} />
                  <div>
                    <p className="wi-day">{e.day}</p>
                    <h3>
                      {e.en} <span className="wi-pa">{e.pa}</span>
                    </h3>
                  </div>
                </div>
                <p className="wi-time">{e.time}</p>
                <p className="wi-note">{e.note}</p>
                <dl className="wi-meta">
                  <div>
                    <dt>Where</dt>
                    <dd>
                      {e.venue}, {e.area}
                    </dd>
                  </div>
                  <div>
                    <dt>Wear</dt>
                    <dd>{e.dress}</dd>
                  </div>
                </dl>
                {e.family && <p className="wi-family">Close family</p>}
                <div className="wi-card-links">
                  <a href={mapsUrl(e)} target="_blank" rel="noopener noreferrer">
                    Map
                  </a>
                  <button type="button" onClick={() => downloadICS([e], `${e.id}.ics`)}>
                    Add to calendar
                  </button>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- 5 · countdown, in dhol beats ---------- */
function Countdown() {
  const now = useNow();
  const target = Math.floor(new Date(MAIN_EVENT.start).getTime() / 1000);
  const left = Math.max(0, target - now);
  const parts: [string, number][] = [
    ["days", Math.floor(left / 86400)],
    ["hours", Math.floor((left % 86400) / 3600)],
    ["minutes", Math.floor((left % 3600) / 60)],
    ["seconds", left % 60],
  ];
  return (
    <section className="wi-count" aria-label="Countdown to the Anand Karaj">
      <Reveal>
        <p className="wi-kicker">Until the Anand Karaj</p>
        <div className="wi-count-row">
          {parts.map(([label, v]) => (
            <div key={label} className="wi-beat">
              <span className="wi-beat-n" suppressHydrationWarning>
                {now ? String(v).padStart(2, "0") : "··"}
              </span>
              <span className="wi-beat-l">{label}</span>
            </div>
          ))}
        </div>
        <p className="wi-small">Every second, one more beat of the dhol.</p>
      </Reveal>
    </section>
  );
}

/* ---------- 6 · Amritsar ---------- */
function City() {
  return (
    <section className="wi-city">
      <div className="wi-city-img">
        <Image src={img.amritsar} alt="Harmandir Sahib at night, Amritsar" fill sizes="(min-width: 900px) 45vw, 100vw" />
      </div>
      <Reveal className="wi-city-txt">
        <p className="wi-kicker">Come home to Amritsar</p>
        <h2 className="wi-h2">
          The city of <em>golden evenings</em>
        </h2>
        <ul className="wi-travel">
          <li>
            <b>Flying in</b> Sri Guru Ram Dass Jee International Airport (ATQ), about 25 minutes from every venue.
          </li>
          <li>
            <b>Staying</b> We have held rooms close to the venues. Tell us in your RSVP and we will arrange it.
          </li>
          <li>
            <b>Getting around</b> Cars will run between the hotel and every event.
          </li>
        </ul>
      </Reveal>
    </section>
  );
}

/* ---------- 7 · RSVP ---------- */
function Rsvp({ guest }: { guest: string }) {
  const [name, setName] = useState("");
  const [count, setCount] = useState(2);
  const open = events.filter((e) => !e.family);
  const [going, setGoing] = useState<string[]>(open.map((e) => e.id));
  const [sent, setSent] = useState(false);
  const shown = name || guest;

  const send = (ev: React.FormEvent) => {
    ev.preventDefault();
    const list = open.filter((e) => going.includes(e.id)).map((e) => e.en);
    const msg = `Sat Sri Akal! ${shown || "We"} will be joining the celebrations for Roshan & Roshan.\nGuests: ${count}\nAttending: ${list.length ? list.join(", ") : "Sending our blessings from afar"}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <section className="wi-rsvp" aria-labelledby="wi-rsvp-h">
      <Reveal className="wi-rsvp-card">
        <p className="wi-kicker">Kindly reply by 15 January 2027</p>
        <h2 id="wi-rsvp-h" className="wi-h2">
          Will you <em>dance with us?</em>
        </h2>
        <form onSubmit={send}>
          <label className="wi-field">
            <span>Your name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder={guest || "Your name"} autoComplete="name" />
          </label>
          <div className="wi-field">
            <span>Guests</span>
            <div className="wi-stepper">
              <button type="button" onClick={() => setCount((c) => Math.max(1, c - 1))} aria-label="Fewer guests">
                −
              </button>
              <output aria-live="polite">{count}</output>
              <button type="button" onClick={() => setCount((c) => Math.min(10, c + 1))} aria-label="More guests">
                +
              </button>
            </div>
          </div>
          <fieldset className="wi-field">
            <legend>Joining us for</legend>
            <div className="wi-checks">
              {open.map((e) => {
                const on = going.includes(e.id);
                return (
                  <label key={e.id} className={`wi-check ${on ? "is-on" : ""}`}>
                    <input type="checkbox" checked={on} onChange={() => setGoing((g) => (on ? g.filter((x) => x !== e.id) : [...g, e.id]))} />
                    {e.en}
                  </label>
                );
              })}
            </div>
          </fieldset>
          <button type="submit" className="wi-btn wi-btn-gold">
            Send RSVP on WhatsApp
          </button>
          {sent && (
            <p className="wi-small wi-sent" role="status">
              WhatsApp opened with your reply. Choose the family chat and press send.
            </p>
          )}
        </form>
      </Reveal>
    </section>
  );
}

/* ---------- 8 · closing ---------- */
function Closing({ guest }: { guest: string }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = window.location.origin + window.location.pathname;
    const data = { title: "Roshan Singh & Roshan Kaur", text: "You’re invited · Amritsar, 14 February 2027", url };
    if (navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch {
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  };
  return (
    <section className="wi-close">
      <div className="wi-close-bg">
        <Image src={img.marigold} alt="" fill sizes="100vw" />
      </div>
      <Reveal className="wi-close-in">
        <p className="wi-pa wi-close-pa">ਆਪ ਜੀ ਦੀ ਹਾਜ਼ਰੀ ਸਾਡੇ ਲਈ ਅਸ਼ੀਰਵਾਦ ਹੈ</p>
        <p className="wi-close-line">
          Your presence is <em>our blessing.</em>
        </p>
        <p className="wi-small">
          With love, the {families.groom.name.replace("The ", "").replace(" Family", "")} &amp; {families.bride.name.replace("The ", "").replace(" Family", "")} families
        </p>
        {guest && <p className="wi-await">Awaiting you, {guest}.</p>}
        <div className="wi-close-btns">
          <button type="button" className="wi-btn wi-btn-gold" onClick={() => downloadICS(events.filter((e) => !e.family), "roshan-and-roshan.ics")}>
            Save all dates
          </button>
          <button type="button" className="wi-btn wi-btn-ghost" onClick={share}>
            {copied ? "Link copied" : "Share this invitation"}
          </button>
        </div>
        <p className="wi-hash">{couple.hashtag}</p>
      </Reveal>
    </section>
  );
}

export function Invite() {
  const guest = useGuest();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <>
      <AnimatePresence>{!opened && <Envelope key="env" guest={guest} onOpen={() => setOpened(true)} />}</AnimatePresence>
      <main className="wi-main" aria-hidden={!opened}>
        <Opening guest={guest} />
        <TwoLights />
        <Letter guest={guest} />
        <Thread />
        <Countdown />
        <City />
        <Rsvp guest={guest} />
        <Closing guest={guest} />
      </main>
    </>
  );
}
