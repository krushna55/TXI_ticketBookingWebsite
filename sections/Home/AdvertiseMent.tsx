'use client'

import "swiper/css";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { AdvertisementData } from "@/consts/AdvertiseMentData";
import './advertisement.css'

export default function AdevertiseMent() {

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
      loop={true}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className="my-auto advertiseMent-swiper"
    >
      {
        AdvertisementData.map((url) => {
          return (
            <SwiperSlide className="">
              <div className="flex justify-center items-center px-3 sm:px-6">
                <Image src={url} alt="Ads Banner 1" className="w-full" />
              </div>

            </SwiperSlide>)
        })
      }


    </Swiper>

  )
}