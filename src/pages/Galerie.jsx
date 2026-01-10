import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Galerie() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { id: "all", label: "Toutes" },
    { id: "femmes", label: "Femmes" },
    { id: "hommes", label: "Hommes" },
    { id: "colorations", label: "Colorations" },
    { id: "salon", label: "Le salon" }
  ];

  const images = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
      title: "Coupe femme tendance",
      category: "femmes"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
      title: "Dégradé homme",
      category: "hommes"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80",
      title: "Balayage blond",
      category: "colorations"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80",
      title: "Notre espace coupe",
      category: "salon"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=80",
      title: "Coloration cuivrée",
      category: "colorations"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80",
      title: "Coupe barbe",
      category: "hommes"
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
      title: "Brushing élégant",
      category: "femmes"
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800&q=80",
      title: "Espace barbier",
      category: "salon"
    },
    {
      id: 9,
      url: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80",
      title: "Coupe enfant",
      category: "femmes"
    },
    {
      id: 10,
      url: "https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=800&q=80",
      title: "Dégradé moderne",
      category: "hommes"
    },
    {
      id: 11,
      url: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800&q=80",
      title: "Mèches naturelles",
      category: "colorations"
    },
    {
      id: 12,
      url: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&q=80",
      title: "Accueil salon",
      category: "salon"
    }
  ];

  const filteredImages = activeFilter === "all"
    ? images
    : images.filter(img => img.category === activeFilter);

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
              Notre Galerie
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Découvrez nos réalisations et laissez-vous inspirer
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
                onClick={() => setActiveFilter(category.id)}
                variant={activeFilter === category.id ? "default" : "outline"}
                className={`rounded-full px-6 py-2 transition-all duration-300 ${
                  activeFilter === category.id
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

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative h-80 rounded-2xl overflow-hidden bg-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white text-xl font-serif font-bold mb-2">
                          {image.title}
                        </h3>
                        <div className="flex items-center gap-2 text-white/80">
                          <ZoomIn className="w-5 h-5" />
                          <span className="text-sm">Voir en grand</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              />
              <div className="mt-4 text-center">
                <h3 className="text-white text-2xl font-serif font-bold">
                  {selectedImage.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}