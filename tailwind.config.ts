import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F172A", // Garde tes couleurs existantes
        foreground: "#F8FAFC",
        primary: "#3B82F6",
        secondary: "#8B5CF6",
        accent: "#06B6D4",
        glass: "rgba(255, 255, 255, 0.05)",
        // Tu peux ajouter aussi des couleurs slate si besoin
        slate: {
          950: "#020617",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-glow":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",

        // AJOUTE CES DEUX LIGNES SEULEMENT :
        noise:
          'url(\'data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)" opacity="0.15"/%3E%3C/svg%3E\')',
        grid: "url('/grid.svg')",
      },
      // AJOUTE CETTE SECTION :
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;

// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "#0F172A", // Bleu nuit profond
//         foreground: "#F8FAFC", // Blanc cassé
//         primary: "#3B82F6", // Bleu électrique
//         secondary: "#8B5CF6", // Violet IA
//         accent: "#06B6D4", // Cyan futuriste
//         glass: "rgba(255, 255, 255, 0.05)",
//       },
//       backgroundImage: {
//         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//         "hero-glow":
//           "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
//       },
//     },
//   },
//   plugins: [],
// };
// export default config;
