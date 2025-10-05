import type { Metadata } from "next";
import { Roboto_Slab, Roboto_Mono  } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const fontserif = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
});

const fontMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joyo Tech ID",
  description: "Our Website Company and Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${fontserif.variable} ${fontMono.variable} antialiased`}
      >
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
