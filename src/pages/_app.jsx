// pages/_app.jsx
import { ThemeProvider, createTheme, CssBaseline, GlobalStyles } from '@mui/material';
import "../styles/globals.css";
import AnimatedTabBarPro from "../components/AnimatedTabBarPro";
import { useRouter } from "next/router";
import localFont from 'next/font/local';
import Script from 'next/script';

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
      {/* لود اسکریپت تلگرام */}
<Script
  src="/js/telegram-web-app.js"
  strategy="beforeInteractive"
/>

      <CssBaseline />
      <GlobalStyles styles={{ html: { fontFamily: myfont.style.fontFamily } }} />
      <Component {...pageProps} />
      {!hideTabbarRoutes.includes(router.pathname) && <AnimatedTabBarPro />}
    </ThemeProvider>
  );
}
