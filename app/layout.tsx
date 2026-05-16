import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Clapperboard, Play, Search } from "lucide-react";
import { GenreType } from "@/types/global";
import { redirect } from "next/navigation";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "CosmoFlix",
    description: "Plex Inspired Movie App",
};

async function fetchGenres(): Promise<GenreType[]> {
    const res = await fetch("https://api.themoviedb.org/3/genre/movie/list", {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`
        }
    });

    const data = await res.json();
    return data.genres;
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const genres = await fetchGenres();

    async function search(formData: FormData) {
        "use server"
        const q = formData.get("q")
        redirect(`/search?q=${q}`)
    }

    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen text-white bg-gradient-to-br from-[#2a1130] via-[#111324] to-[#0a0b14] bg-fixed`}>
                <div className="bg-transparent min-h-screen flex flex-col">
                    <header className="p-4 bg-black/10 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 flex justify-between items-center px-6 md:px-10">
                        <Link href="/" className="hover:opacity-80 transition-opacity">
                            <h1 className="text-2xl font-black tracking-wider inline-flex items-center gap-2.5 leading-none">
                                <Clapperboard size={28} className="text-amber-500 flex-shrink-0" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-amber-400 leading-none pb-0.5">
                                    CosmoFlix
                                </span>
                            </h1>
                        </Link>
                        
                        <form action={search} className="flex items-center relative max-w-md w-full sm:w-72 lg:w-96">
                            <Input 
                                name="q" 
                                placeholder="Search movies, TV shows..." 
                                className="w-full pl-4 pr-12 py-2 bg-white/5 hover:bg-white/10 focus:bg-white/10 border-white/10 rounded-full text-sm text-white placeholder-white/40 transition-all outline-none"
                            />
                            <button type="submit" className="absolute right-2 p-1.5 bg-amber-500 text-slate-950 rounded-full hover:bg-amber-400 transition-colors">
                                <Search size={16} />
                            </button>
                        </form>
                    </header>

                    <section className="flex flex-1">
                        <aside className="w-[240px] hidden md:flex p-4 border-r border-white/5 flex-col gap-1 max-h-[calc(100vh-73px)] overflow-y-auto sticky top-[73px] bg-transparent">
                            <p className="text-[11px] font-bold text-white/30 tracking-widest uppercase px-4 mb-2 mt-2">Discover</p>
                            
                            <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-semibold text-white/70 hover:text-white hover:bg-white/[0.06] hover:backdrop-blur-md border border-transparent hover:border-white/10 transition-all duration-200 group">
                                <Play size={15} className="fill-current text-amber-500 transition-transform group-hover:scale-110" />
                                All Movies
                            </Link>

                            <hr className="border-white/5 my-3 mx-2" />
                            <p className="text-[11px] font-bold text-white/30 tracking-widest uppercase px-4 mb-2">Genres</p>
                            
                            <div className="flex flex-col gap-1">
                                {genres.map(genre => (
                                    <Link
                                        key={genre.id}
                                        href={`/gener/${genre.name.toLowerCase()}/${genre.id}`}
                                        className="flex items-center px-4 py-2 rounded-full text-sm font-medium text-white/50 hover:text-white bg-transparent hover:bg-gradient-to-r hover:from-white/[0.05] hover:to-amber-500/[0.02] hover:backdrop-blur-md border border-transparent hover:border-white/10 transition-all duration-200"
                                    >
                                        <span className="truncate">
                                            {genre.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </aside>

                        <main className="flex-1 p-6 md:p-10 bg-transparent overflow-x-hidden">
                            {children}
                        </main>
                    </section>
                </div>
            </body>
        </html>
    );
}