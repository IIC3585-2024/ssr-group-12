// src/components/MovieCard.js

import React from "react";
import Image from "next/image"; // Import Image from the correct package
import { fetchPoster } from "../lib/tmdb";

const MovieCard = ({ movie }) => {
  const poster = fetchPoster(movie.poster_path);
  console.log(movie);
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md md:max-w-2xl my-4">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:h-full md:w-48"
            src={poster}
            alt={movie.title}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {movie.genre}
          </div>
          <p className="mt-2 text-gray-500">{movie.overview}</p>
          <div className="mt-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              {movie.release_date}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              {movie.runtime} min
            </span>
            <span className="inline-block bg-yellow-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">
              <p>
                ★ {movie.vote_average}/10 of a total of {movie.vote_count} votes
              </p>
            </span>
          </div>
          <div className="mt-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              {movie.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
