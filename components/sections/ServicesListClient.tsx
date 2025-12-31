// components/sections/ServicesListClient.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  Tag,
  Globe,
  Zap,
  Users,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Rocket,
  FileText,
  Code2,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";

// --- TYPES ---
interface Service {
  id: string;
  title: string;
  intro: string;
  image_url: string;
  price_label: string;
  time_label: string;
  icon_name: string;
  color_theme: string;
  features_list: string[];
}

// 1. AJOUT DE L'INTERFACE FAQ
interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Globe,
  Tag,
  Zap,
  Users,
  Shield,
  Sparkles,
  Rocket,
  Code2,
  FileText,
};

const COLOR_VARIANTS: Record<
  string,
  { bg: string; border: string; text: string; icon: string }
> = {
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-400",
    icon: "text-blue-400",
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    text: "text-purple-400",
    icon: "text-purple-400",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    text: "text-cyan-400",
    icon: "text-cyan-400",
  },
  green: {
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    text: "text-green-400",
    icon: "text-green-400",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-400",
    icon: "text-amber-400",
  },
  pink: {
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    text: "text-pink-400",
    icon: "text-pink-400",
  },
};

// 2. MISE À JOUR DES PROPS (On ajoute faqs ici)
export default function ServicesListClient({
  services,
  faqs,
}: {
  services: Service[];
  faqs: FAQ[];
}) {
  return (
    <>
      {/* 1. SECTION STATS */}
      <section className="container mx-auto px-4 -mt-10 mb-20 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: "100%", label: "Satisfaction", icon: Users },
            { value: "24h", label: "Support Réactif", icon: Zap },
            { value: "98%", label: "Délais Tenus", icon: Clock },
            { value: "∞", label: "Évolutivité", icon: Rocket },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-slate-900/80 border border-slate-800/50 rounded-xl backdrop-blur-md text-center hover:border-slate-700 transition-colors"
            >
              <div className="flex justify-center mb-2 text-blue-400">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. GRILLE DES SERVICES */}
      <section className="container mx-auto px-4 pb-20">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-4 h-4 bg-purple-500/20 rounded-full" />
            <span className="text-sm font-medium text-purple-400 uppercase tracking-wider">
              Mes Prestations
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Services Clés en Main
          </h2>
          <p className="text-slate-400 max-w-2xl">
            Des solutions packagées provenant de mon catalogue, prêtes à être
            déployées pour votre business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = ICON_MAP[service.icon_name] || Globe;
            const colors =
              COLOR_VARIANTS[service.color_theme] || COLOR_VARIANTS["blue"];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-gradient-to-b from-slate-900/50 to-slate-800/20 border border-slate-800/50 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-slate-700/50 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image_url || "/images/placeholder.jpg"}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 bg-black/50 backdrop-blur-md text-xs text-white rounded-full border border-white/10">
                      {service.price_label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className={`p-2 rounded-lg ${colors.bg} ${colors.border}`}
                    >
                      <IconComponent className={`w-5 h-5 ${colors.icon}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {service.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> {service.time_label}
                        </span>
                        <span className="flex items-center gap-1">
                          <Tag className="w-4 h-4" /> Packagé
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm mb-6 leading-relaxed line-clamp-3">
                    {service.intro}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.features_list
                      ?.slice(0, 4)
                      .map((feature: string, i: number) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-slate-400">
                            {feature}
                          </span>
                        </div>
                      ))}
                  </div>

                  <Link
                    href={`/services/${service.id}`}
                    className="group block w-full py-3 bg-slate-800/30 border border-slate-700/50 rounded-lg text-white font-medium text-center hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Voir les détails</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. FAQ DYNAMIQUE (Utilise maintenant la prop faqs) */}
      <section className="py-20 border-t border-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">FAQ</h2>
              <p className="text-slate-300 mb-8">
                Questions fréquentes sur mes services.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 rounded-xl text-white font-semibold hover:bg-amber-700 transition-all"
              >
                Poser une question <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {faqs && faqs.length > 0 ? (
                faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-slate-900/30 border border-slate-800/50 rounded-xl p-6 hover:border-slate-700 transition-colors"
                  >
                    <h3 className="font-semibold text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-slate-400 text-sm">{faq.answer}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500">
                  Aucune question pour le moment.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
