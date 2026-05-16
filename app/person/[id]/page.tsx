import { PersonDetailType, CastMovieType } from "@/types/global";
import Link from "next/link";
import { ChevronLeft, Star, Film } from "lucide-react";

async function fetchPersonDetail(id: string): Promise<PersonDetailType> {
    const res = await fetch(`https://api.themoviedb.org/3/person/${id}`, {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        }
    });
    return await res.json();
}

async function fetchPersonMovies(id: string): Promise<CastMovieType[]> {
    const res = await fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits`, {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        }
    });
    const data = await res.json();
    return data.cast || [];
}

const profileBaseUrl = "https://image.tmdb.org/t/p/w300";
const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

export default async function PersonPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const person = await fetchPersonDetail(id);
    const movies = await fetchPersonMovies(id);

    const profileImg = person.profile_path
        ? profileBaseUrl + person.profile_path
        : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=60";

    return (
        <div className="space-y-10 pb-12">
            
            <button className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group">
                <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                <span>Back</span>
            </button>

            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-2xl backdrop-blur-md">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-amber-500/30 flex-shrink-0 shadow-xl shadow-black/40">
                    <img src={profileImg} alt={person.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 text-center md:text-left space-y-4">
                    <div className="space-y-1">
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                            {person.name}
                        </h1>
                        <p className="text-xs font-semibold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-full inline-block">
                            {person.known_for_department || "Actor"}
                        </p>
                    </div>
                    
                    <div className="space-y-2">
                        <h2 className="text-xs font-bold tracking-wider text-white/30 uppercase">
                            Biography
                        </h2>
                        <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-3xl text-justify tracking-wide whitespace-pre-line">
                            {person.biography || `${person.name} is a professional in the entertainment industry. Biography details will be updated soon.`}
                        </p>
                    </div>
                </div>
            </div>

            <hr className="border-white/5" />

            <div className="space-y-6">
                <h2 className="text-xl font-bold tracking-tight text-white/90 flex items-center gap-2">
                    <Film size={20} className="text-amber-500" />
                    Filmography
                </h2> 

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {movies.map((movie) => {
                        const moviePoster = movie.poster_path
                            ? posterBaseUrl + movie.poster_path
                            : "/placeholder-poster.jpg"; 

                        const releaseYear = movie.release_date ? movie.release_date.split("-")[0] : "N/A";
                        const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "0.0";

                        return (
                            <Link 
                                href={`/movie/${movie.id}`}
                                key={movie.id}
                                className="group relative flex flex-col rounded-xl overflow-hidden bg-white/[0.02] border border-white/5 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.06] hover:border-white/10 hover:shadow-xl hover:shadow-black/50"
                            >
                                <div className="aspect-[2/3] w-full overflow-hidden relative bg-slate-900/50">
                                    <img 
                                        src={moviePoster} 
                                        alt={movie.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-bold text-amber-500 flex items-center gap-1">
                                        ⭐ {rating}
                                    </div>
                                </div>

                                <div className="p-3 flex flex-col justify-between flex-1 gap-1">
                                    <h3 className="text-sm font-semibold tracking-wide text-white/90 group-hover:text-amber-400 transition-colors line-clamp-1" title={movie.title}>
                                        {movie.title}
                                    </h3>
                                    
                                    <div className="flex flex-col gap-0.5 text-xs">
                                        <p className="text-amber-500/80 truncate text-[11px] italic" title={movie.character}>
                                            as {movie.character || "Self"}
                                        </p>
                                        <p className="text-white/40 text-[11px]">
                                            {releaseYear}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}