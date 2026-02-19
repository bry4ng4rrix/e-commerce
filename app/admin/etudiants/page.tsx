"use client"

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
import { Eye, Edit, Trash, Plus } from "lucide-react"

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

  return (
    <div className="min-h-screen p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des Étudiants</h1>

        {/* ADD DIALOG */}
        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} /> Ajouter
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Ajouter un étudiant</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Matricule</Label>
                <Input
                  type="number"
                  onChange={(e) =>
                    setForm({ ...form, matricule: Number(e.target.value) })
                  }
                />
              </div>

              <div>
                <Label>Classe</Label>
                <Input
                  onChange={(e) =>
                    setForm({ ...form, classe: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Nom</Label>
                <Input
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                />
              </div>

              <div>
                <Label>Prénom</Label>
                <Input
                  onChange={(e) =>
                    setForm({ ...form, prenom: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Nom du parent</Label>
                <Input
                  onChange={(e) =>
                    setForm({ ...form, parent: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Téléphone parent</Label>
                <Input
                  onChange={(e) => setForm({ ...form, tel: e.target.value })}
                />
              </div>

              <div className="col-span-2">
                <Label>Email parent</Label>
                <Input
                  type="email"
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleAdd}>Enregistrer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      {/* TABLE */}
      <div className=" rounded-sm p-2">
        {/* Filtre par classe */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-semibold">Classe :</span>
          <Button
            variant={selectedClasse === "Toutes" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedClasse("Toutes")}
          >
            Toutes
          </Button>
          {classes.map((classe) => (
            <Button
              key={classe}
              variant={selectedClasse === classe ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedClasse(classe)}
            >
              {classe}
            </Button>
          ))}
        </div>

        <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Matricule</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Classe</TableHead>
            <TableHead>Parent</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Absences</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredData.map((e) => (
            <TableRow key={e.matricule}>
              <TableCell>{e.matricule}</TableCell>
              <TableCell>
                {e.nom} {e.prenom}
              </TableCell>
              <TableCell>{e.classe}</TableCell>
              <TableCell>{e.parent}</TableCell>
              <TableCell>
                <Badge variant="default">{e.status}</Badge>
              </TableCell>
              <TableCell>{e.absences}</TableCell>

              <TableCell className="flex justify-end gap-2">
                {/* DETAIL */}
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    setSelected(e)
                    setOpenDetail(true)
                  }}
                >
                  <Eye size={16} />
                </Button>

                {/* EDIT */}
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => {
                    setForm(e)
                    setOpenEdit(true)
                  }}
                >
                  <Edit size={16} />
                </Button>

                {/* DELETE */}
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDelete(e.matricule)}
                >
                  <Trash size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      </div>
      {/* EDIT DIALOG */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier l'étudiant</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Nom</Label>
              <Input
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
              />
            </div>

            <div>
              <Label>Prénom</Label>
              <Input
                value={form.prenom}
                onChange={(e) => setForm({ ...form, prenom: e.target.value })}
              />
            </div>

            <div>
              <Label>Date de naissance</Label>
              <Input
                type="date"
                value={form.dateNaissance}
                onChange={(e) =>
                  setForm({ ...form, dateNaissance: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Adresse</Label>
              <Input
                value={form.adresse}
                onChange={(e) =>
                  setForm({ ...form, adresse: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Téléphone parent</Label>
              <Input
                value={form.tel}
                onChange={(e) => setForm({ ...form, tel: e.target.value })}
              />
            </div>

            <div>
              <Label>Email parent</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleEdit}>Mettre à jour</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DETAIL DIALOG */}
      <Dialog open={openDetail} onOpenChange={setOpenDetail}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Détails de l'étudiant</DialogTitle>
          </DialogHeader>

          {selected && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <p>
                  <strong>Nom :</strong> {selected.nom} {selected.prenom}
                </p>
                <p>
                  <strong>Date de naissance :</strong>{" "}
                  {selected.dateNaissance}
                </p>
                <p>
                  <strong>Email parent :</strong> {selected.email}
                </p>
                <p>
                  <strong>Téléphone parent :</strong> {selected.tel}
                </p>
                <p>
                  <strong>Adresse :</strong> {selected.adresse}
                </p>
                <p>
                  <strong>Retards :</strong> {selected.retards}
                </p>
                <p>
                  <strong>Absences :</strong> {selected.absences}
                </p>
                <p>
                  <strong>Droit d'inscription :</strong>{" "}
                  <Badge
                    variant={
                      selected.droitInscription ? "default" : "destructive"
                    }
                    className={selected.droitInscription ? "bg-green-400" : "bg-red-400"}

                  >
                    {selected.droitInscription ? "Payé" : "Non payé"}
                    
                  </Badge>
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">
                  Écolage (Janvier → Décembre)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {months.map((m) => (
                    <Badge
                      key={m}
                      variant={
                        selected.ecolage[m] ? "default" : "secondary"
                      }
                      className={selected.ecolage[m] ? "bg-green-400 " : "bg-red-500 text-white"}

                    >
                      {m.charAt(0).toUpperCase() + m.slice(1)} :{" "}
                      {selected.ecolage[m] ? "Payé" : "Non payé"}
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
