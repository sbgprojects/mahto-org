import type { Metadata, Viewport } from "next";
import "./wildernest.css";

export const metadata: Metadata = {
  title: "Write a Review | Wildernest Farms",
  description: "Share your stay at Wildernest Farms, Shahpur. Tap what you enjoyed and post your review on Google in under a minute.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#f5f2ec" };

export default function WildernestLayout({ children }: { children: React.ReactNode }) {
  return <div className="wn">{children}</div>;
}
