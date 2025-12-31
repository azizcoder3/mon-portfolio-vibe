"use server"; // <--- CETTE LIGNE EST OBLIGATOIRE ET DOIT ÊTRE LA PREMIÈRE

import { supabase } from "@/lib/supabase";
import { sendOrderEmails } from "@/lib/mail";
import { sendQuoteEmails } from "@/lib/mail";
import { OrderData, QuoteData } from "@/lib/types";
import { sendContactEmails } from "@/lib/mail";
//import { sendConfirmationEmail } from "@/lib/mail";

// 1. Récupérer la liste des services
export async function getServices() {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Erreur récupération services:", error);
    return [];
  }

  return data;
}

// 2. Récupérer un service complet par ID
export async function getServiceById(id: string) {
  const { data: service, error: serviceError } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();

  if (serviceError || !service) return null;

  const { data: packages } = await supabase
    .from("service_packages")
    .select("*")
    .eq("service_id", id);

  const packagesMap = {
    basic: packages?.find((p: { tier: string }) => p.tier === "basic"),
    standard: packages?.find((p: { tier: string }) => p.tier === "standard"),
    premium: packages?.find((p: { tier: string }) => p.tier === "premium"),
  };

  return { ...service, packages: packagesMap };
}

// 3. Récupérer tous les projets
export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur récupération projets:", error);
    return [];
  }
  return data;
}

// 4. Récupérer le projet à la une
export async function getFeaturedProject() {
  const { data: featured } = await supabase
    .from("projects")
    .select("*")
    .eq("is_featured", true)
    .limit(1)
    .maybeSingle();

  if (featured) return featured;

  const { data: fallback } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return fallback;
}

// 5. Récupérer la grille Portfolio
export async function getPortfolioProjects(excludeId?: string) {
  let query = supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (excludeId) {
    query = query.neq("id", excludeId);
  } else {
    query = query.eq("is_featured", false);
  }

  query = query.limit(6);

  const { data, error } = await query;

  if (error) {
    console.error("Erreur récupération portfolio:", error);
    return [];
  }
  return data;
}

// 6. Récupérer la FAQ
export async function getFaqs() {
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) console.error("Erreur FAQ:", error);
  return data || [];
}

// 7. Inscription Newsletter
export async function subscribeToNewsletter(email: string) {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { error: "Email invalide" };
    }

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email }]);

    if (error) {
      if (error.code === "23505") {
        return { error: "Vous êtes déjà inscrit !" };
      }
      console.error("Erreur newsletter:", error);
      return { error: "Une erreur est survenue." };
    }

    return { success: true };
  } catch (err) {
    console.error("Erreur serveur newsletter:", err);
    return { error: "Erreur serveur." };
  }
}

// 8. Récupérer les services pros
export async function getProServices() {
  const { data, error } = await supabase
    .from("pro_services")
    .select("*")
    .order("base_price_eur", { ascending: true });

  if (error) {
    console.error("Erreur récupération services pro:", error);
    return [];
  }
  return data;
}

// 9. Récupérer un Service Pro par son ID
export async function getProServiceById(id: string) {
  const { data, error } = await supabase
    .from("pro_services")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Erreur récupération service pro:", error);
    return null;
  }
  return data;
}

// 10. Récupérer 3 projets récents
export async function getRecentProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_featured", false)
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) return [];
  return data;
}

// 11. Récupérer les avis approuvés
export async function getApprovedReviews() {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  if (error) return [];
  return data;
}

// 12. Récupérer les options d'un service pro
export async function getServiceOptions(serviceId: string) {
  const { data, error } = await supabase
    .from("pro_service_options")
    .select("*")
    .eq("service_id", serviceId)
    .eq("is_active", true);

  if (error) {
    console.error("Erreur options:", error);
    return [];
  }
  return data;
}

// 13. Fonction de commande
export async function submitOrder(orderData: OrderData) {
  try {
    const { error } = await supabase.from("quotes").insert([
      {
        client_name: orderData.name,
        email: orderData.email,
        project_type: `COMMANDE : ${orderData.serviceTitle}`,
        features: orderData.selectedOptions,
        amount: orderData.totalPrice,
        budget: orderData.totalPrice,
        deadline: orderData.totalDays
          ? `${orderData.totalDays} jours`
          : "Non spécifié",
        details: orderData.note,
        status: "pending_approval",
      },
    ]);

    if (error) {
      console.error("Erreur insertion commande:", error);
      return { success: false, error: error.message };
    }

    // L'envoi d'email se fait ici, CÔTÉ SERVEUR uniquement
    await sendOrderEmails(orderData);

    return { success: true };
  } catch (err) {
    console.error("Erreur serveur commande:", err);
    return { success: false, error: "Erreur serveur inconnue" };
  }
}

// Nouvelle fonction pour le formulaire de devis personnalisé
// export async function submitCustomQuote(formData: any) {
//   try {
//     // 1. Sauvegarde dans Supabase
//     const { error } = await supabase.from("quotes").insert([
//       {
//         client_name: formData.name,
//         email: formData.email,
//         project_type: "DEVIS SUR MESURE", // Type spécifique
//         details: formData.description,
//         deadline: formData.deliveryTime,
//         budget: formData.budget, // On stocke le texte brut (ex: "500$")
//         status: "pending_quote",
//       },
//     ]);

//     if (error) {
//       console.error("Erreur insertion devis:", error);
//       return { success: false, error: error.message };
//     }

//     // 2. Envoi des emails (On réutilise ta fonction d'envoi existante)
//     // On adapte les données pour qu'elles collent au format attendu par sendOrderEmails
//     // ou on utilise sendContactEmails si c'est plus simple.
//     // Ici, on va simuler une "OrderData" pour avoir le beau template.

//     await sendOrderEmails({
//       name: formData.name,
//       email: formData.email,
//       serviceTitle: "Demande de Devis Sur Mesure",
//       totalPrice: 0, // Pas de prix fixe encore
//       totalDays: 0, // Sera précisé dans la note
//       selectedOptions: [
//         `Budget: ${formData.budget}`,
//         `Délai souhaité: ${formData.deliveryTime}`,
//       ],
//       note: formData.description,
//     });

//     return { success: true };
//   } catch (err) {
//     console.error("Erreur serveur devis:", err);
//     return { success: false, error: "Erreur serveur inconnue" };
//   }
// }

// Nouvelle fonction pour le formulaire de devis personnalisé
// On type l'entrée avec QuoteData
export async function submitCustomQuote(formData: QuoteData) {
  try {
    // 1. Sauvegarde dans Supabase
    const { error } = await supabase.from("quotes").insert([
      {
        client_name: formData.name,
        email: formData.email,
        project_type: "DEVIS SUR MESURE",
        details: formData.description,
        deadline: formData.deliveryTime,
        budget: formData.budget, // Stocké en texte (ex: "500€") ou nombre, selon ta colonne DB
        status: "pending_quote",
      },
    ]);

    if (error) {
      console.error("Erreur insertion devis:", error);
      return { success: false, error: error.message };
    }

    // 2. Envoi des emails (VRAIE FONCTION)
    await sendQuoteEmails(formData);

    return { success: true };
  } catch (err) {
    console.error("Erreur serveur devis:", err);
    return { success: false, error: "Erreur serveur inconnue" };
  }
}

// Nouvelle Server Action pour le Contact
// export async function submitContactForm(data: {
//   name: string;
//   email: string;
//   subject: string;
//   message: string;
// }) {
//   try {
//     // 1. Sauvegarde Supabase
//     const { error } = await supabase.from("contacts").insert([data]);
//     if (error) throw error;

//     // 2. Envoi Email (Côté serveur, donc pas de bug Nodemailer)
//     // Note: Tu devras peut-être adapter sendConfirmationEmail dans lib/mail.ts
//     // pour accepter 'subject' et 'message' si ce n'est pas déjà le cas,
//     // ou utiliser sendContactEmails si tu l'avais renommée.
//     await sendConfirmationEmail(data.email, data.name);

//     return { success: true };
//   } catch (error) {
//     console.error("Erreur contact:", error);
//     return { success: false, error: "Erreur lors de l'envoi" };
//   }
// }

// Nouvelle Server Action pour le Contact
export async function submitContactForm(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    // 1. Sauvegarde Supabase
    const { error } = await supabase.from("contacts").insert([data]);
    if (error) throw error;

    // 2. Envoi Email (Côté serveur)
    await sendContactEmails(data.email, data.name, data.subject, data.message);

    return { success: true };
  } catch (error) {
    console.error("Erreur contact:", error);
    return { success: false, error: "Erreur lors de l'envoi" };
  }
}
