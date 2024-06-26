import React, { useState } from "react";
import SerieCard from "../components/SerieCard";
import { fetchSupaSeries } from "../lib/supabase";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchSeriesByName, fetchPoster } from "../lib/tmdb";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function getServerSideProps() {
  // Fetch initial series data from an API or database
  const series = await fetchSupaSeries();

  return {
    props: {
      series,
    },
  };
}

const HomePage = ({ series }) => {
  // State for form inputs

  const router = useRouter();

  const [name, setName] = useState("");
  const [streamingService, setStreamingService] = useState("");
  const [seasons, setSeasons] = useState("");
  const [episodesPerSeason, setEpisodesPerSeason] = useState("");
  const [category, setCategory] = useState("");
  const [stars, setStars] = useState("");

  // Function to handle form submission

  // const fetchPosterByName = async (name) => {
  //   const res = await fetchSeriesByName(name);
  //   console.log(res);
  //   return await fetchPoster(res.results[0].poster_path);
  // };

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar los campos aquí si es necesario

    try {
      const { data, error } = await supabase.from("series").insert([
        {
          name: name,
          streaming_service: streamingService,
          user_id: "f1d486ac-6bea-4671-9c0d-950989bc5318",
          seasons: parseInt(seasons),
          episodes_per_season: parseInt(episodesPerSeason),
          category,
          stars: parseInt(stars),
        },
      ]);

      if (error) {
        throw error;
      }

      console.log("Serie agregada:", data);

      // Actualizar lista de series después de la inserción exitosa
      // Call this function whenever you want to
      // refresh props!

      refreshData();
      // Limpiar los campos después de la inserción exitosa
      setName("");
      setStreamingService("");
      setSeasons("");
      setEpisodesPerSeason("");
      setCategory("");
      setStars("");
    } catch (error) {
      console.error("Error al agregar serie:", error.message);
    }
  };

  return (
    <div>
      <div className="container mx-auto p-6">
        {series.map((serie) => (
          <Link
            href={`/serie/${serie.id}?name=${encodeURIComponent(serie.name)}`}
            key={serie.id}
          >
            <SerieCard key={serie.id} serie={serie} />
          </Link>
        ))}
      </div>
      <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
        {/* Formulario para agregar una nueva serie */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Servicio de Streaming:
            </label>
            <input
              type="text"
              value={streamingService}
              onChange={(e) => setStreamingService(e.target.value)}
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Temporadas:
            </label>
            <input
              type="number"
              value={seasons}
              onChange={(e) => setSeasons(e.target.value)}
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Episodios por Temporada:
            </label>
            <input
              type="number"
              value={episodesPerSeason}
              onChange={(e) => setEpisodesPerSeason(e.target.value)}
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Categoría:
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estrellas:
            </label>
            <input
              type="number"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Agregar Serie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
