import './globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Caic - Pizzaria',
  description: 'A melhor pizzaria',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              backgroundColor: '#f1f1f1',
              color: '#131313',
              borderColor: "rgba(255, 255, 255, 0.5)",
            },
          }}
        />
        {children}
      </body>
    </html>
  )
}
