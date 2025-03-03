import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { WEB_APP_TITLE, WEB_APP_DESCRIPTION } from './Constants';
import { CartProvider } from '@/contexts/CartContext';

// Font configuration using object destructuring
const { className: interClassName } = Inter({ subsets: ['latin'] });

// Using object property shorthand for metadata
export const metadata: Metadata = {
  title: WEB_APP_TITLE,
  description: WEB_APP_DESCRIPTION,
};

// Using destructuring in function parameters
const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>
      {/* Adding Material Icons for the contact page */}
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
    </head>
    <body className={interClassName}>
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

export default RootLayout;
