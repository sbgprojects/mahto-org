import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "lenis/dist/lenis.css";
import "./capabl.css";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Smooth } from "./ui";

const sans = Manrope({
  variable: "--cb-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Capabl — Building Future-Ready Institutions",
  description:
    "Capabl is an institution transformation partner, helping colleges prepare students, empower faculty and foster innovation through AI and Electric Vehicles.",
};

export const viewport: Viewport = {
  themeColor: "#f6f4ef",
  width: "device-width",
  initialScale: 1,
};

export default function CapablLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`cb ${sans.variable}`}>
      <Smooth />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
