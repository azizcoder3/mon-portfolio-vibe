// components/sections/ExpertiseSlider.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  LayoutTemplate,
  Code,
  Atom,
  Layers,
  SearchCheck,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

// --- DONNÉES EXACTES DE TA DEMANDE ---
const EXPERTISES = [
  {
    id: 1,
    title: "Sites WordPress Clé en Main",
    icon: LayoutTemplate,
    color: "text-blue-400",
    borderColor: "border-blue-500/30",
    bgColor: "bg-blue-500/10",
    gradient: "from-blue-500/20 to-blue-600/10",
    description:
      "Création de sites performants et administrables avec WordPress.",
    points: [
      "Design personnalisé et responsive",
      "Interface d'administration intuitive (back-office)",
      "Référencement SEO intégré",
      "Formation à la gestion de contenu",
    ],
    noteType: "warning",
    noteTitle: "À noter :",
    noteText:
      "Ce type de site nécessite des mises à jour régulières (plugins, thème, sécurité) pour rester optimal et sécurisé.",
  },
  {
    id: 2,
    title: "Sites Web Ultra-Rapides & Sécurisés",
    icon: Code,
    color: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    bgColor: "bg-emerald-500/10",
    gradient: "from-emerald-500/20 to-emerald-600/10",
    description:
      "Développement sur-mesure de sites légers, robustes et sans dépendances (HTML/CSS/JS).",
    points: [
      "Vitesse d'exécution maximale (Performance)",
      "Sécurité renforcée (Surface d'attaque réduite)",
      "Maintenance minimale (Pas de plugins)",
      "Hébergement économique et simple",
      "Code 100% propriétaire et transparent",
    ],
    noteType: "success",
    noteTitle: "Le bon choix pour :",
    noteText:
      "Un site vitrine rapide comme l'éclair, durable, et sans frais ou soucis de maintenance récurrents.",
  },
  {
    id: 3,
    title: "Applications Dynamiques (React/Next.js)",
    icon: Atom,
    color: "text-cyan-400",
    borderColor: "border-cyan-500/30",
    bgColor: "bg-cyan-500/10",
    gradient: "from-cyan-500/20 to-cyan-600/10",
    description:
      "Développement d'interfaces utilisateur réactives et d'applications web performantes.",
    points: [
      "Expérience utilisateur (UX) fluide et interactive",
      "Performances optimisées (Rendu serveur)",
      "Code modulaire et maintenable",
      "Idéal pour tableaux de bord et apps métier",
    ],
    noteType: "vibe",
    noteTitle: "Mon approche Vibe Coding :",
    noteText:
      "Un processus créatif et fluide, où l'idée se transforme directement en code fonctionnel et élégant.",
  },
  {
    id: 4,
    title: "Design Systems & Applications SaaS",
    icon: Layers,
    color: "text-purple-400",
    borderColor: "border-purple-500/30",
    bgColor: "bg-purple-500/10",
    gradient: "from-purple-500/20 to-purple-600/10",
    description:
      "Conception de systèmes de composants réutilisables et d'applications SaaS évolutives.",
    points: [
      "Cohérence design à grande échelle",
      "Architecture scalable pour produits numériques",
      "Intégration de bases de données et API",
      "Accélération du temps de mise sur le marché",
    ],
    noteType: "vibe",
    noteTitle: "Fait avec :",
    noteText:
      "Next.js, React et une approche 'Vibe Coding' pour un développement aligné sur la vision produit.",
  },
  {
    id: 5,
    title: "Audit & Refonte",
    icon: SearchCheck,
    color: "text-amber-400",
    borderColor: "border-amber-500/30",
    bgColor: "bg-amber-500/10",
    gradient: "from-amber-500/20 to-amber-600/10",
    description:
      "Analyse approfondie de l'existant pour améliorer performance, sécurité et conversion.",
    points: [
      "Audit de performance (Core Web Vitals)",
      "Analyse de sécurité et failles",
      "Refonte UX/UI moderne",
      "Migration vers des technos actuelles",
    ],
    noteType: "info",
    noteTitle: "Objectif :",
    noteText:
      "Donner une seconde vie à votre projet existant avec les standards d'aujourd'hui.",
  },
];

export default function ExpertiseSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideLeft = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + EXPERTISES.length) % EXPERTISES.length);
  };

  const slideRight = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % EXPERTISES.length);
  };

  const goToSlide = (i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  // Variantes d'animation
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const currentExp = EXPERTISES[index];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background avec gradient et texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Titre Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-4 h-4 bg-blue-500/20 rounded-full" />
            <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">
              Expertise
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mes Domaines d&apos;
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Expertise
            </span>
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Une solution technique précise pour chaque besoin. Choisissez la
            technologie adaptée à vos objectifs.
          </p>
        </div>

        {/* CONTAINER SLIDER */}
        <div className="relative max-w-5xl mx-auto">
          {/* Flèches de navigation */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={slideLeft}
              className="group p-3 rounded-xl bg-slate-900/30 border border-slate-800/50 hover:border-blue-500/30 transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-white" />
            </button>

            <div className="flex gap-2">
              {EXPERTISES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === index
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 w-8"
                      : "bg-slate-800 w-3 hover:bg-slate-700"
                  }`}
                  aria-label={`Aller à l'expertise ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={slideRight}
              className="group p-3 rounded-xl bg-slate-900/30 border border-slate-800/50 hover:border-blue-500/30 transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white" />
            </button>
          </div>

          {/* Zone de la carte */}
          <div className="relative h-[550px] perspective-1000">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute w-full h-full flex justify-center items-center"
              >
                {/* Carte d'expertise */}
                <div className="w-full max-w-3xl">
                  {/* En-tête de la carte */}
                  <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`p-4 rounded-2xl ${currentExp.bgColor} ${currentExp.borderColor} border`}
                      >
                        <currentExp.icon
                          className={`w-8 h-8 ${currentExp.color}`}
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">
                          {currentExp.title}
                        </h3>
                        <div
                          className={`h-1 w-16 rounded-full mt-3 bg-gradient-to-r ${currentExp.gradient}`}
                        />
                      </div>
                    </div>

                    <p className="text-lg text-slate-300 italic pl-4 border-l-2 border-slate-800/50">
                      &quot;{currentExp.description}&quot;
                    </p>
                  </div>

                  {/* Grille Bento pour les points */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {currentExp.points.map((point, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group flex items-start gap-3 p-4 bg-slate-900/30 rounded-xl border border-slate-800/50 hover:border-slate-700/50 transition-all duration-300"
                      >
                        <CheckCircle2
                          className={`w-5 h-5 mt-0.5 ${currentExp.color}`}
                        />
                        <span className="text-slate-300 group-hover:text-white transition-colors">
                          {point}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Note d'expertise */}
                  <div
                    className={`relative p-6 rounded-2xl overflow-hidden border ${currentExp.borderColor}`}
                  >
                    {/* Gradient background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${currentExp.gradient} opacity-10`}
                    />

                    <div className="relative flex items-start gap-4">
                      <div className="shrink-0">
                        {currentExp.noteType === "warning" && (
                          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                            <AlertCircle className="w-6 h-6 text-amber-400" />
                          </div>
                        )}
                        {currentExp.noteType === "success" && (
                          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                            <ShieldCheck className="w-6 h-6 text-emerald-400" />
                          </div>
                        )}
                        {currentExp.noteType === "vibe" && (
                          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                            <Lightbulb className="w-6 h-6 text-purple-400" />
                          </div>
                        )}
                        {currentExp.noteType === "info" && (
                          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                            <SearchCheck className="w-6 h-6 text-cyan-400" />
                          </div>
                        )}
                      </div>

                      <div>
                        <h4 className="font-bold text-white mb-2 text-lg">
                          {currentExp.noteTitle}
                        </h4>
                        <p className="text-slate-300">{currentExp.noteText}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bouton d'action */}
                  <div className="mt-8 text-center">
                    <button className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300">
                      En savoir plus
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation mobile */}
          <div className="flex justify-center gap-8 mt-8 md:hidden">
            <button
              onClick={slideLeft}
              className="p-3 rounded-xl bg-slate-900/30 border border-slate-800/50 hover:border-blue-500/30 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-slate-400" />
            </button>

            <div className="flex items-center gap-2">
              {EXPERTISES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === index ? "bg-white" : "bg-slate-700"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={slideRight}
              className="p-3 rounded-xl bg-slate-900/30 border border-slate-800/50 hover:border-blue-500/30 transition-all"
            >
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Indicateur de progression */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-slate-500">
              <span className="font-medium text-white">{index + 1}</span>
              <span className="text-slate-600">/</span>
              <span>{EXPERTISES.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
