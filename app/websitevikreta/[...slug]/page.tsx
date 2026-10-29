import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BASE, services } from "../data";
import { Arrow, KineticTitle, Reveal } from "../ui";

type Page = { title: string; section: string; summary: string };

/* Every link in the navigation resolves to a page; inner pages are placeholders for now. */
const pages: Record<string, Page> = {
  services: { title: "Services", section: "Services", summary: "AI automations, websites, CRMs, web apps, design, SEO and cloud from one team." },
  work: { title: "Work", section: "Work", summary: "Case studies with the numbers attached." },
  blog: { title: "Blog", section: "Blog", summary: "Notes on AI automation, product design and search." },
  careers: { title: "Careers", section: "Studio", summary: "Join a small team that ships real software." },
};
const rel = (href: string) => href.slice(BASE.length + 1);
for (const s of services) {
  pages[rel(s.href)] = { title: s.title, section: "Services", summary: s.blurb };
  pages[rel(s.proof.href)] = { title: s.proof.label, section: "Work", summary: s.proof.metric };
  for (const e of s.extras) pages[rel(e.href)] = { title: `${s.title}: ${e.t}`, section: s.title, summary: s.blurb };
  for (const g of s.groups) {
    pages[rel(g.href)] = { title: g.title, section: s.title, summary: g.blurb };
    for (const l of g.leaves) pages[rel(l.href)] = { title: l.t, section: s.title, summary: g.blurb };
  }
}

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
            <Link href={`${BASE}#contact`} className="wv-btn wv-btn-y">
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
