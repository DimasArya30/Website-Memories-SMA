import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Sora } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'THE POFSAIT — MIPA 2 SMANEKA | Memories',
  description:
    'Website kenangan kelas MIPA 2 SMANEKA THE POFSAIT. Perjalanan tiga tahun penuh cerita, tawa, perjuangan, dan prestasi.',
  keywords: ['POFSAIT', 'MIPA 2', 'SMANEKA', 'kenangan kelas', 'SMA', 'memories'],
  authors: [{ name: 'THE POFSAIT' }],
  openGraph: {
    title: 'THE POFSAIT — MIPA 2 SMANEKA',
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
    <html lang="id" className={`${jakarta.variable} ${sora.variable}`}>
      <body className="font-sans noise-overlay">{children}</body>
    </html>
  );
}