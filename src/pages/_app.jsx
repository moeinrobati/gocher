import { ThemeProvider, createTheme, CssBaseline, GlobalStyles } from '@mui/material';
import "../styles/globals.css";
import AnimatedTabBarPro from "../components/AnimatedTabBarPro";
import { useRouter } from "next/router";
import localFont from 'next/font/local';
import Layout from "./Layout";
import dynamic from "next/dynamic";  // 👈 اضافه شد

// 👇 TelegramInit رو فقط سمت کلاینت لود می‌کنیم
const TelegramInit = dynamic(() => import("../components/TelegramInit"), { ssr: false });

const myfont = localFont({ src: '../assets/fonts/fonnts.com-Museo_Sans_Rounded_700.otf' });

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
  typography: {
    fontFamily: myfont.style.fontFamily,
  },
});

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const hideTabbarRoutes = ["/404"];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { fontFamily: myfont.style.fontFamily } }} />

      {/* اینجا TelegramInit رو گذاشتیم */}
      <TelegramInit />

      <Layout>
        <Component {...pageProps} />
      </Layout>

      {!hideTabbarRoutes.includes(router.pathname) && <AnimatedTabBarPro />}
    </ThemeProvider>
  );
}
