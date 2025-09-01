import { Metadata } from 'next'
import HomePage from './components/HomePage'

export const metadata: Metadata = {
  title: 'estaff - Plataforma de Oportunidades em Hospitalidade | Conectando Profissionais e Empresas',
  description: 'A estaff é a principal plataforma de conexão entre profissionais qualificados e empresas do setor de hospitalidade. Vagas para bares, restaurantes, eventos e hotéis. Junte-se a mais de 143 mil profissionais!',
  keywords: ['hospitalidade', 'vagas', 'profissionais', 'restaurantes', 'hotéis', 'eventos', 'staff', 'trabalho'],
  openGraph: {
    title: 'estaff - Plataforma de Oportunidades em Hospitalidade',
    description: 'A principal plataforma de conexão entre profissionais qualificados e empresas do setor de hospitalidade.',
    url: 'https://estaff.com.br',
    siteName: 'estaff',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://estaff.com.br/og-image.png',
        width: 1200,
        height: 630,
        alt: 'estaff - Plataforma de Hospitalidade',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'estaff - Plataforma de Oportunidades em Hospitalidade',
    description: 'A principal plataforma de conexão entre profissionais qualificados e empresas do setor de hospitalidade.',
    images: ['https://estaff.com.br/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://estaff.com.br',
  },
}

export default function Page() {
  return <HomePage />
}