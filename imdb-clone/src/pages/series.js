import { useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

// Obten los valores de env.local
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Crea el cliente Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Componente funcional de React
export default function Experimento({ initialSeries }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [streamingService, setStreamingService] = useState('');
  const [seasons, setSeasons] = useState('');
  const [episodesPerSeason, setEpisodesPerSeason] = useState('');
  const [category, setCategory] = useState('');
  const [stars, setStars] = useState('');
  const [series, setSeries] = useState(initialSeries);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar los campos aquí si es necesario

    try {
      const { data, error } = await supabase.from('series').insert([
        {
          name,
          streaming_service: streamingService,
          user_id: 'f1d486ac-6bea-4671-9c0d-950989bc5318',
          seasons: parseInt(seasons),
          episodes_per_season: parseInt(episodesPerSeason),
          category,
          stars: parseInt(stars),
        }
      ]);

      if (error) {
        throw error;
      }

      console.log('Serie agregada:', data);

      // Actualizar lista de series después de la inserción exitosa
      fetchSeries();

      // Limpiar los campos después de la inserción exitosa
      setName('');
      setStreamingService('');
      setSeasons('');
      setEpisodesPerSeason('');
      setCategory('');
      setStars('');
    } catch (error) {
      console.error('Error al agregar serie:', error.message);
    }
  };

  const fetchSeries = async () => {
    try {
      const { data, error } = await supabase.from('series').select('*');
      if (error) {
        throw error;
      }
      console.log('Series obtenidas:', data);
      setSeries(data || []);
    } catch (error) {
      console.error('Error al obtener series:', error.message);
    }
  };

  // Función para redirigir a la página de detalle de una serie
  const handleSerieClick = (id) => {
    router.push(`/serie/${id}`);
  };

  return (
    <div className="container">
      <h1 className="title">Series Disponibles</h1>

      <div className="series-container">
        {/* Lista de series */}
        {series.map((serie) => (
          <div key={serie.id} className="serie-card" onClick={() => handleSerieClick(serie.id)}>
            <h2 className="serie-name">{serie.name}</h2>
            <p><strong>Servicio de Streaming:</strong> {serie.streaming_service}</p>
            <p><strong>Categoría:</strong> {serie.category}</p>
            <p><strong>Estrellas:</strong> {serie.stars}</p>
            <p><strong>Temporadas:</strong> {serie.seasons}</p>
            <p><strong>Episodios por Temporada:</strong> {serie.episodes_per_season}</p>
          </div>
        ))}
      </div>

      <div className="form-container">
        {/* Formulario para agregar una nueva serie */}
        <form onSubmit={handleSubmit} className="form">
          <label className="form-label">
            Nombre:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
          </label>
          <br />
          <label className="form-label">
            Servicio de Streaming:
            <input
              type="text"
              value={streamingService}
              onChange={(e) => setStreamingService(e.target.value)}
              className="form-input"
              required
            />
          </label>
          <br />
          <label className="form-label">
            Temporadas:
            <input
              type="number"
              value={seasons}
              onChange={(e) => setSeasons(e.target.value)}
              className="form-input"
              required
            />
          </label>
          <br />
          <label className="form-label">
            Episodios por Temporada:
            <input
              type="number"
              value={episodesPerSeason}
              onChange={(e) => setEpisodesPerSeason(e.target.value)}
              className="form-input"
              required
            />
          </label>
          <br />
          <label className="form-label">
            Categoría:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-input"
              required
            />
          </label>
          <br />
          <label className="form-label">
            Estrellas:
            <input
              type="number"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              className="form-input"
              required
            />
          </label>
          <br />
          <button type="submit" className="form-button">Agregar Serie</button>
        </form>
      </div>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .title {
          text-align: center;
          margin-bottom: 20px;
        }

        .form-container {
          background-color: #f0f0f0;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .form {
          display: grid;
          grid-gap: 10px;
        }

        .form-label {
          font-weight: bold;
        }

        .form-input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .form-button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .form-button:hover {
          background-color: #0056b3;
        }

        .series-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          grid-gap: 20px;
        }

        .serie-card {
          background-color: #fff;
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 8px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: transform 0.2s ease-in-out;
        }

        .serie-card:hover {
          transform: scale(1.02);
        }

        .serie-name {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const { data, error } = await supabase.from('series').select('*');
    if (error) {
      throw error;
    }
    console.log('Series obtenidas:', data);
    return {
      props: {
        initialSeries: data || [],
      },
    };
  } catch (error) {
    console.error('Error al obtener series en SSR:', error.message);
    return {
      props: {
        initialSeries: [],
      },
    };
  }
}
