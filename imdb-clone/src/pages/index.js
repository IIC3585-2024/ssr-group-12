import { fetchMovies, fetchPoster } from "../lib/tmdb";
import Link from "next/link";
import Image from "next/image";
import AuthForm from "@/components/AuthForm";

export async function getServerSideProps() {
  const popularMovies = await fetchMovies("/movie/popular");
  return {
    props: {
      popularMovies: popularMovies.results,
    },
  };
}

const Home = ({ popularMovies }) => {
  return (
    <div className="container mx-auto px-4">
      <nav className="flex justify-between items-center py-4">
        <h1 className="text-3xl font-bold text-white">Movie Finder</h1>
        <AuthForm />

      </nav>

      <h1 className="text-4xl font-bold my-8">Popular Movies</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {popularMovies.map((movie) => (
          <li key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <Link href={`/movie/${movie.id}`}>
              <h2 className="text-xl font-semibold text-white">
                {movie.title}
              </h2>
              <Image
                src={fetchPoster(movie.poster_path)}
                alt={movie.title}
                width={300}
                height={450}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
