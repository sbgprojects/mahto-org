import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BASE, services } from "../data";
import { Arrow, KineticTitle, Reveal } from "../ui";

type Page = { title: string; section: string; summary: string };

/* Every link in the navigation resolves to a page; inner pages are placeholders for now. */
const pages: Record<string, Page> = {
  services: { title: "Services", section: "Services", summary: "Brand, performance, social and web, run as one growth team." },
  work: { title: "Work", section: "Work", summary: "Case studies with the numbers attached." },
  insights: { title: "Insights", section: "Insights", summary: "Notes on creative, media and what is working right now." },
  careers: { title: "Careers", section: "Studio", summary: "Join a small team that ships big work." },
};
for (const s of services) {
  pages[s.href.slice(BASE.length + 1)] = { title: s.title, section: "Services", summary: s.blurb };
  for (const g of s.groups) {
    pages[g.href.slice(BASE.length + 1)] = { title: g.title, section: s.title, summary: g.blurb };
    for (const l of g.leaves) pages[l.href.slice(BASE.length + 1)] = { title: l.t, section: s.title, summary: g.blurb };
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
              Start a project <Arrow size={14} />
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
