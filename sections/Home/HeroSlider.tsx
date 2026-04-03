'use client'
import { Navigation, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import { useFetchHeroMoviesQuery } from "@/lib/slice/movieSupabaseApi";
import Skelaton from "@/components/skelaton";
import Typography from "@/components/Typography";



export default function HeroSlider() {

  const { data: bannerData = [], isError, isLoading } = useFetchHeroMoviesQuery()

  if (isError) {
    return <h1>Something went wrong</h1>
  }

  return (
    <>{
      isLoading ?
        <div className="mt-20 flex justify-center mb-10  px-2 gap-2 md:gap-10 ">
          <Skelaton height="500px" className="w-[45%]" />
          <Skelaton height="500px" className="w-[45%]" />
        </div>
        :
        <div className="  gap-2   mt-10 md:mt-20 mb-10 px-2">
              
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
                  <SwiperSlide className="h-[100%] px-2 sm:px-00">
                    <Link href={`./movie/${banner.id}`}>
                      <div className="w-[90%] mx-auto justify-center items-center flex flex-col sm:px-2 ">
                      
                        <Image src={banner?.movie_img ?? ''} loading="lazy" alt="spider-movie" width={200} height={400} className="aspect-[3/4] object-cover overflow-none w-[500px] rounded-md  " />
                       
                        <div className="min-h-10 md:min-h-14 lg:min-h-20 my-2">
                          <Typography size="header-medium" className="line-clamp-2">{banner?.name}</Typography>
                        </div>
                        <div className="flex h-full justify-center space-x-2 my-2">
                          <div className="px-2 py-0.5 rounded-[4px] text-white bg-[linear-gradient(to_right,#F2C46F,#C6943F)] h-fit  text-[8px] md:text-sm xl:text-md">XXI</div>
                          <div className="px-2 py-0.5 rounded-[4px] text-white bg-gradientRed h-fit text-[8px] md:text-sm xl:text-md  ">CGV</div>
                          <div className="px-2 py-0.5 rounded-[4px] text-white bg-royal h-fit  text-[8px] md:text-sm xl:text-md ">CINEPOLIS</div>
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