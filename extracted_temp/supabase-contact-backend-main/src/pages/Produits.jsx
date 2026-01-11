import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";

export default function Produits() {
  const [activeCategory, setActiveCategory] = useState("tous");
  const [favorites, setFavorites] = useState([]);

  const categories = [
    { id: "tous", label: "Tous" },
    { id: "shampoings", label: "Shampoings" },
    { id: "soins", label: "Soins" },
    { id: "styling", label: "Styling" },
    { id: "coloration", label: "Coloration" },
  ];

  const products = [
    {
      id: 1,
      name: "Shampoing Réparateur",
      brand: "L'Oréal Professionnel",
      price: "18,90€",
      image:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
      category: "shampoings",
      rating: 4.5,
      description: "Shampoing réparateur pour cheveux abîmés et fragilisés",
      isNew: false,
      isBestSeller: true,
    },
    {
      id: 2,
      name: "Masque Hydratation Intense",
      brand: "Kérastase",
      price: "34,50€",
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
      category: "soins",
      rating: 4.8,
      description: "Masque profond pour une hydratation intense et durable",
      isNew: true,
      isBestSeller: false,
    },
    {
      id: 3,
      name: "Laque Fixation Forte",
      brand: "Schwarzkopf",
      price: "12,90€",
      image:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
      category: "styling",
      rating: 4.2,
      description:
        "Laque à forte fixation pour une tenue parfaite toute la journée",
      isNew: false,
      isBestSeller: false,
    },
    {
      id: 4,
      name: "Coloration Permanente",
      brand: "Wella Professionals",
      price: "15,60€",
      image:
        "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800&q=80",
      category: "coloration",
      rating: 4.7,
      description:
        "Coloration permanente pour un résultat éclatant et durable",
      isNew: false,
      isBestSeller: true,
    },
    {
      id: 5,
      name: "Sérum Brillant Extrême",
      brand: "Redken",
      price: "28,90€",
      image:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
      category: "soins",
      rating: 4.6,
      description: "Sérum pour une brillance intense et des cheveux doux",
      isNew: true,
      isBestSeller: false,
    },
  ];

  const filteredProducts =
    activeCategory === "tous"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div>

      {/* 🔥 BANNIÈRE TOP + OVERLAY */}
      <section className="relative w-full h-[350px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1600')",
          }}
        ></div>

        <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="relative text-center text-white px-4"
>
  <motion.h1
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, ease: "easeOut" }}
    className="text-5xl font-bold mb-4"
  >
    Nos Produits
  </motion.h1>

  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className="text-xl"
  >
    Une sélection de produits professionnels pour prendre soin de vos cheveux <br /> à la maison
  </motion.p>
</motion.div>

      </section>

      {/* 🟦 CONTENU PRODUITS */}
      <div className="px-4 py-8 max-w-6xl mx-auto">

        {/* Categories */}
        <div className="flex gap-4 mb-8 flex-wrap mt-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full border ${
                activeCategory === cat.id
                  ? "bg-gold text-white"
                  : "border-gray-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border rounded-xl bg-white shadow-sm"
            >
              <img
                src={product.image}
                alt={product.name}
                className="rounded-lg"
              />

              <h3 className="mt-3 text-xl font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.brand}</p>

              <div className="flex items-center gap-1 mt-2">
                <Star size={16} className="text-yellow-500" />
                <span>{product.rating}</span>
              </div>

              <p className="mt-3 font-bold">{product.price}</p>

              <div className="flex justify-between mt-4">
                <button className="p-2 rounded-full border">
                  <ShoppingCart size={18} />
                </button>

                <button
                  onClick={() =>
                    setFavorites((prev) =>
                      prev.includes(product.id)
                        ? prev.filter((id) => id !== product.id)
                        : [...prev, product.id]
                    )
                  }
                  className="p-2 rounded-full border"
                >
                  <Heart
                    size={18}
                    className={
                      favorites.includes(product.id)
                        ? "text-red-500"
                        : "text-gray-500"
                    }
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}