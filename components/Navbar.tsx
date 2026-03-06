import Image from "next/image";
import logo from '../public/logo.png'
import Link from "next/link";
import { Bell } from "lucide-react";

export default function Navbar() {
    return (
        <div className="max-w-[1400px] mx-auto hidden md:flex items-center justify-between sm:px-5">
            <div>
                <Image src={logo} alt="logo" className="h-20 w-full" />
            </div>
            <div className="flex items-center justify-between space-x-10">
                <div className="flex space-x-10 text-base">
                    <Link href={'/'}>Home</Link>
                    <Link href={'/'}>My Tickets</Link>
                    <Link href={'/'}>TXI News</Link>
                </div>
                <div>
                    <Bell/>
                </div>
                <div className="bg-slate-300 rounded-full py-1 px-3">
                    <p>A</p>
                </div>
            </div>
        </div>
    )
}