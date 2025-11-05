// app/ClientProviders.js
'use client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { SessionProvider } from "next-auth/react"

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function ClientProviders({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
