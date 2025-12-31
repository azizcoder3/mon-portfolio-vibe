import ServiceProDetailClient from "@/components/sections/ServiceProDetailClient";
import {
  getProServiceById,
  getRecentProjects,
  getApprovedReviews,
} from "@/lib/actions";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const service = await getProServiceById(id);
  if (!service) return { title: "Service Introuvable" };
  return {
    title: `${service.title} | Aziz Coder3.0`,
    description: service.description,
  };
}

export default async function ServiceProDetailPage(props: PageProps) {
  const params = await props.params;
  const { id } = params;

  // 1. On récupère toutes les données en parallèle
  const [service, projects, reviews] = await Promise.all([
    getProServiceById(id),
    getRecentProjects(),
    getApprovedReviews(),
  ]);

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-950 pt-32 text-center text-white">
        <h1 className="text-2xl font-bold mb-4">Service introuvable</h1>
        <Link
          href="/services-pro"
          className="text-blue-400 hover:underline inline-flex items-center gap-1"
        >
          <ChevronRight className="w-4 h-4 rotate-180" /> Retour au catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-slate-950 pt-28 pb-20">
      <div className="fixed inset-0 z-0 bg-[url('/grid.svg')] opacity-5" />
      <div
        className={`fixed top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 pointer-events-none ${service.category === "wordpress" ? "bg-blue-600" : "bg-purple-600"}`}
      />

      <div className="container mx-auto px-4">
        {/* On passe tout au composant Client */}
        <ServiceProDetailClient
          service={service}
          portfolioProjects={projects || []}
          reviews={reviews || []}
        />
      </div>
    </div>
  );
}
