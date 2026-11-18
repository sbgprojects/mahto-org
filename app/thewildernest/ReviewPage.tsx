"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { companions, composeReview, GOOGLE_REVIEW_URL, highlights, type Companion, type Highlight } from "./compose";

const SITE = "https://pratikbhave.wixsite.com/the-wildernest";
const NEST = "https://static.wixstatic.com/media/b8f6ad_6869166c237046b7959d40a5e7dd1147~mv2.png";
const WORD = "https://static.wixstatic.com/media/b8f6ad_e367b9ec47b649a4b65ebee44bcab121~mv2.png";
const WORD_OLIVE = "https://static.wixstatic.com/media/b8f6ad_68910f0d2b574510b41527b678232bd3~mv2.png";
const nav = ["Home", "Location", "Gallery", "Food Menu", "Add On Experiences", "Nearby Attractions", "Property Highlights", "Get In Touch"];

/* Feels considered, never slow: a short, fixed "writing" pause. */
const WRITE_DELAY = 1400;
const REWRITE_DELAY = 700;

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="wn-header">
      <div className="wn-header-in">
        <a href={SITE} className="wn-logo" aria-label="Wildernest Farms home">
          <Image src={NEST} alt="" width={62} height={28} priority />
          <Image src={WORD} alt="Wildernest Farms, your nest in the wild" width={198} height={45} priority />
        </a>
        <nav className="wn-nav" aria-label="Primary">
          {nav.map((n) => (
            <a key={n} href={SITE}>
              {n}
            </a>
          ))}
        </nav>
        <button type="button" className="wn-burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span />
          <span />
          <span />
        </button>
      </div>
      {open && (
        <nav className="wn-sheet" aria-label="Menu">
          {nav.map((n) => (
            <a key={n} href={SITE} onClick={() => setOpen(false)}>
              {n}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="wn-footer">
      <div className="wn-footer-top">
        <Image src={WORD_OLIVE} alt="Wildernest Farms" width={190} height={43} className="wn-footer-logo" />
        <div className="wn-footer-mid">
          <p className="wn-footer-name">The Wildernest farms</p>
          <p>Shahpur, Maharashtra</p>
          <a href="mailto:Thewildernestfarms@gmail.com">Thewildernestfarms@gmail.com</a>
        </div>
        <div className="wn-social">
          <a href="https://www.instagram.com/wildernestfarms_shahapur/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="wn-ig">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <rect x="4" y="4" width="16" height="16" rx="4.5" />
              <circle cx="12" cy="12" r="3.6" />
              <circle cx="17" cy="7" r=".8" fill="#fff" />
            </svg>
          </a>
          <a href="https://maps.app.goo.gl/qXytFwtp2FcPag4Q9" target="_blank" rel="noopener noreferrer" aria-label="Google Maps">
            <svg width="20" height="24" viewBox="0 0 24 28">
              <path d="M12 0C6.5 0 2 4.4 2 9.9 2 17.3 12 28 12 28s10-10.7 10-18.1C22 4.4 17.5 0 12 0Z" fill="#ea4335" />
              <path d="M2 9.9C2 4.4 6.5 0 12 0v14.2a4.3 4.3 0 0 1 0-8.6Z" fill="#4285f4" opacity=".85" />
              <circle cx="12" cy="9.9" r="3.6" fill="#fff" />
            </svg>
          </a>
          <a href="https://api.whatsapp.com/send?phone=919136621200" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="11" fill="#25d366" />
              <path d="M8.2 7.4c.2-.4.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.4.6-.4.5c-.1.1-.2.3 0 .5.6 1.1 1.5 2 2.6 2.6.2.1.4.1.5 0l.7-.8c.2-.2.4-.2.6-.1l1.8.9c.3.1.4.2.4.4 0 .5-.1 1.1-.5 1.5-.5.5-1.3.8-2.1.7-1.1-.2-2.3-.6-3.7-1.8-1.6-1.4-2.6-3.2-2.8-4-.3-1.1.1-1.9.7-2.6Z" fill="#fff" />
            </svg>
          </a>
        </div>
      </div>
      <div className="wn-footer-base">
        <span>From Mumbai with Love</span>
        <span>© {new Date().getFullYear()} The Wildernest. All rights reserved.</span>
      </div>
    </footer>
  );
}

/** Synchronous copy, so the same tap can also open Google without a pop-up blocker. */
function copySync(el: HTMLTextAreaElement | null, text: string) {
  try {
    if (!el) return false;
    el.focus();
    el.select();
    el.setSelectionRange(0, text.length);
    return document.execCommand("copy");
  } catch {
    return false;
  }
}

export function ReviewPage() {
  const [who, setWho] = useState<Companion | null>(null);
  const [liked, setLiked] = useState<Highlight[]>([]);
  const [extra, setExtra] = useState("");
  const [stage, setStage] = useState<"pick" | "writing" | "ready">("pick");
  const [review, setReview] = useState("");
  const [seed, setSeed] = useState(0);
  const [copied, setCopied] = useState<"" | "done" | "fail">("");
  const box = useRef<HTMLTextAreaElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggle = (id: Highlight) => setLiked((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));

  const write = (nextSeed: number, delay: number) => {
    setStage("writing");
    setCopied("");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setReview(composeReview({ who, liked, extra, seed: nextSeed }));
      setSeed(nextSeed);
      setStage("ready");
      setTimeout(() => document.getElementById("wn-ready")?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    }, delay);
  };

  const start = () => write(Math.floor(Math.random() * 1000), WRITE_DELAY);
  const reword = () => write(seed + 1, REWRITE_DELAY);
  const edit = () => {
    setStage("pick");
    setCopied("");
  };

  const post = () => {
    // The link itself opens Google in a new tab; we only copy first.
    const text = review.trim();
    if (copySync(box.current, text)) setCopied("done");
    else if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(() => setCopied("done"), () => setCopied("fail"));
    else setCopied("fail");
  };

  return (
    <>
      <Header />
      <main className="wn-main" id="main-content">
        <div className="wn-intro">
          <p className="wn-eyebrow">SHARE YOUR EXPERIENCE</p>
          <h1>Tell Us About Your Stay</h1>
          <p className="wn-lead">Tap what you enjoyed and we’ll draft a short Google review for you to edit and post. It takes about 30 seconds.</p>
        </div>

        <section className="wn-panel" aria-live="polite">
          {stage !== "ready" ? (
            <>
              <div className="wn-step">
                <span className="wn-num">1</span>
                <div>
                  <h2>Who did you travel with?</h2>
                  <p>Optional</p>
                </div>
              </div>
              <div className="wn-chips" role="radiogroup" aria-label="Who did you travel with?">
                {companions.map((c) => (
                  <button key={c.id} type="button" role="radio" aria-checked={who === c.id} className={`wn-chip ${who === c.id ? "is-on" : ""}`} onClick={() => setWho(who === c.id ? null : c.id)} disabled={stage === "writing"}>
                    {c.label}
                  </button>
                ))}
              </div>

              <div className="wn-step wn-step-gap">
                <span className="wn-num">2</span>
                <div>
                  <h2>What did you enjoy?</h2>
                  <p>Tap everything that stood out.</p>
                </div>
              </div>
              <div className="wn-chips" role="group" aria-label="What did you enjoy?">
                {highlights.map((h) => {
                  const on = liked.includes(h.id);
                  return (
                    <button key={h.id} type="button" aria-pressed={on} className={`wn-chip ${on ? "is-on" : ""}`} onClick={() => toggle(h.id)} disabled={stage === "writing"}>
                      {on && <span aria-hidden>✓ </span>}
                      {h.label}
                    </button>
                  );
                })}
              </div>

              <label className="wn-extra">
                <span>Anything else to mention? (optional)</span>
                <input value={extra} onChange={(e) => setExtra(e.target.value.slice(0, 200))} placeholder="e.g. the bonfire night was magical" disabled={stage === "writing"} />
              </label>

              <button type="button" className="wn-primary" onClick={start} disabled={!liked.length || stage === "writing"}>
                {stage === "writing" ? "Writing your review…" : "✦  Write My Review"}
              </button>
              {!liked.length && <p className="wn-hint">Pick at least one thing you enjoyed.</p>}

              {stage === "writing" && (
                <div className="wn-progress" role="status">
                  <div className="wn-progress-msg">
                    <span>Putting your stay into words</span>
                    <span>•••</span>
                  </div>
                  <div className="wn-track">
                    <div className="wn-fill" />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div id="wn-ready">
              <div className="wn-step">
                <span className="wn-num">3</span>
                <div>
                  <h2>Your review is ready</h2>
                  <p>Edit anything you like, then post it.</p>
                </div>
              </div>

              <label htmlFor="wn-review" className="wn-sr">
                Your review
              </label>
              <textarea id="wn-review" ref={box} value={review} onChange={(e) => setReview(e.target.value)} rows={7} />

              <div className="wn-row">
                <button type="button" className="wn-text-btn" onClick={reword}>
                  ↻ Try different wording
                </button>
                <button type="button" className="wn-text-btn" onClick={edit}>
                  Change my picks
                </button>
              </div>

              <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="wn-primary wn-google" onClick={post}>
                <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
                  <path fill="#fff" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5Z" />
                </svg>
                Copy &amp; Post on Google
              </a>

              {copied === "done" && (
                <p className="wn-status wn-ok" role="status">
                  ✓ Review copied. On Google: tap the stars, then paste into the box and press Post.
                </p>
              )}
              {copied === "fail" && (
                <p className="wn-status wn-err" role="alert">
                  Copying was blocked on this device. Select the text above, copy it, then paste it on Google.
                </p>
              )}

              <ol className="wn-how">
                <li>
                  <b>1</b> Tap the stars
                </li>
                <li>
                  <b>2</b> Paste your review
                </li>
                <li>
                  <b>3</b> Press Post
                </li>
              </ol>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
