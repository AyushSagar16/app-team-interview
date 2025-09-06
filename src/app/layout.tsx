import type { Metadata } from "next";
import { Open_Sans, Poppins, Roboto, Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartUI from "../components/CartUI";
import { CartProvider } from "../context/CartContext";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Green Thumb - Plant Shop",
  description: "Find the perfect plant for your space",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${poppins.variable} ${roboto.variable} ${inter.variable} antialiased`}
      >
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <CartUI />
        </CartProvider>
      </body>
    </html>
  );
}
