'use client';

import dynamic from 'next/dynamic';

const TelegramInit = dynamic(() => import('../components/TelegramInit'), { ssr: false });
const CopyInitData = dynamic(() => import('../components/CopyInitData'), { ssr: false });

export default function Layout({ children }) {
  return (
    <>
      <TelegramInit />
      {process.env.NODE_ENV === 'development' && <CopyInitData />}
      {children}
    </>
  );
}
