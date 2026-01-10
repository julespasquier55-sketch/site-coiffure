import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const createPageUrl = (page) => {
  const pageUrls = {
    Home: '/',
    Accueil: '/',
    Prestations: '/prestations',
    Produits: '/produits',
    Galerie: '/galerie',
    Contact: '/contact'
  };
  
  return pageUrls[page] || '/';
};

// Ajout pour résoudre l’erreur
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
