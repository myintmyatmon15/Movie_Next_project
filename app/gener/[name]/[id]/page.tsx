import { MovieType } from "@/types/global";
import Movie from "@/components/movie";

async function fetchGenre(id: string): Promise<MovieType[]> {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${id}`, {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`
        }
    });
    
    if (!res.ok) {
        throw new Error("Failed to fetch movies from TMDB");
    }

    const data = await res.json();
    return data.results || [];
}

export default async function Genre({
    params,
}: {
    params: Promise<{ name: string; id: string }>;
}) {
    const { id, name } = await params;
    const movies = await fetchGenre(id);

    return (
        <div className="space-y-6">
            <div className="border-b border-white/10 pb-3">
                <h2 className="text-2xl font-black tracking-wide capitalize text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-amber-400">
                    {decodeURIComponent(name)} Movies
                </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {movies.map(movie => (
                    <Movie
                        key={movie.id}
                        movie={movie}
                    />
                ))}
            </div>
        </div>
    );
}