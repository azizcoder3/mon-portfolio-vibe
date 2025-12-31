"use client";

import Link from "next/link";
import Image from "next/image";
import { Code2, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Accueil", href: "/" },
    { name: "Projets", href: "/projects" },
    { name: "À propos", href: "/about" },
    { name: "Services Pro", href: "/services-pro" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            {/* On remplace le texte par l'image */}
            <div className="relative w-45 h-45">
              {" "}
              {/* Ajuste w-40 selon la largeur voulue */}
              <Image
                src="/logo.png"
                alt="Aziz Coder 3.0"
                fill
                className="object-contain" // Important pour ne pas déformer le logo
                priority
              />
            </div>
          </Link>

          {/* MENU ORDI (Caché sur mobile) */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/quote"
              className="px-5 py-2.5 bg-primary rounded-lg text-sm font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20"
            >
              Demander un devis
            </Link>
          </div>

          {/* BOUTON MOBILE (Burger) */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* MENU MOBILE (Overlay) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 w-full bg-background border-b border-white/10 p-6 md:hidden flex flex-col gap-6 shadow-2xl z-40"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/quote"
              onClick={() => setIsOpen(false)}
              className="py-3 text-center bg-primary rounded-lg font-bold text-white shadow-lg shadow-blue-500/20"
            >
              Demander un devis
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
