"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Loader2,
  MessageSquare,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { submitContactForm } from "@/lib/actions"; // <--- IMPORT DE L'ACTION

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    setIsError(false);

    // Appel de la Server Action au lieu de fetch('/api/...')
    const result = await submitContactForm(data);

    if (result.success) {
      setIsSuccess(true);
      reset();
      // On retire le message de succès après 5 secondes
      setTimeout(() => setIsSuccess(false), 5000);
    } else {
      console.error(result.error);
      setIsError(true);
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Texte Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-4 h-4 bg-green-500/20 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-400 uppercase tracking-wider">
                  Contact & Collaboration
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white">
                Discutons de votre
                <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                  Prochain Projet
                </span>
              </h1>

              <p className="text-xl text-slate-300 leading-relaxed">
                Une idée en tête ? Un projet à concrétiser ? Je suis disponible
                pour échanger sur vos besoins et vous proposer la meilleure
                solution technique.
              </p>

              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-slate-900/30 border border-slate-800/50 rounded-lg backdrop-blur-sm">
                  <span className="text-sm text-slate-300">
                    🚀 Réponse sous 24h
                  </span>
                </div>
                <div className="px-4 py-2 bg-slate-900/30 border border-slate-800/50 rounded-lg backdrop-blur-sm">
                  <span className="text-sm text-slate-300">
                    💼 Devis gratuit
                  </span>
                </div>
                <div className="px-4 py-2 bg-slate-900/30 border border-slate-800/50 rounded-lg backdrop-blur-sm">
                  <span className="text-sm text-slate-300">
                    🌍 International
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Image Hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="relative mx-auto max-w-md">
                <div className="absolute -inset-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-50" />
                <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-800/20 border border-slate-800/50 rounded-2xl overflow-hidden backdrop-blur-sm group">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
                      alt="Contact"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 backdrop-blur-sm border border-emerald-500/30 rounded-full shadow-xl">
                      <span className="text-sm font-medium text-white flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Disponible maintenant
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 pb-20">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Info Colonne Gauche */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/20 border border-slate-800/50 rounded-2xl p-8 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-green-400" />
                    Coordonnées
                  </h3>
                  <div className="space-y-6">
                    {[
                      {
                        icon: Mail,
                        label: "Email",
                        value: "contact@dev-ai.com",
                        href: "mailto:contact@dev-ai.com",
                      },
                      {
                        icon: Phone,
                        label: "Téléphone",
                        value: "+242 06 000 00 00",
                      },
                      {
                        icon: MapPin,
                        label: "Localisation",
                        value: "Brazzaville, Congo",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start gap-4 group"
                      >
                        <div className="p-3 bg-slate-800/50 rounded-xl group-hover:bg-slate-700/50 transition-colors border border-slate-700/50">
                          <item.icon className="w-5 h-5 text-slate-400 group-hover:text-green-400 transition-colors" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">{item.label}</p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-white hover:text-green-400 transition-colors font-medium"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-white font-medium">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire Colonne Droite */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/20 border border-slate-800/50 rounded-2xl p-8 backdrop-blur-sm">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Envoyez-moi un message
                  </h3>
                  <p className="text-slate-400">
                    Remplissez le formulaire ci-dessous.
                  </p>
                </div>

                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center p-8"
                  >
                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
                      <Send className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Message envoyé !
                    </h3>
                    <p className="text-slate-400 mb-6">
                      Je vous répondrai dans les plus brefs délais.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="text-green-400 hover:text-green-300 transition-colors text-sm font-medium flex items-center gap-2"
                    >
                      Envoyer un autre message{" "}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-slate-300">
                          Nom complet *
                        </label>
                        <input
                          {...register("name", { required: true })}
                          className="w-full bg-slate-900/30 border border-slate-800/50 rounded-lg p-3 text-white focus:border-green-500/50 outline-none transition-all"
                          placeholder="Votre nom"
                        />
                        {errors.name && (
                          <span className="text-red-400 text-xs mt-1">
                            Requis
                          </span>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-slate-300">
                          Email *
                        </label>
                        <input
                          {...register("email", {
                            required: true,
                            pattern: /^\S+@\S+$/i,
                          })}
                          className="w-full bg-slate-900/30 border border-slate-800/50 rounded-lg p-3 text-white focus:border-green-500/50 outline-none transition-all"
                          placeholder="email@exemple.com"
                        />
                        {errors.email && (
                          <span className="text-red-400 text-xs mt-1">
                            Email invalide
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-300">
                        Sujet *
                      </label>
                      <input
                        {...register("subject", { required: true })}
                        className="w-full bg-slate-900/30 border border-slate-800/50 rounded-lg p-3 text-white focus:border-green-500/50 outline-none transition-all"
                        placeholder="Projet Web..."
                      />
                      {errors.subject && (
                        <span className="text-red-400 text-xs mt-1">
                          Requis
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-300">
                        Message *
                      </label>
                      <textarea
                        {...register("message", { required: true })}
                        className="w-full bg-slate-900/30 border border-slate-800/50 rounded-lg p-3 text-white focus:border-green-500/50 outline-none transition-all h-40 resize-none"
                        placeholder="Votre message..."
                      />
                      {errors.message && (
                        <span className="text-red-400 text-xs mt-1">
                          Requis
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-xl text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" /> Envoi...
                        </>
                      ) : (
                        <>
                          Envoyer le message <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    {isError && (
                      <p className="text-red-400 text-center text-sm">
                        Une erreur est survenue.
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
