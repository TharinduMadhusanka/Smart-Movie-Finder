import { Card, CardContent } from "@/components/ui/card";

interface MovieProps {
    title: string;
    director: string;
    rating: number;
    year: number;
    poster: string;
}

const MovieCard: React.FC<MovieProps> = ({ title, director, rating, year, poster }) => {
    return (
        <Card className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-md">
            <img src={poster} alt={title} className="w-full h-60 object-cover" />
            <CardContent className="p-4">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-sm">🎬 Directed by {director}</p>
                <p className="text-sm">⭐ IMDB: {rating}</p>
                <p className="text-sm">📅 Released: {year}</p>
            </CardContent>
        </Card>
    );
};

export default MovieCard;
