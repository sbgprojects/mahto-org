"use client";

import { useEffect, useState } from "react";
import type { Section } from "./data";
import { money } from "./cart";
import { AddButton, Photo, Reveal } from "./ui";

/** Short photographic banner used at the top of inner pages. */
export function PageHero({ kicker, title, sub, image }: { kicker: string; title: React.ReactNode; sub?: string; image: string }) {
  return (
    <section className="ch-phero">
      <Photo src={image} alt="" priority sizes="100vw" className="ch-phero-bg" />
      <div className="ch-phero-shade" />
      <div className="ch-wrap ch-phero-in">
        <Reveal>
          <p className="ch-eyebrow ch-eyebrow-light">{kicker}</p>
          <h1 className="ch-h1">{title}</h1>
          {sub && <p className="ch-phero-sub">{sub}</p>}
        </Reveal>
      </div>
    </section>
  );
}

/** Printed-menu board: sticky section tabs, dotted price leaders, pre-order buttons. */
export function MenuBoard({ sections, note }: { sections: Section[]; note?: string }) {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <div className="ch-board">
      <nav className="ch-tabs" aria-label="Menu sections">
        <div className="ch-wrap ch-tabs-in">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={active === s.id ? "is-on" : ""} aria-current={active === s.id ? "true" : undefined}>
              {s.title}
            </a>
          ))}
        </div>
      </nav>
      <div className="ch-wrap">
        {note && <p className="ch-board-note">{note}</p>}
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="ch-sec" aria-labelledby={`${s.id}-h`}>
            <Reveal className="ch-sec-head">
              <h2 id={`${s.id}-h`} className="ch-h2">
                {s.title}
              </h2>
              {s.note && <p className="ch-dim">{s.note}</p>}
            </Reveal>
            <ul className="ch-items">
              {s.items.map((it) => (
                <li key={it.id} className="ch-item">
                  <div className="ch-item-top">
                    <h3>
                      {it.name}
                      {it.tags?.map((t) => (
                        <abbr key={t} title={t === "V" ? "Vegetarian" : "Gluten free"} className="ch-tag">
                          {t}
                        </abbr>
                      ))}
                    </h3>
                    <span className="ch-lead" aria-hidden />
                    <span className="ch-price">{money(it.price)}</span>
                  </div>
                  {it.desc && <p className="ch-item-desc">{it.desc}</p>}
                  {it.preorder && <AddButton item={it} label="Pre-order" className="ch-add-sm" />}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
