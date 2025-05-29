import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import ClientAlerts from "../components/ClientAlerts";

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
        <ClientAlerts />
      </body>
    </html>
  );
}
