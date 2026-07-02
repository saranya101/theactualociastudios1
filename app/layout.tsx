import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import HashResetOnLoad from "./components/HashResetOnLoad";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "OCIA Studios",
  description: "OCIA Studios parallax hero prototype.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.variable}>
        <HashResetOnLoad />
        {children}
      </body>
    </html>
  );
}
