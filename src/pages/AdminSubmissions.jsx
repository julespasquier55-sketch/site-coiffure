import React, { useEffect, useState } from "react";
import { blink } from "@/lib/blink";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Loader2, RefreshCcw, Mail, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const data = await blink.db.contactSubmissions.list({
        orderBy: { createdAt: 'desc' }
      });
      setSubmissions(data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-[#2D2D2D]">
              Gestion des Demandes
            </h1>
            <p className="text-gray-600 mt-2">
              Consultez les rendez-vous et messages de vos clients
            </p>
          </div>
          <Button 
            onClick={fetchSubmissions} 
            disabled={loading}
            variant="outline"
            className="border-[#C9A55C] text-[#C9A55C] hover:bg-[#C9A55C] hover:text-white"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RefreshCcw className="w-4 h-4 mr-2" />}
            Actualiser
          </Button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[#C9A55C] animate-spin mb-4" />
            <p className="text-gray-600">Chargement des demandes...</p>
          </div>
        ) : submissions.length === 0 ? (
          <Card className="text-center py-20">
            <CardContent>
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-[#2D2D2D]">Aucune demande pour le moment</h3>
              <p className="text-gray-600">Les messages de vos clients apparaîtront ici.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-bold py-6">Date</TableHead>
                    <TableHead className="font-bold">Client</TableHead>
                    <TableHead className="font-bold">Prestation</TableHead>
                    <TableHead className="font-bold">Contact</TableHead>
                    <TableHead className="font-bold">Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((sub) => (
                    <TableRow key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                      <TableCell className="py-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-[#C9A55C]" />
                          {format(new Date(sub.createdAt), 'dd MMMM yyyy HH:mm', { locale: fr })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-bold text-[#2D2D2D]">{sub.name}</p>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-[#C9A55C]/10 text-[#C9A55C] border-none capitalize">
                          {sub.service?.replace('-', ' ') || 'Non spécifié'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-3.5 h-3.5" />
                            {sub.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-3.5 h-3.5" />
                            {sub.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-md">
                        <p className="text-sm text-gray-600 italic">
                          "{sub.message || 'Pas de message'}"
                        </p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
