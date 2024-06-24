// components/MovieComponent.js
import React from "react";
import Image from "next/image";
import styles from "./MovieComponent.module.css";

const MovieComponent = ({ title, poster, description, rating, streamings }) => {
  return (
    <div className={styles.movie_container}>
      <div className={styles.poster}>
        <Image src={poster} alt={`${title} poster`} width={300} height={450} />
      </div>
      <div className={styles.movie_details}>
        <h1>{title}</h1>
        <p>
          <strong>Rating:</strong> {rating}
        </p>
        <p>
          <strong>Synopsis:</strong> {description}
        </p>
        {console.log(streamings)}
        {streamings.map((streaming, index) => (
          <Image
            key={index}
            src={streaming}
            alt={`${title} streaming`}
            width={50}
            height={50}
          />
        ))}
      </div>
    </div>
  );
};

// MovieComponent.propTypes = {
//   title: PropTypes.string.isRequired,
//   poster: PropTypes.string.isRequired,
//   synopsis: PropTypes.string.isRequired,
//   releaseDate: PropTypes.string.isRequired,
//   rating: PropTypes.number.isRequired,
// };

export default MovieComponent;
