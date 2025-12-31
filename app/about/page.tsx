// // app/about/page.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Quote,
  Star,
  ArrowRight,
  Code2,
  Terminal,
  Cpu,
  Globe,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer"; // On remet le footer si tu l'as enlevé, sinon retire cet import

// --- TYPES ---
type Testimonial = {
  id: number | string;
  name: string;
  role?: string;
  message: string;
  rating?: number;
};

// Données statiques
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

const RESOURCES = [
  {
    name: "Next.js",
    desc: "Le Framework React pour la performance",
    icon: Globe,
  },
  {
    name: "Supabase",
    desc: "Base de données temps réel sécurisée",
    icon: DatabaseIcon,
  },
  { name: "Tailwind", desc: "Design système moderne et rapide", icon: Code2 },
  { name: "Vercel", desc: "Infrastructure Cloud mondiale", icon: Terminal },
];

// Petite icône custom pour remplacer celles qui manquaient
function DatabaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

export default function AboutPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .eq("is_approved", true)
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) return;

        if (data && data.length > 0) {
          const normalized: Testimonial[] = data.map(
            (d: unknown, idx: number) => {
              const row = d as Record<string, unknown>;
              return {
                id: (row.id as string | number) ?? `db-${idx}`,
                name: (row.name as string) ?? "Client",
                role: (row.role as string) ?? "",
                message: (row.message as string) ?? "",
                rating: typeof row.rating === "number" ? row.rating : 5,
              };
            }
          );
          setTestimonials(normalized);
        }
      } catch (error) {
        // void
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950/50 pt-20 overflow-hidden">
      {/* --- SECTION 1: HERO TYPOGRAPHIQUE (Centré, sans image) --- */}
      <section className="relative container mx-auto px-4 py-24 text-center">
        {/* Décorations d'arrière-plan */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <span className="text-blue-400 font-medium tracking-widest text-sm uppercase mb-4 block">
            Mon Parcours & Philosophie
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Derrière le code,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500">
              une passion pour l&apos;impact.
            </span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Je ne construis pas seulement des sites web. Je construis des outils
            qui font grandir les entreprises, en alliant la rigueur de
            l&apos;ingénierie à la créativité du design.
          </p>
        </motion.div>
      </section>

      {/* --- SECTION 2: L'HISTOIRE (Photo + Texte) --- */}
      <section className="py-20 bg-slate-950 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Image (Style différent de l'accueil) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/images/aziz.png"
                  alt="Moi au travail"
                  fill
                  className="object-cover"
                />
                {/* Overlay subtil */}
                <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
              </div>
              {/* Cadre décoratif arrière */}
              <div className="absolute inset-0 border-2 border-blue-500/20 rounded-2xl -rotate-2 -z-10 translate-x-4 translate-y-4" />
            </motion.div>

            {/* Contenu Texte */}
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold text-white">
                De Brazzaville au Web Mondial
              </h2>
              <div className="space-y-4 text-slate-300 text-lg leading-relaxed">
                <p>
                  Mon aventure a commencé par une simple curiosité : comment
                  fonctionnent les choses ? Cette curiosité s&apos;est vite
                  transformée en obsession pour le développement web.
                </p>
                <p>
                  Aujourd&apos;hui, je suis un développeur hybride. Je comprends
                  les impératifs business (délais, budget, conversion) tout en
                  maîtrisant la complexité technique (Next.js, Supabase, IA).
                </p>
                <p>
                  <strong>Mon objectif ?</strong> Rendre la technologie
                  accessible et utile. Que ce soit via un CMS comme WordPress
                  pour vous donner la main, ou via une app sur-mesure pour vos
                  processus métiers.
                </p>
              </div>

              <div className="pt-6">
                <div className="flex gap-8">
                  <div>
                    <span className="block text-3xl font-bold text-white">
                      5+
                    </span>
                    <span className="text-sm text-slate-500">
                      Années d&apos;expérience
                    </span>
                  </div>
                  <div>
                    <span className="block text-3xl font-bold text-white">
                      100%
                    </span>
                    <span className="text-sm text-slate-500">Engagement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: LA STACK TECHNIQUE (Redesign) --- */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ma Boîte à Outils
          </h2>
          <p className="text-slate-400">
            Les technologies que je maîtrise pour propulser vos projets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESOURCES.map((res, i) => (
            <motion.div
              key={res.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 bg-slate-800/20 border border-slate-700/50 rounded-2xl hover:bg-slate-800/50 hover:border-blue-500/30 transition-all text-center"
            >
              <div className="w-12 h-12 mx-auto bg-slate-950/50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <res.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{res.name}</h3>
              <p className="text-sm text-slate-400">{res.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- SECTION 4: TÉMOIGNAGES (Version compacte) --- */}
      <section className="py-20 bg-gradient-to-b from-slate-950/50 to-transparent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Ce qu&apos;ils disent de moi
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 relative"
              >
                <div className="flex gap-1 mb-4 text-yellow-500">
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                  &quot;{t.message}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer sera injecté par layout.tsx */}
    </div>
  );
}

// "use client";

// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase";
// import {
//   Quote,
//   ArrowRight,
//   Star,
//   Users,
//   Target,
//   Zap,
//   Code2,
//   Globe,
//   Shield,
//   Rocket,
//   Sparkles,
//   Brain,
//   Palette,
//   CheckCircle2,
//   Database,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// // Types
// type Testimonial = {
//   id: number | string;
//   name: string;
//   role?: string;
//   message: string;
//   rating?: number;
// };

// // Données locales
// const TESTIMONIALS: Testimonial[] = [
//   {
//     id: 1,
//     name: "Sarah M.",
//     role: "CEO, AfricaTech",
//     message:
//       "Le site WordPress qu'il a conçu a doublé nos conversions. Une expertise rare !",
//     rating: 5,
//   },
//   {
//     id: 2,
//     name: "Jean-Marc K.",
//     role: "Fondateur, ImmoLuxe",
//     message:
//       "J'avais besoin d'une app complexe en Next.js. Le résultat dépasse mes attentes.",
//     rating: 5,
//   },
//   {
//     id: 3,
//     name: "Agence Horizon",
//     role: "Partenaire",
//     message:
//       "Collaboration fluide, code propre et respect des délais. Je recommande à 100%.",
//     rating: 5,
//   },
// ];

// // Stack Technique Bento
// const TECH_STACK = [
//   {
//     name: "WordPress Expert",
//     desc: "CMS Flexible & Performant",
//     icon: Globe,
//     color: "text-blue-400",
//     bgColor: "bg-blue-500/10",
//     borderColor: "border-blue-500/20",
//   },
//   {
//     name: "Next.js 14",
//     desc: "Framework React Moderne",
//     icon: Code2,
//     color: "text-slate-300",
//     bgColor: "bg-slate-800/30",
//     borderColor: "border-slate-700/50",
//   },
//   {
//     name: "Supabase",
//     desc: "Backend Sécurisé",
//     icon: Database,
//     color: "text-emerald-400",
//     bgColor: "bg-emerald-500/10",
//     borderColor: "border-emerald-500/20",
//   },
//   {
//     name: "Intégration IA",
//     desc: "Solutions Intelligentes",
//     icon: Brain,
//     color: "text-purple-400",
//     bgColor: "bg-purple-500/10",
//     borderColor: "border-purple-500/20",
//   },
//   {
//     name: "Vercel",
//     desc: "Déploiement Cloud",
//     icon: Rocket,
//     color: "text-cyan-400",
//     bgColor: "bg-cyan-500/10",
//     borderColor: "border-cyan-500/20",
//   },
//   {
//     name: "Hostinger",
//     desc: "Hébergement Optimal",
//     icon: Shield,
//     color: "text-amber-400",
//     bgColor: "bg-amber-500/10",
//     borderColor: "border-amber-500/20",
//   },
// ];

// // Métriques
// const METRICS = [
//   { icon: Users, value: "50+", label: "Projets Réalisés", color: "blue" },
//   {
//     icon: Target,
//     value: "100%",
//     label: "Satisfaction Client",
//     color: "purple",
//   },
//   { icon: Zap, value: "95+", label: "Score Performance", color: "green" },
//   { icon: Palette, value: "∞", label: "Solutions Créatives", color: "amber" },
// ];

// export default function AboutPage() {
//   const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         const { data } = await supabase
//           .from("testimonials")
//           .select("*")
//           .eq("is_approved", true)
//           .order("created_at", { ascending: false })
//           .limit(3);

//         if (data && data.length > 0) {
//           setTestimonials(data as Testimonial[]);
//         }
//       } catch (error) {
//         // Silently handle error
//       }
//     };

//     fetchTestimonials();
//   }, []);

//   return (
//     <div className="min-h-screen relative bg-slate-950 pt-20">
//       {/* Background avec textures */}
//       <div className="fixed inset-0 z-0">
//         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
//       </div>

//       <div className="relative z-10">
//         {/* Hero Section - Bio */}
//         <section className="container mx-auto px-4 py-20 md:py-32">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//             {/* Colonne gauche - Texte */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="space-y-8"
//             >
//               <div>
//                 <div className="inline-flex items-center gap-2 mb-6">
//                   <div className="w-4 h-4 bg-blue-500/20 rounded-full animate-pulse" />
//                   <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">
//                     À propos de moi
//                   </span>
//                 </div>

//                 <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
//                   Plus qu&apos;un développeur,
//                   <span className="block mt-4 text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
//                     votre partenaire digital.
//                   </span>
//                 </h1>
//               </div>

//               <div className="space-y-6">
//                 <p className="text-lg text-slate-300 leading-relaxed">
//                   <strong className="text-blue-400">
//                     Concepteur Web Expert WordPress
//                   </strong>{" "}
//                   et{" "}
//                   <strong className="text-purple-400">
//                     Développeur Fullstack Next.js
//                   </strong>
//                   . Basé au Congo et ouvert sur le monde, je transforme vos
//                   idées en solutions digitales performantes.
//                 </p>

//                 <p className="text-slate-300 leading-relaxed">
//                   Ma force ? Maîtriser deux univers complémentaires : la{" "}
//                   <strong className="text-blue-400">
//                     flexibilité de WordPress
//                   </strong>{" "}
//                   pour les projets rapides, et la{" "}
//                   <strong className="text-purple-400">
//                     puissance de Next.js
//                   </strong>{" "}
//                   pour les applications sur-mesure et les intégrations
//                   d&apos;intelligence artificielle.
//                 </p>

//                 <div className="space-y-4">
//                   <div className="flex items-start gap-3">
//                     <CheckCircle2 className="w-5 h-5 text-green-400 mt-1" />
//                     <span className="text-slate-300">
//                       Approche{" "}
//                       <strong className="text-cyan-400">
//                         &quot;Vibe Coding&quot;
//                       </strong>{" "}
//                       : transformer directement votre vision en code élégant et
//                       fonctionnel
//                     </span>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <CheckCircle2 className="w-5 h-5 text-green-400 mt-1" />
//                     <span className="text-slate-300">
//                       Expertise en{" "}
//                       <strong className="text-blue-400">
//                         conception UI/UX
//                       </strong>{" "}
//                       et{" "}
//                       <strong className="text-purple-400">
//                         architecture technique
//                       </strong>
//                     </span>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <CheckCircle2 className="w-5 h-5 text-green-400 mt-1" />
//                     <span className="text-slate-300">
//                       Spécialisation en{" "}
//                       <strong className="text-amber-400">
//                         intégration d&apos;IA
//                       </strong>{" "}
//                       et solutions intelligentes
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Métriques */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
//                 {METRICS.map((metric, index) => (
//                   <motion.div
//                     key={metric.label}
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="p-4 bg-slate-900/30 border border-slate-800/50 rounded-xl backdrop-blur-sm"
//                   >
//                     <div
//                       className={`text-2xl font-bold text-${metric.color}-400 mb-1`}
//                     >
//                       {metric.value}
//                     </div>
//                     <div className="text-sm text-slate-400">{metric.label}</div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Colonne droite - Photo */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.3 }}
//               className="relative"
//             >
//               <div className="relative mx-auto max-w-md">
//                 {/* Lueur d'arrière-plan */}
//                 <div className="absolute -inset-8 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-50" />

//                 {/* Cadre principal */}
//                 <div className="relative bg-linear-to-br from-slate-900/50 to-slate-800/20 border border-slate-800/50 rounded-2xl overflow-hidden backdrop-blur-sm group">
//                   {/* Image */}
//                   <div className="aspect-square relative overflow-hidden">
//                     <Image
//                       src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800"
//                       alt="Concepteur Web & Développeur Next.js"
//                       fill
//                       className="object-cover transition-transform duration-700 group-hover:scale-105"
//                     />
//                     <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
//                   </div>

//                   {/* Badges flottants */}
//                   <div className="absolute top-4 right-4 flex flex-col gap-2">
//                     <div className="px-3 py-1.5 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-lg">
//                       <span className="text-xs text-blue-300 font-medium">
//                         WordPress Expert
//                       </span>
//                     </div>
//                     <div className="px-3 py-1.5 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-lg">
//                       <span className="text-xs text-purple-300 font-medium">
//                         Next.js Dev
//                       </span>
//                     </div>
//                   </div>

//                   {/* Informations bas */}
//                   <div className="p-6 border-t border-slate-800/50 bg-linear-to-b from-slate-900/80 to-slate-950/80">
//                     <div className="space-y-2">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <div className="text-sm text-slate-400">
//                             Localisation
//                           </div>
//                           <div className="text-white font-semibold">
//                             Brazzaville, Congo
//                           </div>
//                         </div>
//                         <div className="text-xs text-slate-500 px-3 py-1 bg-slate-800/50 rounded-full backdrop-blur-sm">
//                           Fullstack
//                         </div>
//                       </div>
//                       <div className="text-xs text-slate-400">
//                         🚀 Disponible pour collaborations internationales
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </section>

//         {/* Stack Technique - Bento Grid */}
//         <section className="py-20 border-t border-slate-800/30">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-12">
//               <div className="inline-flex items-center gap-2 mb-4">
//                 <div className="w-4 h-4 bg-purple-500/20 rounded-full" />
//                 <span className="text-sm font-medium text-purple-400 uppercase tracking-wider">
//                   Expertise Technique
//                 </span>
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//                 Ma &quot;Secret Sauce&quot; Technique
//               </h2>
//               <p className="text-slate-400 max-w-2xl mx-auto">
//                 Les outils et technologies que je maîtrise pour livrer des
//                 solutions performantes, sécurisées et évolutives.
//               </p>
//             </div>

//             {/* Grille Bento */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {TECH_STACK.map((tech, index) => (
//                 <motion.div
//                   key={tech.name}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className={`group p-6 rounded-2xl border ${tech.borderColor} backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300 ${tech.bgColor}`}
//                 >
//                   <div className="flex items-start gap-4">
//                     <div
//                       className={`p-3 rounded-xl ${tech.bgColor} border ${tech.borderColor}`}
//                     >
//                       <tech.icon className={`w-6 h-6 ${tech.color}`} />
//                     </div>
//                     <div>
//                       <h3 className={`text-xl font-bold ${tech.color} mb-1`}>
//                         {tech.name}
//                       </h3>
//                       <p className="text-sm text-slate-300">{tech.desc}</p>
//                     </div>
//                   </div>

//                   <div className="mt-4 pt-4 border-t border-slate-800/30">
//                     <div className="text-xs text-slate-500">
//                       {tech.name.includes("WordPress") &&
//                         "• Sites vitrines & e-commerce"}
//                       {tech.name.includes("Next.js") &&
//                         "• Applications web modernes"}
//                       {tech.name.includes("Supabase") &&
//                         "• Backend sécurisé & temps réel"}
//                       {tech.name.includes("IA") &&
//                         "• Chatbots & analyse de données"}
//                       {tech.name.includes("Vercel") &&
//                         "• Déploiement & scaling automatique"}
//                       {tech.name.includes("Hostinger") &&
//                         "• Hébergement optimisé WordPress"}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* CTA */}
//             <div className="mt-12 text-center">
//               <Link
//                 href="/contact"
//                 className="group inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-blue-500 to-blue-600 rounded-xl text-white font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300"
//               >
//                 <span>Discuter de votre projet</span>
//                 <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
//               </Link>
//             </div>
//           </div>
//         </section>

//         {/* Méthodologie de travail */}
//         <section className="py-20 border-t border-slate-800/30">
//           <div className="container mx-auto px-4">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 className="space-y-6"
//               >
//                 <div>
//                   <div className="inline-flex items-center gap-2 mb-4">
//                     <div className="w-4 h-4 bg-cyan-500/20 rounded-full" />
//                     <span className="text-sm font-medium text-cyan-400 uppercase tracking-wider">
//                       Ma Méthodologie
//                     </span>
//                   </div>
//                   <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//                     L&apos;approche{" "}
//                     <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400">
//                       Vibe Coding
//                     </span>
//                   </h2>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="flex items-start gap-3">
//                     <Sparkles className="w-5 h-5 text-cyan-400 mt-1" />
//                     <div>
//                       <h4 className="font-semibold text-white mb-1">
//                         Transformation Directe
//                       </h4>
//                       <p className="text-slate-300 text-sm">
//                         Votre idée se transforme directement en code
//                         fonctionnel, sans perte dans la traduction.
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3">
//                     <Palette className="w-5 h-5 text-purple-400 mt-1" />
//                     <div>
//                       <h4 className="font-semibold text-white mb-1">
//                         Design & Code Unifiés
//                       </h4>
//                       <p className="text-slate-300 text-sm">
//                         Conception UI/UX et développement technique sont menés
//                         en parallèle pour un résultat cohérent.
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3">
//                     <Brain className="w-5 h-5 text-amber-400 mt-1" />
//                     <div>
//                       <h4 className="font-semibold text-white mb-1">
//                         Intelligence Contextuelle
//                       </h4>
//                       <p className="text-slate-300 text-sm">
//                         Utilisation d&apos;outils IA pour accélérer le
//                         développement tout en maintenant la qualité du code.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 className="relative"
//               >
//                 <div className="relative bg-linear-to-br from-slate-900/50 to-slate-800/20 border border-slate-800/50 rounded-2xl p-8 backdrop-blur-sm">
//                   <div className="space-y-6">
//                     <div className="flex items-center gap-3">
//                       <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
//                         <span className="text-2xl">⚡</span>
//                       </div>
//                       <div>
//                         <h3 className="font-bold text-white">
//                           Processus de Développement
//                         </h3>
//                         <p className="text-sm text-slate-400">
//                           De l&apos;idée à la livraison
//                         </p>
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       {[
//                         {
//                           step: "01",
//                           title: "Analyse & Conception",
//                           desc: "Compréhension approfondie du besoin",
//                         },
//                         {
//                           step: "02",
//                           title: "Prototypage Rapide",
//                           desc: "Maquettes interactives & validation",
//                         },
//                         {
//                           step: "03",
//                           title: "Développement",
//                           desc: "Codage avec standards modernes",
//                         },
//                         {
//                           step: "04",
//                           title: "Tests & Optimisation",
//                           desc: "Performance, sécurité & UX",
//                         },
//                         {
//                           step: "05",
//                           title: "Livraison & Formation",
//                           desc: "Déploiement & transfert de compétences",
//                         },
//                       ].map((item) => (
//                         <div
//                           key={item.step}
//                           className="flex items-center gap-4 p-3 hover:bg-slate-800/30 rounded-lg transition-colors"
//                         >
//                           <div className="text-sm font-bold text-slate-500">
//                             {item.step}
//                           </div>
//                           <div className="flex-1">
//                             <div className="font-medium text-white">
//                               {item.title}
//                             </div>
//                             <div className="text-xs text-slate-400">
//                               {item.desc}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* Témoignages */}
//         <section className="py-20 border-t border-slate-800/30">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-12">
//               <div className="inline-flex items-center gap-2 mb-4">
//                 <div className="w-4 h-4 bg-amber-500/20 rounded-full" />
//                 <span className="text-sm font-medium text-amber-400 uppercase tracking-wider">
//                   Témoignages
//                 </span>
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//                 La confiance de mes clients
//               </h2>
//               <p className="text-slate-400 max-w-2xl mx-auto">
//                 Leur satisfaction est ma plus grande réussite professionnelle.
//               </p>
//             </div>

//             <div className="grid md:grid-cols-3 gap-6">
//               {testimonials.map((testimonial, index) => (
//                 <motion.div
//                   key={testimonial.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.2 }}
//                   className="group bg-linear-to-b from-slate-900/50 to-slate-800/20 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm hover:border-slate-700/50 transition-all duration-300"
//                 >
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex gap-1">
//                       {Array.from({ length: testimonial.rating ?? 5 }).map(
//                         (_, i) => (
//                           <Star
//                             key={i}
//                             className="w-4 h-4 text-amber-500 fill-amber-500"
//                           />
//                         )
//                       )}
//                     </div>
//                     <Quote className="w-6 h-6 text-slate-700/50" />
//                   </div>

//                   <p className="text-slate-300 italic mb-6 leading-relaxed">
//                     &quot;{testimonial.message}&quot;
//                   </p>

//                   <div className="pt-4 border-t border-slate-800/50">
//                     <div className="font-semibold text-white">
//                       {testimonial.name}
//                     </div>
//                     <div className="text-sm text-slate-400">
//                       {testimonial.role}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             <div className="text-center mt-12">
//               <Link
//                 href="/review"
//                 className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors group"
//               >
//                 Vous avez un avis a partager ?{" "}
//                 <span className="underline">Cliquez ici</span>
//                 <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
//               </Link>
//             </div>
//           </div>
//         </section>

//         {/* CTA Final */}
//         <section className="py-32">
//           <div className="container mx-auto px-4">
//             <div className="relative bg-linear-to-br from-slate-900/50 to-slate-800/20 border border-slate-800/50 rounded-3xl p-12 overflow-hidden max-w-4xl mx-auto">
//               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
//               <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />

//               <div className="relative text-center">
//                 <div className="inline-flex items-center gap-2 mb-6">
//                   <div className="w-4 h-4 bg-green-500/20 rounded-full animate-pulse" />
//                   <span className="text-sm font-medium text-green-400 uppercase tracking-wider">
//                     Prêt à collaborer
//                   </span>
//                 </div>

//                 <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//                   Transformons ensemble
//                   <span className="block mt-2 text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-400">
//                     vos idées en succès digital
//                   </span>
//                 </h2>

//                 <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
//                   Que vous ayez besoin d&apos;un site WordPress performant,
//                   d&apos;une application Next.js sur-mesure, ou d&apos;intégrer
//                   de l&apos;intelligence artificielle à votre projet, je suis là
//                   pour vous accompagner.
//                 </p>

//                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                   <Link
//                     href="/contact"
//                     className="group px-8 py-4 bg-linear-to-r from-green-500 to-emerald-600 rounded-xl text-white font-semibold hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300 inline-flex items-center justify-center gap-2"
//                   >
//                     <span>Discuter de votre projet</span>
//                     <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
//                   </Link>

//                   <Link
//                     href="/projects"
//                     className="px-8 py-4 bg-slate-900/50 border border-slate-800/50 rounded-xl text-white font-medium hover:border-slate-700/50 hover:bg-slate-900/70 transition-all duration-300"
//                   >
//                     Voir mes réalisations
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase";
// import { Quote, Star, ArrowRight, Download, MapPin } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// // --- TYPES & DONNÉES ---
// type Testimonial = {
//   id: number | string;
//   name: string;
//   role?: string;
//   message: string;
//   rating?: number;
// };

// const TESTIMONIALS = [
//   {
//     id: 1,
//     name: "Sarah M.",
//     role: "CEO, AfricaTech",
//     message:
//       "Le site WordPress qu'il a conçu a doublé nos conversions. Une expertise rare !",
//     rating: 5,
//   },
//   {
//     id: 2,
//     name: "Jean-Marc K.",
//     role: "Fondateur, ImmoLuxe",
//     message:
//       "J'avais besoin d'une app complexe en Next.js. Le résultat dépasse mes attentes.",
//     rating: 5,
//   },
//   {
//     id: 3,
//     name: "Agence Horizon",
//     role: "Partenaire",
//     message:
//       "Collaboration fluide, code propre et respect des délais. Je recommande à 100%.",
//     rating: 5,
//   },
// ];

// const RESOURCES = [
//   { name: "Vercel", desc: "Déploiement Cloud", icon: "▲" },
//   { name: "Supabase", desc: "Base de données", icon: "⚡" },
//   { name: "Next.js 14", desc: "Framework React", icon: "N" },
//   { name: "Lygos", desc: "Paiement Sécurisé", icon: "💳" },
// ];

// export default function AboutPage() {
//   const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         const { data, error } = await supabase
//           .from("testimonials")
//           .select("*")
//           .eq("is_approved", true)
//           .order("created_at", { ascending: false })
//           .limit(3);

//         if (error) return;

//         if (data && data.length > 0) {
//           const normalized: Testimonial[] = data.map(
//             (d: unknown, idx: number) => {
//               const row = d as Record<string, unknown>;
//               return {
//                 id: (row.id ?? `db-${idx}`) as number | string,
//                 name: (row.name ?? "Client") as string,
//                 role: (row.role ?? "") as string,
//                 message: (row.message ?? "") as string,
//                 rating: typeof row.rating === "number" ? row.rating : 5,
//               };
//             }
//           );
//           setTestimonials(normalized);
//         }
//       } catch (error) {
//         // void
//       }
//     };
//     fetchTestimonials();
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#0F172A] pt-20 overflow-hidden">
//       {/* --- SECTION 1: HERO ÉPURÉ --- */}
//       <section className="relative container mx-auto px-4 py-20 lg:py-32">
//         {/* Background Gradients */}
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
//         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

//         <div className="flex flex-col lg:flex-row gap-16 items-center relative z-10">
//           {/* Colonne Gauche : Texte concis */}
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="flex-1 text-center lg:text-left"
//           >
//             <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium">
//               À propos de moi
//             </div>

//             <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
//               Plus qu&apos;un développeur, <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
//                 votre partenaire digital.
//               </span>
//             </h1>

//             <div className="space-y-6 text-slate-300 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
//               <p>
//                 Basé à <strong>Brazzaville</strong> et ouvert sur le monde, je
//                 transforme vos idées en solutions digitales performantes.
//               </p>
//               <p>
//                 Ma force réside dans la maîtrise de deux univers : la
//                 flexibilité de <strong>WordPress</strong> pour les projets
//                 rapides, et la puissance de <strong>Next.js</strong> pour les
//                 applications sur-mesure.
//               </p>
//             </div>

//             <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//               <Link
//                 href="/contact"
//                 className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/25"
//               >
//                 Me contacter
//               </Link>
//               <Link
//                 href="/cv.pdf"
//                 className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
//               >
//                 <Download className="w-5 h-5" /> Télécharger CV
//               </Link>
//             </div>
//           </motion.div>

//           {/* Colonne Droite : Image Pro (Carte) */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="flex-1 w-full max-w-md"
//           >
//             <div className="relative group">
//               <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
//               <div className="relative aspect-[4/5] w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800">
//                 <Image
//                   src="/images/dev-profile.jpg" // Assure-toi que ce chemin est bon ou remets l'URL Unsplash
//                   alt="Portrait Développeur"
//                   fill
//                   className="object-cover"
//                 />

//                 {/* Overlay Infos */}
//                 <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-white font-bold text-lg">Votre Nom</p>
//                       <div className="flex items-center gap-1 text-slate-400 text-sm">
//                         <MapPin className="w-3 h-3" /> Brazzaville, Congo
//                       </div>
//                     </div>
//                     <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
//                       JS
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* --- SECTION 2: STATS BANNER (Déplacé ici pour aérer le Hero) --- */}
//       <div className="border-y border-white/5 bg-white/[0.02]">
//         <div className="container mx-auto px-4 py-10">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {[
//               { label: "Projets Réalisés", value: "50+" },
//               { label: "Satisfaction Client", value: "100%" },
//               { label: "Score Performance", value: "95+" },
//               { label: "Solutions Créatives", value: "∞" },
//             ].map((stat, i) => (
//               <div key={i} className="text-center">
//                 <div className="text-3xl md:text-4xl font-bold text-white mb-1">
//                   {stat.value}
//                 </div>
//                 <div className="text-sm text-slate-400 uppercase tracking-wider">
//                   {stat.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* --- SECTION 3: RESSOURCES --- */}
//       <section className="py-20 bg-slate-900/50">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl font-bold text-white mb-4">
//               Ma &quot;Secret Sauce&quot; Technique
//             </h2>
//             <p className="text-slate-400">
//               Les outils modernes que je maîtrise pour livrer l&apos;excellence.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {RESOURCES.map((res, i) => (
//               <motion.div
//                 key={res.name}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 viewport={{ once: true }}
//                 className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all group"
//               >
//                 <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
//                   {res.icon}
//                 </div>
//                 <h3 className="font-bold text-white text-lg mb-1">
//                   {res.name}
//                 </h3>
//                 <p className="text-sm text-slate-400">{res.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* --- SECTION 4: TÉMOIGNAGES --- */}
//       <section className="py-20 container mx-auto px-4">
//         <div className="text-center mb-16">
//           <span className="text-yellow-400 font-bold tracking-wider text-sm">
//             TÉMOIGNAGES
//           </span>
//           <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
//             La confiance de mes clients
//           </h2>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {testimonials.map((t) => (
//             <motion.div
//               key={t.id}
//               initial={{ opacity: 0, scale: 0.95 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               className="p-8 rounded-3xl bg-slate-800/30 border border-slate-700/50 relative hover:bg-slate-800/50 transition-colors"
//             >
//               <Quote className="absolute top-6 right-6 text-slate-600 w-8 h-8" />
//               <div className="flex gap-1 mb-6">
//                 {Array.from({ length: t.rating ?? 5 }).map((_, idx) => (
//                   <Star
//                     key={idx}
//                     className="w-4 h-4 text-yellow-400 fill-yellow-400"
//                   />
//                 ))}
//               </div>
//               <p className="text-slate-300 mb-6 italic leading-relaxed">
//                 &quot;{t.message}&quot;
//               </p>
//               <div>
//                 <p className="text-white font-bold">{t.name}</p>
//                 <p className="text-xs text-blue-400 font-medium uppercase tracking-wide">
//                   {t.role}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         <div className="text-center mt-12">
//           <Link
//             href="/review"
//             className="text-sm text-slate-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5"
//           >
//             Vous avez un projet à partager ? Laissez un avis.
//           </Link>
//         </div>
//       </section>

//       {/* --- SECTION 5: CTA --- */}
//       <section className="py-20 bg-gradient-to-b from-transparent to-slate-900/80">
//         <div className="container mx-auto px-4 text-center">
//           <div className="max-w-3xl mx-auto bg-blue-600/10 border border-blue-500/20 rounded-3xl p-10 md:p-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
//               Transformons ensemble <br />
//               <span className="text-blue-400">vos idées en succès digital</span>
//             </h2>
//             <p className="text-slate-300 mb-8 max-w-xl mx-auto">
//               Que vous ayez besoin d&apos;un site WordPress performant,
//               d&apos;une application Next.js sur-mesure, ou d&apos;intégrer de
//               l&apos;IA, je suis là pour vous accompagner.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link
//                 href="/quote"
//                 className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
//               >
//                 Démarrer mon projet
//               </Link>
//               <Link
//                 href="/projects"
//                 className="px-8 py-4 bg-transparent border border-slate-600 text-white font-medium rounded-xl hover:bg-slate-800 transition-all"
//               >
//                 Voir mes réalisations
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// // app/about/page.tsx
// "use client";

// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase";
// import { Quote, ArrowRight, Star } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// // Données Témoignages (valeurs de secours locales)
// const TESTIMONIALS = [
//   {
//     id: 1,
//     name: "Sarah M.",
//     role: "CEO, AfricaTech",
//     message:
//       "Le site WordPress qu'il a conçu a doublé nos conversions. Une expertise rare !",
//     rating: 5,
//   },
//   {
//     id: 2,
//     name: "Jean-Marc K.",
//     role: "Fondateur, ImmoLuxe",
//     message:
//       "J'avais besoin d'une app complexe en Next.js. Le résultat dépasse mes attentes.",
//     rating: 5,
//   },
//   {
//     id: 3,
//     name: "Agence Horizon",
//     role: "Partenaire",
//     message:
//       "Collaboration fluide, code propre et respect des délais. Je recommande à 100%.",
//     rating: 5,
//   },
// ];

// // Définition stricte du type
// type Testimonial = {
//   id: number | string;
//   name: string;
//   role?: string;
//   message: string;
//   rating?: number;
// };

// // Mise à jour de la Stack Technique (6 éléments pour l'équilibre)
// const RESOURCES = [
//   { name: "Next.js 14", desc: "Framework React", icon: "N" },
//   { name: "WordPress", desc: "CMS Flexible", icon: "W" },
//   { name: "Vercel", desc: "Cloud Next.js", icon: "▲" },
//   { name: "Hostinger", desc: "Hébergement WP", icon: "H" },
//   { name: "Supabase", desc: "Base de données", icon: "⚡" },
//   { name: "Lygos", desc: "Paiement Sécurisé", icon: "💳" },
// ];

// export default function AboutPage() {
//   // État pour stocker les avis (initialisé avec données locales)
//   const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);

//   // Charger les avis au démarrage
//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         const { data, error } = await supabase
//           .from("testimonials")
//           .select("*")
//           .eq("is_approved", true) // Seulement ceux approuvés
//           .order("created_at", { ascending: false })
//           .limit(3); // Prendre les 3 plus récents

//         if (error) {
//           return;
//         }

//         if (data && data.length > 0) {
//           // Normaliser les données SANS utiliser 'any'
//           const normalized: Testimonial[] = data.map(
//             (d: unknown, idx: number) => {
//               const row = d as Record<string, unknown>;

//               return {
//                 id: (row.id ?? `db-${idx}`) as string | number,
//                 name: (row.name as string) ?? "Client",
//                 role: (row.role as string) ?? "",
//                 message: (row.message as string) ?? "",
//                 rating: typeof row.rating === "number" ? row.rating : 5,
//               };
//             }
//           );
//           setTestimonials(normalized);
//         }
//       } catch (error) {
//         void error;
//       }
//     };

//     fetchTestimonials();
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#0F172A] pt-20">
//       {/* SECTION 1: BIO */}
//       <section className="container mx-auto px-4 py-20">
//         <div className="flex flex-col md:flex-row gap-12 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="flex-1"
//           >
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
//               Plus qu&apos;un développeur, <br />
//               <span className="text-primary">votre partenaire digital.</span>
//             </h1>
//             <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
//               <p>
//                 Bonjour ! Je suis un développeur passionné spécialisé dans la
//                 création de solutions web modernes. Basé au Congo et ouvert sur
//                 le monde, je combine créativité et rigueur technique.
//               </p>
//               <p>
//                 Mon parcours m&apos;a permis de maîtriser deux univers : la
//                 flexibilité de <strong>WordPress</strong> pour les projets
//                 rapides, et la puissance de <strong>Next.js</strong> pour les
//                 applications sur-mesure.
//               </p>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="flex-1 relative"
//           >
//             <div className="relative w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
//               <Image
//                 src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800"
//                 alt="Profile"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* SECTION 2: RESSOURCES (Mise à jour) */}
//       <section className="bg-white/5 border-y border-white/5 py-20">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-white mb-4">
//               Ma &quot;Secret Sauce&quot;
//             </h2>
//             <p className="text-gray-400">
//               Les outils que j&apos;utilise pour garantir performance, sécurité
//               et rapidité.
//             </p>
//           </div>

//           {/* Grille ajustée à 3 colonnes pour 6 éléments */}
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//             {RESOURCES.map((res, i) => (
//               <motion.div
//                 key={res.name}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="p-6 rounded-xl bg-[#0F172A] border border-white/10 hover:border-primary/50 transition-all group"
//               >
//                 <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 font-bold text-gray-200">
//                   {res.icon}
//                 </div>
//                 <h3 className="font-bold text-white text-xl">{res.name}</h3>
//                 <p className="text-sm text-gray-400">{res.desc}</p>
//               </motion.div>
//             ))}
//           </div>

//           <div className="mt-12 text-center">
//             <Link
//               href="/quote"
//               className="inline-flex items-center gap-2 px-8 py-3 bg-primary rounded-lg text-white font-bold hover:bg-blue-600 transition-colors"
//             >
//               Demander un devis <ArrowRight className="w-4 h-4" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* SECTION 3: TÉMOIGNAGES */}
//       <section className="py-20 container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-white mb-12 text-center">
//           Ce que disent mes clients
//         </h2>

//         <div className="grid md:grid-cols-3 gap-8">
//           {testimonials.map((t) => (
//             <motion.div
//               key={t.id}
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               className="p-8 rounded-2xl bg-white/5 border border-white/10 relative"
//             >
//               <Quote className="absolute top-4 right-4 text-white/10 w-10 h-10" />
//               <div className="flex gap-1 mb-4">
//                 {Array.from({ length: t.rating ?? 5 }).map((_, idx) => (
//                   <Star
//                     key={idx}
//                     className="w-4 h-4 text-yellow-500 fill-yellow-500"
//                   />
//                 ))}
//               </div>
//               <p className="text-gray-300 mb-6 italic">
//                 &quot;{t.message}&quot;
//               </p>
//               <div>
//                 <p className="text-white font-bold">{t.name}</p>
//                 <p className="text-sm text-primary">{t.role}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         <div className="text-center mt-12">
//           <Link
//             href="/review"
//             className="text-sm text-gray-500 hover:text-primary transition-colors"
//           >
//             Vous êtes un client satisfait ? Laissez un avis ici.
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }

// //app/about/page.tsx/ version V1
// "use client";

// import { motion } from "framer-motion";
// import { useEffect, useState } from "react"; // Ajouter useEffect et useState
// import { supabase } from "@/lib/supabase"; // Ajouter Supabase
// import { Quote, ArrowRight, Star } from "lucide-react"; // On garde uniquement ce qui est utilisé
// import Image from "next/image"; // Utilisation de Image
// import Link from "next/link";

// // Données Témoignages (valeurs de secours locales)
// const TESTIMONIALS = [
//   {
//     id: 1,
//     name: "Sarah M.",
//     role: "CEO, AfricaTech",
//     message:
//       "Le site WordPress qu'il a conçu a doublé nos conversions. Une expertise rare !",
//     rating: 5,
//   },
//   {
//     id: 2,
//     name: "Jean-Marc K.",
//     role: "Fondateur, ImmoLuxe",
//     message:
//       "J'avais besoin d'une app complexe en Next.js. Le résultat dépasse mes attentes.",
//     rating: 5,
//   },
//   {
//     id: 3,
//     name: "Agence Horizon",
//     role: "Partenaire",
//     message:
//       "Collaboration fluide, code propre et respect des délais. Je recommande à 100%.",
//     rating: 5,
//   },
// ];

// type Testimonial = {
//   id: number | string;
//   name: string;
//   role?: string;
//   message: string;
//   rating?: number;
// };

// const RESOURCES = [
//   { name: "Vercel", desc: "Déploiement Cloud", icon: "▲" },
//   { name: "Supabase", desc: "Base de données", icon: "⚡" },
//   { name: "Next.js 14", desc: "Framework React", icon: "N" },
//   { name: "Lygos", desc: "Paiement Sécurisé", icon: "💳" },
// ];

// export default function AboutPage() {
//   // État pour stocker les avis (initialisé avec données locales)
//   const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);

//   // Charger les avis au démarrage
//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         const { data, error } = await supabase
//           .from("testimonials")
//           .select("*")
//           .eq("is_approved", true) // Seulement ceux approuvés
//           .order("created_at", { ascending: false })
//           .limit(3); // Prendre les 3 plus récents

//         if (error) {
//           // Silencieux en production, mais on peut logguer en dev
//           // console.error('Supabase error:', error);
//           return;
//         }

//         if (data) {
//           // Normaliser les clés potentiellement différentes (message vs text)
//           const normalized: Testimonial[] = data.map(
//             (d: unknown, idx: number) => {
//               const row = d as Record<string, unknown>;
//               return {
//                 id: (row.id ?? `db-${idx}`) as number | string,
//                 name: (row.name ?? row.author ?? "Anonyme") as string,
//                 role: (row.role ?? row.position ?? "") as string,
//                 message: (row.message ?? row.text ?? "") as string,
//                 rating: (typeof row.rating === "number"
//                   ? row.rating
//                   : 5) as number,
//               };
//             }
//           );

//           setTestimonials(normalized);
//         }
//       } catch (error) {
//         void error;
//       }
//     };

//     fetchTestimonials();
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#0F172A] pt-20">
//       {/* SECTION 1: BIO */}
//       <section className="container mx-auto px-4 py-20">
//         <div className="flex flex-col md:flex-row gap-12 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="flex-1"
//           >
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
//               Plus qu&apos;un développeur, <br />
//               <span className="text-primary">votre partenaire digital.</span>
//             </h1>
//             <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
//               <p>
//                 Bonjour ! Je suis un développeur passionné spécialisé dans la
//                 création de solutions web modernes. Basé au Congo et ouvert sur
//                 le monde, je combine créativité et rigueur technique.
//               </p>
//               <p>
//                 Mon parcours m&apos;a permis de maîtriser deux univers : la
//                 flexibilité de <strong>WordPress</strong> pour les projets
//                 rapides, et la puissance de <strong>Next.js</strong> pour les
//                 applications sur-mesure.
//               </p>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="flex-1 relative"
//           >
//             <div className="relative w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
//               <Image
//                 src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800"
//                 alt="Profile"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* SECTION 2: RESSOURCES */}
//       <section className="bg-white/5 border-y border-white/5 py-20">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-white mb-4">
//               Ma &quot;Secret Sauce&quot;
//             </h2>
//             <p className="text-gray-400">
//               Les outils que j&apos;utilise pour garantir performance et
//               sécurité.
//             </p>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {RESOURCES.map((res, i) => (
//               <motion.div
//                 key={res.name}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="p-6 rounded-xl bg-[#0F172A] border border-white/10 hover:border-primary/50 transition-all group"
//               >
//                 <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
//                   {res.icon}
//                 </div>
//                 <h3 className="font-bold text-white text-xl">{res.name}</h3>
//                 <p className="text-sm text-gray-400">{res.desc}</p>
//               </motion.div>
//             ))}
//           </div>

//           <div className="mt-12 text-center">
//             <Link
//               href="/quote"
//               className="inline-flex items-center gap-2 px-8 py-3 bg-primary rounded-lg text-white font-bold hover:bg-blue-600 transition-colors"
//             >
//               Demander un devis <ArrowRight className="w-4 h-4" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* SECTION 3: TÉMOIGNAGES */}
//       <section className="py-20 container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-white mb-12 text-center">
//           Ce que disent mes clients
//         </h2>

//         {testimonials.length > 0 ? (
//           <div className="grid md:grid-cols-3 gap-8">
//             {testimonials.map((t) => (
//               <motion.div
//                 key={t.id}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 className="p-8 rounded-2xl bg-white/5 border border-white/10 relative"
//               >
//                 <Quote className="absolute top-4 right-4 text-white/10 w-10 h-10" />
//                 <div className="flex gap-1 mb-4">
//                   {Array.from({ length: t.rating ?? 5 }).map((_, idx) => (
//                     <Star
//                       key={idx}
//                       className="w-4 h-4 text-yellow-500 fill-yellow-500"
//                     />
//                   ))}
//                 </div>
//                 <p className="text-gray-300 mb-6 italic">
//                   &quot;{t.message}&quot;
//                 </p>
//                 <div>
//                   <p className="text-white font-bold">{t.name}</p>
//                   <p className="text-sm text-primary">{t.role}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center text-gray-500">
//             <p>Aucun avis pour le moment. Soyez le premier !</p>
//           </div>
//         )}

//         {/* Petit bouton discret pour inviter à laisser un avis */}
//         <div className="text-center mt-12">
//           <Link
//             href="/review"
//             className="text-sm text-gray-500 hover:text-primary transition-colors"
//           >
//             Vous êtes un client satisfait ? Laissez un avis ici.
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }
