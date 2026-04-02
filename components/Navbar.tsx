'use client';

import Image from "next/image";
import Link from "next/link";
import { MenuIcon, X } from "lucide-react";
import { LuLogOut } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import logo from "../public/logo.png";
import toast from "react-hot-toast";

export default function Navbar() {
  const supabase = createClient();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

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

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        desktopRef.current &&
        desktopRef.current.contains(target)
      ) return;

      if (
        mobileRef.current &&
        mobileRef.current.contains(target)
      ) return;

      setIsDropdownOpen(false);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // ✅ Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsDropdownOpen(false);
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
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <div className="sticky top-0 bg-white hidden md:flex max-w-[1400px] mx-auto items-center justify-between px-4 py-3">
        <Link href="/">
          <Image src={logo} alt="logo" className="h-16 w-auto" />
        </Link>

        <div className="flex items-center gap-10">
          <div className="flex gap-8">
            <Link href="/">Home</Link>
            <Link href="/movie">Movies</Link>
            <Link href="/tickets">My Tickets</Link>
            <Link href="/blog">Blog</Link>
          </div>


          {user ? (
            <div ref={desktopRef}
              className="relative">
              <div
                onClick={(e) => {
                  setIsDropdownOpen(!isDropdownOpen)
                }}
                className="bg-gradient-to-r from-[#F2C46F] to-[#C6943F] text-white px-3 py-1 rounded-full cursor-pointer"
              >
                {userName}
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-40 bg-white rounded shadow-md z-50">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 w-full"
                  >
                    <LuLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-5 items-center">
              <Link href="/register">Register</Link>
              <Link href="/login" className="bg-royal px-3 py-1 rounded-md">
                <span className="bg-gradient-to-r from-[#F2C46F] to-[#e3bb76] bg-clip-text text-transparent">
                  Login
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ================= MOBILE NAVBAR ================= */}
      <div className="sticky top-0 bg-white md:hidden flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <MenuIcon
            className="cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          />
          <Link href="/">
            <Image src={logo} alt="logo" className="h-10 w-auto" />
          </Link>
        </div>

        <div className="flex items-center gap-5">


          {user ? (
            <div ref={mobileRef} className="relative">
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-gradient-to-r from-[#F2C46F] to-[#C6943F] text-white px-3 py-1 rounded-full cursor-pointer"
              >
                {userName}
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-40 bg-white rounded shadow-md z-50">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 w-full"
                  >
                    <LuLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="text-sm">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300">
            <div className="flex justify-end p-4">
              <X
                size={28}
                className="cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              />
            </div>

            <div className="flex flex-col justify-between h-[85vh] px-6">
              <div className="flex flex-col gap-4">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link href="/movie" onClick={() => setIsMenuOpen(false)}>Movies</Link>
                <Link href="/tickets" onClick={() => setIsMenuOpen(false)}>My Tickets</Link>
                <Link href="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link>
              </div>

              <div className="border-t pt-4">
                {!user ? (
                  <div className="flex flex-col gap-4">
                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                      Register
                    </Link>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      Login
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600"
                  >
                    <LuLogOut /> Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}