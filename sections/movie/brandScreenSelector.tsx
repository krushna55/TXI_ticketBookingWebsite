'use client'
import { fetchBrandScreens } from '@/utils/getScreen'
import { useQuery } from '@tanstack/react-query'
import React, { useRef, useEffect, useState, useMemo } from 'react'
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
    const [selectedScreen, setSelectedScreen] = useState<string>('')
    const dropdownRef = useRef<HTMLDivElement>(null)

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['brand-screens'],
        queryFn: fetchBrandScreens,
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })


    const uniqueScreens = useMemo(() => {
        if (!data) return []
        
        // Flatten all screen arrays from all brands into one list of screen_types
        const allTypes = Object.values(data).flatMap((screens: any) => 
            screens.map((s: any) => s.screen_type)
        )
        
        // Use Set to remove duplicates and sort alphabetically
        return Array.from(new Set(allTypes)).sort() as string[]
    }, [data])

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
        if (selectedScreen === screenType) {
            setSelectedScreen('')
            setScreen('')
        } else {
            setSelectedScreen(screenType)
            setScreen(screenType)
        }
        setOpen(false)
    }

    return (
        <div ref={dropdownRef} className="relative min-w-24 font-sans select-none">
            {/* Trigger */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="w-full flex items-center justify-between px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
                <span className="truncate">{selectedScreen && selectedScreen?.length > 0 ? selectedScreen : ' Screens'}</span>
                {open ? (
                    <FaCaretUp className="w-4 h-4 text-gray-500 shrink-0 ml-2" />
                ) : (
                    <FaCaretDown className="w-4 h-4 text-gray-500 shrink-0 ml-2" />
                )}
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute left-0 top-0 w-40 sm:w-44 bg-white border border-gray-200 rounded shadow-lg z-40 max-h-72 overflow-y-auto scrollbar-hide">
                    <div>
                        <div
                            className="px-3 py-2 flex justify-start items-center cursor-pointer"
                            onClick={() => setOpen(false)}
                        >
                            Screen  <FaCaretUp className="w-4 h-4 text-gray-500 shrink-0 ml-2" />
                        </div>

                        {isLoading && <div className="px-4 py-3 text-sm text-gray-400">Loading...</div>}
                        
                        {isError && <div className="px-4 py-3 text-sm text-red-400">{error?.message}</div>}

                        {uniqueScreens.length === 0 && !isLoading && (
                            <div className="px-4 py-3 text-sm text-gray-400">No screens found</div>
                        )}

                        {uniqueScreens.map((screenType) => (
                            <button
                                key={screenType}
                                onClick={() => handleSelect(screenType)}
                                className={`w-full flex justify-between text-left px-4 py-2 text-sm transition-colors
                                    ${selectedScreen === screenType
                                        ? 'bg-gray-100 font-semibold text-gray-900'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {screenType}
                                {selectedScreen === screenType && <IoCheckmark className="text-gray-900" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}