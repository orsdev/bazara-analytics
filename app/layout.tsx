import { ClientErrorBoundary } from '@/components/client-error-boundary';
import { ReactQueryClientProvider } from '@/providers/query-provider';
import { inter } from '@/styles/fonts';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Bazara Technologies | Innovate - Engineer - Transform',
    template: '%s | Bazara Technologies'
  },
  description:
    "Empowering Digital Transformation through Advanced Platforms, AI, and Hybrid Cloud and transform your business with Bazara's cutting-edge solutions",
  keywords: [
    'Digital Transformation',
    'AI',
    'Hybrid Cloud',
    'Analytics Dashboard',
    'Enterprise Solutions'
  ],
  authors: [{ name: 'Bazara Technologies' }],
  creator: 'Bazara Technologies',
  publisher: 'Bazara Technologies',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico'
  },
  openGraph: {
    title: 'Bazara Technologies | Innovate - Engineer - Transform',
    description:
      'Empowering Digital Transformation through Advanced Platforms, AI, and Hybrid Cloud',
    type: 'website',
    locale: 'en_US',
    siteName: 'Bazara Technologies'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bazara Technologies',
    description:
      'Empowering Digital Transformation through Advanced Platforms, AI, and Hybrid Cloud'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  alternates: {
    canonical: 'https://bazara-analytics.vercel.app/dashboard'
  },
  category: 'technology'
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <ClientErrorBoundary>
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </ClientErrorBoundary>
        <Toaster
          toastOptions={{
            duration: 6000
          }}
        />
      </body>
    </html>
  );
}
