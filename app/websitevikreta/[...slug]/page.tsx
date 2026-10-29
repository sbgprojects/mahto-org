import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BASE, posts, services, svcHref, work } from "../data";
import { Arrow, KineticTitle, Reveal } from "../ui";

type Page = { title: string; section: string; summary: string };

/* Every link in the navigation resolves to a page; inner pages are placeholders for now. */
const pages: Record<string, Page> = {
  services: { title: "Services", section: "Services", summary: "AI automations, websites, apps, design and organic growth from one team." },
  work: { title: "Work", section: "Work", summary: "Case studies with the numbers attached." },
  about: { title: "About", section: "Studio", summary: "A Pune-based, AI-first digital agency working with founders across the globe." },
  blog: { title: "Blog", section: "Blog", summary: "The thinking behind the work." },
  careers: { title: "Careers", section: "Studio", summary: "Join a small team that ships real work." },
};
const rel = (href: string) => href.slice(BASE.length + 1);
for (const s of services) {
  pages[rel(svcHref(s))] = { title: s.title, section: "Services", summary: s.blurb };
  for (const sol of s.solutions) {
    pages[rel(svcHref(s, sol.slug))] = { title: sol.title, section: s.title, summary: sol.blurb };
    for (const l of sol.leaves) pages[rel(svcHref(s, sol.slug, l.slug))] = { title: l.t, section: s.title, summary: sol.blurb };
  }
  for (const e of s.extras) pages[rel(svcHref(s, e.slug))] = { title: `${s.title} ${e.t}`, section: s.title, summary: e.sub ?? s.blurb };
}
for (const w of work) pages[`work/${w.slug}`] = { title: w.title, section: "Work", summary: w.body };
for (const s of services) pages[`work/${s.proof.slug}`] ??= { title: s.proof.label, section: "Work", summary: s.proof.metric };
for (const p of posts) pages[`blog/${p.slug}`] = { title: p.t, section: "Blog", summary: p.d };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pages).map((k) => ({ slug: k.split("/") }));
}

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug.join("/")];
  return page ? { title: `${page.title} — Website Vikreta`, description: page.summary } : {};
}

export default async function InnerPage({ params }: Props) {
  const { slug } = await params;
  const page = pages[slug.join("/")];
  if (!page) notFound();

  return (
    <main className="wv-page">
      <div className="wv-grid-bg" aria-hidden />
      <div className="wv-wrap">
        <nav className="wv-crumbs" aria-label="Breadcrumb">
          <Link href={BASE}>Home</Link>
          <span aria-hidden>/</span>
          <span>{page.section}</span>
        </nav>
        <KineticTitle as="h1" lines={[page.title]} className="wv-h2 wv-page-h1" />
        <Reveal delay={0.2}>
          <p className="wv-page-lead">{page.summary}</p>
          <span className="wv-chip is-lg">Page in production</span>
          <div className="wv-cta-row">
            <Link href={`${BASE}#contact`} className="wv-btn wv-btn-dark">
              Book a free audit <Arrow size={14} />
            </Link>
            <Link href={BASE} className="wv-btn wv-btn-ghost">
              Back to home
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
