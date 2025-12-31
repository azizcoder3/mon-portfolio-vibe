//components/sections/ServiceDetailClient.tsx
"use client";

import { useState } from "react";
import {
  Check,
  Clock,
  RefreshCcw,
  Shield,
  ArrowRight,
  Code2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface ServicePackage {
  name: string;
  price: string;
  description: string;
  delivery_time: string;
  revisions: number;
  features: string[];
  tier: string;
  is_popular?: boolean;
  popular?: boolean;
}

interface Service {
  color_theme: string;
  id: string;
  title: string;
  image_url: string;
  intro: string;
  description?: string[];
  technologies?: string[];
  packages: {
    basic: ServicePackage;
    standard: ServicePackage;
    premium: ServicePackage;
  };
}

export default function ServiceDetailClient({ service }: { service: Service }) {
  const [activeTab, setActiveTab] = useState<"basic" | "standard" | "premium">(
    "standard"
  );
  const pkg = service.packages ? service.packages[activeTab] : null;

  if (!pkg)
    return (
      <div className="text-center text-white py-20">
        Pack introuvable ou incomplet.
      </div>
    );

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Colonne Gauche - Infos */}
        <div className="lg:col-span-2">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800/50 mb-8 group"
          >
            <Image
              src={service.image_url}
              alt={service.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Description */}
          <div className="space-y-6 mb-12">
            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/20 border border-slate-800/50 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-4">À propos</h2>
              <p className="text-slate-300 leading-relaxed text-lg mb-4">
                {service.intro}
              </p>
              {service.description?.map((p: string, i: number) => (
                <p key={i} className="text-slate-300 mb-2">
                  {p}
                </p>
              ))}
            </div>

            {/* Technologies */}
            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/20 border border-slate-800/50 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-400" /> Technologies
              </h3>
              <div className="flex flex-wrap gap-3">
                {service.technologies?.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-slate-800/50 text-slate-300 rounded-lg border border-slate-700/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Colonne Droite - Packages */}

        <div className="lg:col-span-1">
          <div className="sticky top-28">
            {/* Définition de la couleur du thème (fallback sur 'blue' si absent) */}
            {(() => {
              const themeColor = service.color_theme || "blue";

              return (
                <>
                  {/* Tabs Navigation */}
                  <div className="flex mb-6 bg-slate-900/50 border border-slate-800/50 rounded-xl p-1 backdrop-blur-sm">
                    {(["basic", "standard", "premium"] as const).map((tab) => {
                      const tabKey = tab as "basic" | "standard" | "premium";
                      const isSelected = activeTab === tabKey;

                      return (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tabKey)}
                          className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all capitalize ${
                            isSelected
                              ? `bg-gradient-to-r from-${themeColor}-500 to-${themeColor}-600 text-white shadow-lg shadow-${themeColor}-500/25`
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          {service.packages[tabKey]?.name || tab}
                        </button>
                      );
                    })}
                  </div>

                  {/* Carte Package */}
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/50 rounded-2xl overflow-hidden shadow-2xl"
                  >
                    {/* Header du Package */}
                    <div className="p-8 border-b border-slate-800/50">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white">
                            {pkg.name}
                          </h3>
                          {/* Badge Populaire dynamique */}
                          {(pkg.is_popular || pkg.popular) && (
                            <span
                              className={`inline-block mt-2 px-3 py-1 bg-${themeColor}-500/20 text-${themeColor}-400 text-xs font-medium rounded-full border border-${themeColor}-500/30`}
                            >
                              🔥 Le plus populaire
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white">
                            {pkg.price}
                          </div>
                          <div className="text-sm text-slate-400">TTC</div>
                        </div>
                      </div>

                      <p className="text-slate-300 mb-6 text-sm leading-relaxed">
                        {pkg.description}
                      </p>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span>{pkg.delivery_time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <RefreshCcw className="w-4 h-4 text-slate-400" />
                          <span>{pkg.revisions} révisions</span>
                        </div>
                      </div>
                    </div>

                    {/* Features & CTA */}
                    <div className="p-8">
                      <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-400" />
                        Ce qui est inclus
                      </h4>
                      <ul className="space-y-3 mb-8">
                        {pkg.features?.map((feat: string, i: number) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check
                              className={`w-4 h-4 text-${themeColor}-400 mt-1 shrink-0`}
                            />
                            <span className="text-sm text-slate-300">
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {/* Bouton d'action vers le Devis */}
                      <Link
                        // CORRECTION ICI : on pointe vers /quote au lieu de /contact
                        href={`/quote?service=${service.id}&plan=${pkg.tier}`}
                        className={`group block w-full py-4 bg-gradient-to-r from-${themeColor}-500 to-${themeColor}-600 text-white font-semibold rounded-xl text-center hover:shadow-xl hover:shadow-${themeColor}-500/25 transition-all duration-300 mb-4`}
                      >
                        <span className="flex items-center justify-center gap-2">
                          Commander ce package
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>

                      <p className="text-center text-xs text-slate-500">
                        💳 Paiement sécurisé • 📄 Facture fournie • 🤝 Support
                        inclus
                      </p>
                    </div>
                  </motion.div>

                  {/* Bloc Garantie (Ajouté comme demandé) */}
                  <div className="mt-6 p-6 bg-slate-900/30 border border-slate-800/50 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="w-5 h-5 text-green-400" />
                      <span className="font-medium text-white">
                        Garantie Satisfait ou Remboursé
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Vous avez 7 jours après la livraison pour demander des
                      modifications ou un remboursement si le résultat ne
                      correspond pas au cahier des charges.
                    </p>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </>
  );
}
