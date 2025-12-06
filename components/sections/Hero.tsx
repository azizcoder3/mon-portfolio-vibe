"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 1. BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          {/* Pour l'instant j'ai mis une vidéo tech par défaut. 
              Quand tu auras ta vidéo, change src par : "/hero-bg.mp4" */}
          <source
            // src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-blue-circuit-board-989-large.mp4"
            src="/videos/hero-bg.mp4"
            type="video/mp4"
          />
        </video>
        {/* Overlay sombre pour la lisibilité */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]"></div>

        {/* Gradient subtil en bas pour fondre avec la section suivante */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-background to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 z-10 pt-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* 2. COLONNE GAUCHE : TEXTE */}
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-medium mb-6 text-primary border-primary/30">
              <Sparkles className="w-3 h-3" />
              <span>Disponible pour de nouveaux projets</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Je transforme vos idées en <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-purple-400 to-secondary">
                Réalité Numérique
              </span>
            </h1>

            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Développeur Fullstack & Expert IA. Je combine créativité technique
              et intelligence artificielle pour livrer des applications web
              ultra-rapides et modernes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/projects"
                className="px-8 py-4 rounded-lg bg-primary hover:bg-blue-600 transition-all font-bold shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
              >
                Voir mes projets
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/cv.pdf"
                target="_blank"
                className="px-8 py-4 rounded-lg glass-panel hover:bg-white/10 transition-all flex items-center justify-center gap-2 font-medium border border-white/10"
              >
                Télécharger CV
                <Download className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* 3. COLONNE DROITE : TA PHOTO */}
          <motion.div
            className="flex-1 relative flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Effet de lueur derrière toi */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/40 rounded-full blur-[100px] animate-pulse"></div>

            <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
              {/* Cadre style "Tech" autour de la photo */}
              <svg
                className="absolute inset-0 w-full h-full rotate-animation spin-slow opacity-30"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  fill="none"
                  className="text-primary"
                  strokeDasharray="10 5"
                />
              </svg>

              {/* IMAGE DU DÉVELOPPEUR */}
              {/* Note: Remplace src par "/dev-profile.png" quand tu auras mis ta photo dans public */}
              <Image
                // src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80"
                src="/images/dev-profile.png"
                alt="Portrait Développeur"
                fill
                className="object-cover rounded-full border-4 border-white/10 shadow-2xl relative z-10"
                priority
              />

              {/* Badge flottant "Expérience" */}
              <motion.div
                className="absolute bottom-10 -left-4 z-20 glass-panel p-4 rounded-xl border-l-4 border-l-primary flex items-center gap-3"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
              >
                <div className="bg-primary/20 p-2 rounded-lg">
                  <span className="text-2xl font-bold text-white">5+</span>
                </div>
                <div className="text-sm">
                  <p className="text-gray-400">Années d&apos;</p>
                  <p className="font-bold text-white">Expérience</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
