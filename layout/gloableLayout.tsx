'use client'
import Footer from "@/components/Footer";
import MobileNavbar from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import {  usePathname } from "next/navigation";
import React from "react";

export default function GloableLayout({ children }: { children: React.ReactNode }) {
    const pathName = usePathname()
    const auth = pathName === '/register' || pathName === '/login' || pathName === '/forgetpassword'
    return (
        <>
            {!auth && <Navbar />}
            {!auth && <MobileNavbar />}
            {
                children
            }
            {!auth && <Footer />}
        </>
    )
}