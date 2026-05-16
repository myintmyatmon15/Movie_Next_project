import { MovieType, PersonType } from "@/types/global";
import Link from "next/link";
import { ChevronLeft, Star, Calendar, Film } from "lucide-react";

async function fetchCast(id: string): Promise<PersonType[]> {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        }
    });
    const data = await res.json();
    return data.cast || [];
}

async function fetchMovie(id: string): Promise<MovieType> {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`
        }
    });
    return await res.json();
}

const base = "https://image.tmdb.org/t/p/w1280";
const profile = "https://image.tmdb.org/t/p/w185";

export default async function Movie({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const movie = await fetchMovie(id);
    const cast = await fetchCast(id);

    const releaseYear = movie.release_date ? movie.release_date.split("-")[0] : "N/A";
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

    return (
        <div className="space-y-10 pb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group">
                <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                Back to Dashboard
            </Link>

            <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-slate-950/40">
                <div className="absolute inset-0 bg-gradient-to-t from-[#111324] via-transparent to-black/20 z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#111324]/90 via-transparent to-transparent z-10" />
                
                {movie.backdrop_path ? (
                    <img 
                        src={base + movie.backdrop_path} 
                        alt={movie.title}
                        className="w-full h-[300px] md:h-[450px] object-cover opacity-60 filter blur-[1px] md:blur-0 transition-all"
                    />
                ) : (
                    <div className="w-full h-[300px] bg-slate-900" />
                )}

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-20 flex flex-col gap-3">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
                        {movie.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm font-medium text-white/80">
                        <span className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10">
                            <Calendar size={14} className="text-amber-500" /> {releaseYear}
                        </span>
                        <span className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10">
                            <Star size={14} className="fill-amber-500 text-amber-500" /> {rating}
                        </span>
                        <span className="bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px]">
                            Movie
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl space-y-3">
                <h2 className="text-xs font-bold tracking-wider text-amber-500 uppercase">Storyline</h2>
                <p className="text-xl md:text-base text-white/80 leading-relaxed text-justify tracking-wide whitespace-pre-line">
                    {movie.overview || "No storyline available for this movie."}
                </p>
            </div>

            <hr className="border-white/5" />
            <div className="space-y-6">
                <h2 className="text-xl font-bold tracking-tight text-white/90 flex items-center gap-2">
                    <Film size={20} className="text-amber-500" />
                    Top Billed Cast
                </h2>
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {cast.map(person => {
                        const castImageUrl = person.profile_path
                            ? profile + person.profile_path
                            : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60"; 
                        return (
                            <Link 
                                key={person.id} 
                                href={`/person/${person.id}`}
                                className="w-[130px] md:w-[150px] flex-shrink-0 text-center flex flex-col items-center gap-3 group cursor-pointer"
                            >
                                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border border-white/10 bg-slate-900 shadow-lg group-hover:border-amber-500/60 group-hover:shadow-amber-500/20 transition-all duration-300">
                                    <img 
                                        src={castImageUrl} 
                                        alt={person.name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="w-full flex flex-col gap-0.5">
                                    <p className="text-sm font-semibold text-white/90 group-hover:text-amber-400 transition-colors block truncate" title={person.name}>
                                        {person.name}
                                    </p>
                                    <p className="text-xs text-white/40 truncate italic" title={person.character}>
                                        {person.character}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}