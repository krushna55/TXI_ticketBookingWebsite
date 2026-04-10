'use client'

import Link from "next/link"
import Image from "next/image"
import logo from '../public/adminlogo.png'
import { useEffect, useRef, useState } from "react"
import { IoIosHome } from "react-icons/io"
import { GiTheater } from "react-icons/gi";
import { MdLocalMovies, MdMovie } from "react-icons/md"
import { LuLogOut } from "react-icons/lu"
import { useRouter, usePathname } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"
import toast from "react-hot-toast"
import { ConfirmationModel } from "./ConfirmationModel"

export const AdminNavbar = () => {
    const [selectedMenu, setSelectedMenu] = useState('dashboard')
    const [isMenuOpen, setMenuOpen] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [isOpenModel, setIsOpenModel] = useState(false)
    const navref = useRef<HTMLDivElement>(null)
    const supabase = createClient()
    const router = useRouter()
    const pathName = usePathname()

    // ✅ Get user + listen to auth changes
    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user ?? null);
        });

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (
                navref.current &&
                navref.current.contains(target)
            ) return;

            if (
                navref.current &&
                navref.current.contains(target)
            ) return;

            setMenuOpen(false);
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // ✅ Logout
    const handleLogout = async () => {
        await supabase.auth.signOut();
        setMenuOpen(false);
        router.refresh();
        router.push("/");
        console.log("Logout successful");
        toast.success("Logout successful");
    };

    const userName =
        user?.user_metadata?.full_name?.charAt(0).toUpperCase() ||
        user?.email?.charAt(0).toUpperCase() ||
        "U";
    return (
        <div className="text-white sticky top-0 z-50" ref={navref}>
            {/* // desktop navbar */}
            <div className="px-2 flex h-screen bg-royal right-56 top-0 bottom-0 left-0  flex-col w-12">
                <div className="flex justify-between h-24 items-center">
                    <Link href={'/'}><Image src={logo} alt="logo" width={100} height={100} className=" h-8 w-10" /></Link>
                    {/* <button className="md:hidden border border-black h-fit px-3 py-1 rounded-md bg-royal text-gradientXXI1 hover:bg-royal hover:opacity-90 active:scale-95">close</button> */}
                </div>
                <div className="flex flex-col space-y-4 text-xl">
                    <Link onClick={() => {
                        setMenuOpen(prev => !prev)
                        setSelectedMenu('dashboard')
                    }} href={'/admin'} 
                    className={`px-2 py-1 rounded-md transition-all duration-300 ${selectedMenu === 'dashboard' ? 'bg-white text-black opacity-35' : ''} mx-auto w-fit hover:scale-110`}><IoIosHome /></Link>
                    <Link onClick={() => {
                        setMenuOpen(prev => !prev)
                        setSelectedMenu('theaters')
                    }} href={'/admin/theater'} 
                    className={`px-2 py-1 rounded-md transition-all duration-300 ${selectedMenu === 'theaters' ? 'bg-white text-black opacity-35' : ''} mx-auto w-fit hover:scale-110`}><GiTheater /></Link>
                    <Link onClick={() => {
                        setMenuOpen(prev => !prev)
                        setSelectedMenu('movies')
                    }} href={'/admin/movie'}
                     className={`px-2 py-1 rounded-md transition-all duration-300 ${selectedMenu === 'movies' ? 'bg-white text-black opacity-35' : ''}  mx-auto w-fit hover:scale-110`}><MdMovie /></Link>
                    <Link onClick={() => {
                        setMenuOpen(prev => !prev)
                        setSelectedMenu('showtimes')
                    }} href={'/admin/showtimes'} 
                    className={`px-2 py-1 rounded-md transition-all duration-300 ${selectedMenu === 'showtimes' ? 'bg-white text-black opacity-35' : ''}  mx-auto w-fit hover:scale-110`}><MdLocalMovies /></Link>
                </div>
            </div>

            {isMenuOpen &&
                <>
                    <div className="px-2  absolute bg-royal right-56 top-0 bottom-0 left-0 flex flex-col w-56 animate-in slide-in-from-left duration-300">
                        <div className="flex justify-between h-24 items-center">
                            <Link href={'/'}><Image src={logo} alt="logo" width={100} height={100} className=" h-15 w-20" /></Link>
                            <button onClick={() => setMenuOpen(false)} className="border border-black h-fit px-3 py-1 rounded-md bg-royal text-gradientXXI1 hover:bg-royal hover:opacity-90 active:scale-95">close</button>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Link onClick={() => setSelectedMenu('dashboard')} href={'/admin'} className={`px-2 py-1 rounded-md transition-all duration-300 ${selectedMenu === 'dashboard' ? 'bg-white text-black opacity-35' : ''} flex items-center hover:bg-white/10`}><IoIosHome className="mr-2" /> Home</Link>
                            <Link onClick={() => setSelectedMenu('theaters')} href={'/admin/theater'} className={`px-2 py-1 rounded-md transition-all duration-300 ${selectedMenu === 'theaters' ? 'bg-white text-black opacity-35' : ''} flex item-centerss hover:bg-white/10`}><GiTheater className="mr-2" /> Theaters</Link>
                            <Link onClick={() => setSelectedMenu('movies')} href={'/admin/movie'} className={`px-2 py-1 rounded-md transition-all duration-300 ${selectedMenu === 'movies' ? 'bg-white text-black opacity-35' : ''} flex  items-center hover:bg-white/10`}><MdMovie className="mr-2" /> Movies</Link>
                            <Link onClick={() => setSelectedMenu('showtimes')} href={'/admin/showtimes'} className={`px-2 py-1 rounded-md transition-all duration-300 ${selectedMenu === 'showtimes' ? 'bg-white text-black opacity-35' : ''}  flex items-center hover:bg-white/10`}><MdLocalMovies className="mr-2" /> Showtimes</Link>
                        </div>

                        {/* Auth Buttons - Mobile */}
                        <div className="mt-auto py-4 border-t border-white/20 flex flex-col gap-3">
                            {user ? (
                                <>
                                    <button
                                        onClick={() => setIsOpenModel(!isOpenModel)}
                                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 transition-all duration-200 text-sm font-semibold"
                                    >
                                        <LuLogOut /> Logout
                                    </button>
                                    <ConfirmationModel
                                        isOpen={isOpenModel}
                                        title="Logout"
                                        message="Are you sure you want to logout?"
                                        onConfirmation={handleLogout}
                                        onCancle={() => setIsOpenModel(false)}
                                    />
                                </>
                            ) : (
                                <>
                                    <Link href="/register" onClick={() => setMenuOpen(false)} className="text-center px-3 py-2 rounded-md border border-white hover:bg-white/10 transition-all duration-200 text-sm font-semibold">
                                        Sign Up
                                    </Link>
                                    <Link href={`/login?redirect=${pathName}`} onClick={() => setMenuOpen(false)} className="text-center px-3 py-2 rounded-md bg-yellow-400 text-royal hover:bg-yellow-500 transition-all duration-200 text-sm font-semibold">
                                        Login
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </>}
        </div>
    )
}


