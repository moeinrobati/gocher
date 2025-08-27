import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { initData, botToken } = req.body;

  if (!initData || !botToken) return res.status(400).json({ error: "Missing initData or botToken" });

  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  params.delete("hash");

  const dataCheckString = Array.from(params.entries())
    .sort()
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  const secretKey = crypto.createHash("sha256").update(botToken).digest();
  const hmac = crypto.createHmac("sha256", secretKey).update(dataCheckString).digest("hex");

  if (hmac !== hash) {
    return res.status(403).json({ error: "Invalid HMAC" });
  }

  // داده‌ها امن هستند
  const user = Object.fromEntries(params.entries());

  // TODO: ذخیره در Supabase
  // const { data, error } = await supabase.from("users").upsert(user);

  return res.status(200).json({ user });
}
