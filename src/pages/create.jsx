'use client';
import { useEffect, useState } from "react";

export default function CreatePage() {
  const [user, setUser] = useState(null);
  const [platform, setPlatform] = useState("");
  const [theme, setTheme] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;

        // آماده‌سازی
        tg.ready();

        console.log("✅ Telegram WebApp:", tg);

        // گرفتن اطلاعات
        setUser(tg.initDataUnsafe?.user || null);
        setPlatform(tg.platform || "unknown");
        setTheme(tg.colorScheme || "default");
      } else {
        setError("Not inside Telegram Mini App");
      }
    } catch (err) {
      console.error("❌ Error:", err);
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
      <p><b>Theme:</b> {theme}</p>
    </div>
  );
}
