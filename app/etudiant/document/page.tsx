'use client'

import React from 'react'
import { FileText, Download } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const MyDocuments = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mes Documents</h1>
        <p className="text-muted-foreground mt-1">Téléchargement de vos documents personnels</p>
      </div>

      {/* Available Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: 'Attestation de scolarité', icon: FileText, available: true },
          { name: 'Certificat de réussite', icon: FileText, available: true },
          { name: 'Relevé de notes', icon: FileText, available: true },
          { name: 'Carte étudiant', icon: FileText, available: false }
        ].map((doc, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <FileText className="w-8 h-8 text-primary" />
                {doc.available && (
                  <Download className="w-4 h-4 text-primary cursor-pointer hover:text-primary/80" />
                )}
              </div>
              <h3 className="font-semibold mb-2">{doc.name}</h3>
              {doc.available ? (
                <Button className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </Button>
              ) : (
                <Badge variant="secondary" className="text-xs">
                  Non disponible pour le moment
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Downloads */}
      <Card>
        <CardHeader>
          <CardTitle>Téléchargements récents</CardTitle>
          <CardDescription>Historique de vos téléchargements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              'Bulletin_T2_2025-2026.pdf',
              'Attestation_Scolarite_2025.pdf',
              'Releve_Notes_T1_2025-2026.pdf'
            ].map((file, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-muted rounded-lg text-sm">
                <FileText className="w-4 h-4 text-primary shrink-0" />
                <span>{file}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MyDocuments