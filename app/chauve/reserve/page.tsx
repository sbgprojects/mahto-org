"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PageHero } from "../blocks";
import { cart, money, totals, useCart } from "../cart";
import { BASE, extras, img } from "../data";
import { AddButton, Arrow, Minus, Plus, Reveal } from "../ui";

const times = ["11:30", "12:30", "13:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];
const fmtTime = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")}${h < 12 ? "am" : "pm"}`;
};
const DEPOSIT = 0.25;

export default function ReservePage() {
  const lines = useCart();
  const { subtotal, count } = totals(lines);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [size, setSize] = useState(2);
  const [error, setError] = useState("");
  const [done, setDone] = useState<null | { ref: string; date: string; time: string; size: number; total: number; deposit: number; items: number }>(null);

  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const deposit = Math.round(subtotal * DEPOSIT * 100) / 100;
  const prettyDate = date ? new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) : "";

  if (done) {
    return (
      <>
        <PageHero kicker="Reservation" title={<>See you <em>soon.</em></>} image={img.room} />
        <section className="ch-section">
          <div className="ch-wrap ch-confirm">
            <Reveal className="ch-confirm-card">
              <p className="ch-eyebrow">Reference {done.ref}</p>
              <h2 className="ch-h2">
                Table for {done.size}, {new Date(`${done.date}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {fmtTime(done.time)}
              </h2>
              {done.items > 0 && (
                <p className="ch-dim">
                  {done.items} pre-ordered item{done.items === 1 ? "" : "s"} · {money(done.total)} · deposit {money(done.deposit)}
                </p>
              )}
              <p className="ch-preview-note">Preview: no booking was made and no payment was taken. At launch this step connects to the reservation system and a secure card payment.</p>
              <Link href={BASE} className="ch-btn ch-btn-green">
                Back to home <Arrow />
              </Link>
            </Reveal>
          </div>
        </section>
      </>
    );
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date || !time) {
      setError("Choose a date and a time to continue.");
      return;
    }
    setError("");
    const ref = `CH-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    setDone({ ref, date, time, size, total: subtotal, deposit, items: count });
    cart.clear();
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <PageHero kicker="Reservations" title={<>Save us <em>a seat.</em></>} sub="Book a table, then add anything you’d like waiting when you arrive." image={img.room} />
      <section className="ch-section ch-reserve-sec">
        <form className="ch-wrap ch-reserve" onSubmit={submit}>
          <div className="ch-steps">
            <fieldset className="ch-step">
              <legend>
                <span className="ch-step-n">1</span> When
              </legend>
              <label className="ch-field">
                <span>Date</span>
                <input type="date" min={minDate} value={date} onChange={(e) => setDate(e.target.value)} required />
              </label>
              <div className="ch-times" role="radiogroup" aria-label="Time">
                {times.map((t) => (
                  <label key={t} className={`ch-time ${time === t ? "is-on" : ""}`}>
                    <input type="radio" name="time" value={t} checked={time === t} onChange={() => setTime(t)} />
                    {fmtTime(t)}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="ch-step">
              <legend>
                <span className="ch-step-n">2</span> Guests
              </legend>
              <div className="ch-stepper">
                <button type="button" onClick={() => setSize((s) => Math.max(1, s - 1))} aria-label="Fewer guests">
                  <Minus />
                </button>
                <output aria-live="polite">
                  {size} <small>{size === 1 ? "guest" : "guests"}</small>
                </output>
                <button type="button" onClick={() => setSize((s) => Math.min(20, s + 1))} aria-label="More guests">
                  <Plus />
                </button>
              </div>
              {size >= 10 && (
                <p className="ch-small">
                  Ten or more? Our{" "}
                  <Link href={`${BASE}/parties`} className="ch-link">
                    party packages
                  </Link>{" "}
                  include a private space and a host.
                </p>
              )}
            </fieldset>

            <fieldset className="ch-step">
              <legend>
                <span className="ch-step-n">3</span> Your details
              </legend>
              <div className="ch-form">
                <label>
                  <span>Name</span>
                  <input required autoComplete="name" />
                </label>
                <label>
                  <span>Phone</span>
                  <input type="tel" required autoComplete="tel" />
                </label>
                <label className="ch-form-wide">
                  <span>Email</span>
                  <input type="email" required autoComplete="email" />
                </label>
                <label>
                  <span>Occasion</span>
                  <select defaultValue="">
                    <option value="">None</option>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                    <option>Date night</option>
                    <option>Business</option>
                    <option>Celebration</option>
                  </select>
                </label>
                <label>
                  <span>Seating</span>
                  <select defaultValue="">
                    <option value="">No preference</option>
                    <option>Dining room</option>
                    <option>Bar</option>
                    <option>Snug, if free</option>
                  </select>
                </label>
                <label className="ch-form-wide">
                  <span>Notes</span>
                  <textarea rows={3} placeholder="Allergies, a cake message, a high chair…" />
                </label>
              </div>
            </fieldset>

            <fieldset className="ch-step">
              <legend>
                <span className="ch-step-n">4</span> Add to your table <small>optional</small>
              </legend>
              <div className="ch-extras">
                {extras.map((x) => (
                  <div key={x.id} className="ch-extra">
                    <div>
                      <p className="ch-extra-t">{x.name}</p>
                      <p className="ch-small">{x.desc}</p>
                    </div>
                    <span className="ch-price">{money(x.price)}</span>
                    <AddButton item={x} className="ch-add-sm" />
                  </div>
                ))}
              </div>
              <p className="ch-small">
                Want dishes ready on arrival?{" "}
                <Link href={`${BASE}/menu`} className="ch-link">
                  Pre-order from the menu <Arrow />
                </Link>
              </p>
            </fieldset>
          </div>

          <aside className="ch-summary" aria-label="Reservation summary">
            <p className="ch-eyebrow ch-eyebrow-light">Your reservation</p>
            <dl className="ch-sum-top">
              <div>
                <dt>Date</dt>
                <dd>{prettyDate || "—"}</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{time ? fmtTime(time) : "—"}</dd>
              </div>
              <div>
                <dt>Guests</dt>
                <dd>{size}</dd>
              </div>
            </dl>

            <p className="ch-sum-h">Your table {count > 0 && <span>({count})</span>}</p>
            {lines.length === 0 ? (
              <p className="ch-sum-empty">Nothing added yet. A table on its own is free to book.</p>
            ) : (
              <ul className="ch-sum-lines">
                {lines.map((l) => (
                  <li key={l.id}>
                    <span className="ch-sum-name">{l.name}</span>
                    <span className="ch-qty ch-qty-light" role="group" aria-label={`Quantity of ${l.name}`}>
                      <button type="button" onClick={() => cart.setQty(l.id, l.qty - 1)} aria-label="One fewer">
                        <Minus />
                      </button>
                      <span>{l.qty}</span>
                      <button type="button" onClick={() => cart.setQty(l.id, l.qty + 1)} aria-label="One more">
                        <Plus />
                      </button>
                    </span>
                    <span className="ch-sum-price">{money(l.price * l.qty)}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="ch-sum-totals">
              <div>
                <span>Pre-orders</span>
                <span>{money(subtotal)}</span>
              </div>
              <div className="ch-sum-due">
                <span>Due today</span>
                <strong>{money(deposit)}</strong>
              </div>
              <p className="ch-small">{subtotal > 0 ? `A ${DEPOSIT * 100}% deposit holds your pre-orders. The rest is settled at the table.` : "No deposit for a table on its own."}</p>
            </div>

            {error && (
              <p className="ch-error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="ch-btn ch-btn-brass ch-btn-block">
              {subtotal > 0 ? `Confirm & pay ${money(deposit)}` : "Confirm reservation"}
            </button>
            <p className="ch-small ch-sum-fine">Free cancellation up to 24 hours before. Preview: no payment is taken.</p>
          </aside>
        </form>
      </section>
    </>
  );
}
