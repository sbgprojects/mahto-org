"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { PageHero } from "../blocks";
import { BASE, img, specials } from "../data";
import { Arrow, Reveal } from "../ui";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function SpecialsPage() {
  const today = useSyncExternalStore(
    () => () => {},
    () => days[new Date().getDay()],
    () => "",
  );
  return (
    <>
      <PageHero kicker="Specials" title={<>Something on, <em>every night.</em></>} sub="Happy hour on weekdays and a reason to come in every day of the week." image={img.breakfast} />
      <section className="ch-section">
        <div className="ch-wrap ch-specials">
          <Reveal className="ch-happy">
            <p className="ch-eyebrow ch-eyebrow-light">{specials.happy.when}</p>
            <h2 className="ch-h2 ch-h2-big ch-light">
              Happy <em>hour</em>
            </h2>
            <ul>
              {specials.happy.lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </Reveal>
          <div className="ch-week">
            <Reveal>
              <p className="ch-eyebrow">The week at Chauve</p>
            </Reveal>
            <ol>
              {specials.week.map(([d, t, s], i) => (
                <li key={d} className={d === today ? "is-today" : ""}>
                  <Reveal delay={i * 0.04} className="ch-day">
                    <span className="ch-day-d">
                      {d}
                      {d === today && <b>Today</b>}
                    </span>
                    <span className="ch-day-t">{t}</span>
                    <span className="ch-day-s">{s}</span>
                  </Reveal>
                </li>
              ))}
            </ol>
            <Link href={`${BASE}/reserve`} className="ch-btn ch-btn-green">
              Book for tonight <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
