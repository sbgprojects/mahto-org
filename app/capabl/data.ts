// Single source for imagery + copy. Photos are placeholders (Unsplash) —
// swap each URL for a real Capabl campus / workshop photograph before launch.
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const img = {
  hero: u("photo-1687709348710-05314eea5476", 2200),
  campus: u("photo-1725231949188-45d4c2d028b3"),
  crowd: u("photo-1701709304274-bd9e5402d979", 1800),
  graduate: u("photo-1719408938150-f1a14ca4ca55", 1000),
  classroom: u("photo-1722573783625-eceb04251036"),
  smartClass: u("photo-1602145095452-aba06946ed05"),
  auditorium: u("photo-1778877035014-98c41b7c1460"),
  hall: u("photo-1778876091364-1747994fe24d"),
  ai: u("photo-1581092333322-31d2fd38a35e", 1400),
  aiStudents: u("photo-1658584124309-768111d9c5db", 1400),
  ev: u("photo-1581091226205-b28ac533a45f", 1400),
  evTeam: u("photo-1581091226033-d5c48150dbaa", 1400),
  project: u("photo-1653566031536-4d1b6a9da15e", 1400),
  hack: u("photo-1519389950473-47ba0277781c", 1400),
};

// Placeholder ecosystem marks — replace with real recognition logos.
export const recognitions = [
  "NORTHBRIDGE", "Axiom Labs", "MERIDIAN", "vertex.", "Orbital", "SIGMA & CO",
];

export const outcomes = [
  {
    n: "01",
    t: "Graduate Success",
    d: "Preparing graduates for placements, higher studies and entrepreneurship through practical learning.",
    img: img.graduate,
  },
  {
    n: "02",
    t: "Faculty Excellence",
    d: "Enabling continuous learning, emerging technologies and research-driven teaching.",
    img: img.smartClass,
  },
  {
    n: "03",
    t: "Campus Innovation",
    d: "Building campuses where projects, collaboration and innovation become part of everyday learning.",
    img: img.project,
  },
];

export const stats = {
  lead: { v: 3, s: "+", u: "Lakh", l: "Students" },
  rest: [
    { v: 800, s: "+", l: "Institutions" },
    { v: 5000, s: "+", l: "Faculty Trained" },
    { v: 100, s: "+", l: "Industry Experts" },
    { v: 100, s: "+", l: "Cities" },
  ],
};

export const initiatives = [
  {
    k: "AI",
    t: "Artificial Intelligence",
    d: "Preparing institutions for the AI era.",
    img: img.ai,
    a: "Student & Faculty Programs",
    b: "AI Centre of Excellence",
    ha: "/capabl/agentic-ai/students",
    hb: "/capabl/agentic-ai/centre-of-excellence",
  },
  {
    k: "EV",
    t: "Electric Vehicles",
    d: "Building capability in future mobility.",
    img: img.ev,
    a: "Student & Faculty Programs",
    b: "EV Centre of Excellence",
    ha: "/capabl/ev/students",
    hb: "/capabl/host/ev-saksham",
  },
];

export const news = [
  { tag: "Collaboration", t: "Capabl signs MoU with XYZ University", img: img.hall },
  { tag: "Initiative", t: "AI Initiative at ABC Institute", img: img.aiStudents },
  { tag: "Faculty", t: "Faculty Development Programme at LMN College", img: img.classroom },
];

export const why = [
  { t: "End-to-End Execution", d: "From planning to certifications, Capabl manages the complete execution." },
  { t: "High-Impact Campus Experience", d: "Professionally designed initiatives that create engaging learning experiences." },
  { t: "Industry-Led Learning", d: "Delivered by industry practitioners with a strong focus on practical implementation." },
  { t: "Minimal Institutional Effort", d: "Your institution provides the venue and faculty coordination. Capabl manages the rest." },
];

// `video` = YouTube id. Leave empty until the real testimonial is shot.
export const voices = [
  { role: "Principal Story", who: "Institution leadership", img: img.auditorium, video: "" },
  { role: "Faculty Story", who: "Faculty member", img: img.classroom, video: "" },
  { role: "Student Story", who: "Student", img: img.graduate, video: "" },
];

export const built = [
  { t: "AI Agents", img: img.ai },
  { t: "Electric Vehicles", img: img.evTeam },
  { t: "Student Projects", img: img.project },
  { t: "Hackathons", img: img.hack },
];

// Placeholder partner institutions — replace with real client crests.
export const partners = [
  "XYZ University", "ABC Institute", "LMN College", "PQR University", "DEF Institute", "GHI College",
  "JKL University", "MNO Institute", "STU College", "VWX University", "HIJ Institute", "OPQ College",
];

export const media = [
  { t: "Press Coverage", img: img.crowd },
  { t: "News Articles", img: img.campus },
  { t: "Interviews", img: img.classroom },
  { t: "Institution Features", img: img.hero },
];
