'use client'
import Image from "next/image";
import logo from '../public/logo.png'
import Link from "next/link";
import { MenuIcon, Bell, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogoutUser } from "@/api/user/authemtication";
import { LuLogOut } from "react-icons/lu";

export default function MobileNavbar({ user, setUser, updateScroll }: { user: any, setUser: (v: any) => void, updateScroll: (v: boolean) => void }) {
    const [toggle, setToggle] = useState(false);
    const [logout, setLogout] = useState(false);
    const router = useRouter();

    async function handleLogout() {
        await LogoutUser();
        setUser(null);
        setToggle(false);
        updateScroll(false);
        router.push("/");
    }

    return (
        <>
            <div className="md:hidden z-40 flex items-center justify-between px-3 py-2">
                <div className="flex items-center space-x-5">
                    <div onClick={() => { setToggle(true); updateScroll(true); }} className="cursor-pointer"><MenuIcon /></div>
                    <Link href='/'><Image src={logo} alt="logo" className="h-12 w-auto" /></Link>
                </div>
                <div className="flex items-center space-x-6">
                    <Bell />
                    {user ? (
                        <div onClick={() => setLogout(!logout)} className="relative bg-[linear-gradient(to_right,#F2C46F,#C6943F)] rounded-full py-1 px-3">
                            <p className="text-white">{user?.first_name?.charAt(0).toUpperCase() || "U"}</p>
                            {logout && (
                                <div className="absolute right-0 top-10 bg-white rounded shadow-md z-50">
                                    <span onClick={handleLogout} className="flex items-center gap-1 px-3 py-2 text-red-600"><LuLogOut /> Logout</span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex gap-3 items-center">
                            <Link href="/register" className="text-sm">Register</Link>
                            <Link href="/login" className="bg-royal py-1 px-2 rounded-md font-bold">Login</Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar logic remains same, just ensure it uses the user prop */}
            {toggle && <div className="fixed inset-0 z-40 bg-black/40" onClick={() => { setToggle(false); updateScroll(false); }} />}
            <div className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ${toggle ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex justify-end p-4"><button onClick={() => { setToggle(false); updateScroll(false); }}><X size={28} /></button></div>
                <div className="flex flex-col space-y-5 px-6">
                    <Link href="/" onClick={() => { setToggle(false); updateScroll(false); }}>Home</Link>
                    {user && <button onClick={handleLogout} className="flex items-center gap-2 text-red-600"><LuLogOut /> Logout</button>}
                </div>
            </div>
        </>
    );
}
