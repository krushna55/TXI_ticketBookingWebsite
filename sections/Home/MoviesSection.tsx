// 'use client'
// import MovieFrame from "@/components/MovieFrame"
// import Skelaton from "@/components/skelaton"
// import Typography from "@/components/Typography"
// import { useFetchMoiesQuery } from "@/lib/slice/movieSupabaseApi"
// import Image from "next/image"
// import Link from "next/link"

// export default function functionMoviesPage() {
//     const { data: data = [], isError, isLoading } = useFetchMoiesQuery()
//     if (isError) {
//         return <div>Something went Wrong</div>
//     }
//     return (
//         <div className="my-10 px-2 ">
//             <div className="flex justify-between py-5">
//                 <div className="w-[70%]">
//                     <Typography size="header-small">Movies</Typography>
//                     <Typography size="body-small" color="font_shade_700">The latest Movies for you!</Typography>
//                 </div>

//                 <div>
//                     <Link href={'./movie'}><Typography size="header-small" className="text-skyBlue">See All</Typography></Link>
//                 </div>
//             </div>
//             {isLoading ? (
//                 <div className="mt-6 sm:grid md:grid-cols-3 sm:grid-cols-2 gap-10">
//                     {[...Array(3)].map((_, idx) => (<div key={idx} className="flex flex-col space-y-2">
//                         <Skelaton height="250px" width="100%"  />
//                         <Skelaton height="50px" width="30%"  />
//                         <Skelaton height="50px" width="100%"  />
//                     </div>
//                     ))}
//                 </div>
//             ) :
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-0 sm:gap-8 md:gap-12 overflow-auto">
//                     {data?.slice(0, 3).map((movie) => (
//                         <MovieFrame movie={movie} key={movie.id} />
//                     ))}
//                 </div>
//             }
//         </div>
//     );
// }



'use client'
import MovieFrame from "@/components/MovieFrame"
import Skelaton from "@/components/skelaton"
import Typography from "@/components/Typography"
import { useFetchMoiesQuery } from "@/lib/slice/movieSupabaseApi"
import Image from "next/image"
import Link from "next/link"

export default function functionMoviesPage() {
    const { data: data = [], isError, isLoading } = useFetchMoiesQuery()
    if (isError) {
        return <div>Something went Wrong</div>
    }
    return (
        <div className="my-10 px-2 ">
            <div className="flex justify-between py-5">
                <div className="w-[70%]">
                    <Typography size="header-small">Movies</Typography>
                    <Typography size="body-small" color="font_shade_700">The latest Movies for you!</Typography>
                </div>

                <div>
                    <Link href={'./movie'}><Typography size="header-small" className="text-skyBlue">See All</Typography></Link>
                </div>
            </div>
            {isLoading ? (
                <div className="mt-6 sm:grid md:grid-cols-3 sm:grid-cols-2 gap-10">
                    {[...Array(3)].map((_, idx) => (<div key={idx} className="flex flex-col space-y-2">
                        <Skelaton height="250px" width="100%" />
                        <Skelaton height="50px" width="30%" />
                        <Skelaton height="50px" width="100%" />
                    </div>
                    ))}
                </div>
            ) :
                <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory scrollbar-hide">
                    {data?.slice(0, 3).map((movie) => (
                        <div className="w-72 md:min-w-96 md:w-fit  flex-shrink-0 snap-start" key={movie.id}>
                            <MovieFrame movie={movie} />
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}