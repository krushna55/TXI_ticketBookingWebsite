import { Tables } from "@/database.types"
import { useFetchcityQuery } from "@/lib/slice/citySilce"
import { useEffect, useState } from "react"
import { FaAngleDown } from "react-icons/fa6"
import { IoSearch } from "react-icons/io5"
import { IoLocationOutline } from "react-icons/io5";
type City = Tables<'cities'>

export default function CitySelector({setCity}:{setCity:React.Dispatch<React.SetStateAction<number>>}) {
    const [tap, setTap] = useState(false)
    const [selectedCity, setSelectedCity] = useState('Mumbai')
    const [query, setQuery] = useState('')
    const [filteredCities, setFilteredCities] = useState<City[]>([])

    const { data: citylist, isLoading, isError } = useFetchcityQuery()

    // Bug 1 fixed - proper dependencies
    useEffect(() => {
        if (!isLoading && !isError && citylist) {
            setFilteredCities(citylist)
        }
    }, [citylist, isLoading, isError])

    function handleCityClick(city: City) {
        setSelectedCity(city.name)
        setCity(city.id)
        setTap(false)
        setQuery('')
        setFilteredCities(citylist ?? []) 
    }

    function handleCityChange(q: string) {
        setQuery(q)
        if (!q.trim()) {
            setFilteredCities(citylist ?? [])
            return
        }
        const filtered = citylist?.filter((c) =>
            c.name.toLowerCase().includes(q.toLowerCase())
        )
        setFilteredCities(filtered ?? [])
    }

    const renderedList =filteredCities.length > 0 ?  filteredCities?.map((c) => (
        <div
            key={c.id}
            className="bg-white cursor-pointer w-full text-lg border-b-2 py-3 px-3 hover:bg-slate-200"
            onClick={() => handleCityClick(c)}
        >
            {c.name}
        </div>
    )) : <p className="text-base">No city found</p>

    return (
        <div>
            <div className="relative bg-white z-10 text-xl w-56 px-2 py-1">
                {tap ? (
                    <div className="z-10 bg-white absolute inset-0 w-full">
                        <div className="bg-white border w-full px-4">
                            <div
                                onClick={() => setTap(false)}
                                className="cursor-pointer flex flex-row justify-start items-center gap-5 text-xl h-12"
                            >
                                {selectedCity} <FaAngleDown />
                            </div>
                            <div className="border border-gray-400 flex rounded-lg my-3">
                                <input
                                    value={query}
                                    onChange={(e) => handleCityChange(e.target.value)}
                                    placeholder="Search city"
                                    className="py-1 px-2 w-full rounded-lg bg-white text-base outline-none"
                                />
                                <span className="flex justify-center items-center px-2">
                                    <IoSearch />
                                </span>
                            </div>
                            <div className="max-h-72 overflow-y-scroll scrollbar-hide bg-white">
                                {isLoading && <p className="p-3 text-sm text-gray-400">Loading...</p>}
                                {isError && <p className="p-3 text-sm text-red-400">Failed to load cities</p>}
                                {renderedList}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={() => setTap(true)}
                        className="flex flex-row justify-start items-center gap-3 text-xl"
                    >
                        <IoLocationOutline className="text-2xl"/>{selectedCity} <FaAngleDown />
                    </div>
                )}
            </div>
        </div>
    )
}