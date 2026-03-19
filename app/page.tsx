import AdevertiseMent from "@/sections/Home/AdvertiseMent";
import { BlogSection } from "@/sections/Home/blogSection";
import HeroSlider from "@/sections/Home/HeroSlider";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="max-w-[1400px] mx-auto">

      <Suspense fallback={'Loading....'}>
        <HeroSlider />
      </Suspense>
        <AdevertiseMent />
      <Suspense fallback={'Loading....'}>
        <BlogSection />
      </Suspense>
    </main>
  );
}
