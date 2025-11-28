export const metadata = {
  title: 'SitoFacile - Il Tuo Sito in 5 Minuti',
  description: 'Crea il tuo sito web professionale in pochi minuti',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
