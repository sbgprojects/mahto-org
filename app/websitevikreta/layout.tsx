import type { Metadata, Viewport } from "next";
import { Anton, Inter_Tight } from "next/font/google";
import "lenis/dist/lenis.css";
import "./vikreta.css";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ScrollProgress, Smooth } from "./ui";

const display = Anton({ variable: "--wv-display", subsets: ["latin"], weight: "400" });
const sans = Inter_Tight({ variable: "--wv-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Website Vikreta — IT Consulting, Web & AI Automation",
  description:
    "Website Vikreta is a Pune-based IT consulting and product studio: AI apps and automations, web design and development, CRMs and web applications, UI/UX, SEO & GEO.",
};

export const viewport: Viewport = {
  themeColor: "#f6f4ee",
  width: "device-width",
  initialScale: 1,
};

export default function VikretaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`wv ${display.variable} ${sans.variable}`}>
      <Smooth />
      <ScrollProgress />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
