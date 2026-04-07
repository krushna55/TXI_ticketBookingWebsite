// app/payment/success/page.tsx
'use client'
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { resetSelection } from "@/lib/slice/movieSlice"
import Link from "next/link"

export default function SuccessPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetSelection())
    }, [])

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
            <p className="text-gray-500">Your seats have been confirmed.</p>
            <Link href="/" className="bg-royal text-white px-6 py-2 rounded-md">
                Back to Home
            </Link>
        </div>
    )
}