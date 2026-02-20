'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Users, BookOpen, LayersPlus, TrendingUp,
  ChartSpline, CircleCheckBig, Activity
} from "lucide-react"
import { cn } from "@/lib/utils"
import { SimpleBarChart } from "@/components/charts/bar-chart"
import { SimplePieChart } from "@/components/charts/pie-chart"

const statItems = [
  {
    titre: "Élèves inscrits",
    nombre: 16,
    icon: Users,
    trend: "+2 ce mois",
  },
  {
    titre: "Professeurs",
    nombre: 15,
    icon: BookOpen,
    trend: "Actifs",
  },
  {
    titre: "Classes",
    nombre: 20,
    icon: LayersPlus,
    trend: "2 nouvelles",
  },
  {
    titre: "Moyenne générale",
    nombre: "10/20",
    icon: TrendingUp,
    trend: "↑ +0.5",
  },
]

const activityItems = [
  { titre: "5 bulletins validés", date: "2 h", icon: CircleCheckBig, badge: "Bulletin", badgeVariant: "secondary" as const },
  { titre: "Paiement écolage reçu", date: "6 h", icon: ChartSpline, badge: "Finance", badgeVariant: "outline" as const },
  { titre: "3 nouveaux élèves inscrits", date: "3 j", icon: Users, badge: "Inscription", badgeVariant: "secondary" as const },
  { titre: "Rapport mensuel généré", date: "9 h", icon: TrendingUp, badge: "Rapport", badgeVariant: "outline" as const },
]

const enrollmentData = [
  { name: 'Janvier', value: 12 },
  { name: 'Février', value: 14 },
  { name: 'Mars', value: 16 },
  { name: 'Avril', value: 15 },
  { name: 'Mai', value: 17 },
  { name: 'Juin', value: 16 },
]

const classDistributionData = [
  { name: 'Classe 1ère', value: 25 },
  { name: 'Classe 2ème', value: 22 },
  { name: 'Classe 3ème', value: 23 },
  { name: 'Classe 4ème', value: 20 },
]

const iconColorMap: Record<string, string> = {
  CircleCheckBig: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20",
  ChartSpline: "text-amber-500 bg-amber-50 dark:bg-amber-900/20",
  Users: "text-blue-500 bg-blue-50 dark:bg-blue-900/20",
  TrendingUp: "text-purple-500 bg-purple-50 dark:bg-purple-900/20",
}

const Page = () => {
  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Tableau de bord
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Vue d'ensemble de l'établissement
          </p>
        </div>
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 border-0">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-2 animate-pulse" />
          En ligne
        </Badge>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item, i) => (
          <Card
            key={item.titre}
            className="rounded-lg border hover:shadow-md transition-shadow duration-300"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  {item.titre}
                </span>
                <div className="p-2 rounded-lg bg-muted">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                {item.nombre}
              </h3>
              <p className="text-xs text-muted-foreground mt-2">
                {item.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Enrollment Chart */}
        <Card className="rounded-lg">
          <CardHeader className="pb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Inscriptions par mois
            </h3>
          </CardHeader>
          <CardContent>
            <SimpleBarChart 
              data={enrollmentData}
              colors={['#3b82f6']}
            />
          </CardContent>
        </Card>

        {/* Class Distribution Chart */}
        <Card className="rounded-lg">
          <CardHeader className="pb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Distribution par classe
            </h3>
          </CardHeader>
          <CardContent>
            <SimplePieChart 
              data={classDistributionData}
              colors={['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']}
            />
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card className="rounded-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <Activity className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">
                Activités récentes
              </h3>
            </div>
            <Badge variant="outline">{activityItems.length} nouveaux</Badge>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {activityItems.map((item, i) => {
              const iconKey = item.icon.name || "Users"
              const iconClass = iconColorMap[iconKey] ?? "text-muted-foreground bg-muted"
              return (
                <div
                  key={`${item.titre}-${i}`}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className={cn("p-2 rounded-lg shrink-0", iconClass)}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {item.titre}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        il y a {item.date}
                      </p>
                    </div>
                  </div>
                  <Badge variant={item.badgeVariant} className="text-xs shrink-0">
                    {item.badge}
                  </Badge>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Page
