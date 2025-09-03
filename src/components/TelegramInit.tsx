'use client';

import { useEffect } from 'react';
import { init } from '@telegram-apps/sdk';

export default function TelegramInit(): null {
  useEffect(() => {
    init();
  }, []);

  return null;
}
