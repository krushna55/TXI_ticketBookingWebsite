'use client'
import Footer from "@/components/Footer";
import MobileNavbar from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function GloableLayout({ children }: { children: React.ReactNode }) {
    const pathName = usePathname()
    const auth = pathName === '/register' || pathName === '/login' || pathName === '/forgetpassword' || pathName === '/updatepassword'

    const [scroll, setScroll] = useState(false)
    console.log(scroll)
    return (
        <>
            {!auth && <Navbar />}
            {!auth && <MobileNavbar upadteScroll={setScroll} />}
            <div className={`${scroll? "overflow-hidden h-screen":'' }`}>

                {
                    children
                }
            </div>
            {!auth && <Footer />}
        </>
    )
}