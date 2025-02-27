import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { WEB_APP_DESCRIPTION, WEB_APP_TITLE } from './Constants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: WEB_APP_TITLE,
  description: WEB_APP_DESCRIPTION,
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 md:mt-0 mb-14 md:mb-0">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
