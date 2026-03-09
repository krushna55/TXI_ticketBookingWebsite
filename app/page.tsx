// 'use client'
import { createClient } from "@/lib/supabase/client";
import AdevertiseMent from "@/sections/Home/AdvertiseMent";
import {BlogSection} from "@/sections/Home/blogSection";
import HeroSlider from "@/sections/Home/HeroSlider";
import { Suspense } from "react";

export default function Home() {
  // const supabase = createClient()
  // useEffect(()=>{
  //   (async function getUser(){
  //     const {data,error} = await supabase.auth.getUser()
  //     console.log("data : ", data,'Error:',error)
  //   })()
  // },[])
  return (
    <main className="max-w-[1400px] mx-auto">
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
