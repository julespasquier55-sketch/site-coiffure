import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, Award, Clock, Scissors, Check, Calendar, MapPin, Phone, Heart, Sparkles, Instagram, Facebook } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  // Services principaux
  const featuredServices = [
    {
      title: "Coupe Femme",
      description: "Coupe sur-mesure avec brushing pour un résultat élégant",
      price: "45€",
      duration: "1h",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80",
      icon: Scissors,
      features: ["Consultation personnalisée", "Shampooing premium", "Brushing professionnel"]
    },
    {
      title: "Coupe Homme", 
      description: "Coupe moderne et dégradé précis",
      price: "30€",
      duration: "45min",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80",
      icon: Scissors,
      features: ["Style moderne", "Dégradé précis", "Finition soignée"]
    },
    {
      title: "Coloration",
      description: "Coloration professionnelle et durable",
      price: "85€",
      duration: "2h", 
      image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=600&q=80",
      icon: Sparkles,
      features: ["Diagnostic capillaire", "Couleur sur-mesure", "Soin protecteur"]
    }
  ];

  // Statistiques du salon
  const stats = [
    { icon: Users, value: "5000+", label: "Clients satisfaits" },
    { icon: Award, value: "14", label: "Ans d'expérience" },
    { icon: Star, value: "4.9", label: "Note Google" },
    { icon: Clock, value: "6", label: "Experts coiffeurs" }
  ];

  // Témoignages clients
  const testimonials = [
    {
      name: "Sophie L.",
      text: "Un salon exceptionnel ! L'équipe est professionnelle et à l'écoute. Ma couleur est parfaite à chaque visite !",
      rating: 5,
      service: "Coloration",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80"
    },
    {
      name: "Marc D.",
      text: "Meilleur barbier de Paris ! Dégradé impeccable et ambiance très agréable. Je recommande vivement !",
      rating: 5,
      service: "Coupe + Barbe",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
    },
    {
      name: "Julie M.",
      text: "Mes enfants adorent venir ici. Le personnel est patient et le résultat toujours nickel. Bravo !",
      rating: 5,
      service: "Coupe Enfant",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
    }
  ];

  // Avantages du salon
  const advantages = [
    "Produits professionnels de qualité",
    "Équipe expérimentée et passionnée",
    "Conseils personnalisés gratuits",
    "Ambiance chic et détendue",
    "Dernières tendances coiffure",
    "Satisfaction garantie"
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
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
              <Link to={createPageUrl("Contact")}>
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#2D2D2D] px-8 py-6 rounded-full text-base font-medium transition-all duration-300">
                  Prendre rendez-vous
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
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

      {/* Featured Services */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D2D2D] mb-4">
              Nos Prestations Phares
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez nos services les plus populaires
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4 bg-[#C9A55C] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {service.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#C9A55C]/10 rounded-full flex items-center justify-center">
                        <service.icon className="w-5 h-5 text-[#C9A55C]" />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-[#2D2D2D]">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {service.duration}
                      </span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-[#C9A55C]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link to={createPageUrl("Contact")}>
                      <Button className="w-full bg-[#2D2D2D] hover:bg-[#1D1D1D] text-white py-3 rounded-full transition-all duration-300">
                        Réserver
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D2D2D] mb-6">
                Pourquoi nous choisir ?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Depuis plus de 14 ans, nous mettons notre expertise et notre passion 
                au service de votre beauté. Notre engagement : des résultats exceptionnels.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {advantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#C9A55C] mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{advantage}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
                alt="Notre salon"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#C9A55C] text-white p-6 rounded-2xl shadow-xl">
                <p className="text-3xl font-bold mb-1">14+</p>
                <p className="text-sm">Ans d'expérience</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
              La satisfaction de nos clients est notre meilleure publicité
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((review, index) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white font-semibold">{review.name}</p>
                    <p className="text-gray-400 text-sm">{review.service}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#C9A55C] fill-[#C9A55C]" />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed">"{review.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Contact")}>
                <Button className="bg-white text-[#C9A55C] hover:bg-gray-100 px-10 py-6 rounded-full text-lg font-medium shadow-xl">
                  <Calendar className="mr-2 w-5 h-5" />
                  Prendre rendez-vous
                </Button>
              </Link>
              <Link to={createPageUrl("Prestations")}>
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#C9A55C] px-10 py-6 rounded-full text-lg font-medium">
                  Voir les tarifs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAFAFA] rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#C9A55C]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-[#C9A55C]" />
                </div>
                <h3 className="text-lg font-semibold text-[#2D2D2D] mb-2">Adresse</h3>
                <p className="text-gray-600">25 Avenue de la Beauté<br />75008 Paris</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#C9A55C]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-[#C9A55C]" />
                </div>
                <h3 className="text-lg font-semibold text-[#2D2D2D] mb-2">Téléphone</h3>
                <p className="text-gray-600">01 23 45 67 89</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#C9A55C]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-[#C9A55C]" />
                </div>
                <h3 className="text-lg font-semibold text-[#2D2D2D] mb-2">Horaires</h3>
                <p className="text-gray-600">Mar-Ven: 9h-19h<br />Sam: 9h-18h</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}