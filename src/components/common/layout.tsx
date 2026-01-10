import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Scissors, Menu, X, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigationItems = [
  { title: "Accueil", url: createPageUrl("Accueil") },
  { title: "Prestations", url: createPageUrl("Prestations") },
  { title: "Produits", url: createPageUrl("Produits") },
  { title: "Galerie", url: createPageUrl("Galerie") },
  { title: "Contact", url: createPageUrl("Contact") },
];

export default function Layout({ children }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#2D2D2D] text-white py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C9A55C]" />
              <span>01 23 45 67 89</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#C9A55C]" />
              <span>contact@elegance-coiffure.fr</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>Lun-Sam: 9h-19h</span>
            <div className="flex items-center gap-3">
              <a href="#" className="hover:text-[#C9A55C] transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="hover:text-[#C9A55C] transition-colors"><Facebook className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to={createPageUrl("Accueil")} className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-[#C9A55C] to-[#B8944B] rounded-full flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-[#2D2D2D]">Élégance</h1>
                <p className="text-xs text-[#C9A55C] tracking-[0.2em] uppercase">Salon de Coiffure</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`text-sm font-medium tracking-wide transition-all duration-300 relative group ${
                    location.pathname === item.url
                      ? "text-[#C9A55C]"
                      : "text-[#2D2D2D] hover:text-[#C9A55C]"
                  }`}
                >
                  {item.title}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#C9A55C] transition-all duration-300 ${
                    location.pathname === item.url ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </Link>
              ))}
            </nav>

            {/* CTA Button Desktop */}
            <Link to={createPageUrl("Contact")}>
              <Button className="hidden md:flex bg-[#C9A55C] hover:bg-[#B8944B] text-white px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg">
                Prendre RDV
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#2D2D2D]" />
              ) : (
                <Menu className="w-6 h-6 text-[#2D2D2D]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <nav className="px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-lg text-base font-medium transition-all ${
                    location.pathname === item.url
                      ? "bg-[#C9A55C]/10 text-[#C9A55C]"
                      : "text-[#2D2D2D] hover:bg-gray-50"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
              <Link to={createPageUrl("Contact")} onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-[#C9A55C] hover:bg-[#B8944B] text-white py-3 rounded-full mt-4">
                  Prendre RDV
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#2D2D2D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#C9A55C] to-[#B8944B] rounded-full flex items-center justify-center">
                  <Scissors className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-serif font-bold">Élégance</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Votre salon de coiffure expert pour hommes, femmes et enfants depuis 2010.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {navigationItems.map((item) => (
                  <li key={item.title}>
                    <Link to={item.url} className="hover:text-[#C9A55C] transition-colors">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Contact</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-start gap-3">
                  <span className="text-[#C9A55C]">📍</span>
                  <span>25 Avenue de la Beauté<br />75008 Paris</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#C9A55C]">📞</span>
                  <span>01 23 45 67 89</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#C9A55C]">✉️</span>
                  <span>contact@elegance-coiffure.fr</span>
                </div>
              </div>
            </div>

            {/* Horaires */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Horaires</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>Lundi</span>
                  <span className="text-white">Fermé</span>
                </div>
                <div className="flex justify-between">
                  <span>Mar - Ven</span>
                  <span className="text-white">9h - 19h</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span className="text-white">9h - 18h</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">© 2024 Élégance Coiffure. Tous droits réservés.</p>
            <div className="flex items-center gap-4">
              <Link to="/admin" className="text-gray-500 hover:text-gray-400 text-xs mr-4 transition-colors">Admin</Link>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#C9A55C] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#C9A55C] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
