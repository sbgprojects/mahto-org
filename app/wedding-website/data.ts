// All imagery lives here so any photo can be swapped in one place.
const u = (id: string, w = 800, h = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=70`;

export const img = {
  hero: u("photo-1519741497674-611481863552", 1800, 1100),
  venues: u("photo-1519167758481-83f550bb49b3", 600, 460),
  planners: u("photo-1511578314322-379afb476865", 600, 460),
  photography: u("photo-1537633552985-df8429e8048b", 600, 460),
  decorators: u("photo-1478146896981-b80fe463b330", 600, 460),
  catering: u("photo-1555244162-803834f70033", 600, 460),
  makeup: u("photo-1487412947147-5cebf100ffc2", 600, 460),
  entertainment: u("photo-1514525253161-7a46d19cd819", 600, 460),
  venue1: u("photo-1519225421980-715cb0215aed", 700, 520),
  venue2: u("photo-1464366400600-7168b8af9bc3", 700, 520),
  venue3: u("photo-1465495976277-4387d4b0b4c6", 700, 520),
  venue4: u("photo-1511795409834-ef04bbd61622", 700, 520),
  nagpur: u("photo-1596422846543-75c6fc197f07", 500, 620),
  mumbai: u("photo-1566552881560-0be862a7c445", 500, 620),
  pune: u("photo-1595658658481-d53d3f999875", 500, 620),
  delhi: u("photo-1587474260584-136574528ed5", 500, 620),
  jaipur: u("photo-1477587458883-47145ed94245", 500, 620),
  hyderabad: u("photo-1572445271230-a78b5944a659", 500, 620),
  step1: u("photo-1507608616759-54f48f0af0ee", 700, 520),
  step2: u("photo-1573164713714-d95e436ab8d6", 700, 520),
  step3: u("photo-1556761175-5973dc0f32e7", 700, 520),
  story1: u("photo-1583939003579-730e3918a45a", 1100, 760),
  story2: u("photo-1519741497674-611481863552", 600, 460),
  story3: u("photo-1511795409834-ef04bbd61622", 600, 460),
  couple: u("photo-1606800052052-a08af7148866", 1800, 900),
  floralL: u("photo-1522673607200-164d1b6ce486", 500, 600),
  floralR: u("photo-1490750967868-88aa4486c946", 500, 600),
};

export const navLinks = ["Venues", "Planners", "Vendors", "Inspiration", "Cities"];

export const tabs = [
  "Wedding Venues",
  "Wedding Planners",
  "Photographers",
  "Decorators",
  "Caterers",
  "Makeup Artists",
  "More",
];

export const heroStats = [
  { v: "5,000+", l: "Verified Businesses", i: "shield" },
  { v: "25+", l: "Indian Cities", i: "pin" },
  { v: "50,000+", l: "Happy Couples", i: "heart" },
  { v: "4.8 / 5", l: "Average Rating", i: "star" },
] as const;

export const categories = [
  { t: "Wedding Venues", s: "Banquet halls, resorts & more", img: img.venues },
  { t: "Wedding Planners", s: "Plan your dream wedding", img: img.planners },
  { t: "Photography", s: "Capture every moment", img: img.photography },
  { t: "Decorators", s: "Beautiful themes & setups", img: img.decorators },
  { t: "Catering", s: "Memorable food experiences", img: img.catering },
  { t: "Makeup Artists", s: "Look your best", img: img.makeup },
];

export const venues = [
  { n: "The Royal Treat Banquet", loc: "Sadar, Nagpur", g: "500 – 800 guests", p: "₹1.5L onwards", r: "4.8", c: "128", img: img.venue1, featured: true },
  { n: "Ira Convention Centre", loc: "Wardha Road, Nagpur", g: "300 – 1200 guests", p: "₹2.5L onwards", r: "4.8", c: "86", img: img.venue2 },
  { n: "Jai Malhar Garden", loc: "Hingna Road, Nagpur", g: "200 – 1000 guests", p: "₹1.2L onwards", r: "4.7", c: "74", img: img.venue3 },
  { n: "The Leela Nagpur", loc: "Civil Lines, Nagpur", g: "100 – 1000 guests", p: "₹3.5L onwards", r: "4.8", c: "61", img: img.venue4 },
];

export const cities = [
  { n: "Nagpur", v: "340+ venues", img: img.nagpur },
  { n: "Mumbai", v: "1,200+ venues", img: img.mumbai },
  { n: "Pune", v: "800+ venues", img: img.pune },
  { n: "Delhi", v: "1,500+ venues", img: img.delhi },
  { n: "Jaipur", v: "600+ venues", img: img.jaipur },
  { n: "Hyderabad", v: "1,100+ venues", img: img.hyderabad },
];

export const steps = [
  { n: "01", t: "Discover", d: "Find venues and wedding professionals that fit your vision.", img: img.step1 },
  { n: "02", t: "Enquire", d: "Tell us what you’re looking for and we’ll help you take the next step.", img: img.step2 },
  { n: "03", t: "Connect", d: "Meet the right people and start planning with confidence.", img: img.step3 },
];

export const pros = [
  { t: "Photography", s: "120+ professionals", img: img.photography },
  { t: "Wedding Planners", s: "40+ planners", img: img.planners },
  { t: "Decorators", s: "65+ decorators", img: img.decorators },
  { t: "Caterers", s: "80+ caterers", img: img.catering },
  { t: "Makeup Artists", s: "70+ artists", img: img.makeup },
  { t: "Entertainment", s: "50+ artists", img: img.entertainment },
];

export const why = [
  { t: "Verified Businesses", d: "Every business is reviewed before receiving a badge.", i: "shield" },
  { t: "Real Information", d: "Transparent pricing, capacity and amenities.", i: "doc" },
  { t: "Better Connections", d: "Simplifying the journey from discovery to enquiry.", i: "link" },
  { t: "Local Expertise", d: "Vendors who understand your city and culture.", i: "user" },
] as const;

export const quotes = [
  { q: "Finding our venue was the hardest part of planning our wedding. LagnMandap made it feel simple.", by: "Priya & Rohan", loc: "Nagpur, Maharashtra" },
  { q: "We compared halls, prices and capacity in one evening. The enquiry went straight to the right people.", by: "Sneha & Aditya", loc: "Pune, Maharashtra" },
  { q: "From mandap decor to the caterer, everything we needed was in one place.", by: "Ananya & Karan", loc: "Jaipur, Rajasthan" },
];

export const footerCols = {
  Explore: ["Venues", "Wedding Planners", "Photographers", "Decorators", "Caterers", "Makeup Artists", "Entertainment", "Bridal Wear", "Groom Wear"],
  Cities: ["Nagpur", "Mumbai", "Pune", "Delhi", "Jaipur", "Hyderabad", "Indore", "Bhopal", "Raipur", "View All Cities"],
  Company: ["About Us", "Contact", "Careers", "List Your Business", "Help & Support", "Terms & Conditions", "Privacy Policy"],
};
