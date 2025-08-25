import { supabase } from "../api/lib/supabaseClient";

export default async function handler(req, res) {
  const userId = req.query.userId || 12345;

  const { data: channels, error } = await supabase
    .from("channels")
    .select("*")
    .eq("owner_id", userId);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ channels });
}
