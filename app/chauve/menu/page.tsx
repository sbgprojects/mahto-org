import type { Metadata } from "next";
import { MenuBoard, PageHero } from "../blocks";
import { food, img } from "../data";

export const metadata: Metadata = { title: "Menu · Chauve Irish Restaurant, Atlanta" };

export default function MenuPage() {
  return (
    <>
      <PageHero kicker="The menu" title={<>Irish comfort, <em>done properly.</em></>} sub="Breakfast, brunch, lunch and dinner. Anything marked Pre-order can be waiting on the table when you arrive." image={img.fish} />
      <MenuBoard sections={food} note="V vegetarian · GF gluten free · Please tell your server about any allergies." />
    </>
  );
}
