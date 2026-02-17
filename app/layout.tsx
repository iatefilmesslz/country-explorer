import "./globals.css";

import type { Metadata } from "next";
import { Sora } from "next/font/google";
import Navbar from "./components/Navbar";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Country Explorer",
  description: "Mini app de países con Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={sora.className} suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
