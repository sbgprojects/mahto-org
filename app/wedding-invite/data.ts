// Roshan Singh & Roshan Kaur — every detail below other than the couple's names is sample content.

export const couple = {
  groom: { en: "Roshan Singh", pa: "ਰੋਸ਼ਨ ਸਿੰਘ" },
  bride: { en: "Roshan Kaur", pa: "ਰੋਸ਼ਨ ਕੌਰ" },
  city: "Amritsar",
  dateLine: "Sunday · 14 February 2027",
  hashtag: "#TwoRoshans",
};

export const families = {
  groom: { name: "The Gill Family", parents: "S. Harbhajan Singh Gill & Sardarni Manjit Kaur Gill" },
  bride: { name: "The Sandhu Family", parents: "S. Balwinder Singh Sandhu & Sardarni Paramjit Kaur Sandhu" },
};

export type Event = {
  id: string;
  en: string;
  pa: string;
  day: string;
  start: string; // ISO, IST
  end: string;
  time: string;
  venue: string;
  area: string;
  dress: string;
  note: string;
  accent: string;
  icon: "leaf" | "dhol" | "gaagar" | "bangles" | "laavan" | "lights";
  family?: boolean;
};

export const events: Event[] = [
  {
    id: "mehndi",
    en: "Mehndi",
    pa: "ਮਹਿੰਦੀ",
    day: "Friday · 12 Feb",
    start: "2027-02-12T16:00:00+05:30",
    end: "2027-02-12T20:00:00+05:30",
    time: "4:00 PM",
    venue: "Rangla Bagh",
    area: "Ajnala Road, Amritsar",
    dress: "Greens, yellows, anything that twirls",
    note: "Henna for the bride, chai for everyone, and a dholki that will not stop.",
    accent: "#2f7a55",
    icon: "leaf",
  },
  {
    id: "sangeet",
    en: "Sangeet",
    pa: "ਸੰਗੀਤ",
    day: "Saturday · 13 Feb",
    start: "2027-02-13T19:30:00+05:30",
    end: "2027-02-13T23:30:00+05:30",
    time: "7:30 PM",
    venue: "The Haveli Courtyard",
    area: "Lawrence Road, Amritsar",
    dress: "Silk, sequins, your best juttis",
    note: "Boliyan are compulsory. Both families have been practising, and it shows.",
    accent: "#b4306c",
    icon: "dhol",
  },
  {
    id: "jaggo",
    en: "Jaggo",
    pa: "ਜਾਗੋ",
    day: "Saturday · 13 Feb",
    start: "2027-02-13T23:30:00+05:30",
    end: "2027-02-14T01:30:00+05:30",
    time: "11:30 PM",
    venue: "The Haveli Courtyard",
    area: "Lawrence Road, Amritsar",
    dress: "Patiala salwars and parandis",
    note: "Lamps on our heads and the whole lane awake. The neighbours have been warned.",
    accent: "#e2851f",
    icon: "gaagar",
  },
  {
    id: "chooda",
    en: "Chooda & Vatna",
    pa: "ਚੂੜਾ ਅਤੇ ਵਟਣਾ",
    day: "Sunday · 14 Feb",
    start: "2027-02-14T07:00:00+05:30",
    end: "2027-02-14T08:30:00+05:30",
    time: "7:00 AM",
    venue: "Sandhu Residence",
    area: "Green Avenue, Amritsar",
    dress: "Comfortable, you may be covered in turmeric",
    note: "Her mamas bring the red bangles. Close family, early morning, many tears.",
    accent: "#c23b2e",
    icon: "bangles",
    family: true,
  },
  {
    id: "anand-karaj",
    en: "Anand Karaj",
    pa: "ਆਨੰਦ ਕਾਰਜ",
    day: "Sunday · 14 Feb",
    start: "2027-02-14T10:00:00+05:30",
    end: "2027-02-14T13:30:00+05:30",
    time: "10:00 AM",
    venue: "Gurdwara Sahib",
    area: "Ranjit Avenue, Amritsar",
    dress: "Soft pastels. Heads covered for everyone, please",
    note: "The four laavan, then langar together. The heart of the whole celebration.",
    accent: "#c9a24a",
    icon: "laavan",
  },
  {
    id: "reception",
    en: "Reception",
    pa: "ਰਿਸੈਪਸ਼ਨ",
    day: "Sunday · 14 Feb",
    start: "2027-02-14T20:00:00+05:30",
    end: "2027-02-15T00:30:00+05:30",
    time: "8:00 PM",
    venue: "The Golden Pavilion",
    area: "GT Road, Amritsar",
    dress: "Evening Indian, black tie welcome",
    note: "Dinner, toasts and the first dance as Mr & Mrs. Then everyone’s dance.",
    accent: "#8a1c2c",
    icon: "lights",
  },
];

export const MAIN_EVENT = events.find((e) => e.id === "anand-karaj")!;

export const img = {
  amritsar: "https://images.unsplash.com/photo-1623059508779-2542c6e83753?auto=format&fit=crop&w=1400&q=75",
  marigold: "https://images.unsplash.com/photo-1699764681875-dd04ce36b1c3?auto=format&fit=crop&w=1200&q=70",
};
