import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  async function fetchSubmissions() {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-serif font-bold text-[#2D2D2D]">
            Demandes de contact
          </h1>
          <p className="text-gray-600 mt-2">
            Consultez toutes les demandes reçues via le formulaire.
          </p>
        </motion.div>

        <Card className="bg-white shadow-xl rounded-2xl overflow-hidden border-none">
          <CardHeader className="border-b border-gray-100 bg-white">
            <CardTitle className="text-xl font-serif">Liste des messages</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Chargement...</div>
            ) : submissions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">Aucune demande pour le moment.</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell className="font-medium whitespace-nowrap text-xs text-gray-500">
                          {format(new Date(sub.created_at), 'Pp', { locale: fr })}
                        </TableCell>
                        <TableCell className="font-semibold text-[#2D2D2D]">
                          {sub.name}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col text-sm">
                            <span className="text-gray-600">{sub.email}</span>
                            <span className="text-gray-400">{sub.phone}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-[#C9A55C]/10 text-[#C9A55C] border-[#C9A55C]/20">
                            {sub.service || 'Non spécifié'}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {sub.message}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
