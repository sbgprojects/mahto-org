"use client";

import Link from "next/link";
import { useState } from "react";
import { PageHero } from "../blocks";
import { money } from "../cart";
import { BASE, img, packages, site, spaces } from "../data";
import { AddButton, Arrow, Photo, Reveal } from "../ui";

export default function PartiesPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero kicker="Groups & private parties" title={<>Your party, <em>our snug.</em></>} sub="From ten friends in the Snug to a full buyout for a hundred and twenty. Tell us the occasion, we’ll handle the rest." image={img.friends} />

      <section className="ch-section">
        <div className="ch-wrap">
          <Reveal className="ch-split-head">
            <h2 className="ch-h2">Three rooms, one welcome</h2>
            <p className="ch-dim">Every space comes with its own host for the night.</p>
          </Reveal>
          <div className="ch-spaces">
            {spaces.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.08} className="ch-space">
                <div className="ch-space-img">
                  <Photo src={s.img} alt={s.name} sizes="(min-width: 900px) 33vw, 90vw" />
                </div>
                <span className="ch-chip">{s.guests}</span>
                <h3>{s.name}</h3>
                <p className="ch-dim">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ch-section ch-tint">
        <div className="ch-wrap">
          <Reveal className="ch-split-head">
            <div>
              <p className="ch-eyebrow">Packages</p>
              <h2 className="ch-h2">Pick a package, add your guests</h2>
            </div>
            <p className="ch-dim">Add one per guest. Your package travels with your reservation, and we confirm the details by email.</p>
          </Reveal>
          <div className="ch-pkgs">
            {packages.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08} className="ch-pkg">
                <p className="ch-pkg-price">
                  {money(p.price)}
                  <small> per guest</small>
                </p>
                <h3>{p.name}</h3>
                <p className="ch-dim">{p.desc?.replace("Per guest · ", "")}</p>
                <AddButton item={p} label="Add a guest" />
              </Reveal>
            ))}
          </div>
          <p className="ch-small ch-center">
            Already added your guests?{" "}
            <Link href={`${BASE}/reserve`} className="ch-link">
              Continue to reservation <Arrow />
            </Link>
          </p>
        </div>
      </section>

      <section className="ch-section">
        <div className="ch-wrap ch-enquire">
          <Reveal>
            <p className="ch-eyebrow">Something bigger?</p>
            <h2 className="ch-h2">Tell us about your event</h2>
            <p className="ch-dim">Buyouts, rehearsal dinners, corporate evenings and anything that needs a custom menu. We reply within one working day.</p>
          </Reveal>
          {sent ? (
            <div className="ch-done" role="status">
              <h3>Thank you.</h3>
              <p>We’ll be in touch at the email you gave us. Preview only: nothing was sent.</p>
            </div>
          ) : (
            <form
              className="ch-form"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <label>
                <span>Name</span>
                <input required autoComplete="name" />
              </label>
              <label>
                <span>Email</span>
                <input type="email" required autoComplete="email" />
              </label>
              <label>
                <span>Date</span>
                <input type="date" required />
              </label>
              <label>
                <span>Guests</span>
                <input type="number" min={10} max={120} defaultValue={20} required />
              </label>
              <label className="ch-form-wide">
                <span>The occasion</span>
                <textarea rows={4} placeholder="A 40th birthday, a team dinner, a welcome home…" />
              </label>
              <button type="submit" className="ch-btn ch-btn-green ch-form-wide">
                Send enquiry <Arrow />
              </button>
              <p className="ch-small ch-form-wide">Or email {site.email}</p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
