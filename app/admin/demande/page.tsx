import { Card ,CardHeader ,CardContent ,CardFooter } from "@/components/ui/card"
import { Check, ClipboardClock, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const statItems = [
  { titre : "Bulletins validés" , nombre : 285  , pourcent : "10%"} ,
  { titre : "Inscrit" , nombre : 1024  , pourcent : "10%"} ,
  { titre : "Document en attente" , nombre : 45  , pourcent : "10%"} ,
  { titre : "demande d'Inscriptions" , nombre : 120  , pourcent : "10%"} ,
]

const demandeItem = [
  { titre : "demande de Bulletin " , date : '10/02/2026' ,status : "En attent" , nom : "Jean"} ,
  { titre : "demande d'inscriptions " , date : '16/02/2026' ,status : "En attent"  , nom : "Bryan"} ,
  { titre : "demande d'inscriptions " , date : '16/02/2026' ,status : "En attent"  , nom : "Bryan"} ,
  { titre : "demande d'inscriptions " , date : '16/02/2026' ,status : "En attent"  , nom : "Bryan"} ,
  { titre : "demande d'inscriptions " , date : '16/02/2026' ,status : "En attent"  , nom : "Bryan"} ,
  { titre : "demande d'inscriptions " , date : '16/02/2026' ,status : "En attent"  , nom : "Bryan"} ,
  { titre : "demande d'inscriptions " , date : '16/02/2026' ,status : "En attent"  , nom : "Bryan"} ,
  { titre : "demande d'inscriptions " , date : '16/02/2026' ,status : "En attent"  , nom : "Bryan"} ,
  { titre : "demande d'inscriptions " , date : '16/02/2026' ,status : "En attent"  , nom : "Bryan"} ,
]

const page = () => {
  return (
    <div className="min-h-screen p-5 space-y-4">
      <div className="grid grid-cols-4 gap-2 ">
          {statItems.map((item) =>(
            <Card key={item.titre} className="shadow-none hover:scale-y-105 hover:shadow-sm transition-all duration-300 hover:bg-sky-50">
              <CardHeader>
                <h3 className="font-semibold ">{item.titre}</h3>
              </CardHeader>
              <CardContent className="flex justify-between items-end">
                <h1 className="font-bold text-4xl">{item.nombre}</h1>
                <p className="font-semibold">{item.pourcent}</p>
              </CardContent>
            </Card>
            
          ) )}
      </div>
      
        <main className="max-h-2xl h-full  flex w-full gap-3">
          <Card className="w-full   rounded-sm  shadow-none p-5 max-h-96 ">
            <CardHeader className=" flex items-center gap-3">
              <ClipboardClock />
              <p>Demande Obtenue</p>
            </CardHeader>
              <CardContent className=" flex flex-col gap-2 overflow-auto ">
                {demandeItem.map((item) => (
                 <div
                key={item.titre}
                className="group border border-dashed flex  justify-between  px-4 py-3 rounded-sm hover:bg-slate-50 dark:hover:bg-zinc-700 dark:hover:scale-y-105 transition-all duration-300 cursor-default"
              >
                <div className="flex items-center">
                  <div>
                    <p>{item.nom}</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-400 leading-tight">
                      {item.titre}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      il y a {item.date}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <Button  variant='outline' className="bg-green-50 text-green-400 border-green-400 hover:bg-green-500"><Check /></Button>
                  <Button variant="outline" className="bg-red-50 border-red-400 text-red-400 hover:bg-red-500 hover:text-white"><X /></Button>
                </div>
                
              </div>
              ))}
              </CardContent>
          </Card>
          <Card className="container w-2/3  shadow-none">
            ee
          </Card>
        </main>
      
    </div>
  )
}

export default page