import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'THE POFSAIT — MIPA 2 | Memories',
  description:
    'Website kenangan kelas MIPA 2 THE POFSAIT. Perjalanan tiga tahun penuh cerita, tawa, perjuangan, dan prestasi.',
  keywords: ['POFSAIT', 'MIPA 2', 'kenangan kelas', 'SMA', 'memories'],
  authors: [{ name: 'THE POFSAIT' }],
  openGraph: {
    title: 'THE POFSAIT — MIPA 2',
    description: 'Memories terbaik bersama keluarga kedua.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans noise-overlay">{children}</body>
    </html>
  );
}