import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AdevertiseMent from "@/sections/Home/AdvertiseMent";
import { BlogSection } from "@/sections/Home/blogSection";
import HeroSlider from "@/sections/Home/HeroSlider";
import MoviesPage from "@/sections/Home/MoviesSection";
import { Suspense } from "react";

export default async function Home() {
  return (
      <div className="min-h-screen max-w-[1400px] mx-auto flex flex-col">
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
        <div className=" flex-1">
          <div className="max-w-[1400px] mx-auto">
            <HeroSlider />
            <AdevertiseMent />
            <BlogSection />
            <MoviesPage />
          </div>
        </div>
        <div className="bottom-0">
          <hr className='border border-gray-400 mt-10  bg-white text-black  ' />
          <Footer />
        </div>
      </div>
  );
}
