/* Website Vikreta — content. Every string, link and image on the site lives here. */

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;
const local = (p: string) => `/websitevikreta/${p}`;

export const BASE = "/websitevikreta";

export const brand = {
  logo: local("logo.svg"),
  logoLight: local("logo-light.svg"),
};

export const img = {
  ai: u("photo-1662974770404-468fd9660389", 1400),
  web: u("photo-1585076641399-5c06d1b3365f", 1400),
  code: u("photo-1484417894907-623942c8ee29", 1400),
  studio: u("photo-1522071820081-009f0129c71c", 1600),
  huddle: u("photo-1568992687947-868a62a9f521", 1400),
  table: u("photo-1521737604893-d14cc237f11d", 1400),
  review: u("photo-1622675363311-3e1904dc1885", 1400),
  analytics: u("photo-1551288049-bebda4e38f71", 1400),
  stats: u("photo-1460925895917-afdab827c52f", 1400),
  moodboard: u("photo-1690733546551-1007bc0a3414", 1400),
  swatch: u("photo-1664638413302-d1ca29ac885b", 1400),
  phone: u("photo-1610548822783-33fb5cb0e3a8", 1400),
  laptop: u("photo-1608222351212-18fe0ec7b13b", 1400),
  dashboard: u("photo-1526628953301-3e589a6a8b74", 1400),
};

export const contact = {
  email: "contact@websitevikreta.com",
  phone: "+91 99704 45198",
  whatsapp: "https://wa.me/919970445198",
  calendly: "https://calendly.com/shubham-websitevikreta/new-meeting",
  upwork: "https://www.upwork.com/ag/websitevikreta",
  instagram: "https://instagram.com/websitevikreta",
  linkedin: "https://linkedin.com/company/websitevikreta",
  city: "Pune, India",
};

/* ---------- services + mega menu ----------
   Shape follows the agreed navbar: service → solutions → leaves, plus extras and proof. */
export type Leaf = { t: string; slug: string; tag?: string };
export type Solution = { title: string; slug: string; blurb: string; leaves: Leaf[] };
export type Extra = { t: string; slug: string; sub?: string };
export type Service = {
  id: string;
  slug: string;
  title: string;
  short: string;
  blurb: string;
  image: string;
  chips: string[];
  solutions: Solution[];
  extras: Extra[];
  proof: { label: string; metric: string; slug: string };
  cta: string;
};

export const services: Service[] = [
  {
    id: "ai",
    slug: "ai-automations",
    title: "AI Automations",
    short: "Workflows, AI agents, WhatsApp, AI UGC",
    blurb: "Fixed-scope projects that take repetitive work off your team, built on the tools you already use.",
    image: img.ai,
    chips: ["Workflows", "WhatsApp AI agents", "AI UGC"],
    solutions: [
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
    extras: [
      { t: "Pricing", slug: "pricing" },
      { t: "Platforms", slug: "platforms", sub: "Make, n8n, WhatsApp API" },
    ],
    proof: { label: "Simpli Home, 20 hours cut to 1", metric: "20h → 1h", slug: "simpli-home" },
    cta: "Book a free process audit",
  },
  {
    id: "web",
    slug: "web-development",
    title: "Web Development",
    short: "Fast, SEO-ready business websites",
    blurb: "Custom, SEO-ready websites for growing businesses. Fast to load, written to rank, built around how you sell.",
    image: img.web,
    chips: ["Business websites", "E-commerce", "SEO-ready"],
    solutions: [
      {
        title: "Business Websites",
        slug: "business-websites",
        blurb: "Marketing sites that load in under a second and turn visits into enquiries.",
        leaves: [
          { t: "Company & service websites", slug: "company-websites" },
          { t: "Landing pages that convert", slug: "landing-pages" },
          { t: "Website redesign", slug: "website-redesign" },
        ],
      },
      {
        title: "E-commerce Stores",
        slug: "ecommerce-development",
        blurb: "Stores built to sell, with the integrations your operations need.",
        leaves: [
          { t: "Shopify store development", slug: "shopify-development" },
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
          { t: "Care & maintenance plans", slug: "website-maintenance" },
        ],
      },
    ],
    extras: [
      { t: "Pricing", slug: "pricing" },
      { t: "Stacks", slug: "stacks", sub: "Next.js, Shopify, Webflow, WordPress" },
    ],
    proof: { label: "AP Cleanco, zero to online", metric: "Top 3 local", slug: "ap-cleanco" },
    cta: "Get a free website audit",
  },
  {
    id: "apps",
    slug: "apps-crm",
    title: "Apps & CRM",
    short: "Custom CRMs, portals, internal tools",
    blurb: "Custom CRMs, customer portals, internal tools and web apps built around how your business actually runs.",
    image: img.dashboard,
    chips: ["Custom CRM", "Portals", "Internal tools"],
    solutions: [
      {
        title: "Custom CRM",
        slug: "custom-crm",
        blurb: "One place for leads, deals and follow-ups, shaped to your sales process.",
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
          { t: "Inventory & ops tools", slug: "ops-tools" },
          { t: "iOS & Android apps", slug: "mobile-apps", tag: "New" },
        ],
      },
    ],
    extras: [
      { t: "Pricing", slug: "pricing" },
      { t: "Integrations", slug: "integrations", sub: "Stripe, Razorpay, WhatsApp, Zapier" },
    ],
    proof: { label: "Cozmo Realty listings CRM", metric: "3× faster follow-ups", slug: "cozmo-realty" },
    cta: "Scope your app in a free call",
  },
  {
    id: "uiux",
    slug: "uiux-design",
    title: "UI/UX Design",
    short: "Research, product design, design systems",
    blurb: "User research, wireframes and product design for web and mobile. Design systems your developers can actually ship.",
    image: img.swatch,
    chips: ["Research", "Product design", "Design systems"],
    solutions: [
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
    extras: [
      { t: "Pricing", slug: "pricing" },
      { t: "Tools", slug: "tools", sub: "Figma, Framer, Maze" },
    ],
    proof: { label: "Sustainable Bitcoin Protocol", metric: "MVP → Product", slug: "sustainable-bitcoin-protocol" },
    cta: "Get a free UX audit",
  },
  {
    id: "seo",
    slug: "seo-geo",
    title: "SEO & GEO",
    short: "Google rankings and AI search citations",
    blurb: "Organic growth only. Rank on Google, get cited by ChatGPT and Perplexity, and turn search traffic into enquiries.",
    image: img.analytics,
    chips: ["Technical SEO", "GEO", "Local SEO"],
    solutions: [
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
      {
        title: "Content Engine",
        slug: "content",
        blurb: "Articles and pages written to rank, get cited and convert.",
        leaves: [
          { t: "Content strategy & blogs", slug: "content-strategy" },
          { t: "Programmatic SEO", slug: "programmatic-seo" },
        ],
      },
    ],
    extras: [
      { t: "Pricing", slug: "pricing" },
      { t: "AI visibility check", slug: "ai-visibility-check", sub: "Free report" },
    ],
    proof: { label: "Budget Renovations local search", metric: "+184% organic leads", slug: "budget-renovations" },
    cta: "Get a free SEO & GEO audit",
  },
  {
    id: "brand",
    slug: "branding",
    title: "Branding & Content",
    short: "Identity, copy, decks and creatives",
    blurb: "Brand identity, website copy and launch creatives so everything we build looks and sounds like you.",
    image: img.moodboard,
    chips: ["Identity", "Copywriting", "Pitch decks"],
    solutions: [
      {
        title: "Brand Identity",
        slug: "brand-identity",
        blurb: "Logo, colour, type and a guide your team will actually use.",
        leaves: [
          { t: "Logo & visual identity", slug: "logo-design" },
          { t: "Brand guidelines", slug: "brand-guidelines" },
          { t: "Packaging & print", slug: "packaging-design" },
        ],
      },
      {
        title: "Content & Copy",
        slug: "content-copy",
        blurb: "Words that sell, for the site, the deck and the launch.",
        leaves: [
          { t: "Website copywriting", slug: "website-copywriting" },
          { t: "Pitch decks & presentations", slug: "pitch-decks" },
          { t: "Social creatives", slug: "social-creatives" },
        ],
      },
    ],
    extras: [{ t: "Pricing", slug: "pricing" }],
    proof: { label: "Blancora brand launch", metric: "Live in 4 weeks", slug: "blancora" },
    cta: "Talk to our design team",
  },
];

export const svcHref = (s: Service, ...rest: string[]) => [BASE, "services", s.slug, ...rest].join("/");

export const navLinks = [
  { t: "Work", href: `${BASE}/work` },
  { t: "About", href: `${BASE}/about` },
  { t: "Blog", href: `${BASE}/blog` },
  { t: "Careers", href: `${BASE}/careers` },
];

/* ---------- home ---------- */
export const heroWords = ["grow your business", "save 20 hours a week", "get cited by ChatGPT", "your team will love"];

export const clients = [
  { name: "Simpli Home", src: local("logos/simpli-home.svg") },
  { name: "Sustainable Bitcoin Protocol", src: local("logos/sustainable-bitcoin-protocol.svg") },
  { name: "Champion Lenders", src: local("logos/champion-lenders.svg") },
  { name: "AP Cleanco", src: local("logos/ap-cleanco.svg") },
  { name: "Cozmo Realty", src: local("logos/cozmo-realty.svg") },
  { name: "Archmodal", src: local("logos/archmodal.svg") },
  { name: "Workik", src: local("logos/workik.svg") },
  { name: "Ambrosia Life Sciences", src: local("logos/ambrosia.svg") },
  { name: "Blancora", src: local("logos/blancora.svg") },
  { name: "Boompanda", src: local("logos/boompanda.png") },
  { name: "Budget Renovations", src: local("logos/budget-renovations.svg") },
  { name: "Katalyst", src: local("logos/katalyst.png") },
  { name: "Limra Events", src: local("logos/limra-events.png") },
  { name: "Raicoon", src: local("logos/raicoon.svg") },
  { name: "SR Design Hub", src: local("logos/sr-design-hub.svg") },
  { name: "Strandzboost", src: local("logos/strandzboost.svg") },
  { name: "Tocal", src: local("logos/tocal.svg") },
];

export const tools = [
  { name: "OpenAI", src: local("tools/01-OpenAI.svg") },
  { name: "Claude", src: local("tools/02-Claude.svg") },
  { name: "Gemini", src: local("tools/17-Gemini.svg") },
  { name: "Cursor", src: local("tools/06-Cursor.svg") },
  { name: "n8n", src: local("tools/15-n8n.svg") },
  { name: "Make.com", src: local("tools/16-MakeDotCom.svg") },
  { name: "ElevenLabs", src: local("tools/18-ElevenLabs.svg") },
  { name: "Kling AI", src: local("tools/28-KlingAI.svg") },
];

export const marquee = ["AI Automations", "Web Development", "Apps & CRM", "UI/UX Design", "SEO & GEO", "Branding"];

export const manifesto =
  "We design, build and grow the systems your business runs on: the website, the automation behind it, and the organic marketing that brings in leads. One team, from first audit to handover.";

export const stats = [
  { n: 5, suffix: "+", label: "Years working with founders and teams across the globe" },
  { n: 68, suffix: "+", label: "Projects shipped: websites, apps, automation, design" },
  { n: 6360, suffix: "+", label: "Hours saved for clients since we went AI-first" },
  { n: 100, suffix: "%", label: "Job Success score on Upwork, Top Rated" },
];

export const work = [
  {
    client: "Simpli Home",
    title: "Bulk media generation, automated",
    body: "A media team doing bulk content generation by hand. We automated the whole pipeline inside Figma Buzz. The work just started happening faster.",
    tags: ["AI Automation", "Media Ops"],
    from: "20h",
    to: "1h",
    metricLabel: "Image production time per collection. 11 hours saved every week.",
    image: img.laptop,
    logo: local("logos/simpli-home.svg"),
    slug: "simpli-home",
  },
  {
    client: "Sustainable Bitcoin Protocol",
    title: "From MVP to a product people actually use",
    body: "Rough flows, no design system, unclear product. We went in at the foundation and rebuilt everything, then handed engineering a system they could ship from.",
    tags: ["UI/UX Design", "Design System"],
    from: "MVP",
    to: "Product",
    metricLabel: "120+ screens on one design system. Dev handoff time cut in half.",
    image: img.swatch,
    logo: local("logos/sustainable-bitcoin-protocol.svg"),
    slug: "sustainable-bitcoin-protocol",
  },
  {
    client: "AP Cleanco",
    title: "Zero to online. Properly.",
    body: "A garage cleaning company with no web presence at all. We built the marketing site from scratch. Local SEO baked in, loads fast, written to convert.",
    tags: ["Website", "Local SEO"],
    from: "Zero",
    to: "Online",
    metricLabel: "Top 3 in local search within 10 weeks. Calls now come from the site.",
    image: img.web,
    logo: local("logos/ap-cleanco.svg"),
    slug: "ap-cleanco",
  },
  {
    client: "Cozmo Realty",
    title: "A CRM built around how agents sell",
    body: "Leads spread across WhatsApp, spreadsheets and inboxes. We built one CRM with automated follow-ups, so no enquiry sits unanswered overnight.",
    tags: ["Custom CRM", "WhatsApp API"],
    from: "5 tools",
    to: "1 CRM",
    metricLabel: "Follow-ups three times faster. Every lead has an owner.",
    image: img.dashboard,
    logo: local("logos/cozmo-realty.svg"),
    slug: "cozmo-realty",
  },
];

export const process = [
  { n: "01", t: "We watch", d: "How the work actually gets done today, not how it's supposed to work on paper." },
  { n: "02", t: "We find the time sink", d: "The exact step eating the hours, and whether automation is even the right fix." },
  { n: "03", t: "We build, quietly", d: "No disruption to the work still running while we build. You see progress every week." },
  { n: "04", t: "We hand it over", d: "Documentation, a walkthrough, and a system your team owns. No dependency on us to keep it alive." },
];

export const why = [
  { t: "We audit before we build", d: "If a $50 tool solves it, that's what we'll tell you, instead of inventing a reason to charge you more." },
  { t: "One team, no hand-offs", d: "We build the site, then we build what runs behind it. No handoff to a second agency halfway through." },
  { t: "You own what we build", d: "Your accounts, your data, your access. Documentation and a proper handover, not a dependency on us." },
  { t: "We've done the messy version", d: "Spreadsheet chaos, tools that won't talk to each other, exports renamed by hand. That's most of the real work." },
];

export const testimonials: { quote: string; name: string; role: string; avatar: string | null }[] = [
  {
    quote: "Our team finally does the work we hired them for. Game changer.",
    name: "Darcy McGilvery",
    role: "Simpli Home",
    avatar: null,
  },
  {
    quote: "Website Vikreta did really nice work. They have really fast hands. They finished our new website design in the given time, always responded quickly and have a really good sense of design.",
    name: "John Kim",
    role: "CEO, Champion Lenders",
    avatar: local("testimonials/John_Kim.webp"),
  },
  {
    quote: "They have excellent design skills. They quickly prototyped the design I had in mind and then programmed it, and adjusted well as requirements changed.",
    name: "Abhinav Singh",
    role: "Co-founder, JAXL, India",
    avatar: local("testimonials/Abhinav_Singh.webp"),
  },
  {
    quote: "One of the best web development services out there. The team completes each project by giving personal attention to the smallest details.",
    name: "Rudra Ghodke",
    role: "Founder, MetaThumbz",
    avatar: local("testimonials/Rudra_Ghodke.webp"),
  },
  {
    quote: "My second time working with Website Vikreta. Even if I don't explain the design I want, they know exactly what style I want.",
    name: "Sang Hyun Han",
    role: "Full Stack Engineer, Cozmo Realty",
    avatar: local("testimonials/Sang_Hun_Yan.webp"),
  },
  {
    quote: "They were very professional. The team was timely, the design was great and they went above and beyond my request.",
    name: "Stacey Bae",
    role: "Developer, Archmodal Classrooms",
    avatar: local("testimonials/Stacey_Bae.webp"),
  },
];

export const faqs = [
  {
    q: "What does Website Vikreta do?",
    a: "We design and build fast, modern websites and AI automation systems for businesses ready to grow, along with apps and CRMs, UI/UX design, and SEO and GEO. One team, from the first audit to handover.",
  },
  {
    q: "Do you run paid ads?",
    a: "No. We focus on organic growth: SEO, GEO, content and a website that converts. If you run paid media elsewhere, we'll make sure your site and tracking are ready for it.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We're based in Pune, India, and work with founders and teams across the globe. We're Top Rated on Upwork with 100% Job Success.",
  },
  {
    q: "How long does a typical project take?",
    a: "A focused website usually takes 2 to 4 weeks. Automation and app projects depend on scope. One image pipeline we built cut a client's process from 20 hours to 1 per collection. We'll give you a real timeline once we know the scope.",
  },
  {
    q: "Can you work with our existing tools and tech stack?",
    a: "Yes. We've built on Shopify, WhatsApp Business API, HubSpot, Zoho and delivery-partner integrations. We work with what you already have instead of asking you to start over.",
  },
  {
    q: "Do you offer ongoing maintenance, or just one-time builds?",
    a: "Both. Some clients want a one-time build and walk away. Others keep us on for updates and support long-term. Your call.",
  },
];

export const posts = [
  {
    cat: "AI Automation",
    t: "When Not to Automate: 7 Signs a Process Isn't Ready for AI",
    d: "Automating a broken process only speeds up its failures. Seven signs, and what to fix first.",
    slug: "when-not-to-automate",
    image: img.table,
  },
  {
    cat: "UI/UX",
    t: "Designing for AI Browsers in 2026: UX for People and AI Agents",
    d: "Labels, states, stable layouts and agent-ready forms: what changes when AI acts on your pages.",
    slug: "designing-for-ai-browsers",
    image: img.moodboard,
  },
  {
    cat: "SEO & GEO",
    t: "How to Get Cited by ChatGPT and Perplexity",
    d: "What each engine uses as a source, how to make your pages citable, and how to tell if it's working.",
    slug: "get-cited-by-chatgpt-perplexity",
    image: img.stats,
  },
];
