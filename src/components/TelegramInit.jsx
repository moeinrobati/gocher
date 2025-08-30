'use client';

import { useEffect } from 'react';
import { init } from '@telegram-apps/sdk';

export default function TelegramInit() {
  useEffect(() => {
    init(); // Initialize Telegram WebApp
  }, []);

  return null;
}
