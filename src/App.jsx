import { Routes, Route } from 'react-router-dom';
import Layout from './components/common/layout';
import Home from "./pages/Home";
import Prestations from './pages/Prestations';
import Produits from './pages/Produits';
import Galerie from './pages/Galerie';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/prestations" element={<Layout><Prestations /></Layout>} />
        <Route path="/produits" element={<Layout><Produits /></Layout>} />
        <Route path="/galerie" element={<Layout><Galerie /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
      </Routes>
    </>
  );
}

export default App;
