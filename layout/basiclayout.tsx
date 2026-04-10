'use client'
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BasicLayout({ children }: { children: React.ReactNode }) {

    // const pathName = usePathname();

    // const authPages = ['/register', '/login', '/forgetpassword', '/updatepassword'];
    // const isAuth = authPages.includes(pathName);

    return (
        <div className="min-h-screen max-w-[1400px]  flex flex-col">

            <div className="sticky top-0 z-50">
                <Navbar/>
            </div>
            <div className={'flex-1 '}>
                {children}
            </div>
            <div className="bottom-0">
                <hr className='border border-gray-400 mt-10  bg-white text-black  ' />
                 <Footer />
            </div>

        </div>
    );
}
