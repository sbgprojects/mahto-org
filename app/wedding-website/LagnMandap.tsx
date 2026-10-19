"use client";

import { useEffect, useState } from "react";
import {
  categories,
  cities,
  footerCols,
  heroStats,
  img,
  navLinks,
  pros,
  quotes,
  steps,
  tabs,
  venues,
  why,
} from "./data";
import { Icon, Photo, Reveal, Scroller } from "./ui";

function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`lm-header ${solid || open ? "is-solid" : ""}`}>
      <div className="lm-wrap lm-header-in">
        <a href="#top" className="lm-logo">
          LagnMandap
        </a>
        <nav className="lm-nav" aria-label="Primary">
          {navLinks.map((l) => (
            <a key={l} href="#categories">
              {l}
            </a>
          ))}
        </nav>
        <div className="lm-header-r">
          <button type="button" className="lm-iconbtn lm-hide-sm" aria-label="Search">
            <Icon name="search" size={18} />
            <span className="lm-hide-md">Search</span>
          </button>
          <button type="button" className="lm-iconbtn lm-hide-sm" aria-label="Saved venues">
            <Icon name="heart" size={18} />
          </button>
          <a href="#cta" className="lm-link lm-hide-sm">
            Login
          </a>
          <a href="#cta" className="lm-btn lm-btn-gold lm-btn-sm lm-hide-xs">
            List Your Business <Icon name="arrow-r" size={14} />
          </a>
          <button
            type="button"
            className="lm-burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={24} />
          </button>
        </div>
      </div>
      <div className={`lm-drawer ${open ? "is-open" : ""}`}>
        {navLinks.map((l) => (
          <a key={l} href="#categories" onClick={() => setOpen(false)}>
            {l}
          </a>
        ))}
        <a href="#cta" onClick={() => setOpen(false)}>
          Login
        </a>
        <a href="#cta" className="lm-btn lm-btn-gold" onClick={() => setOpen(false)}>
          List Your Business <Icon name="arrow-r" size={14} />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const [tab, setTab] = useState(0);
  return (
    <section id="top" className="lm-hero">
      <Photo src={img.hero} alt="Decorated wedding mandap" priority sizes="100vw" className="lm-hero-bg" />
      <div className="lm-hero-shade" />
      <div className="lm-wrap lm-hero-in">
        <p className="lm-eyebrow lm-eyebrow-light">The beginning of something beautiful</p>
        <h1 className="lm-h1">
          Your wedding
          <br />
          starts here.
        </h1>
        <p className="lm-lead">
          Discover beautiful venues, trusted wedding professionals and everything you need to bring your
          celebration to life.
        </p>
        <button type="button" className="lm-story" aria-label="Watch our story">
          <span className="lm-play">
            <Icon name="play" size={20} />
          </span>
          <span>Watch Our Story</span>
        </button>

        <form className="lm-search" onSubmit={(e) => e.preventDefault()}>
          <div className="lm-tabs" role="tablist">
            {tabs.map((t, i) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === i}
                className={tab === i ? "is-on" : ""}
                onClick={() => setTab(i)}
              >
                {t}
                {t === "More" && <Icon name="down" size={12} />}
              </button>
            ))}
          </div>
          <div className="lm-fields">
            <label className="lm-field">
              <span>What are you looking for?</span>
              <div>
                <Icon name="search" size={16} />
                <select defaultValue="venues" key={tab}>
                  <option value="venues">{tabs[tab] === "More" ? "More services" : tabs[tab]}</option>
                </select>
              </div>
            </label>
            <label className="lm-field">
              <span>Where?</span>
              <div>
                <Icon name="pin" size={16} />
                <input defaultValue="Nagpur, Maharashtra" aria-label="Location" />
              </div>
            </label>
            <label className="lm-field">
              <span>Guest count</span>
              <div>
                <Icon name="people" size={16} />
                <input defaultValue="300 Guests" aria-label="Guest count" />
              </div>
            </label>
            <label className="lm-field">
              <span>Wedding date</span>
              <div>
                <Icon name="cal" size={16} />
                <input type="date" aria-label="Wedding date" />
              </div>
            </label>
            <button type="submit" className="lm-btn lm-btn-gold lm-explore">
              Explore <Icon name="arrow-r" size={14} />
            </button>
          </div>
        </form>

        <ul className="lm-hero-stats">
          {heroStats.map((s) => (
            <li key={s.l}>
              <Icon name={s.i} size={22} />
              <div>
                <strong>{s.v}</strong>
                <span>{s.l}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="lm-hero-loc">
        <Icon name="pin" size={14} />
        <span>
          Nagpur
          <br />
          Maharashtra
        </span>
      </div>
    </section>
  );
}

function SectionHead({
  eyebrow,
  title,
  text,
  link,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  link?: string;
}) {
  return (
    <div className="lm-head">
      <div>
        <p className="lm-eyebrow">{eyebrow}</p>
        <h2 className="lm-h2">{title}</h2>
      </div>
      {(text || link) && (
        <div className="lm-head-r">
          {text && <p>{text}</p>}
          {link && (
            <a href="#top" className="lm-more">
              {link} <Icon name="arrow-r" size={14} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function Categories() {
  return (
    <section id="categories" className="lm-section">
      <div className="lm-wrap">
        <Reveal>
          <SectionHead
            eyebrow="Explore by category"
            title={<>Find the right people for every moment of your celebration.</>}
            text="From stunning venues to talented planners, explore a complete range of wedding services all in one place."
            link="View All Categories"
          />
        </Reveal>
        <Reveal>
          <Scroller className="lm-cols-6">
            {categories.map((c) => (
              <a key={c.t} href="#top" className="lm-cat">
                <Photo src={c.img} alt={c.t} />
                <div>
                  <h3>{c.t}</h3>
                  <p>{c.s}</p>
                </div>
              </a>
            ))}
          </Scroller>
        </Reveal>
      </div>
    </section>
  );
}

function Venues() {
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  return (
    <section className="lm-section lm-tight-top">
      <div className="lm-wrap">
        <Reveal>
          <SectionHead
            eyebrow="Featured venues in Nagpur"
            title={<>Exceptional venues for extraordinary celebrations.</>}
            text="Discover handpicked wedding venues in Nagpur, from luxurious banquet halls to picturesque lawns."
            link="View All Venues"
          />
        </Reveal>
        <Reveal>
          <Scroller className="lm-cols-4">
            {venues.map((v) => (
              <article key={v.n} className="lm-venue">
                <div className="lm-venue-img">
                  <Photo src={v.img} alt={v.n} sizes="(max-width: 700px) 80vw, 25vw" />
                  {v.featured && <span className="lm-badge">Featured</span>}
                  <button
                    type="button"
                    className={`lm-save ${saved[v.n] ? "is-on" : ""}`}
                    aria-label={`Save ${v.n}`}
                    aria-pressed={!!saved[v.n]}
                    onClick={() => setSaved((s) => ({ ...s, [v.n]: !s[v.n] }))}
                  >
                    <Icon name="heart" size={16} />
                  </button>
                </div>
                <div className="lm-venue-body">
                  <div className="lm-venue-top">
                    <span className="lm-dots" aria-hidden>
                      ●●
                    </span>
                    <span className="lm-rate">
                      ★ {v.r} <em>({v.c})</em>
                    </span>
                  </div>
                  <h3>{v.n}</h3>
                  <p className="lm-muted">{v.loc}</p>
                  <p className="lm-muted lm-guests">
                    <Icon name="people" size={14} /> {v.g}
                  </p>
                  <p className="lm-price">{v.p}</p>
                </div>
              </article>
            ))}
          </Scroller>
        </Reveal>
      </div>
    </section>
  );
}

function Destinations() {
  return (
    <section className="lm-section lm-tight-top">
      <div className="lm-wrap lm-dest">
        <Reveal className="lm-dest-head">
          <p className="lm-eyebrow">Popular wedding destinations</p>
          <h2 className="lm-h2">Where will your story begin?</h2>
          <p className="lm-muted">Explore top cities for your wedding celebrations across India.</p>
        </Reveal>
        <Reveal>
          <Scroller className="lm-cols-6 lm-cols-city">
            {cities.map((c, i) => (
              <a key={c.n} href="#top" className={`lm-city ${i === 0 ? "is-on" : ""}`}>
                <Photo src={c.img} alt={c.n} sizes="(max-width: 700px) 40vw, 12vw" />
                <div>
                  <h3>{c.n}</h3>
                  <p>{c.v}</p>
                </div>
              </a>
            ))}
          </Scroller>
        </Reveal>
      </div>
    </section>
  );
}

function How() {
  return (
    <section className="lm-how">
      <div className="lm-wrap lm-how-in">
        <Reveal className="lm-how-head">
          <p className="lm-eyebrow lm-eyebrow-gold">How LagnMandap works</p>
          <h2 className="lm-h2 lm-light">From discovery to celebration.</h2>
          <p className="lm-dim">A simpler, more trusted way to plan your wedding.</p>
          <a href="#why" className="lm-btn lm-btn-gold lm-btn-sm">
            Learn More <Icon name="arrow-r" size={14} />
          </a>
        </Reveal>
        <div className="lm-steps">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90} className="lm-step">
              <Photo src={s.img} alt={s.t} sizes="(max-width: 700px) 90vw, 20vw" />
              <span className="lm-step-n">{s.n}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pros() {
  return (
    <section className="lm-section">
      <div className="lm-wrap">
        <Reveal>
          <SectionHead
            eyebrow="Wedding professionals"
            title={<>More than a venue. Find the people who bring it all together.</>}
            link="Explore All Vendors"
          />
        </Reveal>
        <Reveal>
          <Scroller className="lm-cols-6">
            {pros.map((p) => (
              <a key={p.t} href="#top" className="lm-cat lm-pro">
                <Photo src={p.img} alt={p.t} />
                <div>
                  <h3>{p.t}</h3>
                  <p>{p.s}</p>
                </div>
              </a>
            ))}
          </Scroller>
        </Reveal>
      </div>
    </section>
  );
}

function Stories() {
  return (
    <section className="lm-stories">
      <div className="lm-wrap lm-stories-in">
        <Reveal className="lm-stories-head">
          <p className="lm-eyebrow">Real weddings &amp; inspiration</p>
          <h2 className="lm-h2">Stories that inspire.</h2>
          <p className="lm-muted">
            Explore real weddings, planning tips and expert advice to make your celebration truly special.
          </p>
          <a href="#top" className="lm-more">
            Explore The Journal <Icon name="arrow-r" size={14} />
          </a>
        </Reveal>
        <Reveal className="lm-feature">
          <Photo src={img.story1} alt="A modern Marathi wedding in Nagpur" sizes="(max-width: 900px) 100vw, 45vw" />
          <div className="lm-feature-shade" />
          <div className="lm-feature-txt">
            <span className="lm-tag">● Real Weddings</span>
            <h3>A Modern Marathi Wedding in Nagpur</h3>
            <p>Nagpur • Maharashtra • 2026</p>
          </div>
          <span className="lm-feature-go" aria-hidden>
            <Icon name="arrow-r" size={18} />
          </span>
        </Reveal>
        <div className="lm-side">
          {[
            { tag: "Planning Guide", t: "10 Beautiful Mandap Designs for 2026", img: img.story2 },
            { tag: "Venues", t: "How Much Does a Wedding Cost in Nagpur?", img: img.story3 },
          ].map((a, i) => (
            <Reveal key={a.t} delay={i * 90} className="lm-side-card">
              <Photo src={a.img} alt={a.t} sizes="(max-width: 700px) 30vw, 12vw" />
              <div>
                <span className="lm-tag lm-tag-gold">{a.tag}</span>
                <h3>{a.t}</h3>
              </div>
              <span className="lm-circle" aria-hidden>
                <Icon name="arrow-r" size={14} />
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section id="why" className="lm-why">
      <div className="lm-wrap lm-why-in">
        <Reveal className="lm-why-head">
          <p className="lm-eyebrow">Why LagnMandap</p>
          <h2 className="lm-h2">Plan with confidence.</h2>
        </Reveal>
        <ul className="lm-why-list">
          {why.map((w, i) => (
            <li key={w.t}>
              <Reveal delay={i * 80}>
                <span className="lm-why-i">
                  <Icon name={w.i} size={26} />
                </span>
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

function Testimonials() {
  const [i, setI] = useState(0);
  const q = quotes[i];
  const step = (d: number) => setI((v) => (v + d + quotes.length) % quotes.length);
  return (
    <section className="lm-quote">
      <Photo src={img.couple} alt="Happy couple" sizes="100vw" className="lm-quote-bg" />
      <div className="lm-quote-shade" />
      <button type="button" className="lm-arrow lm-arrow-light lm-q-prev" aria-label="Previous testimonial" onClick={() => step(-1)}>
        <Icon name="chev-l" />
      </button>
      <button type="button" className="lm-arrow lm-arrow-light lm-q-next" aria-label="Next testimonial" onClick={() => step(1)}>
        <Icon name="chev-r" />
      </button>
      <div className="lm-wrap lm-quote-in">
        <p className="lm-eyebrow lm-eyebrow-gold">Happy couples</p>
        <blockquote key={i} className="lm-quote-text">
          “{q.q}”
        </blockquote>
        <p className="lm-quote-by">
          — {q.by}
          <span>{q.loc}</span>
        </p>
        <div className="lm-q-dots" aria-hidden>
          {quotes.map((_, d) => (
            <i key={d} className={d === i ? "is-on" : ""} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="lm-cta">
      <div className="lm-cta-flower lm-cta-l" aria-hidden>
        <Photo src={img.floralL} alt="" sizes="20vw" />
      </div>
      <div className="lm-cta-flower lm-cta-r" aria-hidden>
        <Photo src={img.floralR} alt="" sizes="20vw" />
      </div>
      <div className="lm-wrap lm-cta-in">
        <Reveal className="lm-cta-main">
          <p className="lm-eyebrow lm-eyebrow-gold">Ready to begin?</p>
          <h2 className="lm-h2">Your dream wedding deserves the right beginning.</h2>
          <div className="lm-cta-btns">
            <a href="#top" className="lm-btn lm-btn-gold">
              Start Exploring <Icon name="arrow-r" size={14} />
            </a>
            <a href="#top" className="lm-btn lm-btn-line">
              List Your Business
            </a>
          </div>
        </Reveal>
        <Reveal className="lm-cta-stats">
          <div>
            <strong>5,000+</strong>
            <span>Verified Businesses</span>
          </div>
          <div>
            <strong>50,000+</strong>
            <span>Happy Couples</span>
          </div>
          <div>
            <strong>25+</strong>
            <span>Indian Cities</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <footer className="lm-footer">
      <div className="lm-wrap lm-footer-in">
        <div className="lm-foot-brand">
          <a href="#top" className="lm-logo">
            LagnMandap
          </a>
          <p>
            For every celebration
            <br />
            worth remembering.
          </p>
          <div className="lm-social">
            {["ig", "fb", "yt", "in"].map((s) => (
              <a key={s} href="#top" aria-label={s}>
                <Icon name={s} size={18} />
              </a>
            ))}
          </div>
        </div>
        {Object.entries(footerCols).map(([h, items]) => (
          <div key={h} className="lm-foot-col">
            <h4>{h}</h4>
            <ul>
              {items.map((l) => (
                <li key={l}>
                  <a href="#top">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="lm-foot-sub">
          <h4>Subscribe to our updates</h4>
          <p>Get the latest venues, trends and wedding tips.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setDone(true);
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <button type="submit" aria-label="Subscribe">
              <Icon name="arrow-r" size={16} />
            </button>
          </form>
          {done && <p className="lm-thanks">Thank you — you’re on the list.</p>}
        </div>
      </div>
      <div className="lm-wrap lm-copy">© {new Date().getFullYear()} LagnMandap. All rights reserved.</div>
    </footer>
  );
}

export function LagnMandap() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Categories />
        <Venues />
        <Destinations />
        <How />
        <Pros />
        <Stories />
        <Why />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
