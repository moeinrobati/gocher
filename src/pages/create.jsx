'use client';
import { useEffect, useState } from "react";
import { init } from "@telegram-apps/sdk";

export default function CreatePage() {
  const [user, setUser] = useState(null);
  const [platform, setPlatform] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const tg = init(); // داخل تلگرام مقدار می‌گیره
      console.log("✅ Telegram Init:", tg);

      setUser(tg.user || null);
      setPlatform(tg.platform || "unknown");
    } catch (err) {
      console.error("❌ Not running inside Telegram:", err);
      setError(err.message);
    }
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Page</h1>

      {error && <p style={{ color: "red" }}>⚠️ {error}</p>}

      {user ? (
        <>
          <p>✅ یوزر شناسایی شد</p>
          <p><b>ID:</b> {user.id}</p>
          <p><b>First Name:</b> {user.first_name}</p>
          <p><b>Username:</b> {user.username || "ندارد"}</p>
        </>
      ) : (
        <p>⏳ منتظر شناسایی کاربر...</p>
      )}

      <p><b>Platform:</b> {platform}</p>
    </div>
  );
}
