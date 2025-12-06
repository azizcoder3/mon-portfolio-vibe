import Link from "next/link";
import { Code2, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* BRAND */}
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl text-white mb-4"
            >
              <Code2 className="text-primary" />
              <span>
                Dev<span className="text-primary">AI</span>
              </span>
            </Link>
            <p className="text-gray-400 max-w-sm">
              Création d&apos;expériences web modernes propulsées par
              l&apos;intelligence artificielle. Basé à Brazzaville, disponible
              pour le monde entier.
            </p>
          </div>

          {/* LIENS */}
          <div>
            <h4 className="text-white font-bold mb-6">Navigation</h4>
            <ul className="space-y-3">
              {["Accueil", "Projets", "À Propos", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={
                      item === "Accueil"
                        ? "/"
                        : `/${item
                            .toLowerCase()
                            .replace("à ", "")
                            .replace(" ", "-")}`
                    }
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* LÉGAL */}
          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              <li className="text-gray-400">Développement Web</li>
              <li className="text-gray-400">Applications SaaS</li>
              <li className="text-gray-400">Intégration IA</li>
              <li className="text-gray-400">Consulting Tech</li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {currentYear} DevAI. Tous droits réservés.</p>
          <p className="flex items-center gap-1">
            Fait avec <Heart className="w-4 h-4 text-red-500 fill-red-500" /> et
            Next.js 14
          </p>
        </div>
      </div>
    </footer>
  );
}
