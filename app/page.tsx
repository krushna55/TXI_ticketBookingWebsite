import AdevertiseMent from "@/sections/Home/AdvertiseMent";
import {BlogSection} from "@/sections/Home/blogSection";
import HeroSlider from "@/sections/Home/HeroSlider";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="">
      <Suspense fallback={'Loading...'}>
        <HeroSlider />
      </Suspense>
      <AdevertiseMent />
      <Suspense fallback={'Loading....'}>
        <BlogSection />
      </Suspense>
    </main>
  );
}
