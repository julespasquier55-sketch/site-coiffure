import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@blinkdotnew/sdk';
import { 
  Users, 
  Mail, 
  Phone, 
  Calendar, 
  ClipboardList, 
  Info, 
  Copy, 
  CheckCircle2,
  Trash2,
  Search
} from 'lucide-react';
import { toast } from 'sonner';

// Initialize SDK
const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID,
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY,
  auth: { mode: 'managed' }
});

const Admin = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'submissions' | 'context'>('submissions');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await (blink.db as any).contacts.list({
        orderBy: { createdAt: 'desc' }
      });
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Erreur lors de la récupération des contacts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const deleteContact = async (id: string) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce contact ?')) return;
    try {
      await (blink.db as any).contacts.delete(id);
      setContacts(contacts.filter(c => c.id !== id));
      toast.success('Contact supprimé.');
    } catch (error) {
      toast.error('Erreur lors de la suppression.');
    }
  };

  const projectContextPrompt = `Je travaille sur un site web pour un salon de coiffure (« Site Coiffure ») développé avec React (Vite) et Tailwind CSS. Le backend est géré par Supabase (Blink SDK).

État actuel :
- Frontend : Site multipage avec Accueil, Prestations, Galerie, Produits et Contact.
- Formulaire : Le formulaire de contact recueille le nom, l'adresse e-mail, le numéro de téléphone et les services sélectionnés.
- Base de données : Une table "contacts" stocke ces soumissions.
- Admin : Dashboard (/admin) listant les soumissions et utilitaire de contexte.
- Style : Thème "Mono" moderne et minimaliste avec animations Framer Motion.

Veuillez utiliser ce contexte pour continuer le développement tout en conservant le style et la structure existants.`;

  const copyContext = () => {
    navigator.clipboard.writeText(projectContextPrompt);
    toast.success('Contexte copié !');
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.services.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter uppercase">TABLEAU DE BORD ADMIN</h1>
          <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">Gestion des contacts et contexte projet</p>
        </div>
        
        <div className="flex bg-secondary p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-6 py-2 rounded-lg font-mono text-xs uppercase tracking-widest transition-all ${
              activeTab === 'submissions' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-primary'
            }`}
          >
            Soumissions
          </button>
          <button
            onClick={() => setActiveTab('context')}
            className={`px-6 py-2 rounded-lg font-mono text-xs uppercase tracking-widest transition-all ${
              activeTab === 'context' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-primary'
            }`}
          >
            Contexte Projet
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'submissions' ? (
          <motion.div
            key="submissions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Search and Stats */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="text"
                  placeholder="Rechercher un contact, un service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-secondary border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-accent transition-all"
                />
              </div>
              <div className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl flex items-center gap-4">
                <ClipboardList size={24} />
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest opacity-70">Total</p>
                  <p className="text-2xl font-bold font-mono">{contacts.length}</p>
                </div>
              </div>
            </div>

            {/* List */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Chargement des données...</p>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="text-center py-32 bg-secondary rounded-3xl border border-dashed">
                <p className="text-muted-foreground font-mono italic">Aucune soumission trouvée.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredContacts.map((contact) => (
                  <motion.div
                    key={contact.id}
                    layout
                    className="bg-background border rounded-2xl p-6 md:p-8 hover:shadow-elegant transition-all group"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-accent">
                            <Users size={24} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold tracking-tighter uppercase">{contact.name}</h3>
                            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                              <Calendar size={12} /> {new Date(contact.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                            <Mail size={16} /> {contact.email}
                          </a>
                          <a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                            <Phone size={16} /> {contact.phone}
                          </a>
                        </div>

                        <div className="pt-2">
                          <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-2">Services demandés :</p>
                          <div className="flex flex-wrap gap-2">
                            {contact.services.split(', ').map((s: string) => (
                              <span key={s} className="px-3 py-1 bg-secondary rounded-full text-[10px] font-mono uppercase tracking-widest">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 p-4 bg-secondary/50 rounded-xl">
                          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Message :</p>
                          <p className="text-sm italic text-muted-foreground leading-relaxed">"{contact.message}"</p>
                        </div>
                      </div>

                      <div className="flex md:flex-col justify-end gap-2">
                        <button
                          onClick={() => deleteContact(contact.id)}
                          className="p-3 text-destructive hover:bg-destructive/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                          title="Supprimer"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="context"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-background border rounded-3xl p-8 md:p-12 space-y-8 shadow-elegant relative overflow-hidden">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-accent text-white rounded-2xl">
                  <Info size={24} />
                </div>
                <h2 className="text-3xl font-bold tracking-tighter uppercase">INFORMATIONS PROJET</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Utilisez cette invite pour transférer le contexte complet de ce projet vers une autre instance d'IA ou pour continuer le développement sur une nouvelle session.
              </p>

              <div className="relative group">
                <div className="absolute inset-0 bg-accent/5 rounded-2xl -m-4 group-hover:bg-accent/10 transition-colors" />
                <pre className="relative z-10 bg-secondary p-6 rounded-2xl text-xs font-mono leading-relaxed whitespace-pre-wrap text-primary">
                  {projectContextPrompt}
                </pre>
                <button
                  onClick={copyContext}
                  className="absolute top-4 right-4 p-3 bg-background border shadow-sm rounded-xl hover:bg-secondary transition-all flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest font-bold"
                >
                  <Copy size={16} /> Copier
                </button>
              </div>

              <div className="pt-8 border-t flex items-center gap-4 text-accent">
                <CheckCircle2 size={20} />
                <p className="text-xs font-mono uppercase tracking-widest font-bold">Architecture optimisée pour l'analyse contextuelle</p>
              </div>
              
              {/* Decorative background element */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
