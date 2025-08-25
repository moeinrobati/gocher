import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // فقط سرور
);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { channelId, channelName, userId } = req.body;

  const { data, error } = await supabase
    .from("channels")
    .insert([{ channel_id: channelId, name: channelName, owner_id: userId }]);

  if (error) return res.status(400).json({ error });
  res.status(200).json({ success: true, data });
}
