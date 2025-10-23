import { ClientErrorBoundary } from '@/components/client-error-boundary';
import { ReactQueryClientProvider } from '@/providers/query-provider';
import { inter } from '@/styles/fonts';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Bazara Technologies | Innovate - Engineer - Transform',
  description:
    "Empowering Digital Transformation through Advanced Platforms, AI, and Hybrid Cloud and transform your business with Bazara's cutting-edge solutions"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
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
