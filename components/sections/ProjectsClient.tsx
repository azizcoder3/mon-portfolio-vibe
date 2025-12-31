"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Layers,
  Code2,
  Zap,
  Rocket,
  Sparkles,
  Filter,
  ChevronDown,
  X,
  ImageOff, // Icône pour image manquante
} from "lucide-react";
import Image from "next/image";
// On importe les types depuis ton dossier centralisé
import { Project, Category } from "@/lib/types";

const CATEGORIES: Category[] = [
  "Tous",
  "E-commerce",
  "App Web / SaaS",
  "Site Vitrine",
  "WordPress",
];

export default function ProjectsClient({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const [activeCategory, setActiveCategory] = useState<Category>("Tous");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filtrage
  const filteredProjects =
    activeCategory === "Tous"
      ? initialProjects
      : initialProjects.filter((p) => p.category === activeCategory);

  // Projets en vedette
  const featuredProjects = initialProjects.filter((p) => p.is_featured);
  // DEBUG TEMPORAIRE
  console.log("Premier projet reçu :", initialProjects[0]);
  return (
    <div className="relative z-10">
      {/* --- HERO SECTION --- */}
      <section className="container mx-auto px-4 py-20 md:py-32 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-4 h-4 bg-blue-500/20 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">
              Portfolio
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Réalisations &
            <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Concepts Techniques
            </span>
          </h1>

          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12">
            Une vitrine de projets complets démontrant mon expertise. Chaque
            projet représente une solution technique aboutie.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-16">
            {[
              {
                value: `${initialProjects.length}+`,
                label: "Projets",
                icon: Layers,
              },
              { value: "100%", label: "Code Propriétaire", icon: Code2 },
              { value: "95+", label: "Performance", icon: Zap },
              { value: "24/7", label: "Dispo", icon: Rocket },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-slate-900/30 border border-slate-800/50 rounded-xl backdrop-blur-sm"
              >
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* --- PROJETS EN VEDETTE --- */}
      {featuredProjects.length > 0 && (
        <section className="container mx-auto px-4 mb-24">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Études de Cas Techniques
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="group relative bg-gradient-to-br from-slate-900/50 to-slate-800/20 border border-slate-800/50 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-slate-700/50 transition-all duration-300"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="inline-flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                    </div>
                    <Sparkles className="w-6 h-6 text-amber-400/50" />
                  </div>

                  <p className="text-slate-300 mb-8 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex gap-3 mt-8 pt-6 border-t border-slate-800/50">
                    <a
                      href={project.demo_url}
                      target="_blank"
                      className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg text-center hover:shadow-lg transition-all"
                    >
                      Voir la démo
                    </a>
                    <a
                      href={project.repo_url}
                      target="_blank"
                      className="p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:bg-slate-700/50 transition-colors"
                    >
                      <Github className="w-5 h-5 text-slate-300" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* --- GALERIE DE PROJETS --- */}
      <section className="container mx-auto px-4 pb-20">
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Toutes mes réalisations
          </h2>

          {/* Filtres Desktop */}
          <div className="hidden md:flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border backdrop-blur-sm ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500/50"
                    : "bg-slate-800/30 border-slate-700/50 text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filtre Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
            >
              <Filter className="w-4 h-4" /> Filtres{" "}
              <ChevronDown className="w-4 h-4" />
            </button>
            {isFilterOpen && (
              <div className="mt-2 flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setIsFilterOpen(false);
                    }}
                    className="px-3 py-1 bg-slate-800 rounded text-sm text-slate-300"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Grille Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative bg-slate-900/50 border border-slate-800/50 rounded-2xl overflow-hidden cursor-pointer hover:border-slate-700/50 transition-all"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-800">
                  {project.image_url ? (
                    <Image
                      src={project.image_url || ""}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500">
                      <ImageOff className="w-8 h-8 mb-2" />
                      <span className="text-xs">Image manquante</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-2 py-1 bg-black/70 backdrop-blur-md text-xs text-white rounded border border-white/10">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.stack
                      ?.slice(0, 3)
                      .map((tech: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-slate-800/50 text-slate-300 rounded border border-slate-700/50"
                        >
                          {tech}
                        </span>
                      ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-slate-800/50 rounded-lg hover:bg-slate-700 text-slate-400 z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-64 w-full bg-slate-800">
                {selectedProject.image_url ? (
                  <Image
                    src={selectedProject.image_url || ""}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-500">
                    <ImageOff className="w-12 h-12" />
                  </div>
                )}
              </div>

              <div className="p-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  {selectedProject.title}
                </h2>
                <p className="text-slate-300 mb-6">
                  {selectedProject.long_description ||
                    selectedProject.description}
                </p>

                {/* Metrics (Optionnel si pas en BDD) */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {selectedProject.metrics?.performance || 95}%
                    </div>
                    <div className="text-xs text-slate-400">Performance</div>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {selectedProject.metrics?.complexity || 80}%
                    </div>
                    <div className="text-xs text-slate-400">Complexité</div>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {selectedProject.metrics?.innovation || 90}%
                    </div>
                    <div className="text-xs text-slate-400">Innovation</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <a
                    href={selectedProject.demo_url}
                    target="_blank"
                    className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-lg text-center hover:bg-blue-700 transition-colors"
                  >
                    Voir le site
                  </a>
                  <a
                    href={selectedProject.repo_url}
                    target="_blank"
                    className="flex-1 py-3 border border-slate-700 text-white font-bold rounded-lg text-center hover:bg-slate-800 transition-colors"
                  >
                    Code Source
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
