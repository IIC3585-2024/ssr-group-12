import { fetchSeriesByName, fetchPoster } from "../../lib/tmdb";
import SerieCard from "@/components/SerieCard";
import { supabase, fetchSupaSerie } from "@/lib/supabase";
import { useState } from "react";

export async function getServerSideProps(params) {
  // Fetch data from an API or database
  const res = await fetchSupaSerie(params.params.id);
  console.log("res:", res);

  return {
    props: {
      serie: res[0],
    },
  };
}

const Serie = ({ serie }) => {
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [poster, setPoster] = useState("");
  let executed = false;

  // Function to fetch comments for the series
  const fetchComments = async () => {
    try {
      console.log("Fetching comments for serie_id:", serie.id);
      const { data, error } = await supabase
        .from("comentarios")
        .select("*")
        .eq("serie_id", serie.id);
      if (error) {
        throw error;
      }
      console.log("Comentarios:", data);
      setComments(data || []);
    } catch (error) {
      console.error("Error fetching comments:", error.message);
    }
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    try {
      const email = "scavagnaro@uc.cl";
      console.log("serie_id:", serie.id);
      const { data, error } = await supabase.from("comentarios").insert([
        {
          coment: commentText,
          serie_id: serie.id,
          user_mail: email,
          rating,
        },
      ]);
      if (error) {
        throw error;
      }
      console.log("Comentario agregado:", data);
      setCommentText("");
      setRating(0);
      fetchComments(); // Actualizar comentarios después de agregar uno nuevo
    } catch (error) {
      console.error("Error al agregar comentario:", error.message);
    }
  };

  const fetchInitialData = async () => {
    if (!executed) {
      fetchComments();
      executed = true;
    }
  };

  fetchInitialData();

  // fetchComments();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">{serie.title}</h1>
      <SerieCard serie={serie} />
      <div className="comments-container ml-4">
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        {comments.length === 0 && (
          <p className="text-gray-600">No comments yet.</p>
        )}
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-4 rounded-lg mb-2">
            <p className="text-gray-800">
              <strong>User:</strong> {comment.user_mail}
            </p>
            <p className="text-gray-700">
              <strong>Comment:</strong> {comment.coment}
            </p>
            <p className="text-gray-700">
              <strong>Rating:</strong> {comment.rating}
            </p>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmitComment}
        className="comment-form bg-gray-100 p-4 rounded-lg mb-4"
      >
        <label className="block mb-2">
          <span className="text-gray-700">Comentario:</span>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="form-textarea mt-1 block w-full rounded-lg"
            required
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Calificación:</span>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="form-input mt-1 block w-full rounded-lg"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Agregar Comentario
        </button>
      </form>
    </div>
  );
};

export default Serie;
