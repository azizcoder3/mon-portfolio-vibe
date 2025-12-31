// components/sections/Hero.tsx - CONTENU PROFESSIONNEL MIS À JOUR
"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    // 1. SECTION : On garde flex-col pour empiler (Haut - Milieu - Bas)
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* --- BACKGROUND (Inchangé) --- */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/70 to-slate-900/60">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>
      </div>

      {/* Orbes (Inchangé) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* 
         2. CONTENEUR PRINCIPAL (C'est ici qu'on centre) 
         - flex-grow : Prend tout l'espace disponible
         - flex-col justify-center : Centre verticalement le contenu
         - pt-20 : Ajoute un peu d'espace en haut pour compenser la Navbar visuellement
      */}
      <div className="container mx-auto px-4 relative z-10 flex-grow flex flex-col justify-center pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          {/* COLONNE GAUCHE (Texte) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-green-400 uppercase tracking-wide">
                Disponible pour projets
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
              Développeur Web <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Nouvelle Génération
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Je combine la flexibilité de <strong>WordPress</strong> et la
              puissance de <strong>Next.js</strong> pour créer des sites web
              modernes, boostés par l&apos;IA.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
              <Link
                href="/projects"
                className="group relative px-8 py-4 bg-blue-600 rounded-xl text-white font-bold overflow-hidden transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <span className="relative flex items-center gap-2 justify-center">
                  Voir mes réalisations
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>

              <Link
                href="/quote"
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Demander un devis
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500" /> Expert
                WordPress
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-500" /> Next.js &
                React
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500" /> Vibe Coding
              </span>
            </div>
          </motion.div>

          {/* COLONNE DROITE (Image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 animate-pulse" />

              <div className="relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <div className="h-8 bg-slate-950 flex items-center px-4 gap-2 border-b border-slate-800">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20" />
                </div>

                <div className="aspect-[4/5] relative">
                  <Image
                    src="/images/pro-aziz.png"
                    alt="Développeur Web"
                    fill
                    className="object-cover"
                    priority
                  />

                  <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-slate-800 flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white font-bold ring-2 ring-slate-900">
                        W
                      </div>
                      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-xs text-white font-bold ring-2 ring-slate-900">
                        N
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">
                        Dual Expert
                      </p>
                      <p className="text-[10px] text-slate-400">CMS & Code</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. BARRE DE STATS (Reste en bas grâce à flex-grow du milieu) */}
      <div className="w-full relative z-10 border-t border-white/5 bg-slate-900/30 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Projets Réalisés", value: "50+" },
              { label: "Satisfaction Client", value: "100%" },
              { label: "Score Performance", value: "95+" },
              { label: "Solutions Créatives", value: "∞" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
