import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost, Noto_Serif_Gurmukhi } from "next/font/google";
import "./invite.css";

const display = Bodoni_Moda({ variable: "--wi-display", subsets: ["latin"], style: ["normal", "italic"] });
const sans = Jost({ variable: "--wi-sans", subsets: ["latin"] });
const gurmukhi = Noto_Serif_Gurmukhi({ variable: "--wi-pa", subsets: ["gurmukhi"], weight: ["400", "600"] });

export const metadata: Metadata = {
  title: "Roshan Singh & Roshan Kaur · You’re invited",
  description: "Join us in Amritsar, 12–14 February 2027, for the wedding of Roshan Singh & Roshan Kaur.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Roshan Singh & Roshan Kaur · You’re invited",
    description: "Two lights, one home. Amritsar, 14 February 2027.",
  },
};

export const viewport: Viewport = { themeColor: "#2a0710" };

export default function InviteLayout({ children }: { children: React.ReactNode }) {
  return <div className={`wi ${display.variable} ${sans.variable} ${gurmukhi.variable}`}>{children}</div>;
}
