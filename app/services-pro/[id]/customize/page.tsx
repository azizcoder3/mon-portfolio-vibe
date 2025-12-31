import CustomizeOrderClient from "@/components/sections/CustomizeOrderClient";
import { getProServiceById, getServiceOptions } from "@/lib/actions";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CustomizePage(props: PageProps) {
  const params = await props.params;
  const { id } = params;

  // Récupération parallèle
  const [service, options] = await Promise.all([
    getProServiceById(id),
    getServiceOptions(id),
  ]);

  if (!service)
    return (
      <div className="text-white pt-32 text-center">Service introuvable</div>
    );

  return (
    <div className="min-h-screen bg-[#0F172A] pt-28 pb-20">
      {/* Background */}
      <div className="fixed inset-0 z-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header simple */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/services-pro" className="hover:text-white">
              Services
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/services-pro/${id}`} className="hover:text-white">
              {service.title}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-blue-400">Personnalisation</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Personnalisez votre forfait
          </h1>
        </div>

        {/* Le composant interactif */}
        <CustomizeOrderClient service={service} options={options || []} />
      </div>
    </div>
  );
}
