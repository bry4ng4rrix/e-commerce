import { Card , CardContent, CardHeader ,CardFooter} from "@/components/ui/card"
import { Users, BookOpen, LayersPlus, BarChart ,ChartSpline ,CircleCheckBig} from "lucide-react"
import {Badge} from "@/components/ui/badge"




const statItems = [
  { titre: "Élèves inscrits", nombre : 16, icon: Users },
  { titre: "Professeurs", nombre : 15 , icon: BookOpen },
  { titre: "Classes", nombre: 20 , icon: LayersPlus },
  { titre: "Moyenne générale", nombre : 10 , icon: BarChart },
  ]


const activityItems = [
  { titre: "5 bulletins validés", date : '2 h', icon: CircleCheckBig },
  { titre: "Payment ecolage", date : '6 h', icon: ChartSpline },
  { titre: "3 nouveaux élèves inscrits", date : '3 j', icon: Users },
  { titre: "Rapport mensuel généré", date : '9 h', icon: Users },
  { titre: "5 bulletins validés", date : '4 h', icon: Users },
]

const page = () => {




  return (
    <div className="min-h-screen space-x-5  space-y-5 flex flex-col">
    
      <div className="container grid grid-cols-4 gap-5 ">
       {statItems.map((item) => {
                return (
                  <Card key={item.titre} className="shadow-md hover:scale-105 transition-transform duration-300 hover:bg-blue-50">
                    <CardHeader>
                      <h3 className="font-semibold text-sm">{item.titre}</h3>
                    </CardHeader>
                    <CardContent className="flex justify-between">
                      <p>{item.nombre}</p>
                      <item.icon size={32} />
                    </CardContent>
                    <CardFooter></CardFooter>
              
                  </Card>
                )
              })}
      </div>
      <Card className="block border-zinc-300">
        <CardHeader>
          <h3>Activités récentes</h3>
        </CardHeader>
        <CardContent className="h-92 overflow-y-scroll p-5 space-y-2">
          {activityItems.map((item) => {
            return (
              <Card key={item.titre} className="border-zinc-300">
                 
                <CardContent className="flex items-center gap-5">
                  <item.icon size={20}  className="text-blue-400"/>
                  <p>{item.titre}</p>
                </CardContent>
                <CardFooter> <span> il y a <span>{item.date}</span></span></CardFooter>
              </Card>
            )
          })}
        </CardContent>
      </Card>




    </div>
  )
}

export default page