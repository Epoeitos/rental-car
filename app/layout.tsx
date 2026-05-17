import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import 'modern-normalize';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanstackProvider/TanstackProvider';

const manrope = Manrope({
  variable: '--font-family',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--second-family',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'RentalCar',
  description: 'Car rental website home page',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      
      <body>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
        </TanStackProvider> 
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
