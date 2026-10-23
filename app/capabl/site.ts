// Site map for the Capabl site — drives the navbar, footer and the placeholder pages.
// Paths are relative to /capabl (also reachable under /capabl.in).
const B = "/capabl";

export type NavLeaf = { label: string; href: string };
export type NavItem = { label: string; href?: string; children?: NavLeaf[] };

export const nav: NavItem[] = [
  { label: "Home", href: B },
  {
    label: "Agentic AI",
    children: [
      { label: "Agentic AI for Students", href: `${B}/agentic-ai/students` },
      { label: "Agentic AI for Faculty", href: `${B}/agentic-ai/faculty` },
      { label: "Establish AI Centre of Excellence", href: `${B}/agentic-ai/centre-of-excellence` },
      { label: "Bring to Your Institution", href: `${B}/host/agentic-ai` },
    ],
  },
  {
    label: "Electric Vehicles",
    children: [
      { label: "EV Saksham for Students", href: `${B}/ev/students` },
      { label: "EV Saksham for Faculty", href: `${B}/ev/faculty` },
      { label: "Bring to Your Institution", href: `${B}/host/ev-saksham` },
    ],
  },
  {
    label: "Upcoming Programs",
    children: [
      { label: "Upcoming Programs", href: `${B}/upcoming-programs` },
      { label: "EV Student Registration", href: `${B}/upcoming-programs/ev-registration` },
      { label: "AI Student Registration", href: `${B}/upcoming-programs/ai-registration` },
    ],
  },
  { label: "Success Stories", href: `${B}/success-stories` },
  { label: "Ask for Sponsorship", href: `${B}/sponsorship` },
  {
    label: "About",
    children: [
      { label: "About Capabl", href: `${B}/about` },
      { label: "Our Story", href: `${B}/about/our-story` },
      { label: "Partner Institutions", href: `${B}/about/partner-institutions` },
      { label: "Careers", href: `${B}/about/careers` },
      { label: "Contact Us", href: `${B}/about/contact` },
    ],
  },
];

// Primary call-to-action in the navbar.
export const host: NavItem = {
  label: "Host an Initiative",
  children: [
    { label: "Host Agentic AI at Your Institution", href: `${B}/host/agentic-ai` },
    { label: "Host EV Saksham at Your Institution", href: `${B}/host/ev-saksham` },
  ],
};

export const footerLinks: NavLeaf[] = [
  { label: "Verify Certificate", href: `${B}/verify-certificate` },
  { label: "Terms & Conditions", href: `${B}/terms` },
  { label: "Privacy Policy", href: `${B}/privacy` },
];

/* ---------- placeholder pages (one per route above) ---------- */
export type PageInfo = {
  title: string;
  section: string;
  summary: string;
  planned: string[];
};

const programme = (who: string): string[] => [
  "Programme overview",
  `Who it is for — ${who}`,
  "What participants build and take away",
  "Certification",
  "Bring it to your institution",
];

export const pages: Record<string, PageInfo> = {
  "agentic-ai/students": {
    title: "Agentic AI for Students",
    section: "Agentic AI",
    summary: "The student programme in Agentic AI.",
    planned: programme("students"),
  },
  "agentic-ai/faculty": {
    title: "Agentic AI for Faculty",
    section: "Agentic AI",
    summary: "The faculty development programme in Agentic AI.",
    planned: programme("faculty"),
  },
  "agentic-ai/centre-of-excellence": {
    title: "Establish an AI Centre of Excellence",
    section: "Agentic AI",
    summary: "A long-term AI Centre of Excellence for your institution.",
    planned: ["Vision and outcomes", "What the Centre includes", "How Capabl sets it up", "Roles for faculty and students", "Start the conversation"],
  },
  "host/agentic-ai": {
    title: "Host Agentic AI at Your Institution",
    section: "Host an Initiative",
    summary: "Bring the Agentic AI initiative to your campus.",
    planned: ["What your institution provides", "What Capabl manages", "Typical flow, planning to certification", "Institutional enquiry form"],
  },
  "ev/students": {
    title: "EV Saksham for Students",
    section: "Electric Vehicles",
    summary: "The student programme in electric vehicles.",
    planned: programme("students"),
  },
  "ev/faculty": {
    title: "EV Saksham for Faculty",
    section: "Electric Vehicles",
    summary: "The faculty development programme in electric vehicles.",
    planned: programme("faculty"),
  },
  "host/ev-saksham": {
    title: "Host EV Saksham at Your Institution",
    section: "Host an Initiative",
    summary: "Bring the EV Saksham initiative to your campus.",
    planned: ["What your institution provides", "What Capabl manages", "Typical flow, planning to certification", "Institutional enquiry form"],
  },
  "upcoming-programs": {
    title: "Upcoming Programs",
    section: "Upcoming Programs",
    summary: "Programmes open for registration.",
    planned: ["List of upcoming programmes", "Dates, mode and venue", "Register"],
  },
  "upcoming-programs/ev-registration": {
    title: "EV Student Registration",
    section: "Upcoming Programs",
    summary: "Registration for the EV student programme, with online payment.",
    planned: ["Programme summary", "Participant details form", "Secure online payment", "Confirmation and receipt"],
  },
  "upcoming-programs/ai-registration": {
    title: "AI Student Registration",
    section: "Upcoming Programs",
    summary: "Registration for the AI student programme, with online payment.",
    planned: ["Programme summary", "Participant details form", "Secure online payment", "Confirmation and receipt"],
  },
  "success-stories": {
    title: "Success Stories",
    section: "Success Stories",
    summary: "Proof of execution across campuses, in one place.",
    planned: [
      "Campus impact stories — voices from campuses",
      "Press & media, with a detailed page for each programme conducted in colleges",
      "Capabl achievers and video success stories of placed students",
      "Projects built by students",
      "Capabl timeline and activities",
      "A page for each college where a programme was completed",
    ],
  },
  sponsorship: {
    title: "Ask for Sponsorship",
    section: "Sponsorship",
    summary: "Support an initiative at an institution.",
    planned: ["Who can ask", "What can be sponsored", "Sponsorship request form"],
  },
  about: {
    title: "About Capabl",
    section: "About",
    summary: "An institution transformation partner for colleges.",
    planned: ["Who we are", "What we do for institutions", "Leadership"],
  },
  "about/our-story": {
    title: "Our Story",
    section: "About",
    summary: "How Capabl began and where it is going.",
    planned: ["Where we started", "Milestones", "What comes next"],
  },
  "about/partner-institutions": {
    title: "Partner Institutions",
    section: "About",
    summary: "The institutions we have worked with.",
    planned: ["Partner college directory", "Filter by city or state"],
  },
  "about/careers": {
    title: "Careers",
    section: "About",
    summary: "Work with Capabl.",
    planned: ["Open roles", "Life at Capabl", "How to apply"],
  },
  "about/contact": {
    title: "Contact Us",
    section: "About",
    summary: "Talk to the Capabl team.",
    planned: ["Institutional enquiries", "General contact details", "Enquiry form"],
  },
  "verify-certificate": {
    title: "Verify Certificate",
    section: "Resources",
    summary: "Confirm that a Capabl certificate is genuine.",
    planned: ["Enter certificate ID", "Verification result"],
  },
  terms: {
    title: "Terms & Conditions",
    section: "Resources",
    summary: "The terms that apply to Capabl programmes and this website.",
    planned: ["Terms of use", "Programme and payment terms", "Refund and cancellation policy"],
  },
  privacy: {
    title: "Privacy Policy",
    section: "Resources",
    summary: "How Capabl handles personal information.",
    planned: ["What we collect", "How it is used", "Your choices"],
  },
};
