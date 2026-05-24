import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import Cursor from '@/components/Cursor';
import ScrollToTop from '@/components/ScrollToTop';
import './globals.css';

const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LUCKY GAWLE | The Architect of Vlogs',
  description: 'Creative strategist, scriptwriter, and lead video editor for high-profile creators.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${quicksand.className} antialiased`} suppressHydrationWarning>
        <Cursor />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
