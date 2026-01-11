import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const images = [
    { url: 'https://images.unsplash.com/photo-1560869713-7d0a29430863?q=80&w=2070&auto=format&fit=crop', category: 'Coupe', title: 'Carré Plongeant Minimal' },
    { url: 'https://images.unsplash.com/photo-1595476108010-b4d1f80d77d2?q=80&w=1968&auto=format&fit=crop', category: 'Couleur', title: 'Balayage Polaire' },
    { url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop', category: 'Coiffage', title: 'Ondes Hollywoodiennes' },
    { url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop', category: 'Soin', title: 'Rituel Purifiant' },
    { url: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1974&auto=format&fit=crop', category: 'Homme', title: 'Dégradé Américain' },
    { url: 'https://images.unsplash.com/photo-1582095133179-bf10b82f27f0?q=80&w=2070&auto=format&fit=crop', category: 'Couleur', title: 'Roux Flamboyant' },
    { url: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=1974&auto=format&fit=crop', category: 'Coupe', title: 'Pixie Cut Audacieux' },
    { url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop', category: 'Coiffage', title: 'Tressee Bohème' },
    { url: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1974&auto=format&fit=crop', category: 'Coupe', title: 'Longueurs Ondulées' },
  ];

  const categories = ['Tous', 'Coupe', 'Couleur', 'Coiffage', 'Homme'];
  const [filter, setFilter] = useState('Tous');

  const filteredImages = filter === 'Tous' 
    ? images 
    : images.filter(img => img.category === filter);

  return (
    <div className="pb-20">
      {/* Header */}
      <section className="bg-secondary py-20 mb-12">
        <div className="container mx-auto px-4 text-center space-y-4">
          <span className="font-mono text-xs uppercase tracking-[0.5em] text-accent block">Nos Créations</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">GALERIE</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">
            Un aperçu de notre savoir-faire à travers une sélection de nos plus belles réalisations.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all ${
                filter === cat 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : 'bg-secondary text-muted-foreground hover:bg-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-4">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredImages.map((img, i) => (
              <motion.div
                key={img.url}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border cursor-pointer"
                onClick={() => setSelectedImg(img.url)}
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 space-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accent-foreground/70 bg-white/10 w-fit px-2 py-1 rounded">
                    {img.category}
                  </span>
                  <h3 className="text-xl font-bold tracking-tighter text-white">{img.title}</h3>
                  <div className="flex items-center gap-2 text-white/60 text-xs font-mono">
                    <Maximize2 size={12} /> Cliquer pour agrandir
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImg(null)}
          >
            <button 
              className="absolute top-8 right-8 p-3 bg-secondary rounded-full hover:bg-border transition-colors z-[110]"
              onClick={() => setSelectedImg(null)}
            >
              <X size={24} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImg} 
                alt="Selected" 
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
