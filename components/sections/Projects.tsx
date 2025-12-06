"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Code2, Layers } from "lucide-react";
import Image from "next/image";

// --- DONNÉES DES PROJETS (Exemples Pros) ---
const projects = [
  {
    id: 1,
    title: "Lygos Market V2",
    category: "E-commerce",
    image:
      "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=800&auto=format&fit=crop",
    description:
      "Plateforme de vente en ligne multi-vendeurs avec paiement mobile intégré.",
    longDescription:
      "Refonte complète d'une marketplace africaine. Intégration de l'API Lygos pour les paiements Mobile Money (Airtel/MTN). Dashboard vendeur en temps réel et optimisation SEO avancée.",
    stack: ["Next.js 14", "Supabase", "Lygos API", "Zustand"],
    demo: "#",
    github: "#",
  },
  {
    id: 2,
    title: "DocuChat AI",
    category: "IA & SaaS",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    description:
      "SaaS permettant d'interroger des documents PDF volumineux via une interface chat.",
    longDescription:
      "Application RAG (Retrieval-Augmented Generation) utilisant l'API OpenAI et Pinecone. Permet aux entreprises d'analyser leurs contrats juridiques en quelques secondes.",
    stack: ["React", "OpenAI API", "Pinecone", "Tailwind"],
    demo: "#",
    github: "#",
  },
  {
    id: 3,
    title: "ImmoPrestige",
    category: "Site Vitrine",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
    description: "Site immobilier haut de gamme avec visites virtuelles 3D.",
    longDescription:
      "Site vitrine ultra-rapide (Score Lighthouse 100). Intégration de Matterport pour les visites 3D et formulaire de prise de rendez-vous connecté au CRM du client.",
    stack: ["Next.js", "Framer Motion", "Resend", "Sanity CMS"],
    demo: "#",
    github: "#",
  },
  {
    id: 4,
    title: "FinTrack Dashboard",
    category: "App Web",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    description:
      "Tableau de bord financier pour PME avec visualisation de données.",
    longDescription:
      "Outil de gestion de trésorerie. Graphiques interactifs avec Recharts, export comptable automatisé et gestion des rôles utilisateurs (RBAC).",
    stack: ["TypeScript", "Recharts", "Supabase Auth", "Shadcn UI"],
    demo: "#",
    github: "#",
  },
];

// Catégories pour le filtre
const categories = [
  "Tous",
  "E-commerce",
  "IA & SaaS",
  "Site Vitrine",
  "App Web",
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  // Filtrage des projets
  const filteredProjects = projects.filter((project) =>
    activeCategory === "Tous" ? true : project.category === activeCategory
  );

  return (
    <section id="projects" className="py-20 bg-dark relative">
      <div className="container mx-auto px-4">
        {/* EN-TÊTE DE SECTION */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Réalisations <span className="text-primary">&</span> Cas Clients
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Une sélection de projets conçus avec précision, alliant performance
            technique et design impactant.
          </p>
        </div>

        {/* BARRE DE FILTRES */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-primary border-primary text-white shadow-lg shadow-blue-500/25"
                  : "bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRILLE DE PROJETS */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-glass border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Badge Catégorie */}
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-xs text-white">
                    {project.category}
                  </div>
                </div>

                {/* Contenu Card */}
                <div className="p-6 relative z-20">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="text-xs px-2 py-1 text-gray-500">
                        + {project.stack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* MODALE (POPUP) DÉTAILS */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-[#0F172A] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()} // Empêche la fermeture si on clique DANS la modale
            >
              {/* Bouton Fermer */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-white/20 transition-colors z-50"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Image Header */}
              <div className="relative h-64 md:h-80 w-full">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0F172A] via-transparent to-transparent"></div>
              </div>

              {/* Contenu Modale */}
              <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {selectedProject.title}
                    </h2>
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/20">
                      {selectedProject.category}
                    </span>
                  </div>

                  {/* Boutons Actions */}
                  <div className="flex gap-3">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10 flex items-center gap-2"
                    >
                      <Github className="w-5 h-5" />
                      <span className="hidden sm:inline">Code</span>
                    </a>
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      className="p-3 bg-primary rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 font-bold shadow-lg shadow-blue-500/20"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span className="hidden sm:inline">Voir le site</span>
                    </a>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {/* Colonne Gauche : Description */}
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-primary" />À propos du
                        projet
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {selectedProject.longDescription}
                      </p>
                    </div>
                  </div>

                  {/* Colonne Droite : Tech Stack */}
                  <div className="bg-white/5 p-6 rounded-xl border border-white/5 h-fit">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-primary" />
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-black/40 rounded-lg text-sm text-gray-300 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
