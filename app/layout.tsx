'use client';

import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head>
        <title>SitoFacile - Crea il tuo sito in 5 minuti</title>
        <meta name="description" content="Creazione automatica di siti web professionali per ristoranti, negozi e professionisti italiani" />
      </head>
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
