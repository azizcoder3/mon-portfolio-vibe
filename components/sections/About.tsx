// components/sections/About.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Quote, ArrowRight, Star, Users, Target, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Testimonial = {
  id: number | string;
  name: string;
  role?: string;
  message: string;
  rating?: number;
};

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah M.",
    role: "CEO, AfricaTech",
    message:
      "Le site WordPress qu'il a conçu a doublé nos conversions. Une expertise rare !",
    rating: 5,
  },
  {
    id: 2,
    name: "Jean-Marc K.",
    role: "Fondateur, ImmoLuxe",
    message:
      "J'avais besoin d'une app complexe en Next.js. Le résultat dépasse mes attentes.",
    rating: 5,
  },
  {
    id: 3,
    name: "Agence Horizon",
    role: "Partenaire",
    message:
      "Collaboration fluide, code propre et respect des délais. Je recommande à 100%.",
    rating: 5,
  },
];

const STATS = [
  { icon: Users, value: "50+", label: "Clients satisfaits", color: "blue" },
  { icon: Target, value: "98%", label: "Satisfaction client", color: "purple" },
  { icon: Zap, value: "24h", label: "Temps de réponse", color: "green" },
];

export default function AboutPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await supabase
          .from("testimonials")
          .select("*")
          .eq("is_approved", true)
          .order("created_at", { ascending: false })
          .limit(3);

        if (data && data.length > 0) {
          setTestimonials(data as Testimonial[]);
        }
      } catch (error) {
        // Silently handle error
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="min-h-screen relative pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      <div className="relative z-10">
        {/* SECTION 1: Bento Grid Bio */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Colonne 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/20 border border-slate-800/50 rounded-3xl p-8 lg:p-12 backdrop-blur-sm">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 bg-blue-500/30 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">
                    À propos
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Plus qu&apos;un développeur,
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    votre partenaire digital.
                  </span>
                </h1>

                <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                  <p>
                    Bonjour ! Je suis un développeur passionné spécialisé dans
                    la création de solutions web modernes. Basé au Congo et
                    ouvert sur le monde, je combine créativité et rigueur
                    technique.
                  </p>
                  <p>
                    Mon parcours m&apos;a permis de maîtriser deux univers : la
                    flexibilité de{" "}
                    <strong className="text-blue-400">WordPress</strong> pour
                    les projets rapides, et la puissance de{" "}
                    <strong className="text-purple-400">Next.js</strong> pour
                    les applications sur-mesure.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Colonne 2 - Stats */}
            <div className="space-y-8">
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-slate-900/30 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm hover:border-slate-700/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-lg bg-${stat.color}-500/10 border border-${stat.color}-500/20`}
                    >
                      <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image section */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl" />
            <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-800/20 border border-slate-800/50 rounded-2xl overflow-hidden backdrop-blur-sm group">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800"
                  alt="Profile"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Expertise Grid */}
        <section className="py-20 border-t border-slate-800/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-4 h-4 bg-purple-500/20 rounded-full" />
                <span className="text-sm font-medium text-purple-400 uppercase tracking-wider">
                  Ma stack technique
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                La &quot;Secret Sauce&quot; Technique
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Les outils que j&apos;utilise pour garantir performance,
                sécurité et évolutivité.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  name: "Next.js 14",
                  desc: "Framework React",
                  icon: "▲",
                  color: "slate",
                },
                {
                  name: "Supabase",
                  desc: "Base de données",
                  icon: "⚡",
                  color: "green",
                },
                {
                  name: "TypeScript",
                  desc: "Typage statique",
                  icon: "TS",
                  color: "blue",
                },
                {
                  name: "Tailwind",
                  desc: "Styling utilitaire",
                  icon: "TW",
                  color: "cyan",
                },
              ].map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-6 bg-slate-900/30 border border-slate-800/50 rounded-2xl backdrop-blur-sm hover:border-slate-700/50 transition-all duration-300"
                >
                  <div
                    className={`text-3xl mb-4 text-${tech.color}-400 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {tech.icon}
                  </div>
                  <h3 className="font-bold text-white text-xl mb-1">
                    {tech.name}
                  </h3>
                  <p className="text-sm text-slate-400">{tech.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
              >
                Demander un devis
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 3: Témoignages Bento */}
        <section className="py-20 container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-4 h-4 bg-amber-500/20 rounded-full" />
              <span className="text-sm font-medium text-amber-400 uppercase tracking-wider">
                Témoignages
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ce que disent mes clients
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              La confiance de mes clients est ma plus grande réussite.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-gradient-to-br from-slate-900/50 to-slate-800/20 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm hover:border-slate-700/50 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating ?? 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-4 h-4 text-amber-500 fill-amber-500"
                    />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-slate-700/50 mb-4" />

                <p className="text-slate-300 mb-6 italic leading-relaxed">
                  &quot;{t.message}&quot;
                </p>

                <div className="pt-4 border-t border-slate-800/50">
                  <p className="text-white font-semibold">{t.name}</p>
                  <p className="text-sm text-slate-400">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/review"
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors group inline-flex items-center gap-1"
            >
              Vous êtes un client satisfait ?
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
