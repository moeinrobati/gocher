// pages/api/bot1.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const update = req.body;

  const token = process.env.TELEGRAM_BOT1_TOKEN;
  const channel = process.env.TELEGRAM_CHANNEL;

  async function sendTelegramRequest(method, params) {
    const url = `https://api.telegram.org/bot${token}/${method}`;
    const query = new URLSearchParams(params);
    await fetch(`${url}?${query.toString()}`);
  }

  try {
    // ---------------------------
    // بخش پیام متنی /start
    // ---------------------------
    if (update.message) {
      const chat_id = update.message.chat.id;
      const text = update.message.text ?? "";

      if (text === "/start") {
        // بررسی عضویت
        const checkResp = await fetch(`https://api.telegram.org/bot${token}/getChatMember?chat_id=${channel}&user_id=${chat_id}`);
        const check = await checkResp.json();
        const status = check.result?.status ?? "left";

        // ارسال عکس اولیه
        await sendTelegramRequest("sendPhoto", {
          chat_id,
          photo: "https://example.com/your-image.jpg",
          caption: "🎁 Welcome to Gocher Giveaway!"
        });

        if (["member", "administrator", "creator"].includes(status)) {
          // ✅ عضو است → فقط پیام WebApp
          await sendTelegramRequest("sendMessage", {
            chat_id,
            text: "✅ You're in! Enjoy the giveaway or explore more 👇",
            reply_markup: JSON.stringify({
              inline_keyboard: [
                [{ text: "🚀 Open Gocher", web_app: { url: "https://gocher.ir" } }]
              ]
            })
          });
        } else {
          // ❌ عضو نیست → پیام عضویت
          const message = "🎉 Launch and join Gifts Giveaway in Telegram!\n\nEasily create giveaways and automatically select winners 🎁";
          await sendTelegramRequest("sendMessage", {
            chat_id,
            text: message,
            reply_markup: JSON.stringify({
              inline_keyboard: [
                [{ text: "join community", url: "https://t.me/" + channel.replace("@","") }],
                [{ text: "✅ Joined", callback_data: "check_join" }]
              ]
            })
          });
        }
      }
    }

    // ---------------------------
    // بخش Callback Query (دکمه ✅ Joined)
    // ---------------------------
    if (update.callback_query) {
      const chat_id = update.callback_query.from.id;
      const callback_id = update.callback_query.id;
      const message_id = update.callback_query.message.message_id;

      const checkResp = await fetch(`https://api.telegram.org/bot${token}/getChatMember?chat_id=${channel}&user_id=${chat_id}`);
      const check = await checkResp.json();
      const status = check.result?.status ?? "left";

      if (["member", "administrator", "creator"].includes(status)) {
        // حذف پیام قبلی و ارسال WebApp
        await sendTelegramRequest("deleteMessage", { chat_id, message_id });
        await sendTelegramRequest("sendMessage", {
          chat_id,
          text: "✅ You're in! Enjoy the giveaway or explore more 👇",
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: "🚀 Open Gocher", web_app: { url: "https://gocher.ir" } }]
            ]
          })
        });
      } else {
        // ❌ هنوز عضو نیست
        await sendTelegramRequest("answerCallbackQuery", {
          callback_query_id: callback_id,
          text: "❌ Please join the channel first using the button above.",
          show_alert: true
        });
      }
    }

    return res.status(200).send("OK");
  } catch (err) {
    console.error("Error in bot1:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
