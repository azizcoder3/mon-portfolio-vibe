/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com", // Parfois Unsplash utilise ce sous-domaine
      },
      {
        protocol: "https",
        hostname: "**", // ATTENTION : Utile pour le dev pour tout accepter, mais à restreindre en prod idéalement
      },
    ],
  },
};

export default nextConfig;
