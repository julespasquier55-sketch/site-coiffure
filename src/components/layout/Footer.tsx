import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary mt-20 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-primary text-primary-foreground rounded-lg">
                <Scissors size={20} />
              </div>
              <span className="font-mono font-bold text-xl tracking-tighter">COIFFURE BLINK</span>
            </Link>
            <p className="text-muted-foreground text-sm font-sans max-w-xs">
              L'excellence de la coiffure moderne et minimaliste. Nous créons des styles qui parlent d'eux-mêmes.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-background border rounded-full hover:text-accent transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-background border rounded-full hover:text-accent transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-background border rounded-full hover:text-accent transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono font-bold text-sm uppercase tracking-widest mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-muted-foreground text-sm hover:text-primary transition-colors">Accueil</Link>
              </li>
              <li>
                <Link to="/prestations" className="text-muted-foreground text-sm hover:text-primary transition-colors">Prestations</Link>
              </li>
              <li>
                <Link to="/galerie" className="text-muted-foreground text-sm hover:text-primary transition-colors">Galerie</Link>
              </li>
              <li>
                <Link to="/produits" className="text-muted-foreground text-sm hover:text-primary transition-colors">Produits</Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-mono font-bold text-sm uppercase tracking-widest mb-6">Horaires</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex justify-between">
                <span>Lundi - Vendredi</span>
                <span className="text-primary font-mono">09:00 - 19:00</span>
              </li>
              <li className="flex justify-between">
                <span>Samedi</span>
                <span className="text-primary font-mono">10:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Dimanche</span>
                <span className="text-primary font-mono">Fermé</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-mono font-bold text-sm uppercase tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>123 Rue de la Coiffure, Paris, France</li>
              <li>+33 1 23 45 67 89</li>
              <li>contact@coiffure-blink.fr</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
            &copy; {new Date().getFullYear()} COIFFURE BLINK. TOUS DROITS RÉSERVÉS.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest font-mono">Mentions Légales</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest font-mono">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
