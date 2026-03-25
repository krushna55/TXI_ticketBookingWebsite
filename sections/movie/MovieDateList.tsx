'use client'
import { getDate } from "@/utils/getDate"
import { useCallback, useEffect, useState } from "react"
import { A11y, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import { FaChevronLeft } from "react-icons/fa"
import { FaChevronRight } from "react-icons/fa6"
import { useDispatch } from "react-redux"
import { setMovieDate } from "@/lib/slice/movieSlice"
import { btnlist } from "@/consts/Datebtnarray"
import HandleDate from "./handleDate"
// MovieDateList.tsx


export default function MovieDateList() {
    const [btnid, setbtnid] = useState<number | null>(0)
    const dispatch = useDispatch()

    const handledateindex = useCallback((index: number) => {
        setbtnid(index)
        const data = getDate(index)
        dispatch(setMovieDate(`${data.year}-${data.month}-${data["Date"]}`))
    }, [dispatch])

    return (
        <div className="w-full flex items-center gap-2 px-2">
            <button className="custom-prev shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-white text-gray-600 hover:bg-[#383782] hover:text-white transition-colors border border-gray-200 shadow-sm">
                <FaChevronLeft size={12} />
            </button>
            <Swiper
                modules={[Navigation, A11y]}
                spaceBetween={8}
                slidesPerView="auto"
                loop={false}
                navigation={{ prevEl: '.custom-prev', nextEl: '.custom-next' }}
                className="!w-full"
            >
                {btnlist.map((state, index) => (
                    <SwiperSlide key={index} className="!w-fit p-2">
                        <div
                            onClick={() => { 
                                state !== 'disable' && handledateindex(index)
                            }}
                            className={`
                                cursor-pointer border rounded-md text-center px-4 py-2
                                transition-colors duration-200 whitespace-nowrap
                                ${btnid === index
                                    ? 'bg-[#383782] text-white border-[#383782]'
                                    : 'border-gray-400 text-gray-600 hover:bg-[#282764] hover:text-white'
                                }
                                ${state === 'disable' ? 'opacity-40 pointer-events-none' : ''}
                            `}
                        >
                            <HandleDate index={index} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <button className="custom-next shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-white text-gray-600 hover:bg-[#383782] hover:text-white transition-colors border border-gray-200 shadow-sm">
                <FaChevronRight size={12} />
            </button>
        </div>
    )
}