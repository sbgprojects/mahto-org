import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./harrytang.css";

const geist = Geist({ variable: "--ht-font", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Donate — Harry Tang (design preview)",
  description: "Preview of a crypto donation page for harrytang.xyz.",
  robots: { index: false, follow: false },
};

export default function HarryLayout({ children }: { children: React.ReactNode }) {
  return <div className={`ht ${geist.variable}`}>{children}</div>;
}
