'use client'
import { Navigation, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { BannerData } from "@/consts/bannerData";
import { useEffect, useState } from "react";
import Link from "next/link";
// import { fetchMovies } from "@/api/Movies/movies";
import { movies } from "@/types/movies";
import { useFetchMoviesQuery } from "@/lib/slice/movieSupabaseApi";
import Skelaton from "@/components/skelaton";



export default function HeroSlider() {

  const { data: bannerData = [], isError, isLoading } = useFetchMoviesQuery()
  console.log(isLoading)

  return (
    <>{
      isLoading ?
       <div className="mt-20 h-96 mb-10 px-2 gap-10 flex">
        <Skelaton height="full" width="full"/>
        <Skelaton height="full" width="full"/>
      </div> 
      :
        <div className="mt-20 mb-10 px-2">
          <Swiper
            modules={[Navigation, Scrollbar, A11y, Autoplay]}
            spaceBetween={0}
            slidesPerView={2}
            autoplay={{
              delay: 2500,
              disableOnInteraction: true,
            }}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            >
            {
              bannerData?.map((banner) => {
                return (
                  <SwiperSlide className="h-[100%] ">
                    <Link href={`./movie/${banner.id}`}>
                      <div className="justify-center items-center flex flex-col sm:px-2 ">
                        {/* <div className="aspect-1/19"> */}
                        <Image src={banner?.movie_img ?? ''} alt="spider-movie" width={200} height={400} className="aspect-[3/4] object-cover overflow-none w-[500px] rounded-md  " />
                        {/* </div> */}
                        <p className="text-md md:text-2xl xl:text-3xl line-clamp-1">{banner?.name}</p>
                        <div className="flex h-full justify-center space-x-2 my-2">
                          <div className="px-1 text-white bg-[linear-gradient(to_right,#F2C46F,#C6943F)] h-fit rounded-sm text-[8px] md:text-sm xl:text-md">XXI</div>
                          <div className="px-1 text-white bg-gradientRed h-fit rounded-sm text-[8px] md:text-sm xl:text-md  ">CGV</div>
                          <div className="px-1 text-white bg-royal h-fit rounded-sm text-[8px] md:text-sm xl:text-md ">CINEPOLIS</div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>)
              })
            }
          </Swiper>
        </div>
    }
    </>
  )
}