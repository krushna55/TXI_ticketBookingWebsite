'use client'
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import MobileNavbar from "@/components/MobileNav";
import Footer from "@/components/Footer";
import { fetchUser } from "@/api/user/authemtication";
import { User } from "@supabase/supabase-js";

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [scroll, setScroll] = useState(false);
    const pathName = usePathname();

    const isFetching = useRef(false);

    useEffect(() => {
        async function getUser() {
            if (isFetching.current) return; // Exit if a request is already out

            isFetching.current = true;
            try {
                const userData = await fetchUser();
                if (userData) setUser(userData as User);
            } finally {
                isFetching.current = false;
            }
        }

        if (!user) getUser();
    }, [user]);

    const authPages = ['/register', '/login', '/forgetpassword', '/updatepassword'];
    const isAuth = authPages.includes(pathName);

    return (
        <>
            {!isAuth && <Navbar user={user} setUser={setUser} />}
            {!isAuth && <MobileNavbar updateScroll={setScroll} />}

            <div className={scroll ? "overflow-hidden h-screen" : ""}>
                {children}
            </div>

            {!isAuth && <Footer />}
        </>
    );
}
