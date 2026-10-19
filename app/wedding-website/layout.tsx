import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./wedding.css";

const serif = Cormorant_Garamond({
  variable: "--lm-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const sans = Inter({
  variable: "--lm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LagnMandap — Your wedding starts here",
  description:
    "Discover beautiful wedding venues, planners, photographers, decorators and caterers across India.",
};

export default function WeddingLayout({ children }: { children: React.ReactNode }) {
  return <div className={`lm ${serif.variable} ${sans.variable}`}>{children}</div>;
}
