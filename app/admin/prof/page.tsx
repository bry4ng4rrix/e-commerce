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
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { Eye, Edit, Trash, Plus, BookOpen } from "lucide-react"
import { SimplePieChart } from "@/components/charts/pie-chart"

type Enseignant = {
  matricule: number
  nom: string
  prenom: string
  email: string
  tel: string
  dateNaissance: string
  matiere: string
}

const initialData: Enseignant[] = [
  {
    matricule: 2001,
    nom: "Rakoto",
    prenom: "Jean",
    email: "jean@ecole.com",
    tel: "0340000000",
    dateNaissance: "1990-03-15",
    matiere: "Mathématiques",
  },
  {
    matricule: 2002,
    nom: "Rabe",
    prenom: "Marie",
    email: "marie@ecole.com",
    tel: "0321111111",
    dateNaissance: "1988-07-10",
    matiere: "Français",
  },
]

export default function Page() {
  const [data, setData] = useState<Enseignant[]>(initialData)
  const [selected, setSelected] = useState<Enseignant | null>(null)

  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDetail, setOpenDetail] = useState(false)

  const [form, setForm] = useState<Enseignant>({
    matricule: 0,
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    dateNaissance: "",
    matiere: "",
  })

  const resetForm = () => {
    setForm({
      matricule: 0,
      nom: "",
      prenom: "",
      email: "",
      tel: "",
      dateNaissance: "",
      matiere: "",
    })
  }

  const handleAdd = () => {
    setData((prev) => [...prev, form])
    setOpenAdd(false)
    resetForm()
  }

  const handleEdit = () => {
    setData((prev) =>
      prev.map((t) => (t.matricule === form.matricule ? form : t))
    )
    setOpenEdit(false)
  }

  const handleDelete = (matricule: number) => {
    setData((prev) => prev.filter((t) => t.matricule !== matricule))
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Gestion des Enseignants</h1>
          <p className="text-sm text-muted-foreground mt-1">Gérez les informations et les matières des enseignants</p>
        </div>

        {/* DIALOG AJOUT */}
        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <DialogTrigger asChild>
            <Button className="gap-2 rounded-lg">
              <Plus className="w-4 h-4" />
              Ajouter un enseignant
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl rounded-lg">
            <DialogHeader>
              <DialogTitle>Ajouter un enseignant</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">Matricule</Label>
                <Input
                  type="number"
                  placeholder="Ex: 2003"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      matricule: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div>
                <Label className="text-sm">Matière</Label>
                <Input
                  placeholder="Ex: Mathématiques"
                  onChange={(e) =>
                    setForm({ ...form, matiere: e.target.value })
                  }
                />
              </div>

              <div>
                <Label className="text-sm">Nom</Label>
                <Input
                  placeholder="Nom"
                  onChange={(e) =>
                    setForm({ ...form, nom: e.target.value })
                  }
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
                <Label className="text-sm">Email</Label>
                <Input
                  type="email"
                  placeholder="email@ecole.com"
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>

              <div>
                <Label className="text-sm">Téléphone</Label>
                <Input
                  placeholder="Numéro de téléphone"
                  onChange={(e) =>
                    setForm({ ...form, tel: e.target.value })
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <Label className="text-sm">Date de naissance</Label>
                <Input
                  type="date"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      dateNaissance: e.target.value,
                    })
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

      {/* Stats Card */}
      <Card className="rounded-lg">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Nombre d'enseignants</p>
              <p className="text-3xl font-bold text-foreground mt-1">{data.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart - Distribution by Subject */}
      {data.length > 0 && (
        <Card className="rounded-lg">
          <CardHeader className="pb-4">
            <h3 className="text-lg font-semibold text-foreground">Distribution par matière</h3>
          </CardHeader>
          <CardContent>
            <SimplePieChart
              data={
                Object.entries(
                  data.reduce((acc, teacher) => {
                    acc[teacher.matiere] = (acc[teacher.matiere] || 0) + 1
                    return acc
                  }, {} as Record<string, number>)
                ).map(([name, value]) => ({ name, value }))
              }
              colors={['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#ef4444']}
            />
          </CardContent>
        </Card>
      )}

      {/* TABLE */}
      <Card className="rounded-lg">
        <CardHeader className="pb-4">
          <h3 className="text-lg font-semibold text-foreground">Liste des enseignants</h3>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs md:text-sm">Matricule</TableHead>
                  <TableHead className="text-xs md:text-sm">Nom complet</TableHead>
                  <TableHead className="hidden sm:table-cell text-xs md:text-sm">Matière</TableHead>
                  <TableHead className="hidden md:table-cell text-xs md:text-sm">Email</TableHead>
                  <TableHead className="text-right text-xs md:text-sm">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.map((enseignant) => (
                  <TableRow key={enseignant.matricule}>
                    <TableCell className="text-xs md:text-sm">{enseignant.matricule}</TableCell>
                    <TableCell className="text-xs md:text-sm">
                      {enseignant.nom} {enseignant.prenom}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-xs md:text-sm">
                      <Badge variant="secondary" className="rounded-md">
                        {enseignant.matiere}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-xs md:text-sm">{enseignant.email}</TableCell>

                    <TableCell className="flex justify-end gap-1">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 rounded-md"
                        onClick={() => {
                          setSelected(enseignant)
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
                          setForm(enseignant)
                          setOpenEdit(true)
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-8 w-8 rounded-md"
                        onClick={() =>
                          handleDelete(enseignant.matricule)
                        }
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

      {/* DIALOG EDIT */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="max-w-2xl rounded-lg">
          <DialogHeader>
            <DialogTitle>Modifier l'enseignant</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm">Nom</Label>
              <Input
                value={form.nom}
                onChange={(e) =>
                  setForm({ ...form, nom: e.target.value })
                }
              />
            </div>

            <div>
              <Label className="text-sm">Prénom</Label>
              <Input
                value={form.prenom}
                onChange={(e) =>
                  setForm({ ...form, prenom: e.target.value })
                }
              />
            </div>

            <div>
              <Label className="text-sm">Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div>
              <Label className="text-sm">Téléphone</Label>
              <Input
                value={form.tel}
                onChange={(e) =>
                  setForm({ ...form, tel: e.target.value })
                }
              />
            </div>

            <div>
              <Label className="text-sm">Matière</Label>
              <Input
                value={form.matiere}
                onChange={(e) =>
                  setForm({ ...form, matiere: e.target.value })
                }
              />
            </div>

            <div>
              <Label className="text-sm">Date de naissance</Label>
              <Input
                type="date"
                value={form.dateNaissance}
                onChange={(e) =>
                  setForm({
                    ...form,
                    dateNaissance: e.target.value,
                  })
                }
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

      {/* DIALOG DETAIL */}
      <Dialog open={openDetail} onOpenChange={setOpenDetail}>
        <DialogContent className="max-w-xl rounded-lg">
          <DialogHeader>
            <DialogTitle>Détails de l'enseignant</DialogTitle>
          </DialogHeader>

          {selected && (
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Matricule</p>
                <p className="font-semibold text-foreground">{selected.matricule}</p>
              </div>
              <Separator />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground text-xs">Nom</p>
                  <p className="font-semibold text-foreground">{selected.nom}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Prénom</p>
                  <p className="font-semibold text-foreground">{selected.prenom}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Email</p>
                  <p className="font-semibold text-foreground">{selected.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Téléphone</p>
                  <p className="font-semibold text-foreground">{selected.tel}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Date de naissance</p>
                  <p className="font-semibold text-foreground">{selected.dateNaissance}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Matière</p>
                  <Badge className="rounded-md bg-blue-600 text-white">{selected.matiere}</Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
