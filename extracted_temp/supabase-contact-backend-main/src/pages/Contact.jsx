import React, { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            message: formData.message
          }
        ]);

      if (error) throw error;

      toast.success("Message envoyé !", {
        description: "Nous vous recontacterons dans les plus brefs délais.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Erreur lors de l'envoi", {
        description: "Veuillez réessayer plus tard.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "25 Avenue de la Beauté\n75008 Paris",
      color: "from-[#C9A55C] to-[#B8944B]"
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "01 23 45 67 89",
      color: "from-[#C9A55C] to-[#B8944B]"
    },
    {
      icon: Mail,
      title: "Email",
      content: "contact@elegance-coiffure.fr",
      color: "from-[#C9A55C] to-[#B8944B]"
    },
    {
      icon: Clock,
      title: "Horaires",
      content: "Mar-Ven: 9h-19h\nSam: 9h-18h | Lun: Fermé",
      color: "from-[#C9A55C] to-[#B8944B]"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA]" id="rendez-vous">
      <Toaster position="top-center" richColors />
      {/* Hero */}
      <section className="relative py-20 bg-[#2D2D2D]">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1600&q=80"
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
              Contactez-nous
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Prenez rendez-vous ou posez-nous vos questions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <info.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-serif font-bold text-[#2D2D2D] mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-600 whitespace-pre-line text-sm leading-relaxed">
                  {info.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Map */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl">
                <h2 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-3">
                  Prendre rendez-vous
                </h2>
                <p className="text-gray-600 mb-8">
                  Remplissez le formulaire et nous vous recontacterons rapidement
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#2D2D2D]">
                        Nom complet *
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Jean Dupont"
                        className="h-12 border-gray-200 focus:border-[#C9A55C] rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#2D2D2D]">
                        Téléphone *
                      </label>
                      <Input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="06 12 34 56 78"
                        className="h-12 border-gray-200 focus:border-[#C9A55C] rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2D2D2D]">
                      Email *
                    </label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="jean.dupont@email.com"
                      className="h-12 border-gray-200 focus:border-[#C9A55C] rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2D2D2D]">
                      Prestation souhaitée
                    </label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => setFormData({...formData, service: value})}
                    >
                      <SelectTrigger className="h-12 border-gray-200 focus:border-[#C9A55C] rounded-xl">
                        <SelectValue placeholder="Sélectionnez une prestation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="coupe-femme">Coupe Femme</SelectItem>
                        <SelectItem value="coupe-homme">Coupe Homme</SelectItem>
                        <SelectItem value="coupe-enfant">Coupe Enfant</SelectItem>
                        <SelectItem value="coloration">Coloration</SelectItem>
                        <SelectItem value="balayage">Balayage / Mèches</SelectItem>
                        <SelectItem value="barbe">Taille de barbe</SelectItem>
                        <SelectItem value="soin">Soin capillaire</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2D2D2D]">
                      Message
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Précisez vos disponibilités ou toute information utile..."
                      className="min-h-[120px] border-gray-200 focus:border-[#C9A55C] rounded-xl resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#C9A55C] hover:bg-[#B8944B] text-white h-14 rounded-xl text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    {isSubmitting ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        <Send className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        Envoyer ma demande
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Map & Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Google Map */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2158489427893!2d2.3072!3d48.8738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4f0a1a8d5%3A0x40b82c3688c9460!2s75008%20Paris!5e0!3m2!1sfr!2sfr!4v1699999999999"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation du salon"
                />
              </div>

              {/* Quick Info */}
              <div className="bg-gradient-to-br from-[#2D2D2D] to-[#1D1D1D] rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-serif font-bold mb-4">
                  Venez nous voir
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Notre salon vous accueille dans un cadre moderne et chaleureux. 
                  Parking disponible à proximité.
                </p>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#C9A55C]" />
                  </div>
                  <div>
                    <p className="font-semibold">25 Avenue de la Beauté</p>
                    <p className="text-gray-400">75008 Paris</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <a href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#C9A55C] transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#C9A55C] transition-colors">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="tel:0123456789" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#C9A55C] transition-colors">
                    <Phone className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}