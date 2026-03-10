'use client'

import Image from "next/image";
import logo from '../public/logo.png'
import Link from "next/link";
import { MenuIcon, Bell, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUser, LogoutUser } from "@/api/user/authemtication";
import { LuLogOut } from "react-icons/lu";

export default function MobileNavbar({ updateScroll }: { updateScroll: (value: boolean) => void }) {

    const [toggle, setToggle] = useState(false)
    const [user, setUser] = useState<any>(null);
    const [logout, setLogout] = useState(false);

    const router = useRouter();

    useEffect(() => {
        async function getUser() {
            const userData = await fetchUser();
            setUser(userData);
        }
        getUser();
    }, []);

    function handleLogouticon() {
        setLogout(!logout);
    }

    async function handleLogout() {
        await LogoutUser();
        setUser(null);
        router.push("/");
    }

    function openMenu() {
        setToggle(true)
        updateScroll(true)
    }

    function closeMenu() {
        setToggle(false)
        updateScroll(false)
    }

    return (
        <>
            {/* Navbar */}
            <div className="md:hidden z-40 flex items-center justify-between px-3 py-2">

                <div className="flex items-center space-x-5">
                    <div onClick={openMenu} className="cursor-pointer">
                        <MenuIcon />
                    </div>

                    <Link href={'/'}>
                        <Image src={logo} alt="logo" className="h-12 w-auto" />
                    </Link>
                </div>

                <div className="flex items-center space-x-6">

                    <Bell />

                    {user ? (
                        <div
                            onClick={handleLogouticon}
                            className="relative bg-[linear-gradient(to_right,#F2C46F,#C6943F)] rounded-full py-1 px-3 cursor-pointer"
                        >
                            <p className="text-white">
                                {user?.fullName?.charAt(0).toUpperCase() || "U"}
                            </p>

                            {(logout && user) && (
                                <div className="absolute right-0 top-10 bg-white rounded shadow-md">
                                    <span
                                        onClick={handleLogout}
                                        className="flex items-center gap-1 px-3 py-2 text-red-600"
                                    >
                                        <LuLogOut /> Logout
                                    </span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex gap-3 items-center">
                            <Link href="/register" className="text-sm">
                                Register
                            </Link>

                            <Link href="/login" className="bg-royal py-1 px-2 rounded-md">
                                <p className="bg-gradient-to-r from-[#F2C46F] to-[#e3bb76] bg-clip-text text-transparent text-sm">
                                    Login
                                </p>
                            </Link>
                        </div>
                    )}

                </div>
            </div>

            {/* Overlay */}
            {toggle && (
                <div
                    className="fixed inset-0 z-40 bg-black/40"
                    onClick={closeMenu}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-white z-50
                transform transition-transform duration-300
                ${toggle ? "translate-x-0" : "-translate-x-full"}
            `}>

                {/* Close Button */}
                <div className="flex justify-end p-4">
                    <button onClick={closeMenu}>
                        <X size={28} />
                    </button>
                </div>

                {/* Menu Links */}
                <div className="flex flex-col space-y-5 px-6">

                    <Link href="/" onClick={closeMenu}>Home</Link>
                    <Link href="/" onClick={closeMenu}>My Tickets</Link>
                    <Link href="/" onClick={closeMenu}>TXI News</Link>

                    {!user && (
                        <>
                            <div className="border-t pt-4"></div>

                            <Link href="/register" className="p-1" onClick={closeMenu}>
                                Register Account
                            </Link>

                            <Link href="/login" className="bg-royal p-2 rounded-lg" onClick={closeMenu}>
                                <p className="bg-gradient-to-r from-[#F2C46F] to-[#e3bb76] bg-clip-text text-transparent text-sm">
                                    Login
                                </p>
                            </Link>
                        </>
                    )}

                    {user && (
                        <>
                            <div className="border-t pt-4"></div>

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-red-600"
                            >
                                <LuLogOut /> Logout
                            </button>
                        </>
                    )}

                </div>

            </div>
        </>
    )
}