import { createClient } from "@supabase/supabase-js";

// On vérifie que les clés existent pour éviter les bugs
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Il manque les clés Supabase dans le fichier .env.local !");
}

// On exporte la connexion pour l'utiliser partout dans le site
export const supabase = createClient(supabaseUrl, supabaseKey);
