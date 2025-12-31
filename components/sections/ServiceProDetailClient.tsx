"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock,
  Shield,
  Code2,
  LayoutTemplate,
  Zap,
  ChevronRight,
  Package,
  Layout,
  Search,
  Server,
  Monitor,
  Layers,
  Video,
  MessageSquare,
  Star,
  Quote,
  ExternalLink,
} from "lucide-react";
import { Project } from "@/lib/types"; // Assure-toi que ce type existe (sinon définis-le ici)

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
  created_at: string;
}

interface Review {
  id: string;
  name: string;
  role: string;
  message: string;
  rating: number;
}

export default function ServiceProDetailClient({
  service,
  portfolioProjects,
  reviews,
}: {
  service: ProService;
  portfolioProjects: Project[];
  reviews: Review[];
}) {
  const isWordpress = service.category === "wordpress";
  const themeColor = isWordpress ? "blue" : "purple";
  const IconCategory = isWordpress ? LayoutTemplate : Code2;
  const priceEur = service.base_price_eur;
  const priceFcfa = parseInt(
    service.base_price_fcfa.toString()
  ).toLocaleString();

  // Liste des livrables (Ce que vous recevez)
  const deliverables = [
    {
      icon: Layout,
      text: "Design moderne et attractif, sur-mesure pour votre marque.",
    },
    {
      icon: Code2,
      text: isWordpress
        ? "Configuration complète Elementor/Divi ou Gutenberg."
        : "Architecture Next.js 14, React & Tailwind CSS.",
    },
    {
      icon: Zap,
      text: "Optimisation des images et cache pour un chargement ultra-rapide.",
    },
    {
      icon: Monitor,
      text: "Conception 100% Responsive (Mobile, Tablette, Desktop).",
    },
    {
      icon: Server,
      text: "Déploiement et mise en ligne sur votre hébergement.",
    },
    {
      icon: Video,
      text: "BONUS : Vidéo tutoriel pour gérer votre site vous-même.",
    },
  ];

  // Le Processus
  const processSteps = [
    {
      num: "01",
      title: "Commande",
      desc: "Choisissez votre pack et validez la commande (aucun paiement immédiat).",
    },
    {
      num: "02",
      title: "Briefing",
      desc: "Je vous contacte sous 1h pour valider les détails et récupérer vos contenus.",
    },
    {
      num: "03",
      title: "Démo",
      desc: "Une fois le site prêt, je vous envoie un lien de démonstration privée.",
    },
    {
      num: "04",
      title: "Lancement",
      desc: "Validation finale, paiement et mise en ligne officielle.",
    },
  ];

  // Plugins (Seulement pour WordPress)
  const wpPlugins = [
    "Yoast SEO (Référencement)",
    "WP Rocket (Cache & Vitesse)",
    "Contact Form 7",
    "Akismet (Anti-Spam)",
    "SecuPress (Sécurité)",
    "Imagify (Compression)",
  ];

  // FAQ Statique (Exemple)
  const faqs = [
    {
      q: "Dois-je fournir l'hébergement ?",
      a: "Oui, mais je peux vous guider pour choisir le meilleur (ex: Hostinger).",
    },
    {
      q: "Le site sera-t-il à moi ?",
      a: "Absolument. Vous êtes propriétaire à 100% du code et des accès.",
    },
    {
      q: "Et pour le contenu ?",
      a: "Vous devez fournir textes et images. Si besoin, je peux utiliser des images libres de droits.",
    },
  ];

  return (
    <div className="relative z-10">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* --- COLONNE GAUCHE (Contenu Principal) --- */}
        <div className="lg:col-span-2">
          {/* Fil d'ariane */}
          <div className="mb-6 flex flex-col gap-4">
            <Link
              href="/services-pro"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4 rotate-180" /> Retour aux
              services
            </Link>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-bold uppercase tracking-wider text-${themeColor}-400`}
              >
                {isWordpress ? "WordPress" : "Vibe Coding"}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-600"></span>
              <span className="text-xs text-slate-500 uppercase tracking-wider">
                Service Pro
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {service.title}
            </h1>
          </div>

          {/* Grande Image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800/50 mb-12 shadow-2xl">
            <Image
              src={service.image_url || "/images/placeholder.jpg"}
              alt={service.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          </div>

          <div className="space-y-12">
            {/* 1. Description & Ce que vous recevez */}
            <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6">
                Ce que vous recevez
              </h2>
              <p className="text-slate-300 mb-8 leading-relaxed">
                {service.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {deliverables.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div
                      className={`mt-1 p-1.5 rounded-lg bg-${themeColor}-500/10`}
                    >
                      <item.icon className={`w-4 h-4 text-${themeColor}-400`} />
                    </div>
                    <span className="text-sm text-slate-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Le Processus */}
            <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-8">
                Comment ça marche ?
              </h2>
              <div className="space-y-6">
                {processSteps.map((step, i) => (
                  <div key={i} className="flex gap-6 relative">
                    {/* Ligne connecteur */}
                    {i !== processSteps.length - 1 && (
                      <div className="absolute left-[19px] top-10 bottom-[-24px] w-0.5 bg-slate-800" />
                    )}
                    <div
                      className={`w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-${themeColor}-400 shrink-0 z-10`}
                    >
                      {step.num}
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">
                        {step.title}
                      </h4>
                      <p className="text-sm text-slate-400">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Plugins (Si WordPress) */}
            {isWordpress && (
              <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Plugins Inclus
                </h2>
                <div className="flex flex-wrap gap-3">
                  {wpPlugins.map((plugin, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-blue-900/20 border border-blue-500/20 text-blue-300 text-sm"
                    >
                      {plugin}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- COLONNE DROITE (Carte Sticky) --- */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            {/* Carte de Prix (Code existant amélioré) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-${themeColor}-500 to-${themeColor}-700`}
              />
              <div className="p-8">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                    Package Pro
                  </span>
                  <div className={`p-2 bg-${themeColor}-500/10 rounded-lg`}>
                    <IconCategory
                      className={`w-5 h-5 text-${themeColor}-400`}
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-white">
                    {priceEur} €
                  </div>
                  <div className="text-sm text-slate-500 font-medium mt-1">
                    ou {priceFcfa} FCFA
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-300 text-sm mb-8 pb-8 border-b border-slate-800">
                  <Clock className="w-4 h-4" />
                  <span>
                    Livraison :{" "}
                    <span className="text-white font-bold">
                      {service.delivery_days} jours
                    </span>
                  </span>
                </div>
                <Link
                  href={`/services-pro/${service.id}/customize`}
                  className={`block w-full py-4 bg-gradient-to-r from-${themeColor}-600 to-${themeColor}-700 hover:from-${themeColor}-500 hover:to-${themeColor}-600 text-white font-bold rounded-xl text-center shadow-lg transition-all transform active:scale-95`}
                >
                  Continuer ({priceEur} €)
                </Link>
                <p className="text-center text-[10px] text-slate-500 mt-4">
                  Paiement après validation.
                </p>
              </div>
            </div>

            {/* Bloc Exigences */}
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center shadow-lg">
              <h4 className="text-white font-semibold mb-4 text-sm">
                Une demande spécifique ?
              </h4>
              <Link
                href="/quote"
                className="inline-block w-full px-6 py-3 border border-slate-600 text-slate-300 font-medium rounded-xl hover:border-white hover:text-white hover:bg-white/5 transition-all text-sm"
              >
                OBTENIR UN DEVIS SUR MESURE
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION FULL WIDTH (BAS DE PAGE) --- */}
      <div className="mt-24 space-y-24 border-t border-slate-800 pt-20">
        {/* 4. PORTFOLIO (3 Projets) */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Mes Dernières Réalisations
            </h2>
            <p className="text-slate-400">
              Quelques exemples de projets similaires.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioProjects.length > 0 ? (
              portfolioProjects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image_url || ""}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-white mb-2">
                      {project.title}
                    </h4>
                    <Link
                      href={project.demo_url}
                      target="_blank"
                      className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      Voir le projet <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 col-span-3 text-center">
                Chargement du portfolio...
              </p>
            )}
          </div>
        </section>

        {/* 5. FAQ */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">
            Questions Fréquentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
              >
                <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. AVIS CLIENTS (Dynamique) */}
        <section className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">
            Ce que disent mes clients
          </h2>

          {reviews.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {reviews.slice(0, 2).map((review) => (
                <div
                  key={review.id}
                  className="p-8 bg-slate-900 border border-slate-800 rounded-2xl relative text-left"
                >
                  <Quote className="absolute top-6 right-6 text-slate-700 w-8 h-8" />
                  <div className="flex gap-1 mb-4 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-slate-300 italic mb-6">
                    &quot;{review.message}&quot;
                  </p>
                  <div>
                    <div className="font-bold text-white">{review.name}</div>
                    <div className="text-xs text-slate-500">{review.role}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 bg-slate-900/50 border border-slate-800 border-dashed rounded-2xl">
              <p className="text-slate-400 mb-6">
                Aucun avis pour ce service pour le moment.
              </p>
              <Link
                href="/review"
                className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-all text-sm font-medium"
              >
                Laisser un avis sur mon travail
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
