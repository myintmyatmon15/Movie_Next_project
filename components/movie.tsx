import { MovieType } from "@/types/global";
import Link from "next/link";

interface MovieProps {
    movie: MovieType;
}

export default function Movie({ movie }: MovieProps) {
    const imageUrl = movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "/placeholder-poster.jpg";

    const releaseYear = movie.release_date 
        ? movie.release_date.substring(0, 4) 
        : "N/A";

    const rating = movie.vote_average 
        ? movie.vote_average.toFixed(1) 
        : "N/A";

    return (
        <Link 
            href={`/movie/${movie.id}`}
            className="group relative flex flex-col rounded-xl overflow-hidden bg-white/[0.03] border border-white/5 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.07] hover:border-white/10 hover:shadow-xl hover:shadow-black/40"
        >
            <div className="aspect-[2/3] w-full overflow-hidden relative bg-slate-900/50">
                <img 
                    src={imageUrl} 
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
                
                <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-bold text-amber-500 flex items-center gap-1">
                    ⭐ {rating}
                </div>
            </div>

            <div className="p-3 flex flex-col justify-between flex-1 gap-1">
                <h3 className="text-sm font-semibold tracking-wide text-white/90 group-hover:text-amber-400 transition-colors line-clamp-1">
                    {movie.title}
                </h3>
                
                <div className="flex items-center justify-between text-xs text-white/40">
                    <span>{releaseYear}</span>
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 border border-white/5">
                        Movie
                    </span>
                </div>
            </div>
        </Link>
    );
}