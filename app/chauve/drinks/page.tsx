import type { Metadata } from "next";
import { MenuBoard, PageHero } from "../blocks";
import { drinks, img } from "../data";

export const metadata: Metadata = { title: "Drinks · Chauve Irish Restaurant, Atlanta" };

export default function DrinksPage() {
  return (
    <>
      <PageHero kicker="The bar" title={<>Poured slowly, <em>served gladly.</em></>} sub="Irish stout, reds and lagers, a proper whiskey shelf and cocktails. Must be 21 or over to order alcohol." image={img.pour} />
      <MenuBoard sections={drinks} />
    </>
  );
}
