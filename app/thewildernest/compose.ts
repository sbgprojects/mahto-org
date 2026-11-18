// Review composer: hardcoded phrases, no AI and no network call.
// Every sentence comes from a guest's own taps, so the draft only says what they chose.

export const GOOGLE_REVIEW_URL = "https://g.page/r/CaiNodPxsbHVEBM/review";

export const companions = [
  { id: "family", label: "Family" },
  { id: "friends", label: "Friends" },
  { id: "couple", label: "Partner" },
  { id: "solo", label: "Solo" },
  { id: "work", label: "Work team" },
] as const;

export const highlights = [
  { id: "property", label: "The property" },
  { id: "food", label: "Food" },
  { id: "pool", label: "Swimming pool" },
  { id: "hospitality", label: "Hospitality" },
  { id: "rooms", label: "Rooms" },
  { id: "activities", label: "Activities" },
  { id: "peace", label: "Peace & quiet" },
  { id: "kids", label: "Great for kids" },
  { id: "getaway", label: "Easy escape from Mumbai" },
  { id: "value", label: "Value for money" },
] as const;

type Companion = (typeof companions)[number]["id"];
type Highlight = (typeof highlights)[number]["id"];

const openers: Record<Companion | "none", string[]> = {
  none: ["Had a wonderful stay at Wildernest Farms in Shahpur.", "Wildernest Farms was exactly the break we needed.", "Really enjoyed our stay at Wildernest Farms."],
  family: ["We stayed at Wildernest Farms as a family and it was just the break we needed.", "A lovely family stay at Wildernest Farms."],
  friends: ["Came to Wildernest Farms with a group of friends and had a brilliant time.", "A great weekend with friends at Wildernest Farms."],
  couple: ["My partner and I had a relaxing stay at Wildernest Farms.", "A perfect getaway for the two of us at Wildernest Farms."],
  solo: ["I stayed at Wildernest Farms on my own and loved how easy it was to switch off.", "A really refreshing solo stay at Wildernest Farms."],
  work: ["We came to Wildernest Farms as a team and it worked really well for us.", "A great team outing at Wildernest Farms."],
};

const lines: Record<Highlight, string[]> = {
  property: ["The property is beautiful, green and very well looked after.", "The farm itself is lovely, with lots of open space and greenery."],
  food: ["The food was a real highlight: fresh, homely and full of flavour.", "Loved the food. Simple, tasty and clearly made with care."],
  pool: ["The swimming pool was clean and perfect for cooling off.", "We spent hours in the pool, which was clean and well maintained."],
  hospitality: ["The hosts and staff were warm, helpful and made us feel at home.", "Hospitality was excellent. The team went out of their way for us."],
  rooms: ["The rooms were clean and comfortable.", "Our room was comfortable, tidy and had everything we needed."],
  activities: ["There was plenty to do and the activities kept everyone busy.", "We enjoyed the activities on offer, a nice mix for everyone."],
  peace: ["It is peaceful and quiet, a proper escape from the city.", "The calm surroundings made it easy to slow down and relax."],
  kids: ["The kids had a fantastic time.", "Very family friendly. The kids loved it."],
  getaway: ["It is an easy escape from Mumbai.", "A great weekend getaway from Mumbai."],
  value: ["Good value for the experience.", "It felt like great value for money."],
};

const closers = [
  "Would happily come back and recommend it to anyone looking for a peaceful getaway.",
  "Highly recommend Wildernest Farms. We are already planning our next visit.",
  "Thank you to the Wildernest team. We will be back.",
];

const pick = <T,>(arr: readonly T[], seed: number) => arr[Math.abs(seed) % arr.length];

/** Build a short, natural review. `seed` changes the wording without changing the content. */
export function composeReview(opts: { who: Companion | null; liked: Highlight[]; extra: string; seed: number }) {
  const { who, liked, extra, seed } = opts;
  const parts = [pick(openers[who ?? "none"], seed)];
  liked.forEach((id, i) => parts.push(pick(lines[id], seed + i)));
  const own = extra.trim().replace(/\s+/g, " ");
  if (own) parts.push(/[.!?]$/.test(own) ? own[0].toUpperCase() + own.slice(1) : own[0].toUpperCase() + own.slice(1) + ".");
  parts.push(pick(closers, seed + liked.length));
  return parts.join(" ");
}

export type { Companion, Highlight };
