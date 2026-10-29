/* Website Vikreta — content. Every string and photo on the page lives here. */

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;
const local = (p: string) => `/websitevikreta/${p}`;

export const BASE = "/websitevikreta";

export const brand = {
  logo: local("logo.svg"),
  logoLight: local("logo-light.svg"),
};

export const img = {
  studio: u("photo-1522071820081-009f0129c71c", 2000),
  huddle: u("photo-1568992687947-868a62a9f521", 1400),
  table: u("photo-1521737604893-d14cc237f11d", 1400),
  review: u("photo-1622675363311-3e1904dc1885", 1400),
  code: u("photo-1484417894907-623942c8ee29", 1400),
  codeDesk: u("photo-1587620962725-abab7fe55159", 1400),
  web: u("photo-1585076641399-5c06d1b3365f", 1400),
  ai: u("photo-1662974770404-468fd9660389", 1400),
  analytics: u("photo-1551288049-bebda4e38f71", 1400),
  laptop: u("photo-1608222351212-18fe0ec7b13b", 1400),
  dashboard: u("photo-1526628953301-3e589a6a8b74", 1400),
  swatch: u("photo-1664638413302-d1ca29ac885b", 1400),
  p1: u("photo-1581065178047-8ee15951ede6", 800),
  p2: u("photo-1560250097-0b93528c311a", 800),
  p3: u("photo-1758783505014-eb44b02a711a", 800),
  p4: u("photo-1770510067230-1059f0776b3a", 800),
};

/* ---------- navigation (mega menu) ----------
   Shape follows the agreed navbar: service → solutions → leaves, plus extras and proof. */
export type Leaf = { t: string; href: string; tag?: string };
export type Group = { title: string; blurb: string; href: string; leaves: Leaf[] };
export type Service = {
  id: string;
  title: string;
  kicker: string;
  blurb: string;
  href: string;
  image: string;
  proof: { label: string; metric: string; href: string };
  cta: string;
  extras: Leaf[];
  groups: Group[];
};

type Def = Omit<Service, "href" | "groups" | "extras" | "proof"> & {
  slug: string;
  proof: { label: string; metric: string; slug: string };
  extras: { t: string; slug: string }[];
  groups: { title: string; slug: string; blurb: string; leaves: { t: string; slug: string; tag?: string }[] }[];
};

/* Builds every href from slugs: /websitevikreta/services/<service>/<solution>/<leaf>. */
function service({ slug, proof, extras, groups, ...rest }: Def): Service {
  const root = `${BASE}/services/${slug}`;
  return {
    ...rest,
    href: root,
    proof: { label: proof.label, metric: proof.metric, href: `${BASE}/work/${proof.slug}` },
    extras: extras.map((e) => ({ t: e.t, href: `${root}/${e.slug}` })),
    groups: groups.map((g) => ({
      title: g.title,
      blurb: g.blurb,
      href: `${root}/${g.slug}`,
      leaves: g.leaves.map((l) => ({ t: l.t, href: `${root}/${g.slug}/${l.slug}`, tag: l.tag })),
    })),
  };
}

export const services: Service[] = [
  service({
    id: "ai",
    slug: "ai-automations",
    title: "AI Apps & Automations",
    kicker: "Take the busywork off your team",
    blurb: "Fixed-scope projects that take repetitive work off your team, built on the tools you already use.",
    image: img.ai,
    proof: { label: "Simpli Home, 20 hours cut to 1", metric: "20h → 1h", slug: "simpli-home" },
    cta: "Book a free process audit",
    extras: [
      { t: "Pricing", slug: "pricing" },
      { t: "Platforms: Make, n8n, WhatsApp API", slug: "platforms" },
    ],
    groups: [
      {
        title: "E-commerce Content Automation",
        slug: "ecommerce-content-automation",
        blurb: "Turn product photos into ready-to-post creatives in bulk.",
        leaves: [
          { t: "Bulk product image automation", slug: "bulk-product-image-automation" },
          { t: "AI UGC video ads", slug: "ai-ugc-video-ads" },
          { t: "AI product visuals", slug: "ai-product-visuals" },
        ],
      },
      {
        title: "Lead Response & Booking",
        slug: "lead-response-booking",
        blurb: "Answer every enquiry in minutes, on WhatsApp and by phone.",
        leaves: [
          { t: "WhatsApp AI agent", slug: "whatsapp-ai-agent" },
          { t: "AI receptionist (voice)", slug: "ai-receptionist", tag: "New" },
          { t: "Missed call recovery", slug: "missed-call-recovery" },
        ],
      },
      {
        title: "Hiring & Onboarding Automation",
        slug: "hiring-onboarding-automation",
        blurb: "Offer letters, NDAs and onboarding without the paperwork chase.",
        leaves: [
          { t: "Offer letter automation", slug: "offer-letter-automation" },
          { t: "Candidate screening", slug: "candidate-screening-automation" },
        ],
      },
      {
        title: "Document & Proposal Automation",
        slug: "document-proposal-automation",
        blurb: "Generate proposals and contracts from a form or CRM record.",
        leaves: [{ t: "Proposal generation", slug: "proposal-generation-automation" }],
      },
    ],
  }),
  service({
    id: "web",
    slug: "web-development",
    title: "Web Design & Development",
    kicker: "Fast sites that rank and sell",
    blurb: "Custom, SEO-ready websites for growing businesses. Fast to load, written to rank, built around how you sell.",
    image: img.web,
    proof: { label: "AP Cleanco, zero to online", metric: "Top 3 locally", slug: "ap-cleanco" },
    cta: "Get a free website audit",
    extras: [
      { t: "Pricing", slug: "pricing" },
      { t: "Stacks: Next.js, Shopify, Webflow", slug: "stacks" },
    ],
    groups: [
      {
        title: "Business Websites",
        slug: "business-websites",
        blurb: "Marketing sites that load in under a second and turn visits into enquiries.",
        leaves: [
          { t: "Company & service websites", slug: "company-websites" },
          { t: "Landing pages", slug: "landing-pages" },
          { t: "Website redesign & migration", slug: "website-redesign" },
        ],
      },
      {
        title: "E-commerce",
        slug: "ecommerce-development",
        blurb: "Stores built to sell, with the integrations your operations need.",
        leaves: [
          { t: "Shopify development", slug: "shopify-development" },
          { t: "WooCommerce stores", slug: "woocommerce-development" },
          { t: "Headless commerce", slug: "headless-commerce", tag: "New" },
        ],
      },
      {
        title: "CMS & Performance",
        slug: "cms-performance",
        blurb: "Sites your team can edit, that stay fast as they grow.",
        leaves: [
          { t: "Next.js & Webflow builds", slug: "nextjs-webflow" },
          { t: "Core Web Vitals optimisation", slug: "speed-optimisation" },
          { t: "Website maintenance", slug: "website-maintenance" },
        ],
      },
    ],
  }),
  service({
    id: "apps",
    slug: "crm-web-applications",
    title: "CRMs & Web Applications",
    kicker: "Software shaped to your process",
    blurb: "Custom CRMs, customer portals, internal tools and SaaS products built around how your business actually runs.",
    image: img.dashboard,
    proof: { label: "Cozmo Realty listings CRM", metric: "3× faster follow-ups", slug: "cozmo-realty" },
    cta: "Scope your app in a free call",
    extras: [
      { t: "Pricing", slug: "pricing" },
      { t: "Integrations: Stripe, Razorpay, Zapier", slug: "integrations" },
    ],
    groups: [
      {
        title: "Custom CRM",
        slug: "custom-crm",
        blurb: "Leads, deals and follow-ups in one place, shaped to your sales process.",
        leaves: [
          { t: "Sales & lead CRM", slug: "sales-crm" },
          { t: "Real estate CRM", slug: "real-estate-crm" },
          { t: "HubSpot & Zoho customisation", slug: "crm-customisation" },
        ],
      },
      {
        title: "Web Applications",
        slug: "web-applications",
        blurb: "Portals and SaaS products, from MVP to the version customers pay for.",
        leaves: [
          { t: "Customer & partner portals", slug: "customer-portals" },
          { t: "SaaS MVP development", slug: "saas-mvp" },
          { t: "Booking & scheduling platforms", slug: "booking-platforms" },
        ],
      },
      {
        title: "Internal Tools & Mobile",
        slug: "internal-tools",
        blurb: "Replace the spreadsheet that runs your business.",
        leaves: [
          { t: "Admin dashboards", slug: "admin-dashboards" },
          { t: "Inventory & operations tools", slug: "ops-tools" },
          { t: "iOS & Android apps", slug: "mobile-apps", tag: "New" },
        ],
      },
    ],
  }),
  service({
    id: "uiux",
    slug: "uiux-design",
    title: "UI/UX Design",
    kicker: "Products people get instantly",
    blurb: "User research, wireframes and product design for web and mobile. Design systems your developers can actually ship.",
    image: img.swatch,
    proof: { label: "Sustainable Bitcoin Protocol", metric: "MVP → Product", slug: "sustainable-bitcoin-protocol" },
    cta: "Get a free UX audit",
    extras: [
      { t: "Pricing", slug: "pricing" },
      { t: "Tools: Figma, Framer, Maze", slug: "tools" },
    ],
    groups: [
      {
        title: "Research & Strategy",
        slug: "ux-research",
        blurb: "Find out where users get stuck before redesigning anything.",
        leaves: [
          { t: "UX audit", slug: "ux-audit" },
          { t: "User interviews & testing", slug: "user-testing" },
          { t: "Information architecture", slug: "information-architecture" },
        ],
      },
      {
        title: "Product Design",
        slug: "product-design",
        blurb: "Interfaces for web apps, dashboards and mobile that feel obvious.",
        leaves: [
          { t: "SaaS & dashboard UI", slug: "saas-ui-design" },
          { t: "Mobile app design", slug: "mobile-app-design" },
          { t: "Interactive prototypes", slug: "prototyping" },
        ],
      },
      {
        title: "Design Systems",
        slug: "design-systems",
        blurb: "Components and rules that keep every new screen consistent.",
        leaves: [
          { t: "Figma design systems", slug: "figma-design-systems" },
          { t: "Component libraries", slug: "component-libraries" },
          { t: "Design for AI agents", slug: "agent-ready-ux", tag: "New" },
        ],
      },
    ],
  }),
  service({
    id: "seo",
    slug: "seo-geo",
    title: "SEO & GEO",
    kicker: "Get found on Google and in AI answers",
    blurb: "Technical SEO and generative engine optimisation, so you rank on Google and get cited by ChatGPT and Perplexity.",
    image: img.analytics,
    proof: { label: "Budget Renovations local search", metric: "+184% organic leads", slug: "budget-renovations" },
    cta: "Get a free SEO & GEO audit",
    extras: [
      { t: "Pricing", slug: "pricing" },
      { t: "Free AI visibility check", slug: "ai-visibility-check" },
    ],
    groups: [
      {
        title: "Search Engine Optimisation",
        slug: "seo",
        blurb: "Technical fixes and content that move rankings, then hold them.",
        leaves: [
          { t: "Technical SEO audit", slug: "technical-seo-audit" },
          { t: "Local SEO & Google Business", slug: "local-seo" },
          { t: "On-page & content SEO", slug: "on-page-seo" },
        ],
      },
      {
        title: "Generative Engine Optimisation",
        slug: "geo",
        blurb: "Become the source AI answers quote when buyers ask about your category.",
        leaves: [
          { t: "ChatGPT & Perplexity visibility", slug: "ai-search-visibility", tag: "New" },
          { t: "Google AI Overviews", slug: "ai-overviews" },
          { t: "Schema & entity SEO", slug: "schema-entity-seo" },
        ],
      },
    ],
  }),
  service({
    id: "cloud",
    slug: "it-consulting",
    title: "IT Consulting & Cloud",
    kicker: "The right stack, kept running",
    blurb: "Tech strategy, cloud setup and ongoing support, so the systems we build stay fast, secure and yours.",
    image: img.codeDesk,
    proof: { label: "Workik platform migration", metric: "Zero downtime", slug: "workik" },
    cta: "Book a free tech consultation",
    extras: [
      { t: "Support plans", slug: "support-plans" },
      { t: "Platforms: AWS, Vercel, GCP", slug: "platforms" },
    ],
    groups: [
      {
        title: "Tech Consulting",
        slug: "tech-consulting",
        blurb: "An honest second opinion before you spend on software.",
        leaves: [
          { t: "Tech stack audit", slug: "tech-stack-audit" },
          { t: "Fractional CTO", slug: "fractional-cto" },
          { t: "Build vs buy advice", slug: "build-vs-buy" },
        ],
      },
      {
        title: "Cloud & DevOps",
        slug: "cloud-devops",
        blurb: "Hosting, deployments and monitoring set up properly once.",
        leaves: [
          { t: "Cloud setup & migration", slug: "cloud-migration" },
          { t: "CI/CD pipelines", slug: "ci-cd" },
          { t: "Security & backups", slug: "security-backups" },
        ],
      },
      {
        title: "Support & Maintenance",
        slug: "support",
        blurb: "Updates, fixes and improvements on a monthly plan.",
        leaves: [
          { t: "Website & app care plans", slug: "care-plans" },
          { t: "Performance monitoring", slug: "monitoring" },
        ],
      },
    ],
  }),
];

export const navLinks = [
  { t: "Work", href: `${BASE}#work` },
  { t: "Process", href: `${BASE}#process` },
  { t: "Studio", href: `${BASE}#team` },
  { t: "Blog", href: `${BASE}/blog` },
];

/* ---------- home ---------- */
export const heroWords = ["saves 20 hours a week", "ranks on Google", "gets cited by AI", "scales with you"];

export const marqueeA = ["AI Automations", "Web Development", "CRMs", "Web Apps", "UI/UX", "SEO & GEO", "Cloud"];
export const marqueeB = [
  "Simpli Home",
  "Champion Lenders",
  "Cozmo Realty",
  "AP Cleanco",
  "Archmodal",
  "Workik",
  "Sustainable Bitcoin Protocol",
  "Budget Renovations",
  "Katalyst",
];

export const manifesto =
  "Most businesses run on a website, a CRM and a pile of manual work in between. We design, build and automate all three, then hand you a system your team owns.";

export const stats = [
  { n: 5, suffix: "+", label: "Years working with founders across the globe" },
  { n: 68, suffix: "+", label: "Projects shipped: sites, apps, automations" },
  { n: 6360, suffix: "+", label: "Hours saved for clients since going AI-first" },
  { n: 100, suffix: "%", label: "Job Success on Upwork, Top Rated" },
];

export const work = [
  {
    client: "Simpli Home",
    title: "20 hours of image work cut to one",
    tags: ["AI Automation", "Figma", "Media ops"],
    metric: "20h→1h",
    metricLabel: "per collection",
    image: img.laptop,
    year: "2026",
  },
  {
    client: "Sustainable Bitcoin Protocol",
    title: "From rough MVP to a real product",
    tags: ["UI/UX", "Design system", "Web app"],
    metric: "120+",
    metricLabel: "screens on one system",
    image: img.swatch,
    year: "2025",
  },
  {
    client: "AP Cleanco",
    title: "No web presence to top local result",
    tags: ["Website", "Local SEO", "Copy"],
    metric: "Top 3",
    metricLabel: "in local search",
    image: img.web,
    year: "2025",
  },
  {
    client: "Cozmo Realty",
    title: "One CRM instead of five tools",
    tags: ["Custom CRM", "WhatsApp API", "Automation"],
    metric: "3×",
    metricLabel: "faster follow-ups",
    image: img.dashboard,
    year: "2025",
  },
];

export const process = [
  { n: "01", t: "Watch", d: "We see how the work actually gets done today, not how it's supposed to work on paper." },
  { n: "02", t: "Find", d: "We pin down the step eating the hours, and whether software is even the right fix." },
  { n: "03", t: "Build", d: "Quietly, in weekly sprints, with no disruption to the work that's still running." },
  { n: "04", t: "Hand over", d: "Documentation, a walkthrough and a system your team owns. No dependency on us." },
];

export const testimonials = [
  {
    quote: "They finished our new website design in the given time, always responded quickly and have a really good sense of design.",
    name: "John Kim",
    role: "CEO, Champion Lenders",
    avatar: local("testimonials/John_Kim.webp"),
  },
  {
    quote: "Excellent design skills. They quickly prototyped what I had in mind, then programmed it, and adjusted well as requirements changed.",
    name: "Abhinav Singh",
    role: "Co-founder, JAXL",
    avatar: local("testimonials/Abhinav_Singh.webp"),
  },
  {
    quote: "Even if I don't explain the design I want, they know exactly what style I want. My second project with them.",
    name: "Sang Hyun Han",
    role: "Full Stack Engineer, Cozmo Realty",
    avatar: local("testimonials/Sang_Hun_Yan.webp"),
  },
  {
    quote: "One of the best web development teams out there. They give personal attention to the smallest details.",
    name: "Rudra Ghodke",
    role: "Founder, MetaThumbz",
    avatar: local("testimonials/Rudra_Ghodke.webp"),
  },
];

export const team = [
  { name: "Arjun Patil", role: "Founder & Solutions Lead", image: img.p2 },
  { name: "Meera Joshi", role: "Head of Design", image: img.p1 },
  { name: "Kabir Shah", role: "Lead Engineer", image: img.p4 },
  { name: "Tara Desai", role: "AI Automation Lead", image: img.p3 },
];

export const contact = {
  email: "contact@websitevikreta.com",
  phone: "+91 99704 45198",
  city: "Pune, India",
  whatsapp: "https://wa.me/919970445198",
  linkedin: "https://linkedin.com/company/websitevikreta",
  instagram: "https://instagram.com/websitevikreta",
  upwork: "https://www.upwork.com/ag/websitevikreta",
};
