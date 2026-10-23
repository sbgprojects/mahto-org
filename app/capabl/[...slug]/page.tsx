import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pages } from "../site";
import { Arrow, Reveal } from "../ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pages).map((k) => ({ slug: k.split("/") }));
}

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug.join("/")];
  return page ? { title: `${page.title} — Capabl`, description: page.summary } : {};
}

export default async function InnerPage({ params }: Props) {
  const { slug } = await params;
  const page = pages[slug.join("/")];
  if (!page) notFound();

  return (
    <main className="cb-page">
      <div className="cb-wrap">
        <nav className="cb-crumbs" aria-label="Breadcrumb">
          <Link href="/capabl">Home</Link>
          <span aria-hidden>/</span>
          <span>{page.section}</span>
        </nav>

        <h1 className="cb-h1 cb-h1-page">{page.title}</h1>
        <p className="cb-lead cb-page-lead">{page.summary}</p>
        <span className="cb-status">In design</span>

        <div className="cb-planned">
          <p className="cb-label">Planned on this page</p>
          <ol>
            {page.planned.map((p, i) => (
              <li key={p}>
                <Reveal className="cb-planned-item">
                  <span className="cb-num">0{i + 1}</span>
                  <span>{p}</span>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <div className="cb-cta-row">
          <Link href="/capabl" className="cb-btn cb-btn-solid">
            Back to home <Arrow />
          </Link>
        </div>
      </div>
    </main>
  );
}
