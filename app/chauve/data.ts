// Chauve Irish Restaurant — single source for content.
// PREVIEW: address, phone, hours, prices, menu and party packages are sample
// content to be replaced with the owner's real details before launch.

export const BASE = "/chauve";
export const DOMAIN = "chauveirishrestaurant.com";

export const site = {
  name: "Chauve",
  full: "Chauve Irish Restaurant",
  city: "Atlanta, Georgia",
  address: "Street address to be confirmed",
  phone: "Phone to be confirmed",
  email: `hello@${DOMAIN}`,
  hours: [
    ["Mon – Thu", "11:30am – 11pm"],
    ["Fri", "11:30am – 1am"],
    ["Sat", "10am – 1am"],
    ["Sun", "10am – 10pm"],
  ] as [string, string][],
  kitchen: "Kitchen closes one hour before the bar.",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    google: "https://www.google.com/maps/search/Chauve+Irish+Restaurant+Atlanta",
  },
};

const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const img = {
  hero: u("photo-1538488881038-e252a119ace7", 2200),
  room: u("photo-1485686531765-ba63b07845a7"),
  bar: u("photo-1558210598-89ba75b1724e"),
  stout: u("photo-1523567830207-96731740fa71", 1000),
  pint: u("photo-1579065436839-f2bb127c5606", 1000),
  taps: u("photo-1567696911980-2eed69a46042", 1000),
  pour: u("photo-1615332579037-3c44b3660b53"),
  fish: u("photo-1579208030886-b937da0925dc"),
  fishTea: u("photo-1772372043852-4a33ae5c8987"),
  stew: u("photo-1608500219063-e5164085cd6f", 1000),
  stew2: u("photo-1608500218987-0f2b3be34b47", 1000),
  breakfast: u("photo-1655979283362-535e6a167a53"),
  breakfast2: u("photo-1655979282314-eb45a7d69959"),
  whiskey: u("photo-1470337458703-46ad1756a187"),
  whiskey2: u("photo-1615887023544-3a566f29d822", 1000),
  friends: u("photo-1671116810339-1b58cf241509"),
  friends2: u("photo-1671116810320-d7d474969b2e"),
  music: u("photo-1779455664988-79df81782a53", 1000),
};

export const nav = [
  { label: "Menu", href: `${BASE}/menu` },
  { label: "Drinks", href: `${BASE}/drinks` },
  { label: "Specials", href: `${BASE}/specials` },
  { label: "Parties", href: `${BASE}/parties` },
  { label: "Jobs", href: `${BASE}/jobs` },
];

export const ticker = [
  "Happy hour · weekdays 4 – 7pm",
  "Trad session · Thursday nights",
  "Irish breakfast · weekends from 10am",
  "Sunday roast · from noon",
  "Private parties · 10 to 120 guests",
  "The stout is poured slowly. It’s worth the wait.",
];

export type Item = {
  id: string;
  name: string;
  desc?: string;
  price: number;
  tags?: string[];
  /** Can be pre-ordered with a reservation (goes in the cart). */
  preorder?: boolean;
};
export type Section = { id: string; title: string; note?: string; items: Item[] };

export const food: Section[] = [
  {
    id: "starters",
    title: "To start",
    items: [
      { id: "soup", name: "Soup of the day", desc: "With warm brown soda bread and Irish butter.", price: 9, tags: ["V"] },
      { id: "chowder", name: "Seafood chowder", desc: "Cod, salmon and mussels in a creamy broth, soda bread.", price: 14, preorder: true },
      { id: "wings", name: "Whiskey-glazed wings", desc: "Irish whiskey and honey glaze, blue cheese dip.", price: 15, preorder: true },
      { id: "potato-skins", name: "Boxty bites", desc: "Crisp Irish potato pancakes, sour cream, chives.", price: 11, tags: ["V"], preorder: true },
      { id: "scotch-egg", name: "Black pudding Scotch egg", desc: "Soft yolk, mustard mayo.", price: 12 },
    ],
  },
  {
    id: "mains",
    title: "Mains",
    items: [
      { id: "fish-chips", name: "Beer-battered fish & chips", desc: "Atlantic cod, chunky chips, mushy peas, tartare.", price: 24, preorder: true },
      { id: "stew", name: "Guinness beef stew", desc: "Slow-braised beef, root vegetables, champ mash.", price: 26, preorder: true },
      { id: "shepherds", name: "Shepherd’s pie", desc: "Lamb, carrots and peas under a golden potato crust.", price: 23, preorder: true },
      { id: "bangers", name: "Bangers & mash", desc: "Irish pork sausages, onion gravy, buttered peas.", price: 21 },
      { id: "salmon", name: "Pan-seared salmon", desc: "Colcannon, dill butter sauce.", price: 28, tags: ["GF"] },
      { id: "corned-beef", name: "Corned beef & cabbage", desc: "Parsley sauce, boiled potatoes.", price: 25 },
    ],
  },
  {
    id: "handhelds",
    title: "Burgers & sandwiches",
    items: [
      { id: "burger", name: "The Chauve burger", desc: "Two smashed patties, Dubliner cheddar, bacon jam, chips.", price: 19, preorder: true },
      { id: "reuben", name: "Corned beef Reuben", desc: "Sauerkraut, Swiss, rye, Russian dressing.", price: 18 },
      { id: "chicken", name: "Crispy chicken sandwich", desc: "Buttermilk chicken, slaw, pickles.", price: 17 },
    ],
  },
  {
    id: "brunch",
    title: "Breakfast & brunch",
    note: "Weekends from 10am",
    items: [
      { id: "full-irish", name: "Full Irish breakfast", desc: "Rashers, sausages, black & white pudding, eggs, beans, tomato, toast.", price: 22, preorder: true },
      { id: "veg-irish", name: "Vegetarian Irish", desc: "Eggs, mushrooms, tomato, beans, potato farl.", price: 18, tags: ["V"] },
      { id: "benedict", name: "Smoked salmon Benedict", desc: "Poached eggs, hollandaise, soda farl.", price: 19 },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    items: [
      { id: "sticky", name: "Sticky toffee pudding", desc: "Toffee sauce, vanilla ice cream.", price: 11, preorder: true },
      { id: "baileys", name: "Baileys cheesecake", desc: "Chocolate crumb, cream.", price: 11 },
      { id: "crumble", name: "Apple crumble", desc: "Warm custard.", price: 10, tags: ["V"] },
    ],
  },
];

export const drinks: Section[] = [
  {
    id: "draught",
    title: "On draught",
    note: "Pints, 20oz",
    items: [
      { id: "stout", name: "Irish stout", desc: "Poured in two parts. Give it a minute.", price: 9 },
      { id: "red", name: "Irish red ale", desc: "Malty, toasty, smooth.", price: 8 },
      { id: "lager", name: "Irish lager", desc: "Crisp and clean.", price: 8 },
      { id: "cider", name: "Irish cider", desc: "Dry, apple-forward.", price: 8 },
      { id: "local", name: "Georgia guest tap", desc: "A rotating local brew. Ask the bar.", price: 8 },
    ],
  },
  {
    id: "whiskey",
    title: "Irish whiskey",
    note: "1.5oz pours, neat or on the rocks",
    items: [
      { id: "flight", name: "Whiskey flight", desc: "Three Irish whiskeys, chosen by the bar, with tasting notes.", price: 24, preorder: true },
      { id: "blend", name: "Classic blended", desc: "Smooth, easy-drinking.", price: 10 },
      { id: "single-pot", name: "Single pot still", desc: "Spicy, creamy, very Irish.", price: 15 },
      { id: "single-malt", name: "Single malt", desc: "Fruity, layered.", price: 16 },
    ],
  },
  {
    id: "cocktails",
    title: "Cocktails",
    items: [
      { id: "irish-coffee", name: "Irish coffee", desc: "Hot coffee, Irish whiskey, brown sugar, cold cream.", price: 13 },
      { id: "mule", name: "Dublin mule", desc: "Irish whiskey, ginger beer, lime.", price: 13 },
      { id: "old-fashioned", name: "Irish old fashioned", desc: "Irish whiskey, demerara, bitters.", price: 15 },
      { id: "espresso", name: "Baileys espresso martini", desc: "Vodka, espresso, Baileys.", price: 15 },
    ],
  },
  {
    id: "wine",
    title: "Wine & bubbles",
    items: [
      { id: "prosecco", name: "Bottle of prosecco", desc: "For the table.", price: 42, preorder: true },
      { id: "red-wine", name: "House red", desc: "Glass or bottle.", price: 12 },
      { id: "white-wine", name: "House white", desc: "Glass or bottle.", price: 12 },
    ],
  },
  {
    id: "soft",
    title: "Without alcohol",
    items: [
      { id: "na-stout", name: "Non-alcoholic stout", price: 7 },
      { id: "lemonade", name: "House lemonade", price: 5 },
      { id: "tea", name: "Pot of Irish breakfast tea", price: 4 },
    ],
  },
];

export const specials = {
  happy: { title: "Happy hour", when: "Monday to Friday, 4 – 7pm", lines: ["$2 off all draught pints", "$7 house wine", "Half-price boxty bites"] },
  week: [
    ["Monday", "Pie night", "Shepherd’s pie and a pint, one price."],
    ["Tuesday", "Quiz night", "Teams of up to six. Starts 8pm."],
    ["Wednesday", "Whiskey Wednesday", "Featured flight at a special price."],
    ["Thursday", "Trad session", "Live Irish music in the bar from 8pm."],
    ["Friday", "Fish Friday", "Fish & chips special all day."],
    ["Saturday", "Irish breakfast", "Full Irish from 10am, then the match."],
    ["Sunday", "Sunday roast", "From noon until it’s gone."],
  ] as [string, string, string][],
};

export const spaces = [
  { name: "The Snug", guests: "10 – 20 guests", desc: "A private corner with its own door. Birthdays, team dinners, small celebrations.", img: img.room },
  { name: "The Front Bar", guests: "30 – 60 guests", desc: "The heart of the house, semi-private, close to the taps and the music.", img: img.bar },
  { name: "Full buyout", guests: "Up to 120 guests", desc: "The whole restaurant, your way. Menus, music and timings built around you.", img: img.friends },
];

export const packages: Item[] = [
  { id: "pkg-pint-platter", name: "Pint & platter", desc: "Per guest · a pint each and sharing boards of Irish bites.", price: 35, preorder: true },
  { id: "pkg-ceili", name: "Céilí feast", desc: "Per guest · three-course Irish dinner, welcome drink.", price: 65, preorder: true },
  { id: "pkg-brunch", name: "Weekend brunch party", desc: "Per guest · full Irish, tea, coffee and a mimosa.", price: 40, preorder: true },
];

export const extras: Item[] = [
  { id: "cake", name: "Celebration cake", desc: "Serves 10. Tell us the message in the notes.", price: 55, preorder: true },
  { id: "flight-x", name: "Whiskey flight", desc: "Three Irish whiskeys with notes.", price: 24, preorder: true },
  { id: "prosecco-x", name: "Bottle of prosecco", desc: "Waiting on the table.", price: 42, preorder: true },
  { id: "gift-50", name: "Gift card", desc: "$50, sent by email.", price: 50, preorder: true },
];

export const jobs = [
  { role: "Line cook", type: "Full time", desc: "Irish comfort food done properly, at pace." },
  { role: "Bartender", type: "Full or part time", desc: "Great pours, good chat, a feel for the room." },
  { role: "Server", type: "Full or part time", desc: "Warm, quick, and good with a busy floor." },
  { role: "Host", type: "Part time", desc: "First hello and last goodbye. You set the tone." },
];

export const houseRules = [
  ["Nobody stays a stranger.", "Sit at the bar alone and you’ll leave with names."],
  ["The stout is poured in two parts.", "We let it settle before the top-up. Good things wait."],
  ["There’s always room for one more.", "Pull up a stool. We’ll find a corner."],
];
