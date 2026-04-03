// 'use client'
// import Typography from "@/components/Typography"
// import { useFetchShowtimewithDateandMovieIdQuery } from "@/lib/slice/movieSupabaseApi"
// import { RootState } from "@/lib/store"
// import CitySelector from "@/sections/movie/citySelector"
// import MovieDateList from "@/sections/movie/MovieDateList"
// import MovieFrame from "@/sections/movie/movieFrame"
// import { useParams } from "next/navigation"
// import { useEffect, useState } from "react"
// import {  useSelector } from "react-redux"
// import ShowtimeTheaterSection from "@/sections/movie/showtimetheatersetion"
// import { TheaterEntry } from "@/types/movies"
// import { IoMdSearch } from "react-icons/io";
// import BrandScreenSelector from "@/sections/movie/brandScreenSelector"
// import BrandSelector from "@/sections/movie/brandSelector"
// import { useUserLocation } from "@/utils/useUserLocation"
// import PropertySelector from "@/sections/movie/propertySelector"
// import { setMovieId } from "@/lib/slice/movieSlice"

// export default function Movie() {

//     const params = useParams()
//     const movieid = params?.movieId as string
//     const [cityvalue, setCity] = useState<number>(1)
//     const [Moviedata, setData] = useState<TheaterEntry[] | null | undefined>()
//     const [filters, setFilters] = useState({ query: '', screen: '', brand: '' })
//     const { location, locationError, isLocating } = useUserLocation()




//     const movie_date = useSelector((state: RootState) => state.movieDetails.Movie_date)
//     const { data, isLoading, isError, refetch } = useFetchShowtimewithDateandMovieIdQuery(
//         { date: movie_date, movie_id: Number(movieid), city_id: cityvalue, userLat: location?.lat, userLng: location?.lng },
//         { skip: !movieid || !location?.lng || !location?.lat || !cityvalue || !movie_date }
//     )
//     function handleNearest(bool: boolean) {
//         if (!data) return
//         if (bool === false) return setData(data)
//         const sortedData = [...data].sort((theater1, theater2) => {
//             const a = theater1.theaterdetails?.distanceKm ?? Number.POSITIVE_INFINITY
//             const b = theater2.theaterdetails?.distanceKm ?? Number.POSITIVE_INFINITY
//             return a - b
//         })
//         setData(sortedData)
//     }
//     function handleAlphabatic(bool: boolean) {
//         if (!data) return
//         if (bool === false) return setData(data)

//         const sortedData = [...data].sort((theater1, theater2) => {
//             const a = theater1.theaterdetails?.name ?? ''
//             const b = theater2.theaterdetails?.name ?? ''
//             return a.localeCompare(b)  // correct way to compare strings
//         })

//         setData(sortedData)
//     }
//     function handleCheapest(bool: boolean) {
//         if (!data) return;
//         if (bool === false) return setData(data)
//             const sortedData = data.map((theater) => ({
//         ...theater,
//             screens: theater.screens.map((screen) => ({
//                 ...screen,
//                 showtimes: [...screen.showtimes].sort((s1, s2) => {
//                     const a = s1?.price ?? Number.POSITIVE_INFINITY;
//                     const b = s2?.price ?? Number.POSITIVE_INFINITY;
//                     return a - b;
//                 }),
//             })),
//         }));

//         const getMinPrice = (t: typeof sortedData[number]) => {
//             const prices = t.screens.flatMap((s) => s.showtimes.map((st) => st?.price ?? Number.POSITIVE_INFINITY));
//             return prices.length ? Math.min(...prices) : Number.POSITIVE_INFINITY;
//         };

//         sortedData.sort((t1, t2) => getMinPrice(t1) - getMinPrice(t2));

//         setData(sortedData);
//     }


//     if (isError) {
//         return <div>Error while fetching movie. Please try again later.</div>
//     }
//     useEffect(() => {
//         if (location) {
//             refetch()
//         }
//     }, [location])

//     useEffect(() => {
//         if (!data) return

//         let filtered = [...data]

//         if (filters.query.trim()) {
//             filtered = filtered.filter((theater) =>
//                 theater.theaterdetails.name.toLowerCase().includes(filters.query.toLowerCase()) ||
//             theater.theaterdetails.district?.toLowerCase().includes(filters.query.toLowerCase())
//             )
//         }

//         if (filters.screen) {
//             filtered = filtered.filter((theater) =>
//                 theater.screens.some((s) => s.screendetails.type === filters.screen)
//         )
//     } else if (filters.screen === 'null') {
//         filtered = data
//         }

//         if (filters.brand) {
//             filtered = filtered.filter((theater) =>
//                 theater.theaterdetails.brand_name === filters.brand
//             )
//         }
//         setData(filtered)
//     }, [filters, data])
//     // Handlers just update filters state
//     function handleMovieQuery(query: string) {
//         setFilters(prev => ({ ...prev, query }))
//     }

//     function handleScreenChange(screen: string) {
//         setFilters(prev => ({ ...prev, screen }))
//     }

//     function handleBrandChange(brand: string) {
//         setFilters(prev => ({ ...prev, brand }))
//     }

//     if (locationError) {
//         return <div> {locationError} </div>
//     }
//     return (
//         <div className="max-w-[1400px] mx-auto pl-2 h-fit mt-5">
//             <div className="flex flex-col h-full">
//                 <Typography size="header-medium" className="font-bold">Schedule</Typography>
//                 <Typography size="body-small" color="font_shade_600" className="py-2">
//                     Select the cinema schedule you want to watch
//                 </Typography>
//             </div>
//             <div className="flex flex-col-reverse items-start md:flex-row w-full h-full">
//                 <div className="w-full md:w-1/2">
//                     <div className="border-b-2 py-2">
//                         <MovieDateList />
//                     </div>
//                     <div className="h-12 my-5">
//                         <CitySelector setCity={setCity} />
//                     </div>
//                     <div className="w-full flex flex-col sm:flex-row md:flex-col lg:flex-row  items-center md:space-x-2">
//                         <div className="border border-gray-400 flex rounded-lg my-3">
//                             <input
//                                 value={filters.query}
//                                 onChange={(e) => handleMovieQuery(e.target.value)}
//                                 placeholder="Search theater"
//                                 className="py-1 px-2 w-full rounded-lg bg-white text-base outline-none"
//                             />
//                             <IoMdSearch className="text-2xl m-auto mx-2" />
//                         </div>
//                         <div className="flex w-fit h-full">
//                             <BrandScreenSelector setScreen={handleScreenChange} screen={filters.screen} />
//                             <BrandSelector setBrand={handleBrandChange} brand={filters.brand} />
//                             <PropertySelector handleCheapest={handleCheapest} handleNearest={handleNearest} handleAlphabatic={handleAlphabatic} />
//                         </div>
//                         <div>

//                         </div>
//                     </div>
//                     {isLoading ? 'loading showtime' : <ShowtimeTheaterSection data={Moviedata} />}
//                 </div>
//                 <MovieFrame movieid={movieid} />
//             </div>
//         </div>
//     )
// }



'use client'

import Typography from "@/components/Typography"
import { useFetchShowtimewithDateandMovieIdQuery } from "@/lib/slice/movieSupabaseApi"
import { RootState } from "@/lib/store"
import CitySelector from "@/sections/movie/citySelector"
import MovieDateList from "@/sections/movie/MovieDateList"
import MovieFrame from "@/sections/movie/movieFrame"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ShowtimeTheaterSection from "@/sections/movie/showtimetheatersetion"
import { IoMdSearch } from "react-icons/io"
import BrandScreenSelector from "@/sections/movie/brandScreenSelector"
import BrandSelector from "@/sections/movie/brandSelector"
import PropertySelector from "@/sections/movie/propertySelector"
import { useUserLocation } from "@/utils/useUserLocation"
import LocationBanner from "@/utils/LocationBanner"
import { resetSelection } from "@/lib/slice/movieSlice"
import Skelaton from "@/components/skelaton"

export default function Movie() {
    const params = useParams()
    const movieid = params?.movieId as string
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(resetSelection())
    // })
    const [cityvalue, setCity] = useState<number>(1)
    const [filters, setFilters] = useState({
        query: '',
        screen: '',
        brand: '',
        sort: '', // 'nearest' | 'alphabetical' | 'cheapest'
    })

    // ✅ Full location state — status covers every scenario
    const {
        location,
        status: locationStatus,
        isLocating,
        isDenied,
        statusMessage,
        getLocation,
    } = useUserLocation(true)

    const movie_date = useSelector((state: RootState) => state.movieDetails.Movie_date)
    console.log(movie_date)

    // ✅ Query fires immediately (no location skip)
    // RTK Query auto-refetches when lat/lng args change as location arrives
    const { data, isLoading, isError } = useFetchShowtimewithDateandMovieIdQuery(
        {
            date: movie_date,
            movie_id: Number(movieid),
            city_id: cityvalue,
            userLat: location?.lat ?? null,
            userLng: location?.lng ?? null,
        },
        { skip: !movieid || !cityvalue || !movie_date }
    )

    // ✅ Derive display data — always fresh, no stale setState
    const displayData = useMemo(() => {
        if (!data) return data

        let result = [...data]
        if (filters.query.trim()) {
            const q = filters.query.toLowerCase()
            result = result.filter(t =>
                t.theaterdetails.name.toLowerCase().includes(q) ||
                t.theaterdetails.district?.toLowerCase().includes(q)
            )
        }
        
        if (filters.screen) {
            result = result.filter(t =>
                t.screens.some(s => s.screendetails.type === filters.screen)
            )
        }

        if (filters.brand) {
            result = result.filter(t =>
                t.theaterdetails.brand_name === filters.brand
            )
        }

        if (filters.sort === 'nearest') {
            result = [...result].sort((a, b) =>
                (a.theaterdetails.distanceKm ?? Infinity) -
                (b.theaterdetails.distanceKm ?? Infinity)
            )
        } else if (filters.sort === 'alphabetical') {
            result = [...result].sort((a, b) =>
                a.theaterdetails.name.localeCompare(b.theaterdetails.name)
            )
        } else if (filters.sort === 'cheapest') {
            const minPrice = (t: typeof result[number]) => {
                const prices = t.screens.flatMap(s =>
                    s.showtimes.map(st => st?.price ?? Infinity)
                )
                return prices.length ? Math.min(...prices) : Infinity
            }
            result = [...result].sort((a, b) => minPrice(a) - minPrice(b))
        }
        console.log(result)
        return result
    }, [data, filters,movie_date])

    // ✅ "Sort by nearest" clicked while location is denied → show message, don't crash
    function handleNearest(bool: boolean) {
        if (bool) {
            if (isDenied) {
                // Can't re-prompt after denial — browser blocks it
                // The UI banner below will guide the user to fix it in settings
                setFilters(prev => ({ ...prev, sort: 'nearest' }))
                return
            }
            if (!location) {
                // Permission not yet asked or timed out → try again
                getLocation()
            }
        }
        setFilters(prev => ({ ...prev, sort: bool ? 'nearest' : '' }))
    }

    function handleAlphabatic(bool: boolean) {
        setFilters(prev => ({ ...prev, sort: bool ? 'alphabetical' : '' }))
    }

    function handleCheapest(bool: boolean) {
        setFilters(prev => ({ ...prev, sort: bool ? 'cheapest' : '' }))
    }

    if (isError) return <div>Error fetching showtimes. Please try again.</div>

    return (
        <div className="max-w-[1400px] mx-auto pl-2 mt-5">
            <Typography size="header-medium" className="font-bold">Schedule</Typography>
            <Typography size="body-small" color="font_shade_600" className="py-2">
                Select the cinema schedule you want to watch
            </Typography>

            {/* ✅ Location banner — one component, all scenarios */}
            <LocationBanner
                status={locationStatus}
                message={statusMessage}
                onRetry={getLocation}
                isLocating={isLocating}
            />

            <div className="flex flex-col-reverse md:flex-row">
                <div className="w-full md:w-1/2">

                    <MovieDateList />

                    <div className="my-5 min-h-10">
                        <CitySelector setCity={setCity} />
                    </div>

                    <div className="border flex rounded-lg my-3">
                        <input
                            value={filters.query}
                            onChange={e => setFilters(prev => ({ ...prev, query: e.target.value }))}
                            placeholder="Search theater"
                            className="bg-white py-1 px-2 w-full outline-none"
                        />
                        <IoMdSearch className="text-2xl m-auto mx-2" />
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        <BrandScreenSelector
                            setScreen={s => setFilters(prev => ({ ...prev, screen: s }))}
                            screen={filters.screen}
                        />
                        <BrandSelector
                            setBrand={b => setFilters(prev => ({ ...prev, brand: b }))}
                            brand={filters.brand}
                        />
                        <PropertySelector
                            handleNearest={handleNearest}
                            handleAlphabatic={handleAlphabatic}
                            handleCheapest={handleCheapest}
                        />
                    </div>

                    {/* ✅ "Nearest" selected but denied — inline warning */}
                    {filters.sort === 'nearest' && isDenied && (
                        <p className="text-xs text-amber-600 mt-2">
                            Location is blocked — results shown in default order.
                            Enable location in your browser settings and refresh.
                        </p>
                    )}

                    {isLoading
                        ? <>
                            {Array(2)
                            .fill(0)
                            .map((_, i) => (
                            <div key={i} className="w-full flex flex-col justify-center">
                                <Skelaton height="50px" className="w-[95%] my-2" />
                                <Skelaton height="25px" className="w-[95%] my-2" />
                                <Skelaton height="25px" className="w-[95%] my-2" />
                            </div>
                            ))}
                        </>
                        :
                        <>

                            <ShowtimeTheaterSection data={displayData} />
                        </>
                    }

                </div>

                <MovieFrame movieid={movieid} />
            </div>
        </div>
    )
}

