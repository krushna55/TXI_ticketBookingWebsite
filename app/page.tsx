import AdevertiseMent from "@/sections/Home/AdvertiseMent";
import HeroSlider from "@/sections/Home/HeroSlider";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="">
     <HeroSlider/>
     <AdevertiseMent/>
    </main>
  );
}
