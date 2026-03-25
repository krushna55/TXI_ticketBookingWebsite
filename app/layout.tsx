import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import GloableLayout from "@/layout/gloableLayout";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import MovieDetailsProvider from "./movieDetailsProvider";
import QueryProvider from "./QueryProvider";

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
          <MovieDetailsProvider>
            <GloableLayout>
              <QueryProvider>
                {children}
              </QueryProvider>
            </GloableLayout>
          </MovieDetailsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
