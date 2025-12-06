"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Database, Globe, Layout, Zap } from "lucide-react";

// Liste de tes compétences avec icônes et couleurs
const skills = [
  { name: "Next.js 14", icon: Globe, color: "text-white", bg: "bg-black" },
  { name: "React", icon: Code2, color: "text-blue-400", bg: "bg-blue-900/20" },
  {
    name: "TypeScript",
    icon: Code2,
    color: "text-blue-500",
    bg: "bg-blue-900/20",
  },
  {
    name: "Tailwind CSS",
    icon: Layout,
    color: "text-cyan-400",
    bg: "bg-cyan-900/20",
  },
  {
    name: "Supabase",
    icon: Database,
    color: "text-green-400",
    bg: "bg-green-900/20",
  },
  {
    name: "AI Engineering",
    icon: Cpu,
    color: "text-purple-400",
    bg: "bg-purple-900/20",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-20 bg-background relative overflow-hidden"
    >
      {/* Élément décoratif en fond */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* COLONNE GAUCHE : TEXTE */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
              <Zap className="text-yellow-400 w-8 h-8 fill-yellow-400" />
              L&apos;approche <span className="text-primary">Vibe Coding</span>
            </h2>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Le développement web a changé. Aujourd&apos;hui, il ne
                s&apos;agit plus seulement d&apos;écrire du code ligne par
                ligne, mais d&apos;orchestrer des solutions intelligentes.
              </p>
              <p>
                En tant que <strong>&quot;Vibe Coder&quot;</strong>,
                j&apos;utilise l&apos;intelligence artificielle comme un
                multiplicateur de force. Cela me permet de :
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-400">
                <li>
                  Coder <strong>3x plus vite</strong> que la moyenne.
                </li>
                <li>Garantir un code propre, sécurisé et moderne.</li>
                <li>
                  Me concentrer sur ce qui compte vraiment :{" "}
                  <strong>l&apos;expérience utilisateur</strong> et votre
                  business.
                </li>
              </ul>
              <p className="pt-4 font-semibold text-white">
                Je ne vends pas juste du code, je vends de la vitesse
                d&apos;exécution et de l&apos;innovation.
              </p>
            </div>
          </div>

          {/* COLONNE DROITE : GRILLE DE COMPÉTENCES */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-200">
              Stack Technique
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`p-4 rounded-xl border border-white/5 ${skill.bg} hover:border-white/20 transition-all cursor-default group`}
                >
                  <skill.icon className={`w-8 h-8 mb-3 ${skill.color}`} />
                  <p className="font-medium text-sm text-gray-300 group-hover:text-white transition-colors">
                    {skill.name}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Carte additionnelle "Stats" */}
            <div className="mt-8 p-6 rounded-2xl bg-linear-to-r from-primary/10 to-secondary/10 border border-white/5 flex justify-between items-center">
              <div>
                <p className="text-3xl font-bold text-white">100%</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Satisfaction Client
                </p>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div>
                <p className="text-3xl font-bold text-white">24h</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Réponse garantie
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
