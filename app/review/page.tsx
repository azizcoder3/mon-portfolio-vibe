// app/review/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import {
  Star,
  Send,
  Loader2,
  Sparkles,
  Quote,
  Users,
  ArrowRight,
  CheckCircle2,
  Shield,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ReviewFormData {
  name: string;
  role: string;
  message: string;
  rating: number;
}

export default function ReviewPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>({
    defaultValues: {
      name: "",
      role: "",
      message: "",
      rating: 0,
    },
  });

  const currentRating = watch("rating");

  const onSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("testimonials").insert([
        {
          name: data.name,
          role: data.role,
          message: data.message,
          rating: data.rating,
          is_approved: false,
        },
      ]);

      if (error) throw error;

      setIsSuccess(true);
      reset();

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Erreur lors de l'envoi du témoignage:", error);
      alert("Une erreur est survenue lors de l'envoi de votre témoignage.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-slate-950 pt-20">
      {/* Background avec textures */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Texte Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-4 h-4 bg-purple-500/20 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-purple-400 uppercase tracking-wider">
                  Partage d&apos;expérience
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white">
                Votre avis compte
                <span className="block mt-4 text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
                  Énormément
                </span>
              </h1>

              <p className="text-xl text-slate-300 leading-relaxed">
                Votre témoignage aide d&apos;autres entrepreneurs à faire le bon
                choix et me permet de continuer à améliorer mes services.
                Partagez votre expérience de collaboration.
              </p>

              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-slate-900/30 border border-slate-800/50 rounded-lg backdrop-blur-sm">
                  <span className="text-sm text-slate-300">
                    💎 Votre avis inspire
                  </span>
                </div>
                <div className="px-4 py-2 bg-slate-900/30 border border-slate-800/50 rounded-lg backdrop-blur-sm">
                  <span className="text-sm text-slate-300">
                    🤝 Aide la communauté
                  </span>
                </div>
                <div className="px-4 py-2 bg-slate-900/30 border border-slate-800/50 rounded-lg backdrop-blur-sm">
                  <span className="text-sm text-slate-300">
                    ⭐ Témoignage vérifié
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
                <div className="absolute -inset-8 bg-linear-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-50" />

                <div className="relative bg-linear-to-br from-slate-900/50 to-slate-800/20 border border-slate-800/50 rounded-2xl overflow-hidden backdrop-blur-sm group">
                  <div className="aspect-4/3 relative overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
                      alt="Partage d'expérience et témoignage"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
                  </div>

                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <div className="px-4 py-2 bg-linear-to-r from-purple-500 to-pink-600 backdrop-blur-sm border border-pink-500/30 rounded-full shadow-xl">
                      <span className="text-sm font-medium text-white flex items-center gap-2">
                        <Quote className="w-4 h-4" />
                        Partagez votre histoire
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Formulaire de Review */}
        <section className="container mx-auto px-4 pb-20">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-4 h-4 bg-amber-500/20 rounded-full" />
                <span className="text-sm font-medium text-amber-400 uppercase tracking-wider">
                  Formulaire de témoignage
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Partagez votre expérience
              </h2>
              <p className="text-slate-400">
                Remplissez ce formulaire pour partager votre témoignage. Votre
                avis sera publié après modération.
              </p>
            </div>

            {/* Formulaire */}
            <div className="bg-linear-to-br from-slate-900/50 to-slate-800/20 border border-slate-800/50 rounded-2xl p-8 backdrop-blur-sm">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Merci pour votre témoignage !
                  </h3>
                  <p className="text-slate-400 mb-6">
                    Votre avis a été envoyé avec succès. Il sera publié après
                    modération.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-green-400 hover:text-green-300 transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    Laisser un autre témoignage
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Évaluation par étoiles */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-4">
                      Note globale *
                    </label>
                    <div className="flex gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setValue("rating", star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-2"
                        >
                          <Star
                            className={`w-8 h-8 transition-all ${
                              star <= (hoverRating || currentRating)
                                ? "text-amber-500 fill-amber-500"
                                : "text-slate-700"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    {errors.rating && (
                      <span className="text-red-400 text-xs">
                        Veuillez donner une note
                      </span>
                    )}
                  </div>

                  {/* Champs du formulaire */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Votre nom *
                      </label>
                      <input
                        {...register("name", { required: true })}
                        className="w-full bg-slate-900/30 border border-slate-800/50 rounded-xl p-4 text-white placeholder-slate-500 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 outline-none transition-all"
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <span className="text-red-400 text-xs mt-1 block">
                          Ce champ est requis
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Votre fonction / entreprise
                      </label>
                      <input
                        {...register("role")}
                        className="w-full bg-slate-900/30 border border-slate-800/50 rounded-xl p-4 text-white placeholder-slate-500 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 outline-none transition-all"
                        placeholder="CEO, Entrepreneur, Freelancer..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Votre témoignage *
                    </label>
                    <textarea
                      {...register("message", {
                        required: true,
                        minLength: 20,
                      })}
                      className="w-full bg-slate-900/30 border border-slate-800/50 rounded-xl p-4 text-white placeholder-slate-500 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 outline-none transition-all h-40 resize-none"
                      placeholder="Partagez votre expérience de collaboration... Qu'avez-vous aimé ? Quels résultats avez-vous obtenu ?"
                    />
                    {errors.message && (
                      <span className="text-red-400 text-xs mt-1 block">
                        Votre témoignage doit contenir au moins 20 caractères
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-linear-to-r from-purple-500 to-pink-600 hover:shadow-xl hover:shadow-purple-500/25 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Publier mon témoignage
                        <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <p className="text-xs text-slate-500">
                      <Shield className="w-3 h-3 inline mr-1" />
                      Votre témoignage sera publié après modération. Vos
                      informations personnelles ne seront pas partagées.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Pourquoi partager son avis */}
        <section className="py-20 border-t border-slate-800/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-4 h-4 bg-blue-500/20 rounded-full" />
                <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">
                  Pourquoi partager ?
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Votre avis fait la différence
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: Users,
                  title: "Inspirez d'autres entrepreneurs",
                  desc: "Votre expérience aide d'autres personnes à prendre la bonne décision pour leur projet digital.",
                },
                {
                  icon: Sparkles,
                  title: "Améliorez mes services",
                  desc: "Vos retours constructifs me permettent de constamment améliorer la qualité de mes prestations.",
                },
                {
                  icon: Quote,
                  title: "Construisez la confiance",
                  desc: "Les témoignages authentiques créent une communauté de confiance et de transparence.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="p-6 bg-linear-to-b from-slate-900/50 to-slate-800/20 border border-slate-800/50 rounded-2xl backdrop-blur-sm"
                >
                  <div
                    className={`p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 w-fit mb-4`}
                  >
                    <item.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="relative bg-linear-to-br from-slate-900/50 to-slate-800/20 border border-slate-800/50 rounded-3xl p-12 overflow-hidden max-w-4xl mx-auto">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[100px]" />

              <div className="relative text-center">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-4 h-4 bg-green-500/20 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-green-400 uppercase tracking-wider">
                    Merci
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Merci pour votre confiance
                </h2>

                <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                  Chaque témoignage est précieux et contribue à construire une
                  communauté de confiance autour de mon travail. Merci de
                  prendre le temps de partager votre expérience.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="group px-8 py-4 bg-linear-to-r from-green-500 to-emerald-600 rounded-xl text-white font-semibold hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300 inline-flex items-center justify-center gap-2"
                  >
                    <span>Retourner au site</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/testimonials"
                    className="px-8 py-4 bg-slate-900/50 border border-slate-800/50 rounded-xl text-white font-medium hover:border-slate-700/50 hover:bg-slate-900/70 transition-all duration-300"
                  >
                    Voir tous les témoignages
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
