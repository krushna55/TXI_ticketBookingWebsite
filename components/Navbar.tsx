'use client'
import { LuLogOut } from "react-icons/lu";
import Image from "next/image";
import logo from "../public/logo.png";
import Link from "next/link";
import { Bell } from "lucide-react";
import { LogoutUser } from "@/api/user/authemtication";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar({ user, setUser }: { user: any, setUser: (v: any) => void }) {
    const [logout, setLogout] = useState(false);
    const router = useRouter();

    async function handleLogout() {
        await LogoutUser();
        setUser(null);
        router.push("/");
    }

    return (
        <div className="max-w-[1400px] mx-auto hidden md:flex items-center justify-between sm:px-2">
            <Image src={logo} alt="logo" className="h-20 w-auto" />
            <div className="flex items-center space-x-10">
                <div className="flex space-x-10 text-base">
                    <Link href="/">Home</Link>
                    <Link href="/tickets">My Tickets</Link>
                    <Link href="/blogs">TXI News</Link>
                </div>
                {!user && <div className="w-[1px] border border-gray-400 h-5"></div>}
                <Bell />
                {user ? (
                    <div onClick={() => setLogout(!logout)} className="relative bg-[linear-gradient(to_right,#F2C46F,#C6943F)] rounded-full py-1 px-3 cursor-pointer">
                        <p className="text-white">{user?.first_name?.charAt(0).toUpperCase() || 'U'}</p>
                        {logout && (
                            <div className="absolute right-0 top-10 bg-white rounded shadow-md z-50">
                                <span onClick={handleLogout} className="flex items-center gap-1 px-3 py-2 text-red-600">
                                    <LuLogOut /> Logout
                                </span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex gap-5 items-center">
                        <Link href='/register'>Register Account</Link>
                        <Link href='/login' className="bg-royal py-1 px-2 rounded-md">
                            <p className="bg-gradient-to-r from-[#F2C46F] to-[#e3bb76] bg-clip-text text-transparent">Login</p>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
