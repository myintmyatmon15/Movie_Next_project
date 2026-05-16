export type MovieType = {
    id: number;
    title: string;
    poster_path: string | null;     
    backdrop_path: string | null; 
    release_date: string;
    overview: string;
    vote_average: number;          
};

export type GenreType = {
    id: number;
    name: string;
};

export type PersonType = {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;    
};
export type PersonDetailType = {
    id: number;
    name: string;
    biography: string;
    profile_path: string | null;
    known_for_department: string;
};

export type CastMovieType = {
    id: number;
    title: string;
    poster_path: string | null;
    release_date?: string;
    vote_average?: number;
    character: string;
};