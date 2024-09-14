import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "NFA. Finance for the rest of us",
  description: "We're not financial advice. We're financial tools.",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <html lang="en">
        <body
          className={`${inter.className} antialiased`}
        >
          {children}
        </body>
      </html>
    </UserProvider>
  );
}
