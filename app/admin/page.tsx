import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Users, BookOpen, LayersPlus, BarChart,
  ChartSpline, CircleCheckBig, Activity
} from "lucide-react"
import { cn } from "@/lib/utils"

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
    icon: BarChart,
    trend: "↑ +0.5",
  },
]

const activityItems = [
  { titre: "5 bulletins validés", date: "2 h", icon: CircleCheckBig, badge: "Bulletin", badgeVariant: "secondary" as const },
  { titre: "Paiement écolage reçu", date: "6 h", icon: ChartSpline, badge: "Finance", badgeVariant: "outline" as const },
  { titre: "3 nouveaux élèves inscrits", date: "3 j", icon: Users, badge: "Inscription", badgeVariant: "secondary" as const },
  { titre: "Rapport mensuel généré", date: "9 h", icon: BarChart, badge: "Rapport", badgeVariant: "outline" as const },
  { titre: "5 bulletins validés", date: "2 h", icon: CircleCheckBig, badge: "Bulletin", badgeVariant: "secondary" as const },
  { titre: "Paiement écolage reçu", date: "6 h", icon: ChartSpline, badge: "Finance", badgeVariant: "outline" as const },
  { titre: "3 nouveaux élèves inscrits", date: "3 j", icon: Users, badge: "Inscription", badgeVariant: "secondary" as const },
  { titre: "Rapport mensuel généré", date: "9 h", icon: BarChart, badge: "Rapport", badgeVariant: "outline" as const },
]

const iconColorMap: Record<string, string> = {
  CircleCheckBig: "text-emerald-500 bg-emerald-50",
  ChartSpline: "text-amber-500 bg-amber-50",
  Users: "text-sky-500 bg-sky-50",
  BarChart: "text-violet-500 bg-violet-50",
}

const Page = () => {
  return (
    <div
      className="min-h-screen  space-y-8 font-sans"
      style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}
    >
   {/* header */}
    <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-blue-50 tracking-tight">
            Tableau de bord
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Vue d'ensemble de l'établissement
          </p>
        </div>
        <Badge
          variant="outline"
          className="text-xs text-slate-500 border-slate-200 bg-white px-3 py-1.5 rounded-full shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block mr-2 animate-pulse" />
          En ligne
        </Badge>
      </div>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {statItems.map((item, i) => (
          <Card
            key={item.titre}
            className={cn(
              "border shadow-sm rounded-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-default hover:bg-sky-100 dark:hover:bg-sky-900/20  overflow-hidden"
            )}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <CardHeader className=" px-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold  tracking-widest text-slate-400 dark:text-zinc-50">
                  {item.titre}
                </span>
                <div className={cn("p-2 rounded-xl")}>
                  <item.icon size={16} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-5">
              <h1 className="text-3xl font-bold text-slate-800 dark:text-blue-50 tracking-tight">
                {item.nombre}
              </h1>
              <p className={cn("text-xs mt-1 font-medium")}>
                {item.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity Feed */}
      <Card className="rounded-sm border border-zinc-200 shadow-sm  overflow-hidden">
        <CardHeader className="px-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-slate-100">
              <Activity size={15} className="text-slate-500" />
            </div>
            <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-sm tracking-tight">
              Activités récentes
            </h3>
          </div>
            </div>
           <Badge variant='outline' className="p-2 border-green-300"> {activityItems.length} + </Badge>
          </div>
        </CardHeader>
        <Separator className="bg-slate-100" />
        <CardContent className="px-6 py-4 max-h-96 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-slate-200">
          {activityItems.map((item, i) => {
            const iconKey = item.icon.name || "Users"
            const iconClass = iconColorMap[iconKey] ?? "text-slate-400 bg-slate-100"
            return (
              <div
                key={`${item.titre}-${i}`}
                className="group flex items-center justify-between gap-4 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 cursor-default"
              >
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-xl shrink-0", iconClass)}>
                    <item.icon size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200  leading-tight">
                      {item.titre}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      il y a {item.date}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={item.badgeVariant}
                  className="text-xs shrink-0 rounded-full px-2.5"
                >
                  {item.badge}
                </Badge>
              </div>
            )
          })}
        </CardContent>
        <Separator className="bg-slate-100" />
       
      </Card>
    </div>
  )
}

export default Page