import Link from "next/link";
import { BASE, contact, navLinks, services, svcHref } from "./data";
import { Arrow, Logo } from "./ui";

export function Footer() {
  return (
    <footer className="wv-footer">
      <div className="wv-wrap">
        <div className="wv-foot-grid">
          <div className="wv-foot-brand">
            <Logo light height={38} />
            <p className="wv-foot-line">
              A Pune-based, AI-first digital agency. Websites, AI automation, apps and organic growth for businesses
              ready to grow.
            </p>
            <a href={`mailto:${contact.email}`} className="wv-link">
              {contact.email} <Arrow size={14} />
            </a>
          </div>
          <div>
            <p className="wv-eyebrow">Services</p>
            <ul>
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={svcHref(s)}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="wv-eyebrow">Company</p>
            <ul>
              {navLinks.map((l) => (
                <li key={l.t}>
                  <Link href={l.href}>{l.t}</Link>
                </li>
              ))}
              <li>
                <Link href={`${BASE}#contact`}>Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="wv-eyebrow">Say hello</p>
            <ul>
              <li>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
              </li>
              <li>
                <a href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
              </li>
              <li>
                <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              </li>
              <li>
                <a href={contact.instagram} target="_blank" rel="noreferrer">Instagram</a>
              </li>
              <li>
                <a href={contact.upwork} target="_blank" rel="noreferrer">Upwork</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="wv-foot-word" aria-hidden>
          WEBSITE VIKRETA
        </p>
        <div className="wv-foot-base">
          <span>© {new Date().getFullYear()} Website Vikreta · {contact.city}</span>
          <span>Built, automated and grown by one team.</span>
        </div>
      </div>
    </footer>
  );
}
