import { inter } from '@/styles/fonts';
import type { Metadata } from 'next';
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
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
