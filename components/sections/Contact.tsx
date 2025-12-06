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
  Linkedin,
  Github,
  Twitter,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

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

    try {
      const { error } = await supabase.from("contacts").insert([data]);

      if (error) throw error;

      setIsSuccess(true);
      reset(); // Vider le formulaire

      // Enlever le message de succès après 5 secondes
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background relative">
      {/* Background Gradients */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 lg:gap-20"
        >
          {/* COLONNE GAUCHE : INFOS */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Parlons de votre <br />
              <span className="text-primary">Prochain Projet</span>
            </h2>
            <p className="text-gray-400 mb-12 text-lg">
              Une idée en tête ? Un projet à concrétiser ? Je suis disponible
              pour échanger sur vos besoins et vous proposer la meilleure
              solution technique.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a
                    href="mailto:contact@dev-ai.com"
                    className="text-white hover:text-primary transition-colors font-medium"
                  >
                    contact@dev-ai.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Téléphone</p>
                  <p className="text-white font-medium">+242 06 000 00 00</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Localisation</p>
                  <p className="text-white font-medium">Brazzaville, Congo</p>
                </div>
              </div>
            </div>

            {/* Réseaux Sociaux */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-sm text-gray-500 mb-4">Suivez-moi</p>
              <div className="flex gap-4">
                {[Github, Linkedin, Twitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="p-3 bg-white/5 rounded-lg hover:bg-primary hover:text-white transition-all text-gray-400"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* COLONNE DROITE : FORMULAIRE */}
          <div className="bg-glass border border-white/10 p-8 rounded-2xl relative overflow-hidden">
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-[#0F172A] z-20 flex flex-col items-center justify-center text-center p-8"
              >
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                  <Send className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Message envoyé !
                </h3>
                <p className="text-gray-400">
                  Je vous répondrai dans les plus brefs délais.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 text-primary hover:underline"
                >
                  Envoyer un autre message
                </button>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Nom
                  </label>
                  <input
                    {...register("name", { required: true })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="Votre nom"
                  />
                  {errors.name && (
                    <span className="text-red-400 text-xs">Requis</span>
                  )}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Email
                  </label>
                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="john@doe.com"
                  />
                  {errors.email && (
                    <span className="text-red-400 text-xs">Email invalide</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Sujet
                </label>
                <input
                  {...register("subject", { required: true })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="Projet Web, Partenariat..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Message
                </label>
                <textarea
                  {...register("message", { required: true })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all h-32 resize-none"
                  placeholder="Dites-m'en plus sur votre besoin..."
                />
                {errors.message && (
                  <span className="text-red-400 text-xs">Message requis</span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary hover:bg-blue-600 text-white rounded-lg font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
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
                  Une erreur est survenue. Réessayez plus tard.
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
