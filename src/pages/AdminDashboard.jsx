import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail, Phone, Calendar, User, MessageSquare, Scissors } from "lucide-react";

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-[#C9A55C]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-serif font-bold text-[#2D2D2D]">Dashboard Admin</h1>
          <p className="text-gray-600 mt-2">Suivi des demandes de contact et rendez-vous</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="bg-white border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Demandes</CardTitle>
              <Mail className="h-4 w-4 text-[#C9A55C]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{submissions.length}</div>
            </CardContent>
          </Card>
          {/* Add more stats here if needed */}
        </div>

        <Card className="bg-white border-none shadow-xl overflow-hidden rounded-2xl">
          <CardHeader className="bg-[#2D2D2D] text-white">
            <CardTitle>Dernières Demandes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                  <TableHead className="font-bold text-[#2D2D2D]">Date</TableHead>
                  <TableHead className="font-bold text-[#2D2D2D]">Client</TableHead>
                  <TableHead className="font-bold text-[#2D2D2D]">Service</TableHead>
                  <TableHead className="font-bold text-[#2D2D2D]">Message</TableHead>
                  <TableHead className="font-bold text-[#2D2D2D]">Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                      Aucune demande pour le moment.
                    </TableCell>
                  </TableRow>
                ) : (
                  submissions.map((sub) => (
                    <TableRow key={sub.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="font-medium text-gray-500">
                        {new Date(sub.created_at).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-[#C9A55C]" />
                          <span className="font-bold text-[#2D2D2D]">{sub.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-[#F0EDEA] text-[#2D2D2D] border-none">
                          <Scissors className="h-3 w-3 mr-1" />
                          {sub.service || "Non spécifié"}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="h-4 w-4 text-gray-400 mt-1 shrink-0" />
                          <span className="text-gray-600">{sub.message || "Aucun message"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3 text-[#C9A55C]" />
                            <a href={`tel:${sub.phone}`} className="hover:underline">{sub.phone}</a>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-[#C9A55C]" />
                            <a href={`mailto:${sub.email}`} className="hover:underline">{sub.email}</a>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
