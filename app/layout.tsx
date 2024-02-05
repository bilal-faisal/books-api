import './globals.css'

export const metadata = {
  title: 'Books API',
  description: 'Reserve your favorite books with ease.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
