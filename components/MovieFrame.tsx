import { movies } from "@/types/movies";
import Image from "next/image";
import Link from "next/link";

export default function MovieFrame({ movie }: { movie: movies }) {

    return (
        <>
            <Link href={`./movie/${movie.id}`} >
                <div className="justify-center items-center flex flex-col sm:px-2 pt-2 pb-5">
                    {/* <div className="aspect-1/19"> */}
                    <Image src={movie?.movie_img ?? ''} alt="spider-movie" width={200} height={400} className="aspect-[3/4] object-cover overflow-none w-[90%] sm:w-[500px] rounded-md  " />
                    {/* </div> */}
                    <p className="text-md h-12 sm:h-auto sm:line-clamp-1 text-[14px] md:text-2xl line-clamp-2 p-1 mx-1">{movie?.name}</p>
                    <div className="flex h-full justify-center space-x-2 my-2">
                        <div className="px-1 text-white bg-[linear-gradient(to_right,#F2C46F,#C6943F)] h-fit rounded-sm text-[8px] md:text-sm xl:text-md">XXI</div>
                        <div className="px-1 text-white bg-gradientRed h-fit rounded-sm text-[8px] md:text-sm xl:text-md  ">CGV</div>
                        <div className="px-1 text-white bg-royal h-fit rounded-sm text-[8px] md:text-sm xl:text-md ">CINEPOLIS</div>
                    </div>
                </div>
            </Link>
        </>
    )
}