import TelegramInit from '../components/TelegramInit';

import CopyInitData from '../components/CopyInitData';
export default function Layout({ children }) {
  return (
    <>
      <TelegramInit/>
      <CopyInitData/>
      {children}
    </>
  );
}
