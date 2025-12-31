"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2, Layout } from "lucide-react";
import Image from "next/image";
import { Project } from "@/lib/types";

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="py-20 relative z-10 border-t border-slate-800/50 bg-slate-950">
      <div className="container mx-auto px-4">
        {/* En-tête de section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-4 h-4 bg-cyan-500/20 rounded-full" />
            <span className="text-sm font-medium text-cyan-400 uppercase tracking-wider">
              Mes Réalisations
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Une variété de solutions <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              pour chaque besoin
            </span>
          </h2>
          <p className="text-slate-400 text-lg">
            De la plateforme e-commerce complexe au site vitrine élégant pour un
            hôtel. Découvrez comment j&apos;utilise la technologie adaptée
            (WordPress ou VibeCode) pour chaque projet.
          </p>
        </div>

        {/* Grille des Projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300"
            >
              {/* Image avec effet de zoom */}
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={project.image_url || "/images/placeholder.jpg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay Technologies */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-xs font-bold text-white rounded-lg border border-white/10 flex items-center gap-2">
                    {project.category === "WordPress" ? (
                      <Layout className="w-3 h-3" />
                    ) : (
                      <Code2 className="w-3 h-3" />
                    )}
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-slate-400 text-sm mb-6 flex-1 leading-relaxed">
                  {project.description}
                </p>

                {/* Stack & Bouton */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-auto">
                  <div className="flex -space-x-2 overflow-hidden">
                    {/* On affiche juste des petits ronds pour la stack pour ne pas surcharger */}
                    {project.stack?.slice(0, 4).map((tech, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] text-slate-300 font-bold uppercase"
                        title={tech}
                      >
                        {tech.substring(0, 2)}
                      </div>
                    ))}
                  </div>

                  <a
                    href={project.demo_url}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
                  >
                    Voir le site <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
