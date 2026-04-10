'use client'
import { AdminNavbar } from "@/components/adminNavbar";
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <div className=" bg-royal text-white fixed h-screen left-0 top-0 z-50">
                <AdminNavbar/>
            </div>
            <div className='flex-1 ml-64 overflow-y-auto'>
                {children}
            </div>
        </div>
    )
}