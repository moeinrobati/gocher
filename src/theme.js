'use client'
import { createTheme } from '@mui/material/styles';

// فونت دلخواه که در CSS تعریف شده (مثلاً fonts.css)
const theme = createTheme({
  typography: {
    fontFamily: 'MyFont, Roboto, Arial, sans-serif',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
