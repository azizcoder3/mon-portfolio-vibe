// import nodemailer from "nodemailer";
// import { render } from "@react-email/render";
// import ClientConfirmationEmail from "@/components/emails/ClientConfirmation";
// import { OrderConfirmationEmail } from "@/components/emails/OrderConfirmation";
// import QuoteConfirmationEmail from "@/components/emails/QuoteConfirmation";
// import { OrderData } from "@/lib/types";
// import { QuoteData } from "@/lib/types";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASS,
//   },
// });

// // Fonction pour le formulaire de contact (Mise à jour : Client + Admin)
// export async function sendContactEmails(
//   clientEmail: string,
//   clientName: string,
//   subject: string,
//   message: string
// ) {
//   try {
//     const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

//     // 1. Mail pour le Client (Template Joli)
//     const emailHtml = await render(
//       ClientConfirmationEmail({
//         clientName,
//         baseUrl: siteUrl,
//       })
//     );

//     await transporter.sendMail({
//       from: `"Aziz Coder3.0" <${process.env.GMAIL_USER}>`,
//       to: clientEmail,
//       subject: "Confirmation de réception - Aziz Coder3.0",
//       html: emailHtml,
//     });

//     // 2. Mail pour TOI (Notification Admin)
//     await transporter.sendMail({
//       from: `"Portfolio Bot" <${process.env.GMAIL_USER}>`,
//       to: process.env.GMAIL_USER, // Ça arrive chez toi
//       replyTo: clientEmail, // Pour répondre directement au client
//       subject: `📩 NOUVEAU MESSAGE : ${subject}`,
//       html: `
//         <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
//           <h2>Nouveau message de contact</h2>
//           <p><strong>Nom :</strong> ${clientName}</p>
//           <p><strong>Email :</strong> <a href="mailto:${clientEmail}">${clientEmail}</a></p>
//           <p><strong>Sujet :</strong> ${subject}</p>
//           <hr />
//           <h3>Message :</h3>
//           <p style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</p>
//         </div>
//       `,
//     });

//     console.log("Emails contact envoyés (Client + Admin)");
//     return true;
//   } catch (error) {
//     console.error("Erreur envoi email contact:", error);
//     return false;
//   }
// }

// // Fonction pour les COMMANDES (Services Pro)
// // On utilise le type OrderData ici au lieu de 'any'
// export async function sendOrderEmails(orderData: OrderData) {
//   try {
//     const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

//     // Formatter le prix pour l'affichage
//     const formattedPrice = `${orderData.totalPrice.toLocaleString()} FCFA`;

//     // 1. Convertir le template React en HTML pour le client
//     const emailHtmlClient = await render(
//       OrderConfirmationEmail({
//         clientName: orderData.name,
//         serviceTitle: orderData.serviceTitle,
//         totalPrice: formattedPrice,
//         deadline: orderData.totalDays
//           ? `${orderData.totalDays} jours`
//           : "Non spécifié",
//         options: orderData.selectedOptions || [],
//         baseUrl: siteUrl,
//       })
//     );

//     // 2. Envoyer au Client
//     await transporter.sendMail({
//       from: `"Aziz Coder3.0" <${process.env.GMAIL_USER}>`,
//       to: orderData.email,
//       subject: `Confirmation de commande : ${orderData.serviceTitle}`,
//       html: emailHtmlClient,
//     });

//     // 3. Envoyer à TOI (L'Admin) - Version technique détaillée
//     await transporter.sendMail({
//       from: `"Portfolio Bot" <${process.env.GMAIL_USER}>`,
//       to: process.env.GMAIL_USER, // Ça arrive chez toi
//       replyTo: orderData.email,
//       subject: `💰 NOUVELLE COMMANDE : ${orderData.serviceTitle}`,
//       html: `
//         <div style="font-family: monospace; padding: 20px; border: 2px solid #60A5FA; border-radius: 8px;">
//           <h2 style="color: #0F172A;">Nouvelle commande reçue ! 🚀</h2>
//           <hr/>
//           <p><strong>Client :</strong> ${orderData.name}</p>
//           <p><strong>Email :</strong> <a href="mailto:${orderData.email}">${orderData.email}</a></p>
//           <p><strong>Service :</strong> ${orderData.serviceTitle}</p>
//           <hr/>
//           <h3>Détails financiers :</h3>
//           <p><strong>Montant Total :</strong> ${formattedPrice}</p>
//           <p><strong>Délai :</strong> ${orderData.totalDays} jours</p>
//           <h3>Options :</h3>
//           <ul>
//             ${
//               orderData.selectedOptions && orderData.selectedOptions.length > 0
//                 ? orderData.selectedOptions
//                     .map((opt) => `<li>${opt}</li>`)
//                     .join("")
//                 : "<li>Aucune option</li>"
//             }
//           </ul>
//           <hr/>
//           <h3>Note du client :</h3>
//           <p style="background: #eee; padding: 10px;">${orderData.note || "Aucune note"}</p>
//           <br/>
//           <a href="${siteUrl}/admin" style="background: #000; color: #fff; padding: 10px; text-decoration: none;">Voir dans Supabase</a>
//         </div>
//       `,
//     });

//     console.log("Emails de commande envoyés !");
//     return true;
//   } catch (error) {
//     console.error("Erreur envoi email commande:", error);
//     return false;
//   }
// }

// // --- NOUVELLE FONCTION POUR LES DEVIS SUR MESURE ---
// export async function sendQuoteEmails(quoteData: QuoteData) {
//   try {
//     const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

//     // 1. Template HTML pour le Client
//     const emailHtmlClient = await render(
//       QuoteConfirmationEmail({
//         clientName: quoteData.name,
//         baseUrl: siteUrl,
//       })
//     );

//     // 2. Envoyer au Client (Confirmation)
//     await transporter.sendMail({
//       from: `"Aziz Coder3.0" <${process.env.GMAIL_USER}>`,
//       to: quoteData.email,
//       subject: `Votre demande de devis : ${quoteData.name}`,
//       html: emailHtmlClient,
//     });

//     // 3. Envoyer à TOI (L'Admin) - Détails techniques
//     await transporter.sendMail({
//       from: `"Portfolio Bot" <${process.env.GMAIL_USER}>`,
//       to: process.env.GMAIL_USER, // Chez toi
//       replyTo: quoteData.email,
//       subject: `📝 NOUVEAU DEVIS SUR MESURE : ${quoteData.name}`,
//       html: `
//         <div style="font-family: monospace; padding: 20px; border: 2px solid #8B5CF6; border-radius: 8px;">
//           <h2 style="color: #0F172A;">Demande de Devis Reçue !</h2>
//           <hr/>
//           <p><strong>Client :</strong> ${quoteData.name}</p>
//           <p><strong>Email :</strong> <a href="mailto:${quoteData.email}">${quoteData.email}</a></p>
//           <hr/>
//           <h3>Détails du projet :</h3>
//           <p><strong>Budget Estimé :</strong> ${quoteData.budget}</p>
//           <p><strong>Délai Souhaité :</strong> ${quoteData.deliveryTime}</p>
//           <h3>Description :</h3>
//           <p style="background: #eee; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${quoteData.description}</p>
//           <br/>
//           <a href="${siteUrl}/admin" style="background: #000; color: #fff; padding: 10px; text-decoration: none;">Voir dans Supabase</a>
//         </div>
//       `,
//     });

//     console.log("Emails de devis envoyés !");
//     return true;
//   } catch (error) {
//     console.error("Erreur envoi email devis:", error);
//     return false;
//   }
// }

import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import ClientConfirmationEmail from "@/components/emails/ClientConfirmation";
import { OrderConfirmationEmail } from "@/components/emails/OrderConfirmation";
import QuoteConfirmationEmail from "@/components/emails/QuoteConfirmation";
import { OrderData, QuoteData } from "@/lib/types";

// --- CONFIGURATION ---
const SUPABASE_ADMIN_URL =
  "https://supabase.com/dashboard/project/asrfygfblccdwcxncmyk/editor/18624?schema=public";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// 1. CONTACT
export async function sendContactEmails(
  clientEmail: string,
  clientName: string,
  subject: string,
  message: string
) {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const emailHtml = await render(
      ClientConfirmationEmail({ clientName, baseUrl: siteUrl })
    );

    await transporter.sendMail({
      from: `"Aziz Coder3.0" <${process.env.GMAIL_USER}>`,
      to: clientEmail,
      subject: "Confirmation de réception - Aziz Coder3.0",
      html: emailHtml,
    });

    await transporter.sendMail({
      from: `"Portfolio Bot" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: clientEmail,
      subject: `📩 NOUVEAU MESSAGE : ${subject}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom :</strong> ${clientName}</p>
          <p><strong>Email :</strong> <a href="mailto:${clientEmail}">${clientEmail}</a></p>
          <hr />
          <p>${message}</p>
          <br/>
          <a href="${SUPABASE_ADMIN_URL}" style="background: #000; color: #fff; padding: 10px; text-decoration: none; border-radius: 5px;">
            Voir dans Supabase
          </a>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error("Erreur email contact:", error);
    return false;
  }
}

// 2. COMMANDES (Services Pro)
export async function sendOrderEmails(orderData: OrderData) {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const formattedPrice = `${orderData.totalPrice.toLocaleString()} FCFA`;

    const emailHtmlClient = await render(
      OrderConfirmationEmail({
        clientName: orderData.name,
        serviceTitle: orderData.serviceTitle,
        totalPrice: formattedPrice,
        deadline: orderData.totalDays
          ? `${orderData.totalDays} jours`
          : "Non spécifié",
        options: orderData.selectedOptions || [],
        baseUrl: siteUrl,
      })
    );

    await transporter.sendMail({
      from: `"Aziz Coder3.0" <${process.env.GMAIL_USER}>`,
      to: orderData.email,
      subject: `Confirmation de commande : ${orderData.serviceTitle}`,
      html: emailHtmlClient,
    });

    await transporter.sendMail({
      from: `"Portfolio Bot" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: orderData.email,
      subject: `💰 NOUVELLE COMMANDE : ${orderData.serviceTitle}`,
      html: `
        <div style="font-family: monospace; padding: 20px; border: 2px solid #60A5FA; border-radius: 8px;">
          <h2 style="color: #0F172A;">Nouvelle commande reçue ! 🚀</h2>
          <p><strong>Client :</strong> ${orderData.name}</p>
          <p><strong>Email :</strong> <a href="mailto:${orderData.email}">${orderData.email}</a></p>
          <p><strong>Service :</strong> ${orderData.serviceTitle}</p>
          <hr/>
          <h3>Détails financiers :</h3>
          <p><strong>Montant Total :</strong> ${formattedPrice}</p>
          <p><strong>Délai :</strong> ${orderData.totalDays} jours</p>
          <h3>Options :</h3>
          <ul>
            ${
              orderData.selectedOptions && orderData.selectedOptions.length > 0
                ? orderData.selectedOptions
                    .map((opt) => `<li>${opt}</li>`)
                    .join("")
                : "<li>Aucune option</li>"
            }
          </ul>
          <hr/>
          <h3>Note du client :</h3>
          <p style="background: #eee; padding: 10px;">${orderData.note || "Aucune note"}</p>
          <br/>
          <a href="${SUPABASE_ADMIN_URL}" style="background: #000; color: #fff; padding: 10px; text-decoration: none; border-radius: 5px;">
            Gérer la commande dans Supabase
          </a>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error("Erreur email commande:", error);
    return false;
  }
}

// 3. DEVIS SUR MESURE (C'est ici que je remets ton design préféré)
export async function sendQuoteEmails(quoteData: QuoteData) {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const emailHtmlClient = await render(
      QuoteConfirmationEmail({
        clientName: quoteData.name,
        baseUrl: siteUrl,
      })
    );

    await transporter.sendMail({
      from: `"Aziz Coder3.0" <${process.env.GMAIL_USER}>`,
      to: quoteData.email,
      subject: `Votre demande de devis : ${quoteData.name}`,
      html: emailHtmlClient,
    });

    await transporter.sendMail({
      from: `"Portfolio Bot" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: quoteData.email,
      subject: `📝 NOUVEAU DEVIS SUR MESURE : ${quoteData.name}`,
      html: `
        <div style="font-family: monospace; padding: 20px; border: 2px solid #8B5CF6; border-radius: 8px;">
          <h2 style="color: #0F172A;">Demande de Devis Reçue !</h2>
          <hr/>
          <p><strong>Client :</strong> ${quoteData.name}</p>
          <p><strong>Email :</strong> <a href="mailto:${quoteData.email}">${quoteData.email}</a></p>
          <hr/>
          <h3>Détails du projet :</h3>
          <p><strong>Budget Estimé :</strong> ${quoteData.budget}</p>
          <p><strong>Délai Souhaité :</strong> ${quoteData.deliveryTime}</p>
          <h3>Description :</h3>
          <p style="background: #eee; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${quoteData.description}</p>
          <br/>
          <!-- J'AI GARDÉ LE LIEN CORRIGÉ -->
          <a href="${SUPABASE_ADMIN_URL}" style="background: #000; color: #fff; padding: 10px; text-decoration: none; border-radius: 5px;">
            Voir dans Supabase
          </a>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error("Erreur email devis:", error);
    return false;
  }
}
