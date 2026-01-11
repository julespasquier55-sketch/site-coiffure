import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Mail, Phone, Clock, User, Scissors, MessageSquare, Trash2, LogOut, Copy, Info, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";

export default function Admin() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [copied, setCopied] = useState(false);

  const projectPrompt = `Je travaille sur un site de salon de coiffure ('Site Coiffure') construit avec React (Vite) et Tailwind CSS. Le backend est alimenté par Supabase.

Infrastructure :
- Backend : Supabase (Table: contact_submissions)
- Champs : name, email, phone, service (formule/coiffure), message
- Auth : Système simple par mot de passe pour l'admin

Pages :
- Accueil : Hero section avec image de fond et animations
- Prestations : Liste des services (Coiffure, Barbe, Soins)
- Galerie : Portfolio des réalisations
- Produits : Boutique/Produits utilisés
- Contact : Formulaire lié à Supabase

Design : Thème moderne, épuré, typographie élégante, animations fluides avec Framer Motion.

Veuillez utiliser ce contexte pour m'aider à continuer le développement.`;

  const copyPrompt = () => {
    navigator.clipboard.writeText(projectPrompt);
    setCopied(true);
    toast.success("Prompt copié dans le presse-papier !");
    setTimeout(() => setCopied(false), 2000);
  };

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast.error("Erreur lors de la récupération des messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, use Supabase Auth. For this simple case, a fixed password.
    if (password === "admin123") {
      setIsAuthenticated(true);
      toast.success("Accès autorisé");
    } else {
      toast.error("Mot de passe incorrect");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Voulez-vous vraiment supprimer ce message ?")) return;
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setSubmissions(submissions.filter(s => s.id !== id));
      toast.success("Message supprimé");
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
        <Toaster position="top-center" richColors />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-[#2D2D2D] mb-2">Espace Admin</h1>
            <p className="text-gray-500">Veuillez entrer le mot de passe pour continuer</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe (admin123)"
              className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A55C] transition-all"
            />
            <Button type="submit" className="w-full h-12 bg-[#C9A55C] hover:bg-[#B8944B] text-white rounded-xl">
              Se connecter
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20">
      <Toaster position="top-center" richColors />
      
      <header className="bg-white border-b border-gray-100 py-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#2D2D2D]">Dashboard Submissions</h1>
            <p className="text-sm text-gray-500">{submissions.length} message(s) reçu(s)</p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => setShowPrompt(!showPrompt)}
              className="text-gray-600 border-gray-200"
            >
              <Info className="w-5 h-5 mr-2" />
              Contexte IA
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setIsAuthenticated(false)}
              className="text-gray-500 hover:text-red-500"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {showPrompt && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-8 bg-blue-50 border border-blue-100 rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center text-blue-800">
                <Info className="w-5 h-5 mr-2" />
                <h3 className="font-bold">Prompt de contexte pour un autre compte IA</h3>
              </div>
              <Button 
                onClick={copyPrompt}
                variant="outline"
                className="bg-white border-blue-200 text-blue-700 hover:bg-blue-100 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? "Copié !" : "Copier le prompt"}
              </Button>
            </div>
            <pre className="text-sm text-blue-900 bg-white/50 p-4 rounded-xl whitespace-pre-wrap font-mono leading-relaxed border border-blue-100/50">
              {projectPrompt}
            </pre>
          </motion.div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A55C]"></div>
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <MessageSquare className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600">Aucun message pour le moment</h3>
          </div>
        ) : (
          <div className="grid gap-6">
            {submissions.map((sub) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-4 flex-1">
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                          <User className="w-4 h-4 mr-2 text-[#C9A55C]" />
                          <span className="font-semibold">{sub.name}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                          <Mail className="w-4 h-4 mr-2 text-[#C9A55C]" />
                          {sub.email}
                        </div>
                        {sub.phone && (
                          <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                            <Phone className="w-4 h-4 mr-2 text-[#C9A55C]" />
                            {sub.phone}
                          </div>
                        )}
                        <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                          <Clock className="w-4 h-4 mr-2 text-[#C9A55C]" />
                          {new Date(sub.created_at).toLocaleString('fr-FR')}
                        </div>
                      </div>

                      <div className="bg-[#FAF8F5] p-4 rounded-xl border-l-4 border-[#C9A55C]">
                        <div className="flex items-center mb-2 text-[#C9A55C]">
                          <Scissors className="w-4 h-4 mr-2" />
                          <span className="text-sm font-bold uppercase tracking-wider">Prestation: {sub.service || 'Non précisé'}</span>
                        </div>
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {sub.message || <span className="italic text-gray-400">Aucun message</span>}
                        </p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDelete(sub.id)}
                      className="text-gray-400 hover:text-red-500 hover:bg-red-50 self-end md:self-start"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
