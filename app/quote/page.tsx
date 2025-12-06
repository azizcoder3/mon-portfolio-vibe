"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Smartphone,
  CreditCard,
  Globe,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

// --- TYPES & CONFIGURATION ---

type Currency = "XAF" | "EUR";

interface Price {
  XAF: number;
  EUR: number;
}

interface ProjectType {
  id: string;
  label: string;
  price: Price;
  desc: string;
}

interface Feature {
  id: string;
  label: string;
  price: Price;
}

interface QuoteFormData {
  type: string;
  features: string[];
  name: string;
  email: string;
  phone: string;
  desc: string;
}

// --- DONNÉES (PRIX DOUBLE DEVISE) ---
// J'ai mis des prix "ronds" en Euros pour faire plus pro

const PROJECT_TYPES: ProjectType[] = [
  {
    id: "vitrine",
    label: "Site Vitrine",
    price: { XAF: 150000, EUR: 250 },
    desc: "Présentez votre activité",
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    price: { XAF: 350000, EUR: 550 },
    desc: "Vendez vos produits en ligne",
  },
  {
    id: "webapp",
    label: "App Web / SaaS",
    price: { XAF: 500000, EUR: 800 },
    desc: "Fonctionnalités sur mesure",
  },
];

const FEATURES: Feature[] = [
  { id: "design", label: "Design Premium", price: { XAF: 50000, EUR: 80 } },
  { id: "seo", label: "Optimisation SEO", price: { XAF: 30000, EUR: 50 } },
  { id: "cms", label: "Panel Admin (CMS)", price: { XAF: 80000, EUR: 120 } },
  { id: "multi", label: "Multi-langue", price: { XAF: 40000, EUR: 60 } },
  {
    id: "payment",
    label: "Paiement en ligne",
    price: { XAF: 60000, EUR: 100 },
  },
];

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState<Currency>("XAF"); // Par défaut en FCFA

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<QuoteFormData>({
    defaultValues: {
      type: "",
      features: [],
      name: "",
      email: "",
      phone: "",
      desc: "",
    },
  });

  // Calcul du prix en temps réel selon la devise choisie
  const selectedType = watch("type");
  const selectedFeatures = watch("features");

  const basePrice =
    PROJECT_TYPES.find((t) => t.id === selectedType)?.price[currency] || 0;

  const featuresPrice = selectedFeatures.reduce(
    (acc: number, featId: string) => {
      const feat = FEATURES.find((f) => f.id === featId);
      return acc + (feat?.price[currency] || 0);
    },
    0
  );

  const totalPrice = basePrice + featuresPrice;

  // --- GESTION DU PAIEMENT ---
  const onSubmit = async (data: QuoteFormData) => {
    setLoading(true);

    try {
      // 1. Sauvegarde dans Supabase
      const { data: quote, error } = await supabase
        .from("quotes")
        .insert([
          {
            client_name: data.name,
            email: data.email,
            project_type: data.type,
            features: data.features,
            amount: totalPrice,
            currency: currency, // On sauvegarde la devise choisie
            status: "pending_payment",
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // 2. Conversion pour Lygos
      // Lygos traite principalement le XAF.
      // Si le client paie en EUR, on convertit en XAF pour l'appel API Lygos.
      // Taux fixe approximatif pour la transaction technique : 1 EUR = 655.957 XAF
      let amountToSendToLygos = totalPrice;

      if (currency === "EUR") {
        amountToSendToLygos = Math.round(totalPrice * 655.957);
      }

      // 3. Appel à l'API Payment
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountToSendToLygos, // On envoie toujours des XAF à Lygos pour être sûr
          quoteId: quote.id,
          email: data.email,
        }),
      });

      const paymentData = await response.json();

      if (!response.ok) throw new Error(paymentData.error || "Erreur API");

      if (paymentData.url) {
        window.location.href = paymentData.url;
      } else {
        alert("Erreur de lien de paiement.");
      }
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const toggleFeature = (id: string) => {
    const current = watch("features");
    if (current.includes(id)) {
      setValue(
        "features",
        current.filter((f: string) => f !== id)
      );
    } else {
      setValue("features", [...current, id]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] pt-28 pb-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* EN-TÊTE AVEC SÉLECTEUR DE DEVISE */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          {/* Barre de progression */}
          <div className="flex gap-4 items-center">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border transition-all ${
                  step >= s
                    ? "bg-primary border-primary text-white"
                    : "bg-transparent border-white/20 text-gray-500"
                }`}
              >
                {s}
              </div>
            ))}
            <span className="text-gray-400 text-sm ml-2">Étape {step}/3</span>
          </div>

          {/* Bouton Toggle Devise */}
          <div className="bg-white/5 p-1 rounded-lg flex items-center border border-white/10">
            <button
              onClick={() => setCurrency("XAF")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                currency === "XAF"
                  ? "bg-primary text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              FCFA (XAF)
            </button>
            <button
              onClick={() => setCurrency("EUR")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                currency === "EUR"
                  ? "bg-primary text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              EURO (€)
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md relative overflow-hidden"
        >
          {/* Indicateur international (Décoration) */}
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Globe className="w-32 h-32 text-white" />
          </div>

          <AnimatePresence mode="wait">
            {/* ÉTAPE 1 : PROJET */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-white">
                  Quel est votre projet ?
                </h2>
                <div className="grid gap-4">
                  {PROJECT_TYPES.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => setValue("type", type.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
                        selectedType === type.id
                          ? "border-primary bg-primary/20 text-white"
                          : "border-white/10 hover:border-white/30 text-gray-300"
                      }`}
                    >
                      <div>
                        <h3 className="font-bold">{type.label}</h3>
                        <p className="text-sm text-gray-400">{type.desc}</p>
                      </div>
                      <div className="text-right">
                        <span className="block font-bold text-primary text-lg">
                          {type.price[currency].toLocaleString()}{" "}
                          {currency === "EUR" ? "€" : "FCFA"}
                        </span>
                        {selectedType === type.id && (
                          <Check className="w-5 h-5 text-primary ml-auto mt-1" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ÉTAPE 2 : FEATURES */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-white">
                  Fonctionnalités requises
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FEATURES.map((feat) => (
                    <div
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedFeatures.includes(feat.id)
                          ? "border-primary bg-primary/20 text-white"
                          : "border-white/10 hover:border-white/30 text-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{feat.label}</span>
                        {selectedFeatures.includes(feat.id) && (
                          <Check className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <span className="text-sm text-gray-400">
                        +{feat.price[currency].toLocaleString()}{" "}
                        {currency === "EUR" ? "€" : "FCFA"}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ÉTAPE 3 : INFO & TOTAL */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-white">
                  Vos Coordonnées
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    {...register("name", { required: true })}
                    placeholder="Nom complet"
                    className="bg-black/40 text-white border border-white/10 p-3 rounded-lg focus:border-primary outline-none"
                  />
                  <input
                    {...register("email", { required: true })}
                    placeholder="Email"
                    className="bg-black/40 text-white border border-white/10 p-3 rounded-lg focus:border-primary outline-none"
                  />
                  <input
                    {...register("phone")}
                    placeholder="Téléphone"
                    className="bg-black/40 text-white border border-white/10 p-3 rounded-lg focus:border-primary outline-none"
                  />
                </div>

                {/* BLOC PRIX FINAL */}
                <div className="bg-gradient-to-r from-blue-900/40 to-primary/20 p-6 rounded-xl border border-primary/30 mb-6 relative overflow-hidden">
                  <div className="relative z-10 flex justify-between items-center">
                    <div>
                      <span className="text-gray-300 block mb-1">
                        Total estimé
                      </span>
                      <p className="text-xs text-blue-200">
                        {currency === "EUR"
                          ? "Paiement international (Carte Bancaire)"
                          : "Paiement local (Mobile Money / Carte)"}
                      </p>
                    </div>
                    <span className="text-4xl font-bold text-white">
                      {totalPrice.toLocaleString()}{" "}
                      {currency === "EUR" ? "€" : "FCFA"}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* NAVIGATION */}
          <div className="flex justify-between mt-8 pt-4 border-t border-white/5 relative z-10">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 flex items-center gap-2 text-white"
              >
                <ChevronLeft className="w-4 h-4" /> Retour
              </button>
            ) : (
              <div></div>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 1 && !selectedType)
                    return alert("Choisissez un projet");
                  setStep(step + 1);
                }}
                className="px-6 py-3 rounded-lg bg-primary hover:bg-blue-600 font-bold flex items-center gap-2 text-white"
              >
                Suivant <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-lg bg-green-600 hover:bg-green-700 font-bold flex items-center gap-2 shadow-lg shadow-green-500/20 disabled:opacity-50 text-white"
              >
                {loading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <>
                    {currency === "EUR" ? (
                      <CreditCard className="w-5 h-5" />
                    ) : (
                      <Smartphone className="w-5 h-5" />
                    )}
                    <span>
                      Payer {totalPrice.toLocaleString()}{" "}
                      {currency === "EUR" ? "€" : "FCFA"}
                    </span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useForm } from "react-hook-form";
// import {
//   Check,
//   ChevronRight,
//   ChevronLeft,
//   Loader2,
//   Smartphone,
// } from "lucide-react";
// import { supabase } from "@/lib/supabase";

// // --- TYPES STRICTS ---

// interface ProjectType {
//   id: string;
//   label: string;
//   price: number;
//   desc: string;
// }

// interface Feature {
//   id: string;
//   label: string;
//   price: number;
// }

// interface QuoteFormData {
//   type: string;
//   features: string[];
//   name: string;
//   email: string;
//   phone: string;
//   desc: string;
// }

// // --- DONNÉES ---

// const PROJECT_TYPES: ProjectType[] = [
//   {
//     id: "vitrine",
//     label: "Site Vitrine",
//     price: 150000,
//     desc: "Présentez votre activité",
//   },
//   {
//     id: "ecommerce",
//     label: "E-commerce",
//     price: 350000,
//     desc: "Vendez vos produits en ligne",
//   },
//   {
//     id: "webapp",
//     label: "App Web / SaaS",
//     price: 500000,
//     desc: "Fonctionnalités sur mesure",
//   },
// ];

// const FEATURES: Feature[] = [
//   { id: "design", label: "Design Premium", price: 50000 },
//   { id: "seo", label: "Optimisation SEO", price: 30000 },
//   { id: "cms", label: "Panel Admin (CMS)", price: 80000 },
//   { id: "multi", label: "Multi-langue", price: 40000 },
//   { id: "payment", label: "Paiement en ligne", price: 60000 },
// ];

// export default function QuotePage() {
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm<QuoteFormData>({
//     defaultValues: {
//       type: "",
//       features: [],
//       name: "",
//       email: "",
//       phone: "",
//       desc: "",
//     },
//   });

//   // Calcul du prix en temps réel
//   const selectedType = watch("type");
//   const selectedFeatures = watch("features");

//   const basePrice =
//     PROJECT_TYPES.find((t) => t.id === selectedType)?.price || 0;
//   const featuresPrice = selectedFeatures.reduce(
//     (acc: number, featId: string) => {
//       const feat = FEATURES.find((f) => f.id === featId);
//       return acc + (feat?.price || 0);
//     },
//     0
//   );

//   const totalPrice = basePrice + featuresPrice;

//   // Gestion de la soumission
//   const onSubmit = async (data: QuoteFormData) => {
//     setLoading(true);

//     try {
//       // 1. Sauvegarde dans Supabase
//       const { data: quote, error } = await supabase
//         .from("quotes")
//         .insert([
//           {
//             client_name: data.name,
//             email: data.email,
//             project_type: data.type,
//             features: data.features,
//             amount: totalPrice,
//             status: "pending_payment",
//           },
//         ])
//         .select()
//         .single();

//       if (error) throw error;
//       if (!quote) throw new Error("Erreur lors de la création du devis");

//       // 2. Appel à l'API Payment (Interne)
//       const response = await fetch("/api/payment", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           amount: totalPrice,
//           quoteId: quote.id,
//           email: data.email,
//         }),
//       });

//       const paymentData = await response.json();

//       if (!response.ok) {
//         throw new Error(paymentData.error || "Erreur API Paiement");
//       }

//       if (paymentData.url) {
//         // Redirection vers Lygos
//         window.location.href = paymentData.url;
//       } else {
//         alert("Impossible de récupérer le lien de paiement.");
//       }
//     } catch (err) {
//       console.error(err);
//       const msg =
//         err instanceof Error ? err.message : "Une erreur est survenue.";
//       alert(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleFeature = (id: string) => {
//     const current = watch("features");
//     if (current.includes(id)) {
//       setValue(
//         "features",
//         current.filter((f: string) => f !== id)
//       );
//     } else {
//       setValue("features", [...current, id]);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0F172A] pt-28 pb-10 px-4">
//       <div className="max-w-3xl mx-auto">
//         {/* --- BARRE DE PROGRESSION RESTAURÉE --- */}
//         <div className="flex justify-between mb-8 relative">
//           {/* Ligne de fond grise */}
//           <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -z-10 rounded"></div>

//           {/* Ligne active bleue (progression) */}
//           <div
//             className="absolute top-1/2 left-0 h-1 bg-primary -z-10 rounded transition-all duration-500"
//             style={{ width: `${((step - 1) / 2) * 100}%` }}
//           ></div>

//           {/* Cercles 1, 2, 3 */}
//           {[1, 2, 3].map((s) => (
//             <div
//               key={s}
//               className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all border-2 ${
//                 step >= s
//                   ? "bg-primary border-primary text-white shadow-lg shadow-blue-500/30"
//                   : "bg-[#0F172A] border-white/10 text-gray-500"
//               }`}
//             >
//               {s}
//             </div>
//           ))}
//         </div>

//         {/* --- FORMULAIRE --- */}
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md"
//         >
//           <AnimatePresence mode="wait">
//             {/* ÉTAPE 1 : PROJET */}
//             {step === 1 && (
//               <motion.div
//                 key="step1"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//               >
//                 <h2 className="text-2xl font-bold mb-6 text-white">
//                   Quel est votre projet ?
//                 </h2>
//                 <div className="grid gap-4">
//                   {PROJECT_TYPES.map((type) => (
//                     <div
//                       key={type.id}
//                       onClick={() => setValue("type", type.id)}
//                       className={`p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
//                         selectedType === type.id
//                           ? "border-primary bg-primary/20 text-white"
//                           : "border-white/10 hover:border-white/30 text-gray-300"
//                       }`}
//                     >
//                       <div>
//                         <h3 className="font-bold">{type.label}</h3>
//                         <p className="text-sm text-gray-400">{type.desc}</p>
//                       </div>
//                       <div className="text-right">
//                         <span className="block font-bold text-primary">
//                           {type.price.toLocaleString()} FCFA
//                         </span>
//                         {selectedType === type.id && (
//                           <Check className="w-5 h-5 text-primary ml-auto mt-1" />
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             )}

//             {/* ÉTAPE 2 : FEATURES */}
//             {step === 2 && (
//               <motion.div
//                 key="step2"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//               >
//                 <h2 className="text-2xl font-bold mb-6 text-white">
//                   Fonctionnalités requises
//                 </h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {FEATURES.map((feat) => (
//                     <div
//                       key={feat.id}
//                       onClick={() => toggleFeature(feat.id)}
//                       className={`p-4 rounded-xl border cursor-pointer transition-all ${
//                         selectedFeatures.includes(feat.id)
//                           ? "border-primary bg-primary/20 text-white"
//                           : "border-white/10 hover:border-white/30 text-gray-300"
//                       }`}
//                     >
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="font-medium">{feat.label}</span>
//                         {selectedFeatures.includes(feat.id) && (
//                           <Check className="w-4 h-4 text-primary" />
//                         )}
//                       </div>
//                       <span className="text-sm text-gray-400">
//                         +{feat.price.toLocaleString()} FCFA
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             )}

//             {/* ÉTAPE 3 : INFO & PAIEMENT */}
//             {step === 3 && (
//               <motion.div
//                 key="step3"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//               >
//                 <h2 className="text-2xl font-bold mb-6 text-white">
//                   Vos Coordonnées
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                   <input
//                     {...register("name", { required: true })}
//                     placeholder="Nom complet"
//                     className="bg-black/40 text-white border border-white/10 p-3 rounded-lg focus:border-primary outline-none"
//                   />
//                   <input
//                     {...register("email", { required: true })}
//                     placeholder="Email"
//                     className="bg-black/40 text-white border border-white/10 p-3 rounded-lg focus:border-primary outline-none"
//                   />
//                   <input
//                     {...register("phone")}
//                     placeholder="Téléphone (Mobile Money)"
//                     className="bg-black/40 text-white border border-white/10 p-3 rounded-lg focus:border-primary outline-none"
//                   />
//                 </div>

//                 <div className="bg-primary/10 p-6 rounded-xl border border-primary/20 mb-6">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-gray-300">Total estimé</span>
//                     <span className="text-3xl font-bold text-white">
//                       {totalPrice.toLocaleString()} FCFA
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-400 mt-2">
//                     Paiement sécurisé par Lygos
//                   </p>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* BOUTONS DE NAVIGATION */}
//           <div className="flex justify-between mt-8 pt-4 border-t border-white/5">
//             {step > 1 ? (
//               <button
//                 type="button"
//                 onClick={() => setStep(step - 1)}
//                 className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 flex items-center gap-2 text-white"
//               >
//                 <ChevronLeft className="w-4 h-4" /> Retour
//               </button>
//             ) : (
//               <div></div>
//             )}

//             {step < 3 ? (
//               <button
//                 type="button"
//                 onClick={() => {
//                   if (step === 1 && !selectedType)
//                     return alert("Choisissez un projet");
//                   setStep(step + 1);
//                 }}
//                 className="px-6 py-3 rounded-lg bg-primary hover:bg-blue-600 font-bold flex items-center gap-2 text-white"
//               >
//                 Suivant <ChevronRight className="w-4 h-4" />
//               </button>
//             ) : (
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-8 py-3 rounded-lg bg-green-600 hover:bg-green-700 font-bold flex items-center gap-2 shadow-lg shadow-green-500/20 disabled:opacity-50 text-white"
//               >
//                 {loading ? (
//                   <Loader2 className="animate-spin w-5 h-5" />
//                 ) : (
//                   <Smartphone className="w-5 h-5" />
//                 )}
//                 Payer avec Lygos
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
