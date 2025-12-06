import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

// On charge la police Google "Inter"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio Développeur & AI Specialist",
  description: "Création d'applications web modernes avec l'IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.className} bg-background text-foreground`}>
        {/* La Navbar est ici, elle sera toujours visible */}
        <Navbar />

        {/* {children} représente le contenu de la page active (Accueil, Contact, etc.) */}
        <main>{children}</main>
      </body>
    </html>
  );
}
