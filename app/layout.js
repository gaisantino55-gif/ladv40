import Script from 'next/script';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import UserSync from '../components/UserSync';
import { CartProvider } from '../context/CartContext';
import '../styles/globals.css';

export const metadata = {
  title: 'GAAB Solutions | Electronics Store',
  description: 'Electronics store built with Next.js app router.',
  icons: {
    icon: '/images/logo.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <style>{`
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }
        `}</style>
        <Script id="tailwind-config" strategy="beforeInteractive">
          {`tailwind.config = {
            theme: {
              extend: {
                colors: {
                  primary: '#059669', // emerald-600
                  secondary: '#10b981', // emerald-500
                  emerald-500: '#34d399', // emerald-400
                  background: '#f0faf4',
                },
                fontFamily: {
                  body: ['Inter', 'sans-serif'],
                  display: ['Manrope', 'sans-serif'],
                },
              },
            },
          }`}
        </Script>
        <Script
          src="https://cdn.tailwindcss.com?plugins=forms,container-queries"
          strategy="beforeInteractive"
        />
      </head>
      <body className="antialiased bg-[#f0faf4]" style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #f0fdf4 100%)', minHeight: '100vh' }}>
        <ClerkProvider>
          <CartProvider>
            <UserSync />
            <Navbar />
            <div className="pb-[72px] md:pb-0 flex flex-col min-h-[calc(100vh-80px)]">
              {children}
              <Footer />
            </div>
            <MobileBottomNav />
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
