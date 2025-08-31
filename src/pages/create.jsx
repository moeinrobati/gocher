"use client";
import React, { useEffect, useState } from "react";
import { init } from "@telegram-apps/sdk-react";

export default function CreatePage() {
  const [user, setUser] = useState(null);
  const [platform, setPlatform] = useState("");

  useEffect(() => {
    // اجرا فقط در کلاینت (نه سمت سرور)
    if (typeof window === "undefined") return;

    const app = init(); // شروع SDK
    const lp = app?.launchParams;

    if (lp) {
      console.log("Telegram Launch Params:", lp);
      setPlatform(lp.platform || "unknown");
      setUser(lp.initData?.user || null);
    } else {
      console.warn("⚠️ Launch params پیدا نشد (احتمالا خارج تلگرام باز کردی).");
    }
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Page</h1>
      {user ? (
        <>
          <p>✅ یوزر شناسایی شد</p>
          <p><b>ID:</b> {user.id}</p>
          <p><b>First Name:</b> {user.first_name}</p>
          <p><b>Username:</b> {user.username || "ندارد"}</p>
        </>
      ) : (
        <p>❌ کاربر شناسایی نشد (خارج از تلگرام؟)</p>
      )}
      <p><b>Platform:</b> {platform}</p>
    </div>
  );
}
