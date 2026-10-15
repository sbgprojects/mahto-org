import { Header } from "./_components/Header";
import { Hero, Marquee } from "./_components/Hero";
import { Journey } from "./_components/Journey";
import { Identity } from "./_components/Identity";
import { Network, Funding } from "./_components/Network";
import { Pricing } from "./_components/Pricing";
import { Stories, About, Finale, Footer } from "./_components/Closing";
import { Thread } from "./_components/motion";

export default function Home() {
  return (
    <>
      <Thread />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Journey />
        <Identity />
        <Network />
        <Funding />
        <Pricing />
        <Stories />
        <About />
        <Finale />
      </main>
      <Footer />
    </>
  );
}
