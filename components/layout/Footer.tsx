"use client";

import Link from "next/link";
import { useState } from "react";
import { subscribeToNewsletter } from "@/lib/actions";
import {
  Code2,
  Heart,
  ArrowUp,
  Sparkles,
  Globe,
  Rocket,
  Zap,
  Mail,
  Twitter,
  Linkedin,
  Github,
  Loader2,
  Check,
} from "lucide-react";
import Image from "next/image";

// --- CONFIGURATION DES LIENS ---
// C'est ici qu'on corrige les 404 en mettant les vrais chemins des dossiers
const NAV_LINKS = [
  { name: "Accueil", href: "/" },
  { name: "Projets", href: "/projects" },   // Pointe vers app/projects
  { name: "À Propos", href: "/about" },     // Pointe vers app/about
  { name: "Services Pro", href: "/services-pro" } // Pointe vers app/services-pro
];

const SERVICE_LINKS = [
  { name: "WordPress Expert", icon: Globe, href: "/services-pro" },
  { name: "Next.js Development", icon: Code2, href: "/services-pro" },
  { name: "Intégration IA", icon: Sparkles, href: "/services-pro" },
  { name: "E-commerce", icon: Rocket, href: "/services-pro" },
  { name: "Audit & Refonte", icon: Zap, href: "/services-pro" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    const result = await subscribeToNewsletter(email);

    if (result.success) {
      setStatus("success");
      setMessage("Inscription réussie ! Merci.");
      setEmail("");
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
    } else {
      setStatus("error");
      setMessage(result.error || "Erreur inconnue");
    }
  };

  return (
    <footer className="relative border-t border-slate-800/30 bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/10 to-slate-950" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      <div className="relative z-10">
        <div className="container mx-auto px-4 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-2">
                <div className="relative w-48 h-22">
                  <Image
                    src="/logo.png"
                    alt="Aziz Coder 3.0"
                    width={200}
                    height={80}
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </Link>

              <p className="text-slate-300 max-w-md mb-6 leading-relaxed">
                Création d&apos;expériences web modernes propulsées par
                l&apos;intelligence artificielle. Basé à Brazzaville, disponible
                pour des collaborations internationales.
              </p>

              {/* Newsletter */}
              <div className="mb-8">
                <div className="text-sm font-medium text-white mb-3">
                  📬 Restez informé
                </div>
                <form className="flex gap-2" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    placeholder="Votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading" || status === "success"}
                    className="flex-1 px-4 py-2 bg-slate-900/50 border border-slate-800/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className={`px-4 py-2 text-white font-medium rounded-lg transition-all min-w-[100px] flex items-center justify-center ${
                      status === "success"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg hover:shadow-blue-500/25"
                    }`}
                  >
                    {status === "loading" ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : status === "success" ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      "S'inscrire"
                    )}
                  </button>
                </form>
                {message && (
                  <p className={`text-xs mt-2 ${status === "error" ? "text-red-400" : "text-green-400"}`}>
                    {message}
                  </p>
                )}
              </div>
            </div>

            {/* Navigation Links CORRIGÉS */}
            <div>
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500/50 rounded-full" />
                Navigation
              </h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-slate-300 hover:text-white transition-colors group flex items-center gap-2"
                    >
                      <div className="w-1 h-1 bg-slate-700 rounded-full group-hover:bg-blue-500 transition-colors" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500/50 rounded-full" />
                Services
              </h4>
              <ul className="space-y-3">
                {SERVICE_LINKS.map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="text-slate-300 hover:text-white transition-colors group flex items-center gap-2"
                    >
                      <service.icon className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Legal */}
            <div>
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500/50 rounded-full" />
                Contact
              </h4>
              <ul className="space-y-3 mb-6">
                <li>
                  <Link
                    href="/contact"
                    className="text-slate-300 hover:text-white transition-colors group flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-slate-500 group-hover:text-green-400 transition-colors" />
                    Me contacter
                  </Link>
                </li>
                <li>
                  <Link
                    href="/quote"
                    className="text-slate-300 hover:text-white transition-colors group flex items-center gap-2"
                  >
                    <span className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors">
                      💼
                    </span>
                    Demander un devis
                  </Link>
                </li>
                <li>
                  <div className="text-slate-300 group flex items-center gap-2">
                    <span className="w-4 h-4 text-slate-500">📍</span>
                    Brazzaville, Congo
                  </div>
                </li>
              </ul>

              {/* Social Links */}
              <div className="mt-8">
                <div className="text-sm text-slate-400 mb-3">Suivez-moi</div>
                <div className="flex gap-3">
                  {[
                    { icon: Github, href: "#", label: "GitHub" },
                    { icon: Linkedin, href: "#", label: "LinkedIn" },
                    { icon: Twitter, href: "#", label: "Twitter" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="p-2 bg-slate-900/50 border border-slate-800/50 rounded-lg hover:bg-slate-800/50 hover:border-slate-700/50 transition-all text-slate-400 hover:text-white"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="my-12 border-t border-slate-800/50" />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-slate-500">
              © {currentYear} AzizCoder3.0 | Tous droits réservés.
            </div>

            <div className="flex items-center gap-6 text-sm">
              <span className="text-slate-500 hover:text-slate-300 cursor-pointer">
                Confidentialité
              </span>
              <span className="text-slate-500 hover:text-slate-300 cursor-pointer">
                Conditions
              </span>
              <span className="text-slate-500 hover:text-slate-300 cursor-pointer">
                Cookies
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-500">
              <span className="flex items-center gap-1 text-sm">
                Fait avec
                <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                et 100% du Vibe Coding.
              </span>

              <button
                onClick={scrollToTop}
                className="p-2 bg-slate-900/50 border border-slate-800/50 rounded-lg hover:bg-slate-800/50 hover:border-slate-700/50 transition-all group"
                aria-label="Retour en haut"
              >
                <ArrowUp className="w-4 h-4 text-slate-400 group-hover:text-white" />
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/30 text-center">
            <p className="text-xs text-slate-600">
              Conçu avec passion • Développé avec expertise • Livré avec excellence
            </p>
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </div>
    </footer>
  );
}