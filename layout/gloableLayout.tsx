'use client'
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchUser } from "@/api/user/authemtication";
import { User } from "@supabase/supabase-js";

export default function GlobalLayout({ children }: { children: React.ReactNode }) {

    const pathName = usePathname();

    const authPages = ['/register', '/login', '/forgetpassword', '/updatepassword'];
    const isAuth = authPages.includes(pathName);

    return (
        <div className="min-h-screen  flex flex-col">

            <div className="sticky top-0 z-50">
                {!isAuth && <Navbar/>}
            </div>

            <div className={'flex-1'}>
                {children}
            </div>
            <div className="bottom-0">
                <hr className='border border-gray-400 mt-10  bg-white text-black  ' />
                {!isAuth && <Footer />}
            </div>

        </div>
    );
}
