// app/projects/page.tsx
import ProjectsClient from "@/components/sections/ProjectsClient";
import { getProjects } from "@/lib/actions";

// --- CORRECTION ICI : On garde uniquement la metadata statique ---
export const metadata = {
  title: "Projets & Réalisations | Portfolio",
  description:
    "Découvrez mes derniers projets web, applications SaaS et intégrations IA.",
  openGraph: {
    title: "Projets & Réalisations | Portfolio",
    description:
      "Découvrez mes derniers projets web, applications SaaS et intégrations IA.",
    // Tu peux mettre une image par défaut ici si tu veux
  },
};

// Ceci est un Server Component par défaut
export default async function ProjectsPage() {
  // 1. On récupère les données depuis Supabase (Côté Serveur)
  const projects = await getProjects();

  return (
    <div className="min-h-screen relative bg-slate-950 pt-20">
      {/* Background avec textures */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      {/* 2. On passe les données au composant Client */}
      {/* On s'assure de passer un tableau vide si projects est null */}
      <ProjectsClient initialProjects={projects || []} />
    </div>
  );
}
