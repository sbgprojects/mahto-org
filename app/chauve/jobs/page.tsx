import type { Metadata } from "next";
import { PageHero } from "../blocks";
import { img, jobs, site } from "../data";
import { Arrow } from "../ui";

export const metadata: Metadata = { title: "Jobs · Chauve Irish Restaurant, Atlanta" };

export default function JobsPage() {
  return (
    <>
      <PageHero kicker="Work with us" title={<>Pull up a stool, <em>on the other side.</em></>} sub="We’re building a team that takes hospitality seriously and themselves less so." image={img.taps} />
      <section className="ch-section">
        <div className="ch-wrap ch-jobs">
          <ul className="ch-jobs-list">
            {jobs.map((j) => (
              <li key={j.role}>
                <div>
                  <h2>{j.role}</h2>
                  <p className="ch-dim">{j.desc}</p>
                </div>
                <span className="ch-chip">{j.type}</span>
                <a className="ch-link" href={`mailto:${site.email}?subject=${encodeURIComponent(`Application: ${j.role}`)}`}>
                  Apply <Arrow />
                </a>
              </li>
            ))}
          </ul>
          <p className="ch-small">Don’t see your role? Email {site.email} and tell us what you’d bring.</p>
        </div>
      </section>
    </>
  );
}
