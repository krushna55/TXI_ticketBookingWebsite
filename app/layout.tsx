import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileNavbar from "@/components/MobileNav";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const robotosans = Roboto({
  variable: "--font-Roboto-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${robotosans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar/>
          <MobileNavbar />
          {children}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
