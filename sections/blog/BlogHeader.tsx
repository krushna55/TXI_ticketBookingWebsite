'use client'


import { TiTick } from "react-icons/ti";
import { CiSearch } from "react-icons/ci";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { fetchBlogWithtitle, fetchBlogWithType } from "@/api/blog/blog"
import { useEffect, useRef, useState } from "react"
import { blog } from "@/types/blog";


interface BlogHeaderProps {
    setBlogs: (blogs: blog[] | null ) => void;
}
interface Dropdownlist {
    value: string,
    label: string
}
export const BlogHeader = ({ setBlogs }: BlogHeaderProps) => {
    const ref = useRef<ReturnType<typeof setTimeout> | null>(null)
    const [query, setQuery] = useState<string>('')
    const [debounce, setDebounce] = useState<string>(query)
    const [selectedType, setSelectedType] = useState<string[]>([]); // Initial state
    const [isOpen, setIsOpen] = useState(false)
    const options: Dropdownlist[] = [
        { value: 'News', label: 'News' },
        { value: 'Spotlight', label: 'Spotlight' },
        { value: 'Trailor', label: 'Trailor' },
    ];
    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value)
        if (ref.current) clearTimeout(ref.current)
        if (e.target.value.trim() === '') {
            const data: blog[] | null = await fetchBlogWithType('type', 'Spotlight')
            setBlogs(data)
            return;
        }
        // if (debounce !== query) {
            ref.current = setTimeout(async () => {
                const data: blog[] | null = await fetchBlogWithtitle('title', query)
                
                setBlogs(data)
                setDebounce(query)
            }, 500)
        // }
    }


    const renderedList = options.map((option) => {
        return (
            <div key={option.value} className="flex items-center justify-between hover:bg-gray-200 px-2 py-2 bg-white" onClick={() => handleoptionsChange(option.value)}>
                {option.label}<p> {selectedType.includes(option.value) && <TiTick />}</p>
            </div >
        )
    })

    const handleoptionsChange = async (value: string) => {

        let updatedType;
        if (selectedType.includes(value)) {
            updatedType = selectedType.filter((val) => val != value)
        } else {
            updatedType = [...selectedType, value]
        }
        const data = await Promise.all(updatedType.map(async (type) => {
            const data = await fetchBlogWithType('type', type)
            return data
        }))
        setBlogs(data.flat().filter(Boolean) as blog[])
        setSelectedType(updatedType)
    };
    function handleDropDown() {

        setIsOpen(!isOpen)

    }
    const icon = isOpen ? <FaCaretUp /> : <FaCaretDown />
    const classfordrop = isOpen ? 'border-2 border-gray-200 shadow-md' : ''
    return (
        <div className="flex w-full px-2 gap-1">
            <div className="flex border  w-[60vw] sm:w-[90vw]  md:mx-3 md:w-fit rounded-md px-2 py-1 " >
                <input className="bg-white outline-none w-full  md:w-[576px] md:p-2" placeholder="search" type="text" value={query} onChange={handleChange} />
                <div className="flex items-center justify-center">
                    <CiSearch />
                </div>

            </div>
            <div className=" w-32 h-full sm:w-36 relative ">
                <div onClick={handleDropDown} className="flex justify-between items-center gap-1  p-2 ">Sort By {icon}</div>
                <div className={`${classfordrop} top-0 absolute w-full   bg-white `}>
                    {isOpen &&
                        <div className="">
                            <div onClick={handleDropDown} className="flex justify-between items-center  p-2 ">Sort By {icon}</div>
                            <div className="space-y-1  p-2">
                                {renderedList}
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    )
}