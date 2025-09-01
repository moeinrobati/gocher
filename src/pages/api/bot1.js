export default async function handler(req, res) {
  const token = process.env.BOT_TOKEN; // توکن رو از Environment Variables بگیر
  const channel = "@gocher_community";

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const data = req.body;

  // دریافت پیام اولیه از کاربر
  if (data.message) {
    const chat_id = data.message.chat.id;
    const text = data.message.text;

    if (text === "/start") {
      // بررسی عضویت کاربر در کانال
      const check = await fetch(
        `https://api.telegram.org/bot${token}/getChatMember?chat_id=${channel}&user_id=${chat_id}`
      ).then((r) => r.json());

      const status = check?.result?.status || "left";

      // 🔽 ارسال عکس مشترک در ابتدا
      await fetch(
        `https://api.telegram.org/bot${token}/sendPhoto?` +
          new URLSearchParams({
            chat_id,
            photo: "https://example.com/your-image.jpg", // 🔁 لینک عکس دلخواه
            caption: "🎁 Welcome to Gocher Giveaway!",
          })
      );

      if (["member", "administrator", "creator"].includes(status)) {
        // ✅ عضو است → فقط پیام دوم (مینی‌اپ) را بفرست
        const keyboard = {
          inline_keyboard: [
            [
              {
                text: "🚀 Open Gocher",
                web_app: { url: "https://gocher.vercel.app" },
              },
            ],
          ],
        };

        await fetch(
          `https://api.telegram.org/bot${token}/sendMessage?` +
            new URLSearchParams({
              chat_id,
              text: "✅ You're in! Enjoy the giveaway or explore more 👇",
              reply_markup: JSON.stringify(keyboard),
            })
        );
      } else {
        // ❌ عضو نیست → پیام عضویت ارسال شود
        const message =
          "🎉 Launch and join Gifts Giveaway in Telegram!\n\nEasily create giveaways and automatically select winners 🎁";

        const keyboard = {
          inline_keyboard: [
            [{ text: "join community", url: "https://t.me/gocher_community" }],
            [{ text: "✅ Joined", callback_data: "check_join" }],
          ],
        };

        await fetch(
          `https://api.telegram.org/bot${token}/sendMessage?` +
            new URLSearchParams({
              chat_id,
              text: message,
              reply_markup: JSON.stringify(keyboard),
            })
        );
      }
    }
  }

  // بررسی عضویت وقتی کاربر دکمه "✅ Joined" را بزند
  if (data.callback_query) {
    const chat_id = data.callback_query.from.id;
    const callback_id = data.callback_query.id;
    const message_id = data.callback_query.message.message_id;

    const check = await fetch(
      `https://api.telegram.org/bot${token}/getChatMember?chat_id=${channel}&user_id=${chat_id}`
    ).then((r) => r.json());

    const status = check?.result?.status || "left";

    if (["member", "administrator", "creator"].includes(status)) {
      // ✅ عضو است → حذف پیام و ارسال وب‌اپ
      await fetch(
        `https://api.telegram.org/bot${token}/deleteMessage?` +
          new URLSearchParams({ chat_id, message_id })
      );

      const keyboard = {
        inline_keyboard: [
          [{ text: "🚀 Open Gocher", web_app: { url: "https://gocher.vercel.app" } }],
        ],
      };

      await fetch(
        `https://api.telegram.org/bot${token}/sendMessage?` +
          new URLSearchParams({
            chat_id,
            text: "✅ You're in! Enjoy the giveaway or explore more 👇",
            reply_markup: JSON.stringify(keyboard),
          })
      );
    } else {
      // ❌ هنوز عضو نیست
      await fetch(
        `https://api.telegram.org/bot${token}/answerCallbackQuery?` +
          new URLSearchParams({
            callback_query_id: callback_id,
            text: "❌ Please join the channel first using the button above.",
            show_alert: "true",
          })
      );
    }
  }

  return res.status(200).send("ok");
}
