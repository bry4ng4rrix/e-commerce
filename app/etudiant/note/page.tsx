'use client'

import React, { useState } from 'react'
import { Download } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const GradesResults = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('T2')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Notes & Résultats</h1>
        <p className="text-muted-foreground mt-1">Consultation de vos notes et résultats académiques</p>
      </div>

      {/* Period Tabs */}
      <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="T1">T1</TabsTrigger>
          <TabsTrigger value="T2">T2</TabsTrigger>
          <TabsTrigger value="T3">T3</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Grades Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tableau des notes - {selectedPeriod}</CardTitle>
          <CardDescription>Notes par matière pour le {selectedPeriod}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matière</TableHead>
                <TableHead className="text-center">Contrôle 1</TableHead>
                <TableHead className="text-center">Contrôle 2</TableHead>
                <TableHead className="text-center">Contrôle 3</TableHead>
                <TableHead className="text-center">Moyenne</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { subject: 'Mathématiques', c1: 14, c2: 15, c3: 14.5, avg: 14.5 },
                { subject: 'Français', c1: 12, c2: 11.5, c3: 12.5, avg: 12.0 },
                { subject: 'Anglais', c1: 13, c2: 14, c3: 13.5, avg: 13.5 },
                { subject: 'Sciences', c1: 15, c2: 15.5, c3: 15, avg: 15.2 }
              ].map((row, i) => (
                <TableRow key={i} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{row.subject}</TableCell>
                  <TableCell className="text-center font-semibold">{row.c1}</TableCell>
                  <TableCell className="text-center font-semibold">{row.c2}</TableCell>
                  <TableCell className="text-center font-semibold">{row.c3}</TableCell>
                  <TableCell className="text-center font-bold text-primary">{row.avg}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Moyenne générale</p>
            <p className="text-3xl font-bold mt-2">13.8/20</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Rang</p>
            <p className="text-3xl font-bold mt-2">5e/32</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Meilleure matière</p>
            <p className="text-3xl font-bold mt-2">Sciences</p>
          </CardContent>
        </Card>
      </div>

      {/* Bulletin Download Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold">Bulletin {selectedPeriod}</h2>
                  <p className="text-sm text-muted-foreground mt-1">Téléchargez votre bulletin officiel</p>
                </div>
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </Button>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Télécharger le bulletin</DialogTitle>
            <DialogDescription>
              Bulletin officiel du {selectedPeriod} avec toutes les matières et appréciations
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Élève:</p>
                <p className="text-sm text-muted-foreground">Jean Dupont</p>
              </div>
              <div>
                <p className="text-sm font-medium">Classe:</p>
                <p className="text-sm text-muted-foreground">2nde C</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Moyenne générale:</p>
                <p className="text-sm text-muted-foreground">13.8/20</p>
              </div>
              <div>
                <p className="text-sm font-medium">Rang:</p>
                <p className="text-sm text-muted-foreground">5e/32</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Appréciations:</p>
              <div className="space-y-2">
                <div className="flex justify-between p-3 bg-muted rounded">
                  <span className="text-sm">Comportement:</span>
                  <span className="text-sm font-medium">Excellent</span>
                </div>
                <div className="flex justify-between p-3 bg-muted rounded">
                  <span className="text-sm">Assiduité:</span>
                  <span className="text-sm font-medium">Très bon</span>
                </div>
                <div className="flex justify-between p-3 bg-muted rounded">
                  <span className="text-sm">Travail personnel:</span>
                  <span className="text-sm font-medium">Bon</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline">Annuler</Button>
            <Button className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Télécharger le PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default GradesResults