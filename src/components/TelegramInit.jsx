'use client';

import { useEffect } from 'react';
import { init } from '@telegram-apps/sdk';

export function TelegramInit() {
    useEffect(() => {
        init();
    }, []);

    return null; 
}
