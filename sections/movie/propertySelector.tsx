
'use client'
import { fetchBrands, fetchBrandScreens } from '@/utils/getScreen'
import { useQuery } from '@tanstack/react-query'
import React, { useRef, useEffect, useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa6'
import { IoCheckmark } from 'react-icons/io5'

export default function PropertySelector({ handleCheapest, handleNearest, handleAlphabatic }: { handleCheapest: (bool: boolean) => void, handleNearest: (bool: boolean) => void, handleAlphabatic: (bool: boolean) => void }) {
    const [open, setOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<string>()
    const dropdownRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])



    return (
        <div ref={dropdownRef} className="relative w-40 font-sans select-none">
            {/* Trigger */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="w-full flex items-center justify-between px-3 py-2 bg-white  text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
                <span className="truncate">{selectedOption && selectedOption?.length > 0 ? selectedOption : 'Sort By'}</span>
                {open ? (
                    <FaCaretUp className="w-4 h-4 text-gray-500 shrink-0 ml-2" />
                ) : (
                    <FaCaretDown className="w-4 h-4 text-gray-500 shrink-0 ml-2" />
                )}
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute left-0 top-0 w-40 sm:w-44 bg-white border border-gray-200 rounded shadow-lg z-50 max-h-72 overflow-y-auto scrollbar-hide">
                    <div >
                        <div
                            className="px-3 py-2 flex justify-start items-center cursor-pointer"
                            onClick={() => setOpen(false)}
                        >
                            Sort By <FaCaretUp className="w-4 h-4 text-gray-500 shrink-0 ml-2" />
                        </div>
                        <button
                            onClick={() => {
                                if (selectedOption === 'Nearest') {
                                    handleNearest(false)
                                    setSelectedOption('')
                                    setOpen(false)
                                } else {
                                    handleNearest(true)
                                    setSelectedOption('Nearest')
                                    setOpen(false)
                                }
                            }
                            }
                            className={`w-full flex justify-between text-left px-4 py-2 text-sm transition-colors
                                            ${'Nearest' === selectedOption
                                    ? 'bg-gray-100 font-semibold text-gray-900'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            Nearest {'Nearest' === selectedOption}
                        </button>
                        <button
                            onClick={() => {
                                if (selectedOption === 'Cheapest') {
                                    handleCheapest(false)
                                    setSelectedOption('')
                                    setOpen(false)
                                } else {
                                    handleCheapest(true)
                                    setSelectedOption('Cheapest')
                                    setOpen(false)
                                }

                            }
                            }
                            className={`w-full flex justify-between text-left px-4 py-2 text-sm transition-colors
                                            ${'Cheapest' === selectedOption
                                    ? 'bg-gray-100 font-semibold text-gray-900'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            Cheapest {'Cheapest' === selectedOption ? <IoCheckmark /> : ''}
                        </button>
                        <button
                            onClick={() => {
                                if (selectedOption === 'Alphabatic') {
                                    handleAlphabatic(false)
                                    setSelectedOption('')
                                    setOpen(false)
                                } else {
                                    handleAlphabatic(true)
                                    setSelectedOption('Alphabatic')
                                    setOpen(false)
                                }
                            }
                            }
                            className={`w-full flex justify-between text-left px-4 py-2 text-sm transition-colors
                                            ${'Alphabatic' === selectedOption
                                    ? 'bg-gray-100 font-semibold text-gray-900'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            Alphabatic {'Alphabatic' === selectedOption ? <IoCheckmark /> : ''}
                        </button>

                    </div>

                </div>
            )}
        </div>
    )
}
