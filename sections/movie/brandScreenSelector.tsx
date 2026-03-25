'use client'
import { fetchBrandScreens } from '@/utils/getScreen'
import { useQuery } from '@tanstack/react-query'
import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa6'
import { IoCheckmark } from 'react-icons/io5'

export default function BrandScreenSelector({
    setScreen,
    screen
}: {
    setScreen: (screen: string) => void 
    screen: string
}) {
    const [open, setOpen] = useState(false)
    const [selectedScreen, setSelectedScreen] = useState<string>('')   // ✅ '' not null
    const dropdownRef = useRef<HTMLDivElement>(null)

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['brand-screens'],
        queryFn: fetchBrandScreens,
        refetchOnWindowFocus:false, // alt + tab ----
        refetchOnMount:false  //not usefull - stale data ---         
    })

    // ✅ Sync local selectedScreen with parent filter
    // So when parent resets filters, UI also resets
    useEffect(() => {
        setSelectedScreen(screen)
    }, [screen])

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    function handleSelect(screenType: string) {
        // ✅ Toggle — if same screen clicked again, deselect
        if (selectedScreen === screenType) {
            setSelectedScreen('')   // clear local UI
            setScreen('')           // clear parent filter — this makes filters.screen = ''
        } else {
            setSelectedScreen(screenType)
            setScreen(screenType)   // set parent filter
        }
        setOpen(false)
    }

    return (
        <div ref={dropdownRef} className="relative w-24 font-sans select-none">
            {/* Trigger */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="w-full flex items-center justify-between px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
                <span className="truncate">{selectedScreen || 'Studio'}</span>
                {open ? (
                    <FaCaretUp className="w-4 h-4 text-gray-500 shrink-0 ml-2" />
                ) : (
                    <FaCaretDown className="w-4 h-4 text-gray-500 shrink-0 ml-2" />
                )}
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute left-0 top-0 w-44 bg-white border border-gray-200 rounded shadow-lg z-50 max-h-72 overflow-y-auto scrollbar-hide">
                    <div
                        className="px-3 py-2 flex justify-start items-center cursor-pointer"
                        onClick={() => setOpen(false)}
                    >
                        Studio <FaCaretUp className="w-4 h-4 text-gray-500 shrink-0 ml-2" />
                    </div>

                    {isLoading && (
                        <div className="px-4 py-3 text-sm text-gray-400">Loading...</div>
                    )}
                    {isError && (
                        <div className="px-4 py-3 text-sm text-red-400">{error?.message}</div>
                    )}
                    {data && Object.entries(data).length === 0 && (
                        <div className="px-4 py-3 text-sm text-gray-400">No screens found</div>
                    )}

                    {data && Object.entries(data).map(([brand_name, screens]) => (
                        <div key={brand_name}>
                            <div className="px-4 pt-3 pb-1">
                                <Image
                                    src={screens[0].brand_logo}
                                    alt="brand Logo"
                                    height={10}
                                    width={50}
                                    className="h-8 w-auto"
                                />
                            </div>

                            {(screens as { screen_id: number; screen_type: string }[]).map((s) => (
                                <button
                                    key={s.screen_id}
                                    onClick={() => handleSelect(s.screen_type)}  // ✅ clean single call
                                    className={`w-full flex justify-between text-left px-4 py-2 text-sm transition-colors
                                        ${selectedScreen === s.screen_type
                                            ? 'bg-gray-100 font-semibold text-gray-900'
                                            : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    {s.screen_type}
                                    {selectedScreen === s.screen_type && <IoCheckmark />}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}