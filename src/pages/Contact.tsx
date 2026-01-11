import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createClient } from '@blinkdotnew/sdk';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';

// Form schema
const formSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse e-mail invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  services: z.array(z.string()).min(1, 'Veuillez sélectionner au moins un service'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
});

type FormData = z.infer<typeof formSchema>;

// Initialize SDK
const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID,
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY,
  auth: { mode: 'managed' }
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      services: [],
    }
  });

  const selectedServices = watch('services');

  const servicesOptions = [
    'Coupe Femme', 'Coupe Homme', 'Coloration', 'Balayage', 'Soins Profonds', 'Coiffure Mariage'
  ];

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Corrected method call: blink.db.contacts.create
      await (blink.db as any).contacts.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        services: data.services.join(', '),
        message: data.message,
      });

      setIsSuccess(true);
      toast.success('Message envoyé avec succès !');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Une erreur est survenue lors de l\'envoi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleService = (service: string) => {
    const current = selectedServices || [];
    if (current.includes(service)) {
      setValue('services', current.filter(s => s !== service));
    } else {
      setValue('services', [...current, service]);
    }
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <section className="bg-secondary py-20 mb-20">
        <div className="container mx-auto px-4 text-center space-y-4">
          <span className="font-mono text-xs uppercase tracking-[0.5em] text-accent block">Contactez-nous</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">PRENDRE RENDEZ-VOUS</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">
            Réservez votre moment de détente ou posez-nous vos questions. Notre équipe vous répondra dans les plus brefs délais.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Info Column */}
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tighter uppercase">COORDONNÉES</h2>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Situé au cœur du 11ème arrondissement, notre salon vous accueille dans un cadre minimaliste et chaleureux.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="p-4 bg-secondary text-primary rounded-2xl">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-mono font-bold text-sm uppercase tracking-widest mb-2">Adresse</h4>
                <p className="text-muted-foreground">123 Rue de la Coiffure, 75011 Paris, France</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="p-4 bg-secondary text-primary rounded-2xl">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-mono font-bold text-sm uppercase tracking-widest mb-2">Téléphone</h4>
                <p className="text-muted-foreground">+33 1 23 45 67 89</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="p-4 bg-secondary text-primary rounded-2xl">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-mono font-bold text-sm uppercase tracking-widest mb-2">E-mail</h4>
                <p className="text-muted-foreground">contact@coiffure-blink.fr</p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="aspect-video w-full bg-secondary rounded-3xl overflow-hidden grayscale border">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.99144060813!2d2.3522219156739!3d48.85661400865511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2sus!4v1621234567890!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Form Column */}
        <div className="bg-background border p-8 md:p-12 rounded-[3rem] shadow-elegant relative overflow-hidden">
          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20"
            >
              <div className="w-20 h-20 bg-accent text-white flex items-center justify-center rounded-full mb-4">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter uppercase">DEMANDE ENVOYÉE !</h2>
              <p className="text-muted-foreground max-w-xs">
                Merci pour votre message. Notre équipe vous contactera très prochainement pour confirmer votre rendez-vous.
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="px-8 py-3 border-2 border-primary text-primary font-mono text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all rounded-full"
              >
                Envoyer un autre message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground ml-2">Nom Complet</label>
                <input
                  {...register('name')}
                  placeholder="Jean Dupont"
                  className={`w-full bg-secondary/50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-accent transition-all ${errors.name ? 'ring-2 ring-destructive' : ''}`}
                />
                {errors.name && <p className="text-xs text-destructive ml-2 font-mono">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground ml-2">E-mail</label>
                  <input
                    {...register('email')}
                    placeholder="jean@example.com"
                    className={`w-full bg-secondary/50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-accent transition-all ${errors.email ? 'ring-2 ring-destructive' : ''}`}
                  />
                  {errors.email && <p className="text-xs text-destructive ml-2 font-mono">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground ml-2">Téléphone</label>
                  <input
                    {...register('phone')}
                    placeholder="06 12 34 56 78"
                    className={`w-full bg-secondary/50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-accent transition-all ${errors.phone ? 'ring-2 ring-destructive' : ''}`}
                  />
                  {errors.phone && <p className="text-xs text-destructive ml-2 font-mono">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="space-y-4">
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground ml-2 block mb-4">Services Souhaités</label>
                <div className="flex flex-wrap gap-3">
                  {servicesOptions.map(service => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-all border ${
                        selectedServices?.includes(service)
                          ? 'bg-accent border-accent text-white'
                          : 'bg-transparent border-border text-muted-foreground hover:border-accent'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
                {errors.services && <p className="text-xs text-destructive ml-2 font-mono">{errors.services.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground ml-2">Message / Précisions</label>
                <textarea
                  {...register('message')}
                  placeholder="Décrivez votre besoin..."
                  rows={4}
                  className={`w-full bg-secondary/50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-accent transition-all resize-none ${errors.message ? 'ring-2 ring-destructive' : ''}`}
                />
                {errors.message && <p className="text-xs text-destructive ml-2 font-mono">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground py-5 rounded-2xl font-mono text-sm uppercase tracking-[0.3em] font-bold hover:bg-accent transition-all flex items-center justify-center gap-4 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>ENVOYER <Send size={18} /></>
                )}
              </button>
            </form>
          )}

          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl" />
        </div>
      </section>
    </div>
  );
};

export default Contact;
