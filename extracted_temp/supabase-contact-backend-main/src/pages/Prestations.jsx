import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Check } from "lucide-react";

export default function Prestations() {
  const [activeCategory, setActiveCategory] = useState("tous");

  const categories = [
    { id: "tous", label: "Tous" },
    { id: "femmes", label: "Femmes" },
    { id: "hommes", label: "Hommes" },
    { id: "enfants", label: "Enfants" },
    { id: "colorations", label: "Colorations" }
  ];

  const services = [
    {
      id: 1,
      title: "Coupe & Brushing",
      description: "Coupe personnalisée avec brushing pour un résultat élégant",
      duration: "1h",
      price: "45€",
      category: "femmes",
      features: ["Consultation personnalisée", "Shampooing premium", "Brushing professionnel", "Finition soignée"]
    },
    {
      id: 2,
      title: "Coupe Homme",
      description: "Coupe moderne adaptée à votre style",
      duration: "45min",
      price: "30€",
      category: "hommes",
      features: ["Consultation style", "Coupe précise", "Finition produit", "Conseils d'entretien"]
    },
    {
      id: 3,
      title: "Coupe Enfant",
      description: "Coupe adaptée dans une ambiance ludique",
      duration: "30min",
      price: "20€",
      category: "enfants",
      features: ["Ambiance détendue", "Coupe douce", "Petit cadeau", "Photo souvenir"]
    },
    {
      id: 4,
      title: "Balayage",
      description: "Balayage sur-mesure pour un effet naturel",
      duration: "2h30",
      price: "120€",
      category: "colorations",
      features: ["Diagnostic capillaire", "Produits de qualité", "Effet naturel", "Soin post-coloration"]
    },
    {
      id: 5,
      title: "Coloration Complète",
      description: "Coloration intense et durable",
      duration: "2h",
      price: "85€",
      category: "colorations",
      features: ["Diagnostic capillaire", "Couleur sur-mesure", "Protection", "Soin profond"]
    },
    {
      id: 6,
      title: "Mèches",
      description: "Mèches subtiles pour un effet éclatant",
      duration: "2h30",
      price: "110€",
      category: "colorations",
      features: ["Placement précis", "Effet dégradé", "Harmonie des tons", "Soin réparateur"]
    },
    {
      id: 7,
      title: "Soins Profonds",
      description: "Soin réparateur pour cheveux abîmés",
      duration: "45min",
      price: "40€",
      category: "femmes",
      features: ["Diagnostic personnalisé", "Soin adapté", "Massage relaxant", "Résultat visible"]
    },
    {
      id: 8,
      title: "Barbe & Taille",
      description: "Taille de barbe précise et soignée",
      duration: "30min",
      price: "25€",
      category: "hommes",
      features: ["Taille précise", "Contour net", "Produits de qualité", "Conseils d'entretien"]
    },
    {
      id: 9,
      title: "Coiffage Événement",
      description: "Coiffure élégante pour occasions spéciales",
      duration: "1h30",
      price: "70€",
      category: "femmes",
      features: ["Consultation style", "Coiffage sur-mesure", "Tenue longue durée", "Finition perfectionnée"]
    }
  ];

  const filteredServices = activeCategory === "tous"
    ? services
    : services.filter(service => service.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero */}
      <section className="relative py-20 bg-[#2D2D2D]">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
              Nos Prestations
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Découvrez notre gamme complète de services pour sublimer votre chevelure
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={`rounded-full px-6 py-2 transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-[#C9A55C] text-white hover:bg-[#B8944B]"
                    : "border-gray-300 text-[#2D2D2D] hover:border-[#C9A55C] hover:bg-[#C9A55C]/5"
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-serif font-bold text-[#2D2D2D]">
                      {service.title}
                    </h3>
                    <span className="text-2xl font-bold text-[#C9A55C]">
                      {service.price}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[#2D2D2D] mb-2">Ce service comprend :</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-[#C9A55C] mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link to={createPageUrl("Contact")}>
                    <Button className="w-full bg-[#2D2D2D] hover:bg-[#1D1D1D] text-white py-3 rounded-full transition-all duration-300">
                      Réserver cette prestation
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#C9A55C] to-[#B8944B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Vous avez des questions ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Notre équipe est à votre disposition pour vous conseiller
            </p>
            <Link to={createPageUrl("Contact")}>
              <Button className="bg-white text-[#C9A55C] hover:bg-gray-100 px-10 py-6 rounded-full text-lg font-medium shadow-xl">
                Nous contacter
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}