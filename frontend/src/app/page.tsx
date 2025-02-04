"use client";
import { useState } from "react";
import axios from "axios";
import MovieCard from "@/components/MovieCard";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [keywords, setKeywords] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [imdbRating, setImdbRating] = useState("");
  const [director, setDirector] = useState("");

  interface Movie {
    Series_Title: string;
    Director: string;
    IMDB_Rating: number;
    Genre: string;
    Poster: string;
    Released_Year: number;
    Poster_URL: string;
  }

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = async () => {
    if (!keywords) return;
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/search", {
        keywords,
        year_from: yearFrom ? parseInt(yearFrom) : undefined,
        year_to: yearTo ? parseInt(yearTo) : undefined,
        IMDB_Rating: imdbRating ? parseFloat(imdbRating) : undefined,
        director: director || undefined,
      });
      setMovies(response.data.metadatas[0] || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 text-center"
      >
        🎬 Movie Search
      </motion.h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            placeholder="Keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500"
          />
          <Input
            placeholder="Year From"
            type="number"
            value={yearFrom}
            onChange={(e) => setYearFrom(e.target.value)}
            className="bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500"
          />
          <Input
            placeholder="Year To"
            type="number"
            value={yearTo}
            onChange={(e) => setYearTo(e.target.value)}
            className="bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500"
          />
          <Input
            placeholder="IMDB Rating"
            type="number"
            step="0.1"
            value={imdbRating}
            onChange={(e) => setImdbRating(e.target.value)}
            className="bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500"
          />
          <Input
            placeholder="Director"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            className="bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500"
          />
        </div>
        <Button
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition-all"
          onClick={searchMovies}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      {loading && <p className="text-center mt-6">Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 w-full max-w-5xl">
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.Series_Title}
            director={movie.Director}
            rating={movie.IMDB_Rating}
            year={movie.Released_Year}
            poster={movie.Poster_URL}
          />
        ))}
      </div>
    </div>
  );
}
