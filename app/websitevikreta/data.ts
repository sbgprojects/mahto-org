/* Website Vikreta — content. Every string and photo on the page lives here. */

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const img = {
  studio: u("photo-1522071820081-009f0129c71c", 2000),
  huddle: u("photo-1568992687947-868a62a9f521", 1400),
  table: u("photo-1521737604893-d14cc237f11d", 1400),
  review: u("photo-1622675363311-3e1904dc1885", 1400),
  crew: u("photo-1758906819465-b2fde39d715d", 1200),
  lipstick: u("photo-1586495777744-4413f21062fa", 1200),
  lipstickDark: u("photo-1645961359170-c01fa306aa6b", 1200),
  beauty: u("photo-1723150512429-bfa92988d845", 1400),
  piccadilly: u("photo-1760180139823-527522243bae", 1600),
  timesSquare: u("photo-1777022335097-4a1825907364", 1200),
  busStop: u("photo-1635873432087-50eba4c4392d", 1200),
  creator: u("photo-1694813646506-135688fc24e4", 1200),
  podcast: u("photo-1764664035163-f8f29058e557", 1200),
  analytics: u("photo-1551288049-bebda4e38f71", 1400),
  stats: u("photo-1460925895917-afdab827c52f", 1400),
  moodboard: u("photo-1690733546551-1007bc0a3414", 1400),
  swatch: u("photo-1664638413302-d1ca29ac885b", 1400),
  sneaker: u("photo-1600185365483-26d7a4cc7519", 1400),
  coffee: u("photo-1584736286279-5d85d32ba79d", 1400),
  coffeeBag: u("photo-1563382931489-e77a18817459", 1400),
  p1: u("photo-1581065178047-8ee15951ede6", 800),
  p2: u("photo-1560250097-0b93528c311a", 800),
  p3: u("photo-1758783505014-eb44b02a711a", 800),
  p4: u("photo-1770510067230-1059f0776b3a", 800),
};

export const BASE = "/websitevikreta";

/* ---------- navigation (mega menu) ---------- */
export type Leaf = { t: string; href: string; tag?: string };
export type Group = { title: string; blurb: string; href: string; leaves: Leaf[] };
export type Service = {
  id: string;
  title: string;
  kicker: string;
  blurb: string;
  href: string;
  image: string;
  proof: { label: string; metric: string };
  groups: Group[];
};

const s = (slug: string) => `${BASE}/services/${slug}`;

export const services: Service[] = [
  {
    id: "brand",
    title: "Brand & Creative",
    kicker: "Look like the leader",
    blurb: "Identity systems, campaign ideas and art direction that make a category notice you.",
    href: s("brand-creative"),
    image: img.moodboard,
    proof: { label: "Kaapi Co. rebrand", metric: "+212% repeat orders" },
    groups: [
      {
        title: "Brand Identity",
        blurb: "Naming, logo, voice and the rules that keep it all consistent.",
        href: s("brand-creative/identity"),
        leaves: [
          { t: "Brand strategy & positioning", href: s("brand-creative/strategy") },
          { t: "Logo & visual systems", href: s("brand-creative/visual-identity") },
          { t: "Packaging design", href: s("brand-creative/packaging") },
        ],
      },
      {
        title: "Campaign Creative",
        blurb: "Big ideas cut down for every screen they need to run on.",
        href: s("brand-creative/campaigns"),
        leaves: [
          { t: "Concept & art direction", href: s("brand-creative/art-direction") },
          { t: "Photo & film production", href: s("brand-creative/production") },
          { t: "Motion & 3D", href: s("brand-creative/motion"), tag: "New" },
        ],
      },
    ],
  },
  {
    id: "performance",
    title: "Performance Marketing",
    kicker: "Spend less per customer",
    blurb: "Paid media run by people who read the numbers daily and change the creative weekly.",
    href: s("performance-marketing"),
    image: img.analytics,
    proof: { label: "Stride Footwear", metric: "4.6× ROAS in 90 days" },
    groups: [
      {
        title: "Paid Social",
        blurb: "Meta, Instagram, YouTube and LinkedIn with a creative testing engine behind them.",
        href: s("performance-marketing/paid-social"),
        leaves: [
          { t: "Meta & Instagram ads", href: s("performance-marketing/meta-ads") },
          { t: "YouTube & CTV", href: s("performance-marketing/youtube") },
          { t: "LinkedIn B2B", href: s("performance-marketing/linkedin") },
        ],
      },
      {
        title: "Search & Commerce",
        blurb: "Capture demand where people are already looking to buy.",
        href: s("performance-marketing/search"),
        leaves: [
          { t: "Google Ads & PMax", href: s("performance-marketing/google-ads") },
          { t: "Amazon & marketplace ads", href: s("performance-marketing/marketplace") },
          { t: "CRO & landing pages", href: s("performance-marketing/cro") },
        ],
      },
    ],
  },
  {
    id: "social",
    title: "Social & Content",
    kicker: "Be worth the follow",
    blurb: "Always-on social, short-form video and creator partnerships that people actually save.",
    href: s("social-content"),
    image: img.creator,
    proof: { label: "Glow Theory launch", metric: "38M organic views" },
    groups: [
      {
        title: "Social Media",
        blurb: "Calendar, community and reporting, handled end to end.",
        href: s("social-content/social-media"),
        leaves: [
          { t: "Social strategy & management", href: s("social-content/management") },
          { t: "Reels & short-form video", href: s("social-content/short-form") },
          { t: "Community management", href: s("social-content/community") },
        ],
      },
      {
        title: "Influence & UGC",
        blurb: "Creators matched to your audience, briefed and paid on results.",
        href: s("social-content/influence"),
        leaves: [
          { t: "Influencer campaigns", href: s("social-content/influencers") },
          { t: "UGC ad production", href: s("social-content/ugc"), tag: "New" },
        ],
      },
    ],
  },
  {
    id: "web",
    title: "Web & SEO",
    kicker: "Get found, then convert",
    blurb: "Fast, good-looking websites built to rank on Google and get cited by AI search.",
    href: s("web-seo"),
    image: img.stats,
    proof: { label: "Northwind Clinics", metric: "3.1× organic leads" },
    groups: [
      {
        title: "Websites",
        blurb: "Marketing sites and stores that load fast and sell harder.",
        href: s("web-seo/websites"),
        leaves: [
          { t: "Website design & build", href: s("web-seo/web-design") },
          { t: "Shopify & D2C stores", href: s("web-seo/shopify") },
        ],
      },
      {
        title: "Search Visibility",
        blurb: "Technical, content and authority work that compounds.",
        href: s("web-seo/search"),
        leaves: [
          { t: "SEO audits & strategy", href: s("web-seo/seo") },
          { t: "AI search (GEO)", href: s("web-seo/geo"), tag: "New" },
          { t: "Content marketing", href: s("web-seo/content") },
        ],
      },
    ],
  },
];

export const navLinks = [
  { t: "Work", href: `${BASE}#work` },
  { t: "Process", href: `${BASE}#process` },
  { t: "Studio", href: `${BASE}#team` },
  { t: "Insights", href: `${BASE}/insights` },
];

/* ---------- home ---------- */
export const heroWords = ["unskippable", "unforgettable", "scroll-stopping", "the obvious pick"];

export const marqueeA = ["Brand", "Performance", "Social", "Content", "SEO", "Web", "Influence", "Film"];
export const marqueeB = ["Kaapi Co.", "Stride", "Glow Theory", "Northwind", "Lumen Labs", "Ferm & Co", "Oddbird", "Halcyon"];

export const manifesto =
  "Most marketing is wallpaper. People scroll past it without blinking. We make the work they stop for, then measure what it did to sales, not likes.";

export const stats = [
  { n: 240, suffix: "+", label: "Campaigns launched" },
  { n: 4.6, suffix: "×", label: "Average return on ad spend", decimals: 1 },
  { n: 92, suffix: "%", label: "Clients who stay past year one" },
  { n: 1.2, suffix: "B", label: "Impressions served last year", decimals: 1 },
];

export const work = [
  {
    client: "Kaapi Co.",
    title: "A coffee brand people line up for",
    tags: ["Rebrand", "Packaging", "Social"],
    metric: "+212%",
    metricLabel: "repeat orders",
    image: img.coffee,
    year: "2026",
  },
  {
    client: "Stride Footwear",
    title: "From launch to sold out in 11 days",
    tags: ["Performance", "UGC", "Shopify"],
    metric: "4.6×",
    metricLabel: "ROAS",
    image: img.sneaker,
    year: "2026",
  },
  {
    client: "Glow Theory",
    title: "A lipstick drop that broke the feed",
    tags: ["Launch", "Influence", "Film"],
    metric: "38M",
    metricLabel: "organic views",
    image: img.lipstickDark,
    year: "2025",
  },
  {
    client: "Lumen Labs",
    title: "Out of home, onto every phone",
    tags: ["OOH", "Campaign", "Paid social"],
    metric: "61%",
    metricLabel: "lift in branded search",
    image: img.piccadilly,
    year: "2025",
  },
];

export const process = [
  { n: "01", t: "Dig", d: "Two weeks in your data, your reviews and your competitors' ads. We find the one thing worth saying." },
  { n: "02", t: "Make", d: "Ideas, scripts and designs built in sprints. You see real work in week three, not a deck." },
  { n: "03", t: "Launch", d: "Everything goes live with tracking wired in, so every rupee is accounted for from day one." },
  { n: "04", t: "Scale", d: "Weekly creative tests. Winners get budget, losers get cut. Results compound every month." },
];

export const testimonials = [
  {
    quote: "They rebuilt our brand and our ad account in the same quarter. Sales doubled and the team finally has something to be proud of.",
    name: "Ananya Rao",
    role: "Founder, Kaapi Co.",
    avatar: img.p1,
  },
  {
    quote: "The first agency that talks to us about margin, not impressions. Every report ends with what they are changing next week.",
    name: "Rohan Mehta",
    role: "CMO, Stride Footwear",
    avatar: img.p2,
  },
  {
    quote: "Fast, sharp and properly honest. They killed two of our favourite ideas because the data said so, and they were right.",
    name: "Isha Kulkarni",
    role: "Head of Brand, Glow Theory",
    avatar: img.p3,
  },
];

export const team = [
  { name: "Arjun Patil", role: "Founder & Strategy", image: img.p2 },
  { name: "Meera Joshi", role: "Creative Director", image: img.p1 },
  { name: "Kabir Shah", role: "Head of Performance", image: img.p4 },
  { name: "Tara Desai", role: "Social & Content Lead", image: img.p3 },
];

export const contact = {
  email: "hello@websitevikreta.com",
  phone: "+91 98765 43210",
  city: "Pune, India",
};
