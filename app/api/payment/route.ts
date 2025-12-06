import { NextResponse } from "next/server";

interface PaymentRequestBody {
  amount: number;
  quoteId: string;
  email: string;
}

interface LygosPayload {
  amount: number;
  shop_name: string;
  message: string;
  success_url: string;
  failure_url: string;
  order_id: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as PaymentRequestBody;
    const { amount, quoteId, email } = body;

    if (!amount || !quoteId) {
      return NextResponse.json(
        { error: "Montant ou ID devis manquant" },
        { status: 400 }
      );
    }

    const payload: LygosPayload = {
      amount: amount,
      shop_name: "DevAI Portfolio",
      message: `Paiement devis #${quoteId} par ${email}`,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success?quote_id=${quoteId}`,
      failure_url: `${process.env.NEXT_PUBLIC_SITE_URL}/quote?error=true`,
      order_id: quoteId,
    };

    console.log("Envoi à Lygos:", payload);

    // Utilisation directe de l'URL complète
    const response = await fetch("https://api.lygosapp.com/v1/gateway", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.LYGOS_API_KEY || "",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Réponse complète de Lygos:", data); // On loggue la réponse pour être sûr

    if (!response.ok) {
      console.error("Erreur Lygos API:", data);
      throw new Error(data.message || "Erreur lors de l'initialisation Lygos");
    }

    // CORRECTION ICI : La documentation montre que le champ s'appelle "link"
    const paymentUrl = data.link;

    if (!paymentUrl) {
      throw new Error(
        "L'API Lygos n'a pas renvoyé de lien (champ 'link' manquant)"
      );
    }

    // On renvoie l'URL au frontend sous le nom "url" car c'est ce que ton frontend attend
    return NextResponse.json({ url: paymentUrl });
  } catch (error) {
    console.error("Erreur Serveur Paiement:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Erreur inconnue";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
