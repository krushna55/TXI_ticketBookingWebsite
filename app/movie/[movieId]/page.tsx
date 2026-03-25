'use client'
import Typography from "@/components/Typography"
import { useFetchShowtimewithDateandMovieIdQuery } from "@/lib/slice/movieSupabaseApi"
import { RootState } from "@/lib/store"
import CitySelector from "@/sections/movie/citySelector"
import MovieDateList from "@/sections/movie/MovieDateList"
import MovieFrame from "@/sections/movie/movieFrame"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ShowtimeTheaterSection from "@/sections/movie/showtimetheatersetion"
import { selectionMovie, TheaterEntry } from "@/types/movies"
import { IoMdSearch } from "react-icons/io";
import BrandScreenSelector from "@/sections/movie/brandScreenSelector"
import BrandSelector from "@/sections/movie/brandSelector"
import { useUserLocation } from "@/utils/useUserLocation"
import PropertySelector from "@/sections/movie/propertySelector"

export default function Movie() {

    const params = useParams()
    const movieid = params?.movieId as string
    const [cityvalue, setCity] = useState<number>(1)
    const [Moviedata, setData] = useState<TheaterEntry[] | null | undefined>()
    const [selectedMovie, setSelectedMovie] = useState<selectionMovie>()
    const [filters, setFilters] = useState({ query: '', screen: '', brand: '' })
    const { location, locationError, isLocating } = useUserLocation()

    const movie_date = useSelector((state: RootState) => state.movieDetails.Movie_date)
    const { data, isLoading, isError, refetch } = useFetchShowtimewithDateandMovieIdQuery(
        { date: movie_date, movie_id: Number(movieid), city_id: cityvalue, userLat: location?.lat, userLng: location?.lng },
        { skip: !movieid || !location?.lng || !location?.lat  || !cityvalue || !movie_date}
    )
    function handleNearest(bool:boolean) {

        if (!data) return
        if(bool === false) return setData(data)
        const sortedData = [...data].sort((theater1, theater2) => {
            const a = theater1.theaterdetails?.distanceKm ?? Number.POSITIVE_INFINITY
            const b = theater2.theaterdetails?.distanceKm ?? Number.POSITIVE_INFINITY
            return a - b
        })
        setData(sortedData)
    }
    function handleAlphabatic(bool:boolean) {
        if (!data) return
        if(bool === false) return setData(data)

        const sortedData = [...data].sort((theater1, theater2) => {
            const a = theater1.theaterdetails?.name ?? ''
            const b = theater2.theaterdetails?.name ?? ''
            return a.localeCompare(b)  // correct way to compare strings
        })

        setData(sortedData)
    }
    function handleCheapest(bool:boolean) {
        if (!data) return;
        if(bool === false) return setData(data)
        const sortedData = data.map((theater) => ({
            ...theater,
            screens: theater.screens.map((screen) => ({
                ...screen,
                showtimes: [...screen.showtimes].sort((s1, s2) => {
                    const a = s1?.price ?? Number.POSITIVE_INFINITY;
                    const b = s2?.price ?? Number.POSITIVE_INFINITY;
                    return a - b;
                }),
            })),
        }));

        const getMinPrice = (t: typeof sortedData[number]) => {
            const prices = t.screens.flatMap((s) => s.showtimes.map((st) => st?.price ?? Number.POSITIVE_INFINITY));
            return prices.length ? Math.min(...prices) : Number.POSITIVE_INFINITY;
        };

        sortedData.sort((t1, t2) => getMinPrice(t1) - getMinPrice(t2));

        setData(sortedData);
    }


    if (isError) {
        return <div>Error while fetching movie. Please try again later.</div>
    }
    useEffect(() => {
        if (location) {
            refetch()
        }
    }, [location])

    useEffect(() => {
        if (!data) return

        let filtered = [...data]

        if (filters.query.trim()) {
            filtered = filtered.filter((theater) =>
                theater.theaterdetails.name.toLowerCase().includes(filters.query.toLowerCase()) ||
                theater.theaterdetails.district?.toLowerCase().includes(filters.query.toLowerCase())
            )
        }

        if (filters.screen) {
            filtered = filtered.filter((theater) =>
                theater.screens.some((s) => s.screendetails.type === filters.screen)
            )
        }else if(filters.screen === 'null'){
            filtered = data
        }

        if (filters.brand) {
            filtered = filtered.filter((theater) =>
                theater.theaterdetails.brand_name === filters.brand
            )
        }
        setData(filtered)
    }, [filters,data])
    // Handlers just update filters state
    function handleMovieQuery(query: string) {
        setFilters(prev => ({ ...prev, query }))
    }

    function handleScreenChange(screen: string) {
        setFilters(prev => ({ ...prev, screen }))
    }

    function handleBrandChange(brand: string) {
        setFilters(prev => ({ ...prev, brand }))
    }

    return (
        <div className="max-w-[1400px] mx-auto pl-2 h-fit">
            <div className="flex flex-col h-full">
                <Typography size="lg" className="font-bold">Schedule</Typography>
                <Typography size="md" className="bold text-base text-gray-400 font-medium">
                    Select the cinema schedule you want to watch
                </Typography>
            </div>
            <div className="flex flex-col-reverse items-start md:flex-row w-full h-full">
                <div className="w-full md:w-1/2">
                    <div className="border-b-2 py-2">
                        <MovieDateList />
                    </div>
                    <div className="h-12 my-5">
                        <CitySelector setCity={setCity} />
                    </div>
                    <div className="w-full flex flex-col sm:flex-row md:flex-col lg:flex-row  items-center space-x-2">
                        <div className="border border-gray-400 flex rounded-lg my-3">
                            <input
                                value={filters.query}
                                onChange={(e) => handleMovieQuery(e.target.value)}
                                placeholder="Search theater"
                                className="py-1 px-2 w-full rounded-lg bg-white text-base outline-none"
                            />
                            <IoMdSearch className="text-2xl m-auto mx-2" />
                        </div>
                        <div className="flex  h-full">
                            <BrandScreenSelector setScreen={handleScreenChange} screen={filters.screen} />
                            <BrandSelector setBrand={handleBrandChange}  brand={filters.brand}/>
                            <PropertySelector handleCheapest={handleCheapest} handleNearest={handleNearest} handleAlphabatic={handleAlphabatic} />
                        </div>
                        <div>

                        </div>
                    </div>
                    {isLoading ? 'loading showtime' : <ShowtimeTheaterSection data={Moviedata}  />}
                </div>
                <MovieFrame movieid={movieid}/>
            </div>
        </div>
    )
}