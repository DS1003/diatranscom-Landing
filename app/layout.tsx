import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Diatranscom | L'Excellence en BTP & Génie Civil au Sénégal",
  description: "Solutions d'ingénierie avancées en assainissement et terrassement. Nous bâtissons l'avenir des infrastructures sénégalaises avec rigueur et innovation.",
  keywords: ["BTP", "Génie Civil", "Assainissement", "Terrassement", "Enrochement", "Construction", "Sénégal", "Keur Massar", "Dakar"],
};

import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased min-h-screen flex flex-col`}>
        {children}
        <Toaster theme="dark" position="bottom-right" richColors />
      </body>
    </html>
  );
}
