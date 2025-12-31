import Hero from "@/components/sections/Hero";
import ExpertiseSlider from "@/components/sections/ExpertiseSlider";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedProject, getPortfolioProjects } from "@/lib/actions";
import PortfolioGrid from "@/components/sections/PortfolioGrid";

export const revalidate = 0; // Important pour voir les changements instantanément

export default async function Home() {
  // 1. On récupère le projet vedette
  const featuredProject = await getFeaturedProject();

  // 2. On récupère la grille en EXCLUANT l'ID du projet vedette
  const portfolioProjects = await getPortfolioProjects(featuredProject?.id);

  return (
    <main className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Texture & Gradients */}
      <div className="fixed inset-0 bg-noise opacity-10 pointer-events-none z-0" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-900/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/5 rounded-full blur-[120px] pointer-events-none" />

      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. EXPERTISE SLIDER */}
      <div className="relative z-10">
        <ExpertiseSlider />
      </div>

      {/* 3. PROJET DU MOIS (FEATURED) */}
      {featuredProject && (
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-4 h-4 bg-blue-500/20 rounded-full" />
                <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">
                  Projet du mois
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {featuredProject.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Colonne gauche - Texte */}
              <div className="space-y-8">
                <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-8 backdrop-blur-sm hover:border-slate-700/50 transition-colors">
                  <p className="text-lg text-slate-300 leading-relaxed">
                    {featuredProject.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/projects"
                    className="group relative p-6 bg-slate-900/50 border border-slate-800/50 rounded-xl hover:border-blue-500/30 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <h3 className="font-semibold text-white mb-2">
                      Tous les projets
                    </h3>
                    <p className="text-sm text-slate-400">
                      Explorer mon portfolio
                    </p>
                  </Link>
                  <Link
                    href={`/quote?project=${featuredProject.id}`}
                    className="group relative p-6 bg-slate-900/50 border border-slate-800/50 rounded-xl hover:border-purple-500/30 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <h3 className="font-semibold text-white mb-2">
                      Je veux le même
                    </h3>
                    <p className="text-sm text-slate-400">
                      Démarrer un projet similaire
                    </p>
                  </Link>
                </div>
              </div>

              {/* Colonne droite - Image */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-slate-900/50 border border-slate-800/50 rounded-2xl overflow-hidden">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={
                        featuredProject.image_url || "/images/placeholder.jpg"
                      }
                      alt={featuredProject.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-2 flex-wrap">
                        {featuredProject.stack
                          ?.slice(0, 3)
                          .map((tech: string) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-slate-800/50 text-slate-300 text-sm rounded-lg border border-slate-700/50"
                            >
                              {tech}
                            </span>
                          ))}
                      </div>
                      <div className="text-xs text-slate-500">
                        {featuredProject.category}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. NOUVELLE SECTION : MES CRÉATIONS (Grille) */}
      {/* C'est ICI que s'affiche la grille de tous tes autres projets */}
      <PortfolioGrid projects={portfolioProjects || []} />

      {/* 5. CTA FINAL */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-800/20 border border-slate-800/50 rounded-3xl p-12 overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Prêt à digitaliser
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  votre activité ?
                </span>
              </h2>

              <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Que ce soit pour un devis rapide ou une consultation technique,
                je réponds sous 24h.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/quote"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25"
                >
                  <span className="relative flex items-center gap-2 justify-center">
                    Obtenir mon devis
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="px-8 py-4 bg-slate-900/50 border border-slate-800/50 rounded-xl text-white font-medium hover:border-slate-700/50 hover:bg-slate-900/70 transition-all duration-300"
                >
                  <span className="flex items-center gap-2 justify-center">
                    Me contacter
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
