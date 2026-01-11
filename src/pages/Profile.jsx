import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { User, Mail, LogOut, Calendar, Settings } from 'lucide-react';

export default function Profile() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
        <div className="text-[#C9A55C] text-xl font-serif">Chargement...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] pt-28 pb-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-serif font-bold text-white">Mon Compte</h1>
          <p className="text-gray-400">Gérez vos informations et vos rendez-vous.</p>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <Card className="bg-[#2D2D2D] border-[#C9A55C]/20 text-white col-span-1">
            <CardHeader className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 bg-[#C9A55C]/20 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-[#C9A55C]" />
              </div>
              <CardTitle className="text-xl font-serif">{user.displayName || 'Client'}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4" />
                {user.email}
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10 gap-3">
                <Calendar className="w-5 h-5" />
                Mes rendez-vous
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10 gap-3">
                <Settings className="w-5 h-5" />
                Paramètres
              </Button>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={logout}
                variant="outline" 
                className="w-full border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 gap-2"
              >
                <LogOut className="w-5 h-5" />
                Se déconnecter
              </Button>
            </CardFooter>
          </Card>

          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            <Card className="bg-[#2D2D2D] border-[#C9A55C]/20 text-white">
              <CardHeader>
                <CardTitle className="font-serif">Mes prochains rendez-vous</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-xl space-y-4">
                  <Calendar className="w-12 h-12 text-gray-600 mx-auto" />
                  <p className="text-gray-400">Vous n'avez aucun rendez-vous de prévu.</p>
                  <Button className="bg-[#C9A55C] hover:bg-[#B8944B] text-white rounded-full px-8">
                    Prendre un rendez-vous
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#2D2D2D] border-[#C9A55C]/20 text-white">
              <CardHeader>
                <CardTitle className="font-serif">Historique</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-8">Aucun historique disponible.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 
