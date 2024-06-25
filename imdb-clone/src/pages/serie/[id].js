import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

// Obten los valores de env.local
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Crea el cliente Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Componente funcional de React
export default function SerieDetail({ serie }) {
  const router = useRouter();
  const { id } = router.query;

  // Estado para manejar el comentario y la calificación
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);

  // Función para eliminar la serie
  const deleteSerie = async () => {
    try {
      const { error } = await supabase.from('series').delete().eq('id', id);
      if (error) {
        throw error;
      }
      console.log('Serie eliminada:', id);
      // Redireccionar a la página principal u otra página después de eliminar
      router.push('/');
    } catch (error) {
      console.error('Error al eliminar serie:', error.message);
    }
  };

  // Función ficticia para obtener el ID del usuario actual
  const getCurrentUserId = () => 'f1d486ac-6bea-4671-9c0d-950989bc5318';

  // Función para manejar el envío de comentario
  const handleSubmitComment = async (event) => {
    event.preventDefault();
    try {
      const user_id = getCurrentUserId();
      const { data, error } = await supabase.from('comentarios').insert([
        {
          coment: commentText,
          serie_id: id,
          user_id,
          rating,
        }
      ]);
      if (error) {
        throw error;
      }
      console.log('Comentario agregado:', data);
      setCommentText('');
      setRating(0);
      fetchComments(); // Actualizar comentarios después de agregar uno nuevo
    } catch (error) {
      console.error('Error al agregar comentario:', error.message);
    }
  };

  // Función para obtener los comentarios de la serie
  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comentarios')
        .select('*')
        .eq('serie_id', id);
      if (error) {
        throw error;
      }
      setComments(data || []);
    } catch (error) {
      console.error('Error al obtener comentarios:', error.message);
    }
  };

  // Efecto secundario para obtener los comentarios al cargar la serie
  useEffect(() => {
    if (id) {
      fetchComments();
    }
  }, [id]);

  if (!serie) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container">
      <h1 className="title">{serie.name}</h1>

      <div className="serie-details">
        <p><strong>Servicio de Streaming:</strong> {serie.streaming_service}</p>
        <p><strong>Categoría:</strong> {serie.category}</p>
        <p><strong>Estrellas:</strong> {serie.stars}</p>
        <p><strong>Temporadas:</strong> {serie.seasons}</p>
        <p><strong>Episodios por Temporada:</strong> {serie.episodes_per_season}</p>
      </div>

      {/* Formulario para agregar comentario */}
      <form onSubmit={handleSubmitComment} className="comment-form">
        <label className="form-label">
          Comentario:
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="form-textarea"
            required
          />
        </label>
        <br />
        {/* Input para calificar */}
        <label className="form-label">
          Calificación:
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="form-input"
            required
          />
        </label>
        <br />
        <button type="submit" className="form-button">Agregar Comentario</button>
      </form>

      {/* Lista de comentarios */}
      <div className="comments-container">
        <h2>Comentarios</h2>
        {comments.length === 0 && <p>No hay comentarios aún.</p>}
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p><strong>Usuario:</strong> {comment.user_id}</p>
            <p><strong>Comentario:</strong> {comment.coment}</p>
            <p><strong>Calificación:</strong> {comment.rating}</p>
          </div>
        ))}
      </div>

      <div className="button-container">
        <button onClick={deleteSerie} className="delete-button">Eliminar Serie</button>
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
          font-size: 2rem;
        }

        .serie-details {
          background-color: #f0f0f0;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          margin-bottom: 10px;
          font-weight: bold;
        }

        .form-textarea,
        .form-input {
          width: 100%;
          padding: 8px;
          font-size: 1rem;
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

        .delete-button {
          padding: 10px 20px;
          background-color: #dc3545;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .delete-button:hover {
          background-color: #c82333;
        }

        .comments-container {
          margin-top: 20px;
        }

        .comment {
          background-color: #f9f9f9;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
