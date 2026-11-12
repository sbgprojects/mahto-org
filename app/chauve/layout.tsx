import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./chauve.css";
import { CartDrawer, Footer, Header, PintReserve, SeasonNote } from "./Chrome";
import { ShellProvider } from "./ui";

const serif = Fraunces({ variable: "--ch-serif-f", subsets: ["latin"], style: ["normal", "italic"], axes: ["SOFT", "opsz"] });
const sans = DM_Sans({ variable: "--ch-sans-f", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chauve Irish Restaurant · Atlanta, Georgia",
  description: "An Irish restaurant and bar in Atlanta, Georgia. Proper pints, Irish comfort food, private parties and reservations.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#123326" };

export default function ChauveLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`ch ${serif.variable} ${sans.variable}`}>
      <ShellProvider>
        <a href="#main" className="ch-skip">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CartDrawer />
        <PintReserve />
        <SeasonNote />
      </ShellProvider>
    </div>
  );
}
