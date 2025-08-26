// pages/api/bot2.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const update = req.body;
  console.log("Update received:", JSON.stringify(update, null, 2));

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  async function addGift(user_id, username, gift_type, gift_id, publisher_chat, is_unique) {
    const data = {
      user_id,
      username,
      gift_type,
      gift_id,
      publisher_chat,
      is_unique,
      created_at: new Date().toISOString()
    };

    const resp = await fetch(`${SUPABASE_URL}/rest/v1/gifts`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify(data)
    });

    const json = await resp.json();
    console.log("Supabase insert response:", json);
    return json;
  }

  try {
    // 👇 برای تست، مثلا فقط پیام کانال رو لاگ کن
    if (update.channel_post) {
      const post = update.channel_post;

      await addGift(
        post.sender_chat?.id ?? null,
        post.sender_chat?.username ?? "",
        "channel_post",
        post.message_id,
        post.chat?.username ?? null,
        false
      );
    }

    return res.status(200).send("OK");
  } catch (err) {
    console.error("Error in bot2:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
