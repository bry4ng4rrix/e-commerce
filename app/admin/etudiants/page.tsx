'use client'

import { useState } from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, Edit, Trash, Plus, Users } from "lucide-react"
import { SimpleBarChart } from "@/components/charts/bar-chart"
import { SimplePieChart } from "@/components/charts/pie-chart"

type Ecolage = {
  janvier: boolean
  fevrier: boolean
  mars: boolean
  avril: boolean
  mai: boolean
  juin: boolean
  juillet: boolean
  aout: boolean
  septembre: boolean
  octobre: boolean
  novembre: boolean
  decembre: boolean
}

type Etudiant = {
  matricule: number
  nom: string
  prenom: string
  classe: string
  parent: string
  tel: string
  email: string
  dateNaissance: string
  adresse: string
  status: string
  absences: number
  retards: number
  droitInscription: boolean
  ecolage: Ecolage
}

const initialData: Etudiant[] = [
  {
    matricule: 1001,
    nom: "Bryan",
    prenom: "Garrix",
    classe: "2nd A",
    parent: "Jean Garrix",
    tel: "0340000000",
    email: "parent@gmail.com",
    dateNaissance: "2008-05-10",
    adresse: "Antananarivo",
    status: "inscrit",
    absences: 5,
    retards: 2,
    droitInscription: true,
    ecolage: {
      janvier: true,
      fevrier: true,
      mars: false,
      avril: false,
      mai: false,
      juin: false,
      juillet: false,
      aout: false,
      septembre: false,
      octobre: false,
      novembre: false,
      decembre: false,
    },
  },
  {
    matricule: 1002,
    nom: "Rabe",
    prenom: "Jean",
    classe: "2nd A",
    parent: "Marie Rabe",
    tel: "0321111111",
    email: "marie.rabe@email.com",
    dateNaissance: "2008-03-15",
    adresse: "Toamasina",
    status: "inscrit",
    absences: 2,
    retards: 1,
    droitInscription: true,
    ecolage: {
      janvier: true,
      fevrier: true,
      mars: true,
      avril: false,
      mai: false,
      juin: false,
      juillet: false,
      aout: false,
      septembre: false,
      octobre: false,
      novembre: false,
      decembre: false,
    },
  },
  {
    matricule: 1003,
    nom: "Rakoto",
    prenom: "Lina",
    classe: "3ème B",
    parent: "Paul Rakoto",
    tel: "0342222222",
    email: "paul.rakoto@email.com",
    dateNaissance: "2007-07-22",
    adresse: "Fianarantsoa",
    status: "inscrit",
    absences: 8,
    retards: 3,
    droitInscription: false,
    ecolage: {
      janvier: false,
      fevrier: false,
      mars: false,
      avril: false,
      mai: false,
      juin: false,
      juillet: false,
      aout: false,
      septembre: false,
      octobre: false,
      novembre: false,
      decembre: false,
    },
  },
  {
    matricule: 1004,
    nom: "Andriamanitra",
    prenom: "Sara",
    classe: "3ème B",
    parent: "Michel Andriamanitra",
    tel: "0333333333",
    email: "michel.a@email.com",
    dateNaissance: "2007-11-30",
    adresse: "Mahajanga",
    status: "inscrit",
    absences: 1,
    retards: 0,
    droitInscription: true,
    ecolage: {
      janvier: true,
      fevrier: true,
      mars: true,
      avril: true,
      mai: true,
      juin: false,
      juillet: false,
      aout: false,
      septembre: false,
      octobre: false,
      novembre: false,
      decembre: false,
    },
  },
  {
    matricule: 1005,
    nom: "Rasolonirina",
    prenom: "Mamy",
    classe: "1ère C",
    parent: "José Rasolonirina",
    tel: "0344444444",
    email: "jose.r@email.com",
    dateNaissance: "2006-09-12",
    adresse: "Antsirabe",
    status: "inscrit",
    absences: 3,
    retards: 2,
    droitInscription: true,
    ecolage: {
      janvier: true,
      fevrier: true,
      mars: true,
      avril: true,
      mai: true,
      juin: true,
      juillet: true,
      aout: false,
      septembre: false,
      octobre: false,
      novembre: false,
      decembre: false,
    },
  },
  {
    matricule: 1006,
    nom: "Ranaivo",
    prenom: "David",
    classe: "1ère C",
    parent: "Christine Ranaivo",
    tel: "0325555555",
    email: "christine.r@email.com",
    dateNaissance: "2006-01-25",
    adresse: "Toliara",
    status: "inscrit",
    absences: 0,
    retards: 1,
    droitInscription: true,
    ecolage: {
      janvier: true,
      fevrier: true,
      mars: true,
      avril: true,
      mai: true,
      juin: true,
      juillet: true,
      aout: true,
      septembre: true,
      octobre: false,
      novembre: false,
      decembre: false,
    },
  },
  {
    matricule: 1007,
    nom: "Razafindrabe",
    prenom: "Feno",
    classe: "Terminale D",
    parent: "Jean Razafindrabe",
    tel: "0346666666",
    email: "jean.raz@email.com",
    dateNaissance: "2005-04-08",
    adresse: "Antananarivo",
    status: "inscrit",
    absences: 4,
    retards: 2,
    droitInscription: false,
    ecolage: {
      janvier: false,
      fevrier: false,
      mars: false,
      avril: false,
      mai: false,
      juin: false,
      juillet: false,
      aout: false,
      septembre: false,
      octobre: false,
      novembre: false,
      decembre: false,
    },
  },
  {
    matricule: 1008,
    nom: "Randrianarisoa",
    prenom: "Niry",
    classe: "Terminale D",
    parent: "Solo Randrianarisoa",
    tel: "0337777777",
    email: "solo.rand@email.com",
    dateNaissance: "2005-12-14",
    adresse: "Toamasina",
    status: "inscrit",
    absences: 2,
    retards: 0,
    droitInscription: true,
    ecolage: {
      janvier: true,
      fevrier: true,
      mars: true,
      avril: true,
      mai: true,
      juin: true,
      juillet: true,
      aout: true,
      septembre: true,
      octobre: true,
      novembre: true,
      decembre: true,
    },
  },
]

export default function Page() {
  const [data, setData] = useState<Etudiant[]>(initialData)
  const [selected, setSelected] = useState<Etudiant | null>(null)
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDetail, setOpenDetail] = useState(false)

  const [form, setForm] = useState<Etudiant>({
    matricule: 0,
    nom: "",
    prenom: "",
    classe: "",
    parent: "",
    tel: "",
    email: "",
    dateNaissance: "",
    adresse: "",
    status: "inscrit",
    absences: 0,
    retards: 0,
    droitInscription: false,
    ecolage: {
      janvier: false,
      fevrier: false,
      mars: false,
      avril: false,
      mai: false,
      juin: false,
      juillet: false,
      aout: false,
      septembre: false,
      octobre: false,
      novembre: false,
      decembre: false,
    },
  })

  const months: (keyof Ecolage)[] = [
    "janvier",
    "fevrier",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "aout",
    "septembre",
    "octobre",
    "novembre",
    "decembre",
  ]

  // Extraire les classes uniques des étudiants
  const classes = Array.from(new Set(data.map(e => e.classe)))
  const [selectedClasse, setSelectedClasse] = useState<string>("Toutes")

  // Filtrer les données selon la classe sélectionnée
  const filteredData = selectedClasse === "Toutes" 
    ? data 
    : data.filter(e => e.classe === selectedClasse)

  const handleAdd = () => {
    setData((prev) => [...prev, form])
    setOpenAdd(false)
    resetForm()
  }

  const handleEdit = () => {
    setData((prev) =>
      prev.map((e) => (e.matricule === form.matricule ? form : e))
    )
    setOpenEdit(false)
  }

  const handleDelete = (matricule: number) => {
    setData((prev) => prev.filter((e) => e.matricule !== matricule))
  }

  const resetForm = () => {
    setForm({
      matricule: 0,
      nom: "",
      prenom: "",
      classe: "",
      parent: "",
      tel: "",
      email: "",
      dateNaissance: "",
      adresse: "",
      status: "inscrit",
      absences: 0,
      retards: 0,
      droitInscription: false,
      ecolage: {
        janvier: false,
        fevrier: false,
        mars: false,
        avril: false,
        mai: false,
        juin: false,
        juillet: false,
        aout: false,
        septembre: false,
        octobre: false,
        novembre: false,
        decembre: false,
      },
    })
  }

  // Chart data for absences
  const absenceData = filteredData
    .sort((a, b) => b.absences - a.absences)
    .slice(0, 5)
    .map((e) => ({
      name: `${e.nom} ${e.prenom}`,
      value: e.absences,
    }))

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Gestion des Étudiants</h1>
          <p className="text-sm text-muted-foreground mt-1">Gérez les informations des élèves et leurs paiements</p>
        </div>

        {/* ADD DIALOG */}
        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <DialogTrigger asChild>
            <Button className="gap-2 rounded-lg">
              <Plus className="w-4 h-4" /> Ajouter un étudiant
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl rounded-lg">
            <DialogHeader>
              <DialogTitle>Ajouter un étudiant</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">Matricule</Label>
                <Input
                  type="number"
                  placeholder="Ex: 1009"
                  onChange={(e) =>
                    setForm({ ...form, matricule: Number(e.target.value) })
                  }
                />
              </div>

              <div>
                <Label className="text-sm">Classe</Label>
                <Input
                  placeholder="Ex: 2nd A"
                  onChange={(e) =>
                    setForm({ ...form, classe: e.target.value })
                  }
                />
              </div>

              <div>
                <Label className="text-sm">Nom</Label>
                <Input
                  placeholder="Nom de l'étudiant"
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                />
              </div>

              <div>
                <Label className="text-sm">Prénom</Label>
                <Input
                  placeholder="Prénom"
                  onChange={(e) =>
                    setForm({ ...form, prenom: e.target.value })
                  }
                />
              </div>

              <div>
                <Label className="text-sm">Nom du parent</Label>
                <Input
                  placeholder="Nom du parent"
                  onChange={(e) =>
                    setForm({ ...form, parent: e.target.value })
                  }
                />
              </div>

              <div>
                <Label className="text-sm">Téléphone parent</Label>
                <Input
                  placeholder="Numéro de téléphone"
                  onChange={(e) => setForm({ ...form, tel: e.target.value })}
                />
              </div>

              <div className="sm:col-span-2">
                <Label className="text-sm">Email parent</Label>
                <Input
                  type="email"
                  placeholder="Email parent"
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setOpenAdd(false)}>
                Annuler
              </Button>
              <Button onClick={handleAdd} className="rounded-lg">Enregistrer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="rounded-lg">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 w-10 h-10 flex items-center justify-center mx-auto mb-2">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-foreground">{filteredData.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Étudiants</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 w-10 h-10 flex items-center justify-center mx-auto mb-2">
                <Badge className="bg-green-600">✓</Badge>
              </div>
              <p className="text-2xl font-bold text-foreground">{filteredData.filter(e => e.droitInscription).length}</p>
              <p className="text-xs text-muted-foreground mt-1">Payés</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 w-10 h-10 flex items-center justify-center mx-auto mb-2">
                <Badge className="bg-red-600">!</Badge>
              </div>
              <p className="text-2xl font-bold text-foreground">{filteredData.filter(e => !e.droitInscription).length}</p>
              <p className="text-xs text-muted-foreground mt-1">Non payés</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Absences Chart */}
        {absenceData.length > 0 && (
          <Card className="rounded-lg">
            <CardHeader>
              <h3 className="text-lg font-semibold text-foreground">Top 5 - Absences</h3>
            </CardHeader>
            <CardContent>
              <SimpleBarChart 
                data={absenceData}
                colors={['#ef4444']}
              />
            </CardContent>
          </Card>
        )}

        {/* Payment Status Chart */}
        <Card className="rounded-lg">
          <CardHeader>
            <h3 className="text-lg font-semibold text-foreground">Statut de paiement</h3>
          </CardHeader>
          <CardContent>
            <SimplePieChart
              data={[
                {
                  name: 'Payés',
                  value: filteredData.filter(e => e.droitInscription).length,
                },
                {
                  name: 'Non payés',
                  value: filteredData.filter(e => !e.droitInscription).length,
                },
              ]}
              colors={['#10b981', '#ef4444']}
            />
          </CardContent>
        </Card>
      </div>

      {/* Filter and Table */}
      <Card className="rounded-lg">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="font-semibold text-foreground">Classe:</span>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedClasse === "Toutes" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedClasse("Toutes")}
                className="rounded-lg"
              >
                Toutes
              </Button>
              {classes.map((classe) => (
                <Button
                  key={classe}
                  variant={selectedClasse === classe ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedClasse(classe)}
                  className="rounded-lg"
                >
                  {classe}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          {/* Responsive Table */}
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs md:text-sm">Matricule</TableHead>
                  <TableHead className="text-xs md:text-sm">Nom</TableHead>
                  <TableHead className="hidden sm:table-cell text-xs md:text-sm">Classe</TableHead>
                  <TableHead className="hidden md:table-cell text-xs md:text-sm">Parent</TableHead>
                  <TableHead className="text-xs md:text-sm">Status</TableHead>
                  <TableHead className="text-right text-xs md:text-sm">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredData.map((e) => (
                  <TableRow key={e.matricule}>
                    <TableCell className="text-xs md:text-sm">{e.matricule}</TableCell>
                    <TableCell className="text-xs md:text-sm">
                      {e.nom} {e.prenom}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-xs md:text-sm">{e.classe}</TableCell>
                    <TableCell className="hidden md:table-cell text-xs md:text-sm">{e.parent}</TableCell>
                    <TableCell className="text-xs md:text-sm">
                      <Badge 
                        variant={e.droitInscription ? "default" : "destructive"}
                        className={e.droitInscription ? "bg-green-600" : "bg-red-600"}
                      >
                        {e.droitInscription ? "Payé" : "Non payé"}
                      </Badge>
                    </TableCell>

                    <TableCell className="flex justify-end gap-1">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 rounded-md"
                        onClick={() => {
                          setSelected(e)
                          setOpenDetail(true)
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 rounded-md"
                        onClick={() => {
                          setForm(e)
                          setOpenEdit(true)
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-8 w-8 rounded-md"
                        onClick={() => handleDelete(e.matricule)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {/* EDIT DIALOG */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="max-w-2xl rounded-lg">
          <DialogHeader>
            <DialogTitle>Modifier l'étudiant</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm">Nom</Label>
              <Input
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
              />
            </div>

            <div>
              <Label className="text-sm">Prénom</Label>
              <Input
                value={form.prenom}
                onChange={(e) => setForm({ ...form, prenom: e.target.value })}
              />
            </div>

            <div>
              <Label className="text-sm">Date de naissance</Label>
              <Input
                type="date"
                value={form.dateNaissance}
                onChange={(e) =>
                  setForm({ ...form, dateNaissance: e.target.value })
                }
              />
            </div>

            <div>
              <Label className="text-sm">Adresse</Label>
              <Input
                value={form.adresse}
                onChange={(e) =>
                  setForm({ ...form, adresse: e.target.value })
                }
              />
            </div>

            <div>
              <Label className="text-sm">Téléphone parent</Label>
              <Input
                value={form.tel}
                onChange={(e) => setForm({ ...form, tel: e.target.value })}
              />
            </div>

            <div>
              <Label className="text-sm">Email parent</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setOpenEdit(false)}>
              Annuler
            </Button>
            <Button onClick={handleEdit} className="rounded-lg">Mettre à jour</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DETAIL DIALOG */}
      <Dialog open={openDetail} onOpenChange={setOpenDetail}>
        <DialogContent className="max-w-3xl rounded-lg max-h-96 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Détails de l'étudiant</DialogTitle>
          </DialogHeader>

          {selected && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Nom complet</p>
                  <p className="font-semibold">{selected.nom} {selected.prenom}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Date de naissance</p>
                  <p className="font-semibold">{selected.dateNaissance}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Email parent</p>
                  <p className="font-semibold">{selected.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Téléphone parent</p>
                  <p className="font-semibold">{selected.tel}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Adresse</p>
                  <p className="font-semibold">{selected.adresse}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Classe</p>
                  <p className="font-semibold">{selected.classe}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Retards</p>
                  <p className="font-semibold text-orange-600">{selected.retards}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Absences</p>
                  <p className="font-semibold text-red-600">{selected.absences}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-muted-foreground text-xs">Statut d'inscription</p>
                  <Badge
                    variant={selected.droitInscription ? "default" : "destructive"}
                    className={selected.droitInscription ? "bg-green-600" : "bg-red-600"}
                  >
                    {selected.droitInscription ? "Payé ✓" : "Non payé ✗"}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3 text-foreground">Statut du paiement par mois</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {months.map((m) => (
                    <Badge
                      key={m}
                      variant={selected.ecolage[m] ? "default" : "secondary"}
                      className={`rounded-md text-xs ${
                        selected.ecolage[m]
                          ? "bg-green-600 text-white"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                      }`}
                    >
                      {m.charAt(0).toUpperCase() + m.slice(1).substring(0, 2)}
                      {selected.ecolage[m] ? " ✓" : " ✗"}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
