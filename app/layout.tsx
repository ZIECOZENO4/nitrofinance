import type { Metadata } from "next";
import { Darker_Grotesque } from 'next/font/google';
import "./globals.css";
import { Providers } from "./providers";

const darkerGrotesque = Darker_Grotesque({
  subsets: ['latin'],
  variable: '--font-darker-grotesque',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "Kannon",
  description: "The home of digital currency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@300..900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${darkerGrotesque.variable} antialiased bg-black px-4 md:px-[3vw] text-white`}
      >
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}