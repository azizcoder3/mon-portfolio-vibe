"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  FileText,
  Clock,
  DollarSign,
  Loader2,
  Edit,
  X,
} from "lucide-react";
import { submitCustomQuote } from "@/lib/actions";
import { useRouter } from "next/navigation";

// Interface du formulaire
type QuoteFormValues = {
  name: string;
  email: string;
  description: string;
  budget: string;
};

export default function QuotePage() {
  const router = useRouter();

  // États
  const [deliveryOption, setDeliveryOption] = useState("7 jours");
  const [customDeliveryValue, setCustomDeliveryValue] = useState(""); // Pour stocker la saisie manuelle
  const [isCustomDate, setIsCustomDate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteFormValues>();

  const onSubmit = async (data: QuoteFormValues) => {
    setIsSubmitting(true);

    // LOGIQUE CORRIGÉE : Si "Autre" est activé, on prend la valeur saisie
    const finalDeadline = isCustomDate
      ? customDeliveryValue
        ? `${customDeliveryValue} (Personnalisé)`
        : "À définir"
      : deliveryOption;

    const finalData = {
      ...data,
      deliveryTime: finalDeadline,
    };

    const res = await submitCustomQuote(finalData);

    if (res.success) {
      router.push("/payment/success?type=order");
    } else {
      alert("Une erreur est survenue.");
      setIsSubmitting(false);
    }
  };

  // Fonction pour activer les boutons classiques
  const handlePresetClick = (time: string) => {
    setDeliveryOption(time);
    setIsCustomDate(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header Carte */}
          <div className="bg-slate-900 border border-slate-800 rounded-t-2xl p-6 border-b-0">
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
              Demander un devis
            </h1>
          </div>

          {/* Corps du Formulaire */}
          <div className="bg-slate-900 border border-slate-800 rounded-b-2xl p-8 pt-0 shadow-2xl">
            {/* Intro Profile */}
            <div className="flex items-center gap-4 mb-8 bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
              <div className="relative w-22 h-22 rounded-full overflow-hidden">
                <Image
                  src="/images/azizcoderProfil.png" // Ta photo de profil
                  alt="Aziz Coder"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-white">Aziz Coder3.0</h3>
                <p className="text-sm text-slate-400">
                  Bonjour, décrivez votre projet ci-dessous et je vous
                  recontacterai avec une estimation précise.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Nom */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-400" /> Votre nom{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name", { required: true })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-slate-600"
                  placeholder="Ex: Jean Dupont"
                />
                {errors.name && (
                  <span className="text-xs text-red-400">
                    Ce champ est requis
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" /> Adresse courriel{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-slate-600"
                  placeholder="jean@exemple.com"
                />
                {errors.email && (
                  <span className="text-xs text-red-400">
                    Ce champ est requis
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" /> Détails du
                  projet
                </label>
                <textarea
                  {...register("description", { required: true })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-slate-600 h-40 resize-none"
                  placeholder="Décrivez le service que vous souhaitez acheter. Soyez aussi précis que possible..."
                />
                <div className="text-right text-xs text-slate-500">
                  Maximum de détails apprécié
                </div>
              </div>

              {/* Délai (Sélecteur avec Input Dynamique) */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" /> Délai souhaité
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {/* Boutons Prédéfinis */}
                  {["24 heures", "3 jours", "7 jours"].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handlePresetClick(time)}
                      className={`py-3 px-2 rounded-lg text-sm font-medium border transition-all ${
                        deliveryOption === time && !isCustomDate
                          ? "bg-blue-600 text-white border-blue-500"
                          : "bg-slate-950 text-slate-400 border-slate-700 hover:border-slate-600"
                      }`}
                    >
                      {time}
                    </button>
                  ))}

                  {/* Bouton "Autre" qui devient un Input */}
                  {isCustomDate ? (
                    <div className="relative col-span-1">
                      <input
                        autoFocus
                        type="text"
                        value={customDeliveryValue}
                        onChange={(e) => setCustomDeliveryValue(e.target.value)}
                        placeholder="# Jours"
                        className="w-full h-full py-3 px-2 rounded-lg text-sm font-medium border border-blue-500 bg-slate-900 text-white focus:outline-none text-center placeholder-slate-600"
                      />
                      {/* Petit bouton X pour annuler si besoin */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomDate(false);
                          setCustomDeliveryValue("");
                          handlePresetClick("7 jours");
                        }}
                        className="absolute -top-2 -right-2 bg-slate-800 text-slate-400 rounded-full p-0.5 border border-slate-700 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsCustomDate(true)}
                      className={`py-3 px-2 rounded-lg text-sm font-medium border transition-all flex items-center justify-center gap-2 ${
                        isCustomDate
                          ? "bg-blue-600 text-white border-blue-500"
                          : "bg-slate-950 text-slate-400 border-slate-700 hover:border-slate-600"
                      }`}
                    >
                      <Edit className="w-3 h-3" /> Autre
                    </button>
                  )}
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-blue-400" /> Budget estimé{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">
                    $
                  </span>
                  <input
                    {...register("budget", { required: true })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 pl-8 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-slate-600"
                    placeholder="Ex: 500 ou 300.000 FCFA"
                  />
                </div>
                {errors.budget && (
                  <span className="text-xs text-red-400">
                    Ce champ est requis
                  </span>
                )}
              </div>

              {/* Bouton Soumettre */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-green-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Envoi...
                  </>
                ) : (
                  "Soumettre une demande"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
