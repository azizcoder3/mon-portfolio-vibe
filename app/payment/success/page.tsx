"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle, Home, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

// Composant interne qui utilise useSearchParams
function SuccessContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const isOrder = type === "order";
  const title = isOrder ? "Commande Reçue !" : "Paiement Réussi !";
  const description = isOrder
    ? "Votre demande a bien été enregistrée. Je vais l'analyser et vous envoyer une facture proforma sous 24h."
    : "Merci pour votre confiance. Votre transaction a été validée avec succès.";

  return (
    <div className="flex flex-col items-center max-w-lg mx-auto text-center z-20">
      <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-8 border border-green-500/30">
        {isOrder ? (
          <FileText className="w-12 h-12 text-green-500" />
        ) : (
          <CheckCircle className="w-12 h-12 text-green-500" />
        )}
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
        {title}
      </h1>

      <p className="text-slate-300 text-lg mb-10 leading-relaxed">
        {description}
      </p>

      {isOrder && (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-10 w-full text-left backdrop-blur-sm">
          <h3 className="text-white font-semibold mb-2">Prochaines étapes :</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex gap-2">
              1. Validation de vos besoins (Email/Appel)
            </li>
            <li className="flex gap-2">2. Envoi de la facture et du contrat</li>
            <li className="flex gap-2">3. Démarrage du projet après acompte</li>
          </ul>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <Link
          href="/"
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/projects"
          className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-all border border-slate-700 flex items-center justify-center gap-2"
        >
          Voir d&apos;autres projets
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

// Composant Principal (Default Export)
export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>

      <div className="relative z-10 w-full">
        {/* Suspense est obligatoire quand on utilise useSearchParams */}
        <Suspense
          fallback={<div className="text-white text-center">Chargement...</div>}
        >
          <SuccessContent />
        </Suspense>
      </div>
    </div>
  );
}
