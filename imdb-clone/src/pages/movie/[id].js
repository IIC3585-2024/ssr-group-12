import { fetchMovies, fetchPoster } from "../../lib/tmdb";
import MediaCard from "@/components/MovieCard";

export async function getServerSideProps({ params }) {
  const movie = await fetchMovies(`/movie/${params.id}`);
  return {
    props: {
      movie,
    },
  };
}

const Movie = ({ movie }) => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">{movie.title}</h1>
      <MediaCard movie={movie} />
    </div>
  );
};

export default Movie;
