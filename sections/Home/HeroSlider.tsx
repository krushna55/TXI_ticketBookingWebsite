'use client'
import { Navigation,Scrollbar, A11y ,Autoplay} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { BannerData } from "@/consts/bannerData";



export default function HeroSlider() {


  return (
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
        BannerData.map((banner) => {
          return (
            <SwiperSlide className="h-[100%]">
              <div className="justify-center items-center flex flex-col sm:px-2 ">
                {/* <div className="aspect-1/19"> */}
                  <Image src={banner.banner} alt="spider-movie" className="aspect-[3/4] object-cover overflow-none w-[500px] rounded-md" />
                {/* </div> */}
                <p className="text-md md:text-2xl xl:text-3xl line-clamp-1">{banner.MovieName}</p>
                <div className="flex h-full justify-center space-x-2 my-2">
                  <div className="px-1 text-white bg-[linear-gradient(to_right,#F2C46F,#C6943F)] h-fit rounded-sm text-[8px] md:text-sm xl:text-md">XXI</div>
                  <div className="px-1 text-white bg-gradientRed h-fit rounded-sm text-[8px] md:text-sm xl:text-md  ">CGV</div>
                  <div className="px-1 text-white bg-royal h-fit rounded-sm text-[8px] md:text-sm xl:text-md ">CINEPOLIS</div>
                </div>
              </div>
            </SwiperSlide>)
        })
      }


    </Swiper>
    </div>

  )
}