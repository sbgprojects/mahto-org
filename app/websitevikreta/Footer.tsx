import Link from "next/link";
import { BASE, contact, navLinks, services } from "./data";
import { Arrow, Logo } from "./ui";

export function Footer() {
  return (
    <footer className="wv-footer">
      <div className="wv-wrap">
        <div className="wv-foot-grid">
          <div className="wv-foot-brand">
            <Logo light height={36} />
            <p className="wv-foot-line">
              Build it <em>once.</em> Build it right.
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
                  <Link href={s.href}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="wv-eyebrow">Studio</p>
            <ul>
              {navLinks.map((l) => (
                <li key={l.t}>
                  <Link href={l.href}>{l.t}</Link>
                </li>
              ))}
              <li>
                <Link href={`${BASE}/careers`}>Careers</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="wv-eyebrow">Say hello</p>
            <ul>
              <li>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
              </li>
              <li>{contact.city}</li>
              <li>
                <a href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
              </li>
              <li>
                <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="wv-foot-word" aria-hidden>
          WEBSITE VIKRETA
        </p>
        <div className="wv-foot-base">
          <span>© {new Date().getFullYear()} Website Vikreta</span>
          <span>IT consulting, design and development from one team.</span>
        </div>
      </div>
    </footer>
  );
}
