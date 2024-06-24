// src/components/MoviesTable.js
import React from "react";
import styles from "./MoviesTable.module.css";
import MovieComponent from "@/components/movie/MovieComponent";

const MoviesTable = ({ movies }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Streaming Services</th>
            <th>Number of Seasons</th>
            <th>Number of Episodes per Season</th>
            <th>Description</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Number of Ratings</th>
          </tr>
        </thead>
        <tbody>
          {console.log(movies)}
          {movies.map((movie, index) => (
            <tr key={index}>
              <td>{movie.title}</td>
              <td>{movie.streamingServices}</td>
              <td>{movie.numberOfSeasons}</td>
              <td>{movie.numberOfEpisodesForSeason}</td>
              <td>{movie.description}</td>
              <td>{movie.category}</td>
              <td>{movie.rating}</td>
              <td>{movie.numberOfRatings}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {movies.map((movie, index) => (
          <MovieComponent
            key={index}
            title={movie.title}
            poster={movie.poster}
            description={movie.description}
            rating={movie.rating}
            streamings={movie.streamings}
          />
        ))}
      </div>
    </div>
  );
};

export default MoviesTable;
