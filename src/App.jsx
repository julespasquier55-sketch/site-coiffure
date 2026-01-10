import { Routes, Route } from 'react-router-dom';
import Layout from './components/common/layout';
import Home from "./pages/Home";       // Vérifie la casse exacte
import Accueil from "./pages/Accueil"; // idem
import Prestations from './pages/Prestations';
import Produits from './pages/Produits';
import Galerie from './pages/Galerie';
import Contact from './pages/Contact';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Changé ici */}
        <Route path="/prestations" element={<Prestations />} />
        <Route path="/produits" element={<Produits />} />
        <Route path="/galerie" element={<Galerie />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  );
}

export default App;