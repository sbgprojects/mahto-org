import Link from "next/link";
import { footerLinks, nav } from "./site";

export function Footer() {
  const programmes = [...(nav[1].children ?? []), ...(nav[2].children ?? [])].filter(
    (c) => !c.label.startsWith("Bring"),
  );
  const company = nav[6].children ?? [];
  return (
    <footer className="cb-footer">
      <div className="cb-wrap">
        <div className="cb-footer-grid">
          <div className="cb-footer-brand">
            <Link href="/capabl" className="cb-logo cb-logo-light" aria-label="Capabl home">
              capabl<i />
            </Link>
            <p>Institution transformation partner for colleges.</p>
          </div>
          <nav aria-label="Programmes">
            <h4>Programmes</h4>
            <ul>
              {programmes.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/capabl/upcoming-programs">Upcoming Programs</Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="Company">
            <h4>Company</h4>
            <ul>
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/capabl/success-stories">Success Stories</Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="Resources">
            <h4>Resources</h4>
            <ul>
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="cb-copy">© {new Date().getFullYear()} Capabl. All rights reserved.</p>
      </div>
    </footer>
  );
}
