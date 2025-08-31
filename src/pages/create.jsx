import React, { useEffect, useState } from "react";
import {
  isTMA,
  retrieveLaunchParams,
  mockTelegramEnv,
  emitEvent,
} from "@telegram-apps/bridge";

export default function CreatePage() {
  const [user, setUser] = useState(null);
  const [platform, setPlatform] = useState("");
  const [isTelegramEnv, setIsTelegramEnv] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 🔹 Mock محیط مرورگر
    mockTelegramEnv({
      launchParams: {
        tgWebAppData: new URLSearchParams([
          [
            "user",
            JSON.stringify({
              id: 123,
              first_name: "Test",
              username: "tester",
            }),
          ],
          ["auth_date", Date.now().toString()],
          ["hash", ""],
        ]),
        tgWebAppPlatform: "web",
        tgWebAppVersion: "8",
        tgWebAppThemeParams: {
          bg_color: "#ffffff",
          text_color: "#000000",
        },
      },
      onEvent(e) {
        if (e[0] === "web_app_request_theme") {
          return emitEvent("theme_changed", {
            theme_params: {
              bg_color: "#ffffff",
              text_color: "#000000",
            },
          });
        }
      },
    });

    const checkTelegram = async () => {
      if (await isTMA("complete")) setIsTelegramEnv(true);
      else setIsTelegramEnv(false);
    };
    checkTelegram();

    try {
      const lp = retrieveLaunchParams();
      const rawData = lp?.tgWebAppData
        ? JSON.parse(lp.tgWebAppData.get("user"))
        : null;
      setUser(rawData);
      setPlatform(lp?.tgWebAppPlatform || "unknown");
    } catch (err) {
      console.warn("⚠️ خارج تلگرام یا launchParams پیدا نشد. از mock استفاده شد.");
      setUser({ id: 123, first_name: "Test", username: "tester" });
      setPlatform("web");
    }
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Page</h1>
      <p>
        <b>Environment:</b>{" "}
        {isTelegramEnv ? "Telegram Mini App" : "Browser / Mock"}
      </p>

      {user ? (
        <>
          <p>✅ یوزر شناسایی شد</p>
          <p><b>ID:</b> {user.id}</p>
          <p><b>First Name:</b> {user.first_name}</p>
          <p><b>Username:</b> {user.username || "ندارد"}</p>
        </>
      ) : (
        <p>❌ کاربر شناسایی نشد</p>
      )}
      <p><b>Platform:</b> {platform}</p>
    </div>
  );
}
