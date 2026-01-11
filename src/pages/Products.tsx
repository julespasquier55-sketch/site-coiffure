import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, ShieldCheck, Zap } from 'lucide-react';

const Products = () => {
  const products = [
    {
      id: 1,
      name: 'Élixir de Soie',
      brand: 'Blink Professional',
      price: '34€',
      category: 'Soin',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1935&auto=format&fit=crop',
      rating: 4.9,
      desc: 'Huile légère pour une brillance miroir sans alourdir.'
    },
    {
      id: 2,
      name: 'Argile Texturante',
      brand: 'Blink Style',
      price: '22€',
      category: 'Styling',
      image: 'https://images.unsplash.com/photo-1594465919760-441fe5908ab0?q=80&w=1964&auto=format&fit=crop',
      rating: 4.8,
      desc: 'Fixation mate et malléable pour des looks naturels.'
    },
    {
      id: 3,
      name: 'Brume Hydratante',
      brand: 'Blink Care',
      price: '28€',
      category: 'Soin',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop',
      rating: 5.0,
      desc: 'Réveille vos boucles et protège de la chaleur.'
    },
    {
      id: 4,
      name: 'Shampoing Purifiant',
      brand: 'Blink Professional',
      price: '26€',
      category: 'Lavage',
      image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=2070&auto=format&fit=crop',
      rating: 4.7,
      desc: 'Nettoie en profondeur sans irriter le cuir chevelu.'
    },
    {
      id: 5,
      name: 'Masque Réparateur',
      brand: 'Blink Care',
      price: '42€',
      category: 'Soin',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop',
      rating: 4.9,
      desc: 'Restaure la structure interne des cheveux abîmés.'
    },
    {
      id: 6,
      name: 'Spray Fixant',
      brand: 'Blink Style',
      price: '19€',
      category: 'Styling',
      image: 'https://images.unsplash.com/photo-1594465919760-441fe5908ab0?q=80&w=1964&auto=format&fit=crop',
      rating: 4.6,
      desc: 'Tenue longue durée invisible et sans résidus.'
    }
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <section className="bg-secondary py-20 mb-20">
        <div className="container mx-auto px-4 text-center space-y-4">
          <span className="font-mono text-xs uppercase tracking-[0.5em] text-accent block">Boutique Exclusive</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">NOS PRODUITS</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">
            Prolongez l'expérience du salon chez vous avec notre sélection rigoureuse de produits professionnels.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: ShieldCheck, title: 'Qualité Pro', desc: 'Les mêmes produits utilisés par nos experts en salon.' },
            { icon: Zap, title: 'Ingrédients Bio', desc: 'Formulations respectueuses de votre santé et de la planète.' },
            { icon: Star, title: 'Résultats Visibles', desc: 'Une efficacité prouvée dès la première application.' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-secondary text-accent rounded-full">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold font-mono uppercase tracking-tight">{item.title}</h3>
              <p className="text-sm text-muted-foreground max-w-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-secondary mb-6">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full font-mono text-[10px] uppercase tracking-widest border shadow-sm">
                    {product.category}
                  </span>
                </div>
                <button className="absolute bottom-6 right-6 p-4 bg-primary text-primary-foreground rounded-full translate-y-20 group-hover:translate-y-0 transition-all duration-500 hover:bg-accent shadow-xl">
                  <ShoppingBag size={20} />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-mono text-accent uppercase tracking-widest">{product.brand}</p>
                    <h3 className="text-2xl font-bold tracking-tighter">{product.name}</h3>
                  </div>
                  <span className="text-xl font-bold font-mono">{product.price}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{product.desc}</p>
                <div className="flex items-center gap-1 pt-2">
                  {[...Array(5)].map((_, star) => (
                    <Star 
                      key={star} 
                      size={12} 
                      className={star < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"} 
                    />
                  ))}
                  <span className="text-xs font-mono ml-2 text-muted-foreground">{product.rating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="container mx-auto px-4 mt-40">
        <div className="flex flex-col lg:flex-row items-center gap-20 bg-primary text-primary-foreground rounded-[3rem] p-12 lg:p-24 overflow-hidden relative">
          <div className="flex-1 space-y-8 relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">DISPONIBLES EN SALON UNIQUEMENT</h2>
            <p className="text-lg opacity-80 font-sans leading-relaxed">
              Pour garantir que vous receviez le produit parfaitement adapté à vos besoins, notre gamme n'est disponible qu'après un diagnostic personnalisé réalisé par nos experts en salon.
            </p>
            <div className="pt-4">
              <Link to="/contact" className="px-10 py-4 bg-background text-primary font-mono text-sm uppercase tracking-widest font-bold rounded-full hover:scale-105 transition-transform inline-block">
                Trouver notre salon
              </Link>
            </div>
          </div>
          <div className="flex-1 relative z-10 hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1512496011931-d21ff46aba71?q=80&w=1964&auto=format&fit=crop" 
              alt="Products display" 
              className="w-full h-auto rounded-3xl grayscale shadow-2xl rotate-3"
            />
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/10 -skew-x-12 translate-x-1/4" />
        </div>
      </section>
    </div>
  );
};

export default Products;
