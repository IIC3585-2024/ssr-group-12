// src/pages/index.js
import React from "react";
import MoviesTable from "./MoviesTable";

const MoviesPage = ({ movies }) => {
  return (
    <div>
      <h1>Movie List</h1>
      <MoviesTable movies={movies} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const movies = [
    {
      title: "The Great Adventure",
      streamingServices: ["Netflix", "Amazon Prime"],
      numberOfSeasons: 2,
      numberOfEpisodesForSeason: [10, 12],
      description: "An epic journey across uncharted lands.",
      category: "Adventure",
      rating: 4.5,
      numberOfRatings: 1500,
      poster: "next.svg",
      streamings: ["/streaming_services/netflix.png"],
    },
    {
      title: "Mystery Manor",
      streamingServices: ["Hulu", "Disney+"],
      numberOfSeasons: 3,
      numberOfEpisodesForSeason: [8, 8, 10],
      description: "A thrilling mystery set in a haunted mansion.",
      category: "Mystery",
      rating: 4.8,
      numberOfRatings: 2000,
      poster: "next.svg",
      streamings: ["/streaming_services/netflix.png"],
    },
    {
      title: "Comedy Nights",
      streamingServices: ["Netflix"],
      numberOfSeasons: 1,
      numberOfEpisodesForSeason: [15],
      description: "A hilarious series of stand-up comedy specials.",
      category: "Comedy",
      rating: 4.2,
      numberOfRatings: 750,
      poster: "next.svg",
      streamings: ["/streaming_services/netflix.png"],
    },
    {
      title: "Science Secrets",
      streamingServices: ["Amazon Prime"],
      numberOfSeasons: 4,
      numberOfEpisodesForSeason: [6, 6, 8, 10],
      description: "Unveiling the mysteries of science.",
      category: "Documentary",
      rating: 4.9,
      numberOfRatings: 3000,
      poster: "next.svg",
      streamings: ["/streaming_services/netflix.png"],
    },
    {
      title: "Romantic Tales",
      streamingServices: ["Hulu"],
      numberOfSeasons: 2,
      numberOfEpisodesForSeason: [12, 12],
      description: "Heartwarming stories of love and romance.",
      category: "Romance",
      rating: 4.6,
      numberOfRatings: 1800,
      poster: "next.svg",
      streamings: ["/streaming_services/netflix.png"],
    },
  ];

  return {
    props: {
      movies,
    },
  };
};

export default MoviesPage;
