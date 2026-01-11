import React, { useState } from 'react';
import { blink } from '@/lib/blink';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Mail, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export function AuthModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await blink.auth.sendMagicLink(email);
      setSent(true);
      toast.success('Lien de connexion envoyé !');
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('Erreur lors de l\'envoi du lien. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSent(false);
    setEmail('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-[#2D2D2D] border-[#C9A55C]/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif font-bold text-[#C9A55C]">
            {sent ? 'Vérifiez vos e-mails' : 'Connexion / Inscription'}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {sent 
              ? `Un lien de connexion sécurisé a été envoyé à ${email}.`
              : 'Connectez-vous ou inscrivez-vous en un clic avec votre e-mail.'}
          </DialogDescription>
        </DialogHeader>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">
                Adresse e-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-[#1A1A1A] border-gray-700 text-white focus:border-[#C9A55C] focus:ring-[#C9A55C]/20"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C9A55C] hover:bg-[#B8944B] text-white py-6 rounded-xl font-medium transition-all duration-300"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Recevoir le lien magique'
              )}
            </Button>
            <p className="text-xs text-center text-gray-500 mt-4">
              En continuant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
            </p>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-16 h-16 bg-[#C9A55C]/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-[#C9A55C]" />
            </div>
            <p className="text-center text-gray-300">
              Cliquez sur le lien dans l'e-mail pour vous connecter instantanément.
            </p>
            <Button
              onClick={handleReset}
              variant="ghost"
              className="text-[#C9A55C] hover:text-[#B8944B] hover:bg-transparent"
            >
              Retour
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 
