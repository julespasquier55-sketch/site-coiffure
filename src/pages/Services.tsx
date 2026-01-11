import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Scissors, Brush, Wind, Sparkles } from 'lucide-react';

const Services = () => {
  const categories = [
    {
      name: 'Coupes & Coiffage',
      icon: Scissors,
      services: [
        { name: 'Coupe Femme Signature', desc: 'Shampoing, diagnostic, coupe architecturale, coiffage.', price: '65€', time: '60 min' },
        { name: 'Coupe Homme Précision', desc: 'Shampoing, coupe, finition aux ciseaux, coiffage.', price: '35€', time: '45 min' },
        { name: 'Brushing Blink', desc: 'Lissage parfait ou boucles naturelles avec produits haut de gamme.', price: '40€', time: '45 min' },
        { name: 'Coiffure Événementielle', desc: 'Chignons modernes, tresses ou attaches pour vos soirées.', price: '85€+', time: '90 min' },
      ]
    },
    {
      name: 'Coloration & Lumière',
      icon: Brush,
      services: [
        { name: 'Balayage Minimaliste', desc: 'Éclaircissement subtil pour un effet "retour de plage".', price: '140€+', time: '150 min' },
        { name: 'Coloration Racine', desc: 'Couverture parfaite des cheveux blancs ou changement de base.', price: '75€', time: '90 min' },
        { name: 'Gloss & Patine', desc: 'Redonner de la brillance et neutraliser les reflets indésirables.', price: '50€', time: '45 min' },
        { name: 'Transformation Totale', desc: 'Changement radical de couleur (sur devis).', price: 'Sur devis', time: 'Variable' },
      ]
    },
    {
      name: 'Soins Profonds',
      icon: Sparkles,
      services: [
        { name: 'Rituel Detox', desc: 'Purification du cuir chevelu et hydratation intense.', price: '45€', time: '30 min' },
        { name: 'Soin Moléculaire', desc: 'Réparation en profondeur de la fibre capillaire cassante.', price: '85€', time: '60 min' },
        { name: 'Lissage au Tanin', desc: 'Discipline le cheveu tout en conservant le volume naturel.', price: '220€+', time: '180 min' },
        { name: 'Botox Capillaire', desc: 'Un véritable coup de jeune pour vos cheveux ternes.', price: '110€', time: '90 min' },
      ]
    }
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <section className="bg-secondary py-20 mb-20">
        <div className="container mx-auto px-4 text-center space-y-4">
          <span className="font-mono text-xs uppercase tracking-[0.5em] text-accent block">Nos Tarifs</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">PRESTATIONS</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">
            Une gamme complète de services conçus pour sublimer votre beauté naturelle avec précision et soin.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="container mx-auto px-4 space-y-32">
        {categories.map((cat, idx) => (
          <div key={idx} className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
            <div className="lg:sticky lg:top-32 h-fit space-y-6">
              <div className="w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center rounded-2xl mb-8">
                <cat.icon size={32} />
              </div>
              <h2 className="text-4xl font-bold tracking-tighter uppercase">{cat.name}</h2>
              <p className="text-muted-foreground leading-relaxed">
                Des techniques expertes et des produits de prestige pour un résultat irréprochable.
              </p>
              <div className="pt-4">
                <ul className="space-y-3">
                  {['Produits Bio', 'Diagnostic Offert', 'Conseils Personnalisés'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest">
                      <Check size={16} className="text-accent" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              {cat.services.map((service, sIdx) => (
                <motion.div
                  key={sIdx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: sIdx * 0.1 }}
                  className="group bg-background border p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-elegant transition-all duration-300"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-4">
                      <h3 className="text-2xl font-bold tracking-tighter group-hover:text-accent transition-colors">{service.name}</h3>
                      <span className="text-[10px] font-mono uppercase tracking-widest bg-secondary px-2 py-1 rounded">
                        {service.time}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm max-w-md">{service.desc}</p>
                  </div>
                  <div className="flex flex-row md:flex-col items-center md:items-end gap-4 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-border">
                    <span className="text-3xl font-bold tracking-tighter font-mono">{service.price}</span>
                    <Link
                      to="/contact"
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-mono text-xs uppercase tracking-widest hover:bg-accent transition-colors ml-auto md:ml-0"
                    >
                      Réserver
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Note Section */}
      <section className="container mx-auto px-4 mt-32">
        <div className="max-w-4xl mx-auto bg-secondary p-12 rounded-3xl border border-dashed border-accent/30 text-center space-y-6">
          <h3 className="font-mono font-bold text-sm uppercase tracking-widest">Note Importante</h3>
          <p className="text-muted-foreground leading-relaxed italic">
            "Les tarifs indiqués pour les colorations et balayages sont des prix de base et peuvent varier selon la longueur, l'épaisseur de votre chevelure et la quantité de produit nécessaire. Un diagnostic précis sera réalisé avant chaque prestation."
          </p>
        </div>
      </section>
    </div>
  );
};

export default Services;
