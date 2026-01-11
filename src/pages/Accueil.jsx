import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, Award, Clock } from "lucide-react";
import { motion } from "framer-motion";
import HeroSection from "@/components/sections/hero";

export default function Accueil() {
  const services = [
    {
      title: "Femmes",
      description: "Coupes, colorations, balayages et soins capillaires",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
      price: "À partir de 35€"
    },
    {
      title: "Hommes",
      description: "Coupes classiques, dégradés, barbe et soins",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
      price: "À partir de 20€"
    },
    {
      title: "Enfants",
      description: "Coupes adaptées dans une ambiance détendue",
      image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80",
      price: "À partir de 15€"
    }
  ];

  const stats = [
    { icon: Users, value: "5000+", label: "Clients satisfaits" },
    { icon: Award, value: "14", label: "Années d'expérience" },
    { icon: Star, value: "4.9", label: "Note Google" },
    { icon: Clock, value: "6", label: "Experts coiffeurs" }
  ];

  const reviews = [
    {
      name: "Sophie L.",
      text: "Un salon au top ! L'équipe est professionnelle et à l'écoute. Ma couleur est parfaite !",
      rating: 5
    },
    {
      name: "Marc D.",
      text: "Meilleur barbier de Paris ! Dégradé impeccable et ambiance très agréable.",
      rating: 5
    },
    {
      name: "Julie M.",
      text: "Mes enfants adorent venir ici. Le personnel est patient et le résultat toujours nickel.",
      rating: 5
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats */}
      <section className="py-16 bg-white relative -mt-20 mx-4 md:mx-8 rounded-3xl shadow-2xl z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#C9A55C]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-[#C9A55C]" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-[#2D2D2D] mb-1">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D2D2D] mb-4">
              Nos expertises
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Un savoir-faire adapté à toute la famille
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="bg-[#C9A55C] text-white text-sm font-medium px-4 py-1.5 rounded-full">
                        {service.price}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-serif font-bold text-[#2D2D2D] mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to={createPageUrl("Prestations")}>
              <Button className="bg-[#2D2D2D] hover:bg-[#1D1D1D] text-white px-8 py-6 rounded-full text-base font-medium">
                Voir toutes les prestations
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-[#2D2D2D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              La satisfaction de nos clients est notre priorité
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#C9A55C] fill-[#C9A55C]" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{review.text}"</p>
                <p className="text-white font-semibold">{review.name}</p>
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
              Prêt pour un nouveau look ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Réservez votre créneau dès maintenant et laissez nos experts prendre soin de vous
            </p>
            <Link to={createPageUrl("Contact")}>
              <Button className="bg-white text-[#C9A55C] hover:bg-gray-100 px-10 py-6 rounded-full text-lg font-medium shadow-xl">
                Prendre rendez-vous
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
