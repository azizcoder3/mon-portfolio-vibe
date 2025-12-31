import { MetadataRoute } from "next";
import { getServices } from "@/lib/actions"; // On réutilise nos fonctions !
// Importe getProjects si tu as une page de détail par projet

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://ton-site.vercel.app";

  // 1. Pages statiques
  const routes = [
    "",
    "/about",
    "/projects",
    "/services",
    "/contact",
    "/quote",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // 2. Pages dynamiques (Services)
  const services = await getServices();
  const serviceRoutes = services.map(
    (service: { id: string; created_at?: string }) => ({
      url: `${baseUrl}/services/${service.id}`,
      lastModified: new Date(service.created_at || new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.9, // Haute priorité car ce sont tes produits !
    })
  );

  return [...routes, ...serviceRoutes];
}
