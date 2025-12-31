export type Category =
  | "Tous"
  | "E-commerce"
  | "App Web / SaaS"
  | "Site Vitrine"
  | "WordPress";

export interface Project {
  id: string;
  title: string;
  category: Category; // Utilise le type Category pour la catégorie
  description: string;
  long_description?: string;
  image_url: string | null; // Peut être null si pas d'image
  stack: string[];
  demo_url: string;
  repo_url: string;
  is_featured: boolean;
  metrics?: {
    performance: number;
    complexity: number;
    innovation: number;
  };
}

export interface OrderData {
  name: string;
  email: string;
  serviceTitle: string;
  selectedOptions?: string[];
  totalPrice: number;
  totalDays: number; // Obligatoire, sans ?
  note?: string;
}

export interface QuoteData {
  name: string;
  email: string;
  description: string;
  budget: string;
  deliveryTime: string;
}
