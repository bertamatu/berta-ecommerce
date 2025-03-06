import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { WEB_APP_TITLE, WEB_APP_DESCRIPTION } from './Constants';
import { CartProvider } from '@/contexts/CartContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { A11yCheckerWrapper } from '@/components/A11yCheckerWrapper';

// Font configuration - must be assigned to a variable directly
const inter = Inter({ subsets: ['latin'] });

// Using object property shorthand for metadata
export const metadata: Metadata = {
  title: WEB_APP_TITLE,
  description: WEB_APP_DESCRIPTION,
};

// Using destructuring in function parameters
const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={inter.className}>
      <CartProvider>
        <ToastProvider>
          {/* A11yCheckerWrapper will internally decide whether to run the checker */}
          <A11yCheckerWrapper>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="mb-14 flex-1 md:my-0">{children}</main>
              <Footer />
            </div>
          </A11yCheckerWrapper>
        </ToastProvider>
      </CartProvider>
    </body>
  </html>
);

export default RootLayout;
