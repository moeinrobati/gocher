export default async function handler(req, res) {
  if (req.method === "POST") {
    const update = req.body;

    // مثلا اگر کاربر پیامی فرستاد
    if (update.message) {
      const chatId = update.message.chat.id;
      const text = "سلام! ربات شما فعال شد 🚀";
      await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
    }

    return res.status(200).json({ ok: true });
  }

  res.status(405).end();
}
