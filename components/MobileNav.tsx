'use client'
import Image from "next/image";
import logo from '../public/logo.png'
import Link from "next/link";
import { MenuIcon, Bell } from "lucide-react";
import { useState } from "react";


export default function MobileNavbar() {
    const [toggle, setToggle] = useState(false)
   
    function handleClick() {
        setToggle(toggle=>!toggle)
       
       console.log(toggle)
    }
    return (
        <div className="md:hidden z-10   flex items-center justify-between px-1">

            <div className="flex items-center space-x-5">
                <div onClick={handleClick} className="z-20">
                    <MenuIcon  />
                </div>
                <Link href={'/'}><Image src={logo} alt="logo" className="h-14 w-full" /></Link>
            </div>
            <div className="flex items-center justify-between space-x-10">
                <Bell />

                <div className="bg-slate-300 rounded-full py-1 px-3">
                    <p>A</p>
                </div>
            </div>
            <div className={`z-10  absolute  flex justify-center items-center inset-0 ${toggle ? '' : 'hidden'}  left-${toggle ? '[100vw]' : '[0px]'} transition-all duration-500 ease-in-out h-full bg-slate-50 bg-opacity-40`}>
                <div className="flex flex-col opacity-100">
                    <Link href={'/'}>Home</Link>
                    <Link href={'/'}>My Tickets</Link>
                    <Link href={'/'}>TXI News</Link>
                </div>
            </div>
        </div>
    )
}