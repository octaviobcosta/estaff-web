import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'estaff - Conectando Talentos',
  description: 'Plataforma de conexão entre freelancers e empresas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${dmSans.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}