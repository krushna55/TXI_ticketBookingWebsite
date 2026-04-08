
// 'use client'
// import { fetchBrands, fetchBrandScreens } from '@/utils/getScreen'
// import { useQuery } from '@tanstack/react-query'
// import React, { useRef, useEffect, useState } from 'react'
// import { ChevronUp, ChevronDown } from 'lucide-react'
// import Image from 'next/image'
// import { FaCaretDown, FaCaretUp } from 'react-icons/fa6'
// import { IoCheckmark } from 'react-icons/io5'

// export default function BrandSelector({ setBrand ,brand}: { setBrand: React.Dispatch<React.SetStateAction<string>> ,brand:String}) {
//     const [open, setOpen] = useState(false)
//     const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
//     const dropdownRef = useRef<HTMLDivElement>(null)

//     const { data, isLoading, isError, error } = useQuery({
//         queryKey: ['brand'],
//         queryFn: fetchBrands,
//     })

//     useEffect(() => {
//         const handler = (e: MouseEvent) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//                 setOpen(false)
//             }
//         }
//         document.addEventListener('mousedown', handler)
//         return () => document.removeEventListener('mousedown', handler)
//     }, [])

//     const handleSelect = (brandType: string) => {
//         if (selectedBrand === brandType) {
//             setSelectedBrand('')
//             setBrand('')
//         }else{
//             setSelectedBrand(brandType)
//             setBrand(brandType)
            
//         }
//         setOpen(false)
//     }

//     return (
//         <div ref={dropdownRef} className="relative w-28 font-sans select-none">
//             {/* Trigger */}
//             <button
//                 onClick={() => setOpen((prev) => !prev)}
//                 className="w-full flex items-center justify-between px-3 py-2 bg-white  text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//                 <span className="truncate">{selectedBrand ?? 'Brand'}</span>
//                 {open ? (
//                     <FaCaretUp className="w-4 h-4 text-gray-500 shrink-0 ml-2" />
//                 ) : (
//                     <FaCaretDown className="w-4 h-4 text-gray-500 shrink-0 ml-2" />
//                 )}
//             </button>

//             {/* Dropdown */}
//             {open && (
//                 <div className="absolute left-0 top-0 w-44 bg-white border border-gray-200 rounded shadow-lg z-50 max-h-72 overflow-y-auto scrollbar-hide">
//                     <div className="px-3 py-2 flex justify-start items-center" onClick={() => setOpen((prev) => !prev)}>Brands <FaCaretUp className="w-4 h-4 text-gray-500 shrink-0 ml-2" /></div>
//                     {isLoading && (
//                         <div className="px-4 py-3 text-sm text-gray-400">Loading...</div>
//                     )}
//                     {isError && (
//                         <div className="px-4 py-3 text-sm text-red-400">{error?.message}</div>
//                     )}
//                     {data && Object.entries(data).length === 0 && (
//                         <div className="px-4 py-3 text-sm text-gray-400">No Brand found</div>
//                     )}
//                     {data &&
//                         data.map(({ name }) => (
//                             <div key={name}>


//                                 <button
//                                     key={name}
//                                     onClick={() => {
//                                         handleSelect(name)
//                                     }
//                                     }
//                                     className={`w-full flex justify-between text-left px-4 py-2 text-sm transition-colors
//                                             ${selectedBrand === name
//                                             ? 'bg-gray-100 font-semibold text-gray-900'
//                                             : 'text-gray-700 hover:bg-gray-50'
//                                         }`}
//                                 >
//                                     {name} {selectedBrand === name ? <IoCheckmark /> : ''}
//                                 </button>

//                             </div>
//                         ))}
//                 </div>
//             )}
//         </div>
//     )
// }



'use client'
import { fetchBrands } from '@/utils/getScreen'
import { useQuery } from '@tanstack/react-query'
import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa6'
import { IoCheckmark } from 'react-icons/io5'

export default function BrandSelector({ 
    setBrand,
    brand                           // ✅ accept brand prop to sync with parent reset
}: { 
    setBrand: (brand: string) => void   // ✅ simpler type, matches what Movie.tsx passes
    brand: string
}) {
    const [open, setOpen] = useState(false)
    const [selectedBrand, setSelectedBrand] = useState<string>('')
    const dropdownRef = useRef<HTMLDivElement>(null)

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['brand'],
        queryFn: fetchBrands,
            refetchOnMount: false,
            refetchOnWindowFocus:false
    })

    // ✅ Sync local state when parent resets brand filter
    useEffect(() => {
        setSelectedBrand(brand)
    }, [brand])

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    function handleSelect(brandName: string) {
        if (selectedBrand === brandName) {
            // ✅ Toggle off — deselect
            setSelectedBrand('')
            setBrand('')
        } else {
            // ✅ Select new brand
            setSelectedBrand(brandName)
            setBrand(brandName)
        }
        setOpen(false)
    }

    return (
        <div ref={dropdownRef} className="relative min-w-20 font-sans select-none">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="w-full flex items-center justify-between px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
                <span className="truncate">{selectedBrand || 'Brand'}</span>
                {open ? (
                    <FaCaretUp className="w-4 h-4 text-gray-500 shrink-0 ml-2" />
                ) : (
                    <FaCaretDown className="w-4 h-4 text-gray-500 shrink-0 ml-2" />
                )}
            </button>

            {open && (
                <div className="absolute left-0 top-0 w-40 bg-white border border-gray-200 rounded shadow-lg z-50 max-h-72 overflow-y-auto scrollbar-hide">
                    <div
                        className="px-3 py-2 flex justify-start items-center cursor-pointer"
                        onClick={() => setOpen(false)}
                    >
                        Brands <FaCaretUp className="w-4 h-4 text-gray-500 shrink-0 ml-2" />
                    </div>

                    {isLoading && (
                        <div className="px-4 py-3 text-sm text-gray-400">Loading...</div>
                    )}
                    {isError && (
                        <div className="px-4 py-3 text-sm text-red-400">{error?.message}</div>
                    )}
                    {data && data.length === 0 && (
                        <div className="px-4 py-3 text-sm text-gray-400">No Brand found</div>
                    )}

                    {data && data.map(({ name }) => (
                        <button
                            key={name}
                            onClick={() => handleSelect(name)}   // ✅ single clean call
                            className={`w-full flex justify-between text-left px-4 py-2 text-sm transition-colors
                                ${selectedBrand === name
                                    ? 'bg-gray-100 font-semibold text-gray-900'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {name}
                            {selectedBrand === name && <IoCheckmark />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}