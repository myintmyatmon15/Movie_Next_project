import Movie from "@/components/movie";
import { MovieType } from "@/types/global";

async function fetchTop(): Promise<MovieType[]> {
    const res = await fetch("https://api.themoviedb.org/3/movie/top_rated", {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
    });
    const data = await res.json();
    return data.results;
}

async function fetchPopular(): Promise<MovieType[]> {
    const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
    });
    const data = await res.json();
    return data.results;
}

export default async function Home() {
    const popular = await fetchPopular();
    const top = await fetchTop();

    return (
       
        <div className="bg-transparent space-y-10 py-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-white/90 mb-6 flex items-center gap-2">
                    Browse Popular
                    <span className="text-xs font-normal text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                        Trending
                    </span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {popular.map(movie => (
                        <Movie
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-white/90 mb-6 flex items-center gap-2">
                    Top Rated
                    <span className="text-xs font-normal text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                        Must Watch
                    </span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {top.map(movie => (
                        <Movie
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}