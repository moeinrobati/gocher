// pages/api/bot2.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const update = req.body;

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY;

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

    await fetch(`${SUPABASE_URL}/rest/v1/gifts`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify(data)
    });
  }

  try {
    // فقط هدیه‌های منحصر به فرد
    if (update.channel_post && update.channel_post.unique_gift) {
      const gift = update.channel_post.unique_gift;
      const publisher = gift.publisher_chat?.username ?? null;

      await addGift(
        gift.sender_user_id ?? null,
        gift.sender_username ?? "",
        "unique",
        gift.id,
        publisher,
        true
      );
    }

    return res.status(200).send("OK");
  } catch (err) {
    console.error("Error in bot2:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
