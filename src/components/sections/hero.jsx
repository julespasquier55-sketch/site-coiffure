import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, LogIn, User } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { AuthModal } from "@/components/common/auth-modal";

export default function HeroSection() {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1600&q=80"
          alt="Salon de coiffure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D2D2D]/90 via-[#2D2D2D]/70 to-transparent" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 bg-[#C9A55C]/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-[#C9A55C]/30">
            <Star className="w-4 h-4 text-[#C9A55C] fill-[#C9A55C]" />
            <span className="text-sm text-white font-medium">Salon 5 étoiles sur Google</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
            L'art de la
            <span className="block text-[#C9A55C]">coiffure</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Découvrez notre salon expert en coiffure pour hommes, femmes et enfants. 
            Une équipe passionnée à votre service depuis 2010.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={createPageUrl("Prestations")}>
              <Button className="bg-[#C9A55C] hover:bg-[#B8944B] text-white px-8 py-6 rounded-full text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 group">
                Nos prestations
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <div className="flex gap-4">
              <Link to={createPageUrl("Contact")}>
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#2D2D2D] px-8 py-6 rounded-full text-base font-medium transition-all duration-300">
                  Prendre rendez-vous
                </Button>
              </Link>

              {user ? (
                <Link to="/profile">
                  <Button variant="outline" className="border-2 border-[#C9A55C] text-[#C9A55C] hover:bg-[#C9A55C] hover:text-white px-8 py-6 rounded-full text-base font-medium transition-all duration-300 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Mon compte
                  </Button>
                </Link>
              ) : (
                <Button 
                  onClick={() => setIsAuthModalOpen(true)}
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-[#2D2D2D] px-8 py-6 rounded-full text-base font-medium transition-all duration-300 flex items-center gap-2"
                >
                  <LogIn className="w-5 h-5" />
                  Se connecter
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </section>
  );
}