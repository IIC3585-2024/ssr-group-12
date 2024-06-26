import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const fetchSupaSeries = async () => {
  try {
    const { data, error } = await supabase.from("series").select("*");
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error al obtener series:", error.message);
  }
};
