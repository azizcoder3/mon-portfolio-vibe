import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

// URL de ton site en production (très important pour les images de partage)
// Remplace par ton URL Vercel finale (ex: https://mon-portfolio.vercel.app)
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mon-portfolio-vibe.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Développeur Web & Expert WordPress | Brazzaville & International",
    template: "%s | Ton Nom/Marque", // Exemple: "Mes Services | Ton Nom"
  },
  description:
    "Développeur Fullstack Next.js et Expert WordPress basé au Congo. Création de sites web performants, applications SaaS et intégration IA. Disponible pour projets internationaux (France, Canada).",
  keywords: [
    "Développeur Web Congo",
    "Expert WordPress Brazzaville",
    "Next.js Freelance",
    "Vibe Coding",
    "Intégration IA",
    "Site E-commerce Afrique",
  ],
  authors: [{ name: "Aziz Coder3.0" }],
  creator: "Aziz Coder3.0",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    title: "Développeur Web & AI Specialist",
    description:
      "Je transforme vos idées en solutions digitales performantes. WordPress, Next.js et IA.",
    siteName: "Portfolio DevAI",
    images: [
      {
        url: "/opengraph-image.png", // Tu devras créer cette image dans le dossier public
        width: 1200,
        height: 630,
        alt: "Portfolio Développeur Web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Développeur Web & AI Specialist",
    description: "Expertise WordPress & Next.js pour vos projets web.",
    images: ["/opengraph-image.png"], // Même image que pour Facebook/LinkedIn
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark scroll-smooth">
      <body className={`${inter.className} bg-[#0F172A] text-white`}>
        <Navbar />
        <main>{children}</main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService", // ou "Person"
              name: "Ton Nom ou Marque",
              image: `${SITE_URL}/opengraph-image.png`,
              description: "Développeur Web Expert WordPress & Next.js",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Brazzaville",
                addressCountry: "CG",
              },
              priceRange: "$$",
              telephone: "+242 066257433", // Ton numéro pro
              url: SITE_URL,
            }),
          }}
        />
        <Footer />
      </body>
    </html>
  );
}
