import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/common/layout';
import Home from "./pages/Home";       // Vérifie la casse exacte
import Accueil from "./pages/Accueil"; // idem
import Prestations from './pages/Prestations';
import Produits from './pages/Produits';
import Galerie from './pages/Galerie';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <Layout>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Changé ici */}
        <Route path="/prestations" element={<Prestations />} />
        <Route path="/produits" element={<Produits />} />
        <Route path="/galerie" element={<Galerie />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Layout>
  );
}

export default App;