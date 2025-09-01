'use client';
import { useEffect, useState } from 'react';
import { init } from '@telegram-apps/sdk';

export default function CreatePage() {
  const [user, setUser] = useState(null);
  const [platform, setPlatform] = useState('');
  const [isTelegramEnv, setIsTelegramEnv] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const tg = init(); // init واقعی تلگرام
      if (tg?.user) {
        setIsTelegramEnv(true);
        setUser(tg.user);
        setPlatform(tg.platform);
      } else {
        // اگر کاربر undefined بود
        setIsTelegramEnv(false);
        setUser(null);
        setPlatform('unknown');
      }
    } catch (err) {
      // خطا یعنی خارج تلگرام
      setIsTelegramEnv(false);
      setUser(null);
      setPlatform('unknown');
      console.warn('⚠️ Not running inside Telegram Mini App:', err.message);
    }
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Create Page</h1>
      <p>
        <b>Environment:</b> {isTelegramEnv ? 'Telegram Mini App' : 'Outside Telegram'}
      </p>

      {user ? (
        <>
          <p>✅ User recognized</p>
          <p><b>ID:</b> {user.id}</p>
          <p><b>First Name:</b> {user.first_name}</p>
          <p><b>Username:</b> {user.username || 'N/A'}</p>
        </>
      ) : (
        <p>❌ User not recognized</p>
      )}
      <p><b>Platform:</b> {platform}</p>
    </div>
  );
}
