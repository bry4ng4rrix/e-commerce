import { Card ,CardHeader ,CardContent ,CardFooter } from "@/components/ui/card"


const statItems = [
  { titre : "Bulletins validés" , nombre : 285  , pourcent : "10%"} ,
  { titre : "Inscrit" , nombre : 1024  , pourcent : "10%"} ,
  { titre : "Document en attente" , nombre : 45  , pourcent : "10%"} ,
  { titre : "demande d'Inscriptions" , nombre : 120  , pourcent : "10%"} ,
]



const page = () => {
  return (
    <div className="min-h-screen p-2 space-y-4">
      <div className="grid grid-cols-4 gap-2 ">
          {statItems.map((item) =>(
            <Card key={item.titre} className="shadow-none hover:scale-90 hover:shadow-sm transition-all duration-300">
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
    </div>
  )
}

export default page