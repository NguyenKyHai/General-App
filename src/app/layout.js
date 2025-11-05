'use client';

import ClientProviders from './ClientProviders';
import ToastifyContainer from '@/components/ToastifyContainer';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <>
      <html lang='vi'>
        <head>
          <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        </head>
        <body>
          <ClientProviders>{children}</ClientProviders>
          <ToastifyContainer />
        </body>
      </html>
    </>
  );
}
