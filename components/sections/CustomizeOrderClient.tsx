"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronLeft,
  Clock,
  CreditCard,
  Shield,
  Loader2,
  ShoppingBag,
  Info,
  User,
  Mail,
  FileText,
} from "lucide-react";
import { submitOrder } from "@/lib/actions";

// 1. Définition stricte des types
interface Option {
  id: string;
  label: string;
  description: string;
  price_eur: number;
  price_fcfa: number;
  extra_days: number;
}

// On définit le service complet, pas juste une partie
interface ProService {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  base_price_eur: number;
  base_price_fcfa: number;
  delivery_days: number;
  // Ajoute d'autres champs si besoin (category, features...)
}

export default function CustomizeOrderClient({
  service,
  options,
}: {
  service: ProService;
  options: Option[];
}) {
  const router = useRouter();

  // États
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", email: "", note: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculs dynamiques
  const basePriceEur = service.base_price_eur;
  const basePriceFcfa = service.base_price_fcfa;
  const baseDays = service.delivery_days;

  // Somme des options
  const optionsTotalEur = selectedOptions.reduce((acc, id) => {
    const opt = options.find((o) => o.id === id);
    return acc + (opt?.price_eur || 0);
  }, 0);

  const optionsTotalFcfa = selectedOptions.reduce((acc, id) => {
    const opt = options.find((o) => o.id === id);
    return acc + (opt?.price_fcfa || 0);
  }, 0);

  const optionsDays = selectedOptions.reduce((acc, id) => {
    const opt = options.find((o) => o.id === id);
    return acc + (opt?.extra_days || 0);
  }, 0);

  // Totaux finaux
  const finalPriceEur = basePriceEur + optionsTotalEur;
  const finalPriceFcfa = basePriceFcfa + optionsTotalFcfa;
  const finalDays = Math.max(1, baseDays + optionsDays);

  // Gestion des cases à cocher
  const toggleOption = (id: string) => {
    if (selectedOptions.includes(id)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== id));
    } else {
      setSelectedOptions([...selectedOptions, id]);
    }
  };

  // Soumission
  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      alert("Veuillez remplir votre nom et email.");
      return;
    }

    setIsSubmitting(true);

    // Préparation des données typées
    const orderData = {
      name: form.name,
      email: form.email,
      note: form.note,
      serviceTitle: service.title,
      // On envoie un tableau de strings (les noms des options) pour correspondre à la BDD
      selectedOptions: options
        .filter((o) => selectedOptions.includes(o.id))
        .map((o) => o.label),
      totalPrice: finalPriceFcfa,
      totalDays: finalDays,
    };

    const res = await submitOrder(orderData);

    if (res.success) {
      router.push(`/payment/success?type=order`);
    } else {
      alert("Erreur lors de la commande. Veuillez réessayer.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* --- COLONNE GAUCHE : APERÇU & OPTIONS --- */}
      <div className="lg:col-span-2 space-y-8">
        {/* 1. Aperçu du projet de base */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row gap-6">
          <div className="relative w-full sm:w-32 h-32 rounded-xl overflow-hidden shrink-0 border border-slate-700">
            <Image
              src={service.image_url || "/images/placeholder.jpg"}
              alt={service.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold text-white">{service.title}</h2>
              <div className="text-right">
                <div className="text-lg font-bold text-white">
                  {basePriceEur} €
                </div>
                <div className="text-xs text-slate-500">
                  {basePriceFcfa.toLocaleString()} FCFA
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm mt-2 line-clamp-2">
              {service.description}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-blue-400 bg-blue-900/20 px-3 py-1 rounded-full w-fit border border-blue-500/20">
              <Clock className="w-3 h-3" /> Délai de base : {baseDays} jours
            </div>
          </div>
        </div>

        {/* 2. Options Complémentaires */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-purple-400" />
            Personnalisez votre offre
          </h3>

          <div className="space-y-4">
            {options.map((option) => {
              const isSelected = selectedOptions.includes(option.id);
              return (
                <div
                  key={option.id}
                  onClick={() => toggleOption(option.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${
                    isSelected
                      ? "bg-blue-600/10 border-blue-500"
                      : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {/* Checkbox visuelle */}
                  <div
                    className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "bg-blue-500 border-blue-500"
                        : "border-slate-600"
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4
                        className={`font-semibold ${isSelected ? "text-white" : "text-slate-300"}`}
                      >
                        {option.label}
                      </h4>
                      <div className="text-right">
                        <span className="block font-bold text-white">
                          +{option.price_eur} €
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500">
                      {option.description}
                    </p>
                    {option.extra_days !== 0 && (
                      <span
                        className={`text-xs mt-1 block ${option.extra_days > 0 ? "text-amber-500" : "text-green-400"}`}
                      >
                        {option.extra_days > 0
                          ? `+${option.extra_days} jours`
                          : `${option.extra_days} jours (Rapide)`}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {options.length === 0 && (
              <p className="text-slate-500 text-center italic py-4">
                Aucune option disponible pour ce service.
              </p>
            )}
          </div>
        </div>

        {/* 3. Formulaire Coordonnées */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-400" /> Vos Coordonnées
          </h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Votre nom *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors"
                  placeholder="Jean Dupont"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Email professionnel *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors"
                  placeholder="jean@entreprise.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Note supplémentaire (Optionnel)
              </label>
              <textarea
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors h-24 resize-none"
                placeholder="Précisions sur votre projet, délais, références..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- COLONNE DROITE : RÉSUMÉ STICKY --- */}
      <div className="lg:col-span-1">
        <div className="sticky top-28 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-6 pb-4 border-b border-slate-800">
              Résumé de commande
            </h3>

            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Prix de base</span>
                <span>{basePriceEur} €</span>
              </div>
              {selectedOptions.map((id) => {
                const opt = options.find((o) => o.id === id);
                return (
                  <div key={id} className="flex justify-between text-blue-300">
                    <span>+ {opt?.label}</span>
                    <span>{opt?.price_eur} €</span>
                  </div>
                );
              })}
              <div className="flex justify-between text-slate-500 pt-2 border-t border-slate-800/50">
                <span>Autres frais</span>
                <span>0,00 €</span>
              </div>
            </div>

            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 mb-6">
              <div className="flex justify-between items-end mb-1">
                <span className="text-slate-400">Total estimé</span>
                <span className="text-2xl font-bold text-white">
                  {finalPriceEur} €
                </span>
              </div>
              <div className="text-right text-sm text-slate-500">
                ≈ {finalPriceFcfa.toLocaleString()} FCFA
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-amber-400 bg-amber-900/20 px-2 py-1 rounded">
                <Clock className="w-3 h-3" />
                Livraison estimée : {finalDays} jours
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Soumettre pour approbation"
              )}
            </button>

            <div className="mt-4 flex items-start gap-2 text-[10px] text-slate-400 bg-slate-800/50 p-2 rounded-lg">
              <Info className="w-4 h-4 shrink-0 text-blue-400" />
              <p>
                Nous examinerons votre commande sous 24h. Après confirmation,
                vous recevrez une facture.
              </p>
            </div>
          </div>

          {/* Sécurité */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <Shield className="w-3 h-3" /> Données sécurisées & Confidentielles
          </div>
        </div>
      </div>
    </div>
  );
}
