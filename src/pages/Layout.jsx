// src/pages/Layout.jsx
import TelegramInit from "../components/TelegramInit";

export default function Layout({ children }) {
  return (
    <>
      <TelegramInit />
      {children}
    </>
  );
}
