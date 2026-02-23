'use client'

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { CalendarDays, Check, ClipboardClock, Hourglass, X, FileText, Users, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from '@/components/ui/badge'
import { Separator } from "@/components/ui/separator"

const statItems = [
  { titre: "Bulletins validés", nombre: 285, pourcent: "+12%", icon: FileText, color: "bg-blue-100 dark:bg-blue-900/30" },
  { titre: "Inscrits", nombre: 1024, pourcent: "+8%", icon: Users, color: "bg-green-100 dark:bg-green-900/30" },
  { titre: "Documents en attente", nombre: 45, pourcent: "-5%", icon: ClipboardClock, color: "bg-amber-100 dark:bg-amber-900/30" },
  { titre: "Demandes d'inscriptions", nombre: 120, pourcent: "+15%", icon: FileText, color: "bg-purple-100 dark:bg-purple-900/30" },
]

const demandeItem = [
  { titre: "Demande de Bulletin", date: '10/02/2026', status: "En attente", nom: "Jean" },
  { titre: "Demande d'inscriptions", date: '16/02/2026', status: "En attente", nom: "Bryan" },
  { titre: "Demande de Certificat", date: '16/02/2026', status: "En attente", nom: "Bryan" },
]

const billetItem = [
  { nom: "Bryan", class: "2nd A", date: '14/05/26', motif: "Maladie" },
  { nom: "Jean", class: '2nd B', date: '14/05/26', motif: "Justification médicale" },
  { nom: "Paule", class: "6ème", date: '14/05/26', motif: "Problème personnel" },
  { nom: "Jerie", class: "3ème", date: '14/05/26', motif: "Maladie" },
  { nom: "Eric", class: "4ème", date: '14/05/26', motif: "Absence justifiée" },
]

const reunionItem = [
  { nom: "Bryan", date: '14/05/26', motif: "Conseil de classe" },
  { nom: "Jean", date: '14/05/26', motif: "Réunion parents-professeurs" },
  { nom: "Paule", date: '14/05/26', motif: "Suivi pédagogique" },
  { nom: "Jerie", date: '14/05/26', motif: "Rencontre administrative" },
  { nom: "Eric", date: '14/05/26', motif: "Réunion d'urgence" },
]

const RequestItem = ({ item, type }: { item: any; type: 'demande' | 'absence' | 'reunion' }) => (
  <div className="group p-4 border border-border rounded-lg hover:bg-muted transition-colors duration-200 cursor-default">
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <p className="font-medium text-foreground">{item.nom}</p>
          {item.class && (
            <Badge variant="outline" className="text-xs">{item.class}</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-1">
          {type === 'demande' ? item.titre : item.motif}
        </p>
        <p className="text-xs text-muted-foreground">
          {item.date}
        </p>
      </div>
      <div className="flex gap-2">
        <Button><Eye/></Button>
        <Button
          size="sm"
          className="h-8 w-8 p-0 bg-green-600 hover:bg-green-700 text-white rounded-md"
          title="Accepter"
        >
          <Check className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="destructive"
          className="h-8 w-8 p-0 rounded-md"
          title="Rejeter"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
)

const page = () => {
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Demandes & Requêtes</h1>
        <p className="text-muted-foreground">Gérez les demandes d'inscriptions, absences et réunions</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.titre} className="rounded-lg hover:shadow-md transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">{item.titre}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{item.nombre}</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-2">{item.pourcent}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${item.color}`}>
                    <Icon className="w-5 h-5 text-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Demandes */}
        <Card className="lg:col-span-1 rounded-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <Hourglass className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Demandes</h2>
                <p className="text-xs text-muted-foreground">{demandeItem.length} en attente</p>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {demandeItem.map((item, idx) => (
                <RequestItem key={idx} item={item} type="demande" />
                
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Absences/Retards */}
        <Card className="lg:col-span-1 rounded-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                <ClipboardClock className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Absences/Retards</h2>
                <p className="text-xs text-muted-foreground">{billetItem.length} signalements</p>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {billetItem.map((item, idx) => (
                <RequestItem key={idx} item={item} type="absence" />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Réunions */}
        <Card className="lg:col-span-1 rounded-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <CalendarDays className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Réunions</h2>
                <p className="text-xs text-muted-foreground">{reunionItem.length} demandes</p>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {reunionItem.map((item, idx) => (
                <RequestItem key={idx} item={item} type="reunion" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Info Section */}
      <Card className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-white dark:bg-background">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Besoin d'aide?</h3>
              <p className="text-sm text-muted-foreground">Cliquez sur les boutons verts pour approuver ou sur les boutons rouges pour rejeter les demandes.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default page
