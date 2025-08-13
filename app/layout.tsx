import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";
//import ClientAlerts from "../components/ClientAlerts";
import ConditionalFloatingChat from "@/components/ConditionalFloatingChat";

const outfit = Outfit({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Ribello - Menú Digital",
  description: "Menú Digital del Restaurante Ribello - Bistró & Cocktails",
  icons: {
    icon: [
      { url: '/images/Logos/favicon.ico', sizes: 'any' },
      { url: '/images/Logos/favicon-16x16.png', sizes: '16x16' },
      { url: '/images/Logos/favicon-32x32.png', sizes: '32x32' },
    ],
    apple: { url: '/images/Logos/apple-touch-icon.png', sizes: '180x180' }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${outfit.className} bg-black text-white min-h-screen flex flex-col`}
      >
        {children}
        {/*        <ClientAlerts /> */}
        <ConditionalFloatingChat />
        
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a1a',
              color: '#D4AF37',
              border: '1px solid #D4AF37',
              borderRadius: '8px',
              fontSize: '14px',
            },
            success: {
              style: {
                background: '#1a1a1a',
                color: '#10B981',
                border: '1px solid #10B981',
              },
              iconTheme: {
                primary: '#10B981',
                secondary: '#1a1a1a',
              },
            },
            error: {
              style: {
                background: '#1a1a1a',
                color: '#EF4444',
                border: '1px solid #EF4444',
              },
              iconTheme: {
                primary: '#EF4444',
                secondary: '#1a1a1a',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
