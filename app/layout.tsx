import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { AuthProvider } from "./infrastructure/auth/auth.context";
import { Toaster } from "sonner";

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
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <AuthProvider>

          {children}
          <Toaster/>
        </AuthProvider>

      </body>
    </html>
  );
}
