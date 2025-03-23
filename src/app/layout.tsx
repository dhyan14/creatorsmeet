import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Creators Meet',
  description: 'A platform for creators to meet challenges and earn points',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-emerald-50`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
