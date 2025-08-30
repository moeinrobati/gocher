// components/Layout.jsx
import TelegramInit from "./TelegramInit";
import { UserProgressProvider, UserInfoProvider, DOMInfoProvider } from "../context";

export default function Layout({ children }) {
  return (
    <UserProgressProvider initialUser={null}>
      <UserInfoProvider>
        <DOMInfoProvider>
          <TelegramInit />
          {children}
        </DOMInfoProvider>
      </UserInfoProvider>
    </UserProgressProvider>
  );
}
