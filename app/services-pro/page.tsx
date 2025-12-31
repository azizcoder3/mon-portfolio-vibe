import Link from "next/link";
import Image from "next/image";
import { getProServices, getApprovedReviews } from "@/lib/actions";
import {
  ArrowRight,
  Check,
  Code2,
  LayoutTemplate,
  Users,
  Zap,
  Clock,
  Rocket,
  Star,
  Quote,
} from "lucide-react";

// --- INTERFACES ---
interface ProService {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string | null;
  base_price_eur: number;
  base_price_fcfa: number;
  delivery_days: number;
  features: string[] | null;
}

interface Review {
  id: string;
  name: string;
  role: string;
  message: string;
  rating: number;
}

export const metadata = {
  title: "Services Professionnels | WordPress & Vibe Coding",
  description:
    "Commandez votre site web professionnel. Facturation après approbation.",
};

export const revalidate = 0; // Pour voir les avis instantanément après modération

export default async function ServicesProPage() {
  // Récupération des données en parallèle
  const [services, reviews]: [ProService[], Review[]] = await Promise.all([
    getProServices(),
    getApprovedReviews(),
  ]);

  const wordpressServices = services.filter((s) => s.category === "wordpress");
  const vibeCodingServices = services.filter(
    (s) => s.category === "vibe-coding"
  );

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden pt-28 pb-20">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* 1. HERO SECTION */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Solutions Digitales <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Sur-Mesure
            </span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Des prestations claires pour propulser votre activité.
          </p>
        </div>

        {/* 2. STATS GRID (Plus compacte) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16 max-w-4xl mx-auto">
          {[
            { label: "Satisfaction", value: "100%", icon: Users },
            { label: "Support", value: "24h", icon: Zap },
            { label: "Délais", value: "98%", icon: Clock },
            { label: "Évolutivité", value: "∞", icon: Rocket },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-4 bg-slate-900/40 border border-slate-800/50 rounded-xl text-center backdrop-blur-sm"
            >
              <stat.icon className="w-5 h-5 text-blue-500/70 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* 3. BARRE D'URGENCE */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="bg-[#FFF8E1] border-l-4 border-amber-400 rounded-r-xl p-4 text-center">
            <p className="text-amber-900 font-bold text-sm md:text-base">
              🚀 Agenda : Plus que{" "}
              <span className="underline decoration-amber-500 underline-offset-2">
                deux places disponibles
              </span>{" "}
              cette semaine !
            </p>
          </div>
        </div>

        {/* 4. CATALOGUE WORDPRESS */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <LayoutTemplate className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">
              Création WordPress
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wordpressServices.map((service) => (
              <ServiceCard key={service.id} service={service} color="blue" />
            ))}
          </div>
        </section>

        {/* 5. CATALOGUE VIBE CODING */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <Code2 className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">
              Conception Vibe Coding
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vibeCodingServices.map((service) => (
              <ServiceCard key={service.id} service={service} color="purple" />
            ))}
          </div>
        </section>

        {/* 6. SECTION AVIS CLIENTS (Dynamique) */}
        {reviews.length > 0 && (
          <section className="mb-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ce que disent mes clients
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl relative group hover:border-slate-700 transition-colors"
                >
                  <Quote
                    className="absolute top-4 right-4 text-slate-800 group-hover:text-slate-700 transition-colors"
                    size={32}
                  />
                  <div className="flex gap-1 mb-4 text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm italic mb-6 leading-relaxed">
                    &quot;{review.message}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">
                        {review.name}
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                        {review.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// --- CARTE COMPACTE ---
// --- CARTE REDESIGNÉE (Style Portfolio) ---
function ServiceCard({
  service,
  color,
}: {
  service: ProService;
  color: "blue" | "purple";
}) {
  const isBlue = color === "blue";
  // Couleurs dynamiques pour les tags et le hover
  const themeStyles = isBlue
    ? {
        hoverBorder: "group-hover:border-blue-500/50",
        tagBg: "bg-blue-500/10",
        tagText: "text-blue-300",
        tagBorder: "border-blue-500/20",
        iconColor: "text-blue-400",
      }
    : {
        hoverBorder: "group-hover:border-purple-500/50",
        tagBg: "bg-purple-500/10",
        tagText: "text-purple-300",
        tagBorder: "border-purple-500/20",
        iconColor: "text-purple-400",
      };

  return (
    <Link
      href={`/services-pro/${service.id}`}
      className={`group flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 ${themeStyles.hoverBorder} hover:shadow-2xl hover:-translate-y-1`}
    >
      {/* 1. Zone Image (Hauteur identique au portfolio h-56) */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={service.image_url || "/images/placeholder.jpg"}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay sombre pour lisibilité si besoin */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

        {/* Badge Prix sur l'image (Style "À partir de") */}
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md text-xs font-bold text-white rounded-lg border border-white/10 shadow-lg">
            {service.base_price_eur} €{" "}
            <span className="text-slate-400 font-normal">
              / {parseInt(service.base_price_fcfa.toString()).toLocaleString()}{" "}
              FCFA
            </span>
          </span>
        </div>
      </div>

      {/* 2. Contenu (Flex-1 pour égaliser les hauteurs) */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Titre */}
        <h3
          className={`text-xl font-bold text-white mb-3 group-hover:${themeStyles.iconColor} transition-colors`}
        >
          {service.title}
        </h3>

        {/* Description courte */}
        <p className="text-slate-400 text-sm mb-6 line-clamp-2">
          {service.description}
        </p>

        {/* Features Horizontales (Nouveau Design "Pill") */}
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {service.features?.slice(0, 3).map((feat, i) => (
            <span
              key={i}
              className={`px-2.5 py-1 text-[11px] uppercase tracking-wide font-medium rounded-md border ${themeStyles.tagBg} ${themeStyles.tagText} ${themeStyles.tagBorder}`}
            >
              {feat}
            </span>
          ))}
        </div>

        {/* Pied de carte : Délai & Action */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            <span>{service.delivery_days} jours env.</span>
          </div>

          <span
            className={`flex items-center gap-2 text-sm font-semibold text-white group-hover:${themeStyles.iconColor} transition-colors`}
          >
            Voir détails
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
