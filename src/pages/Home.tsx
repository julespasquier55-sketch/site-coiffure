import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scissors, Star, Users, Award, ChevronRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-32 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="font-mono text-xs uppercase tracking-[0.5em] text-accent mb-4 block">L'Art de la Coupe</span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight mb-8">
              RÉVÉLEZ VOTRE <span className="text-accent underline decoration-1 underline-offset-8 italic">ESSENCE</span>
            </h1>
            <p className="text-xl text-muted-foreground font-sans mb-12 max-w-lg leading-relaxed">
              Plus qu'une simple coiffure, une expérience de transformation minimaliste et sophistiquée dans le cœur de Paris.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                to="/contact"
                className="px-8 py-4 bg-primary text-primary-foreground font-mono text-sm uppercase tracking-widest hover:bg-accent hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Prendre Rendez-vous <ChevronRight size={18} />
              </Link>
              <Link
                to="/prestations"
                className="px-8 py-4 border-2 border-primary text-primary font-mono text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 text-center"
              >
                Nos Services
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Background Image/Shape */}
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="w-full h-full bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-125"
            style={{ clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-border">
          {[
            { label: 'Clients Satisfaits', value: '5000+', icon: Users },
            { label: 'Années d\'Expérience', value: '12+', icon: Star },
            { label: 'Récompenses', value: '15', icon: Award },
            { label: 'Spécialistes', value: '8', icon: Scissors },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center space-y-2"
            >
              <div className="flex justify-center text-accent mb-2">
                <stat.icon size={24} />
              </div>
              <p className="text-3xl font-bold tracking-tighter font-mono">{stat.value}</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Introduction */}
      <section className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square"
        >
          <img 
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2070&auto=format&fit=crop" 
            alt="Salon interior" 
            className="w-full h-full object-cover grayscale brightness-75 rounded-2xl"
          />
          <div className="absolute -bottom-10 -right-10 w-2/3 h-2/3 hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2069&auto=format&fit=crop" 
              alt="Coiffeur au travail" 
              className="w-full h-full object-cover border-8 border-background rounded-2xl grayscale"
            />
          </div>
        </motion.div>
        
        <div className="space-y-8">
          <span className="font-mono text-xs uppercase tracking-[0.5em] text-accent block">Qui sommes-nous</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
            UNE PHILOSOPHIE DU <span className="italic">DESIGN CAPILLAIRE</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Chez COIFFURE BLINK, nous croyons que chaque coupe est une œuvre d'art. Notre approche minimaliste se concentre sur les lignes épurées, la santé du cheveu et l'harmonie avec votre visage.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nos experts sont formés aux dernières techniques internationales pour vous offrir un service sur mesure, du diagnostic initial à la finition parfaite.
          </p>
          <div className="pt-4">
            <Link to="/contact" className="group flex items-center gap-4 text-primary font-mono text-sm uppercase tracking-widest font-bold">
              Découvrir notre histoire
              <div className="w-12 h-[2px] bg-primary group-hover:w-20 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services Preview */}
      <section className="bg-secondary py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-[0.5em] text-accent block">Nos Incontournables</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">PRESTATIONS PHARE</h2>
            </div>
            <Link to="/prestations" className="font-mono text-sm uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-accent hover:border-accent transition-all">
              Toutes nos prestations
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Coupe Signature', 
                price: '65€', 
                image: 'https://images.unsplash.com/photo-1599351431247-f5793383897d?q=80&w=1974&auto=format&fit=crop',
                desc: 'Notre coupe iconique adaptée à votre structure osseuse.'
              },
              { 
                title: 'Balayage Minimal', 
                price: '140€', 
                image: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=2072&auto=format&fit=crop',
                desc: 'Des touches de lumière subtiles pour un effet naturel.'
              },
              { 
                title: 'Soin Purifiant', 
                price: '45€', 
                image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop',
                desc: 'Un rituel detox pour redonner vie à vos cheveux.'
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group bg-background rounded-2xl overflow-hidden border shadow-sm"
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale" />
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full font-mono text-sm font-bold">
                    {service.price}
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-2xl font-bold tracking-tighter">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                  <Link to="/contact" className="inline-block font-mono text-xs uppercase tracking-widest text-accent hover:text-primary transition-colors">
                    Réserver maintenant
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="bg-primary text-primary-foreground rounded-3xl p-12 md:p-24 relative overflow-hidden text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 max-w-3xl mx-auto space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">PRÊT POUR VOTRE NOUVELLE ALLURE ?</h2>
            <p className="text-lg opacity-80 font-sans">Rejoignez-nous pour une expérience unique et personnalisée. Les places sont limitées, réservez la vôtre dès aujourd'hui.</p>
            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-block px-12 py-5 bg-background text-primary font-mono text-sm uppercase tracking-[0.2em] font-bold hover:scale-105 transition-transform"
              >
                Prendre rendez-vous
              </Link>
            </div>
          </motion.div>
          
          {/* Abstract background elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-accent/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
        </div>
      </section>
    </div>
  );
};

export default Home;
