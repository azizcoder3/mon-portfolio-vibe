"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle, Home, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, Suspense } from "react";
import { supabase } from "@/lib/supabase";

// 1. On crée un composant "interne" qui contient la logique dynamique
function SuccessContent() {
  const searchParams = useSearchParams();
  const quoteId = searchParams.get("quote_id");

  useEffect(() => {
    if (quoteId) {
      // Mettre à jour le statut en 'paid' si ce n'est pas déjà fait
      const updateStatus = async () => {
        await supabase
          .from("quotes")
          .update({ status: "paid" })
          .eq("id", quoteId);
      };
      updateStatus();
    }
  }, [quoteId]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <CheckCircle className="w-12 h-12 text-green-500" />
      </div>

      <h1 className="text-4xl font-bold mb-4 text-white">Paiement Réussi !</h1>
      <p className="text-gray-400 max-w-md mb-8">
        Merci pour votre confiance. Votre demande de devis a été validée. Je
        vais commencer à travailler sur votre projet dès que possible.
      </p>

      <div className="flex gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all flex items-center gap-2 text-white"
        >
          <Home className="w-4 h-4" /> Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}

// 2. La page principale qui "enveloppe" le contenu dynamique
// C'est ça qui corrige l'erreur de build Vercel
export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-4 text-center">
      <Suspense
        fallback={
          <div className="flex flex-col items-center text-gray-400">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
            <p>Vérification du paiement...</p>
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </div>
  );
}
