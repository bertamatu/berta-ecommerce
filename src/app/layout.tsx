import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { WEB_APP_DESCRIPTION, WEB_APP_TITLE } from './Constants';
import { CartProvider } from '@/contexts/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: WEB_APP_TITLE,
  description: WEB_APP_DESCRIPTION,
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="mb-14 flex-1 md:my-0">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
};

export default RootLayout;
