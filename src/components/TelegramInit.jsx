'use client';
import { useEffect } from 'react';
import { init } from '@telegram-apps/sdk';

export default function TelegramInit() {
  useEffect(() => {
    // فقط وقتی داخل تلگرام هست
    if (typeof window !== "undefined") {
      try {
        const tg = init(); // init واقعی
        console.log("Telegram initialized:", tg);
        console.log("InitData:", tg.initData);
        console.log("User:", tg.user);
        console.log("Platform:", tg.platform);
        console.log("ColorScheme:", tg.colorScheme);
      } catch (error) {
        console.log("Not running inside Telegram:", error.message);
      }
    }
  }, []);

  return null;
}
