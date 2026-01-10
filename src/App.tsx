import { Routes, Route } from 'react-router-dom';
import Layout from './components/common/layout';
import Home from "./pages/Home";       // Vérifie la casse exacte
import Accueil from "./pages/Accueil"; // idem
import Prestations from './pages/Prestations';
import Produits from './pages/Produits';
import Galerie from './pages/Galerie';
import Contact from './pages/Contact';
import AdminSubmissions from './pages/AdminSubmissions';
import { Toaster } from 'sonner';


function App() {
  return (
    <Layout>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Changé ici */}
        <Route path="/prestations" element={<Prestations />} />
        <Route path="/produits" element={<Produits />} />
        <Route path="/galerie" element={<Galerie />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminSubmissions />} />
      </Routes>
    </Layout>
  );
}

export default App;