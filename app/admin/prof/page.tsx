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
import { Eye, Edit, Trash, Plus } from "lucide-react"

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
    <div className="min-h-screen p-6 space-y-6">
      {/* HEADER */}
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestion des Enseignants</h1>

        {/* DIALOG AJOUT */}
        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              Ajouter un enseignant
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Ajouter un enseignant</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Matricule</Label>
                <Input
                  type="number"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      matricule: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div>
                <Label>Matière</Label>
                <Input
                  placeholder="Ex: Mathématiques"
                  onChange={(e) =>
                    setForm({ ...form, matiere: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Nom</Label>
                <Input
                  onChange={(e) =>
                    setForm({ ...form, nom: e.target.value })
                  }
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
                <Label>Email</Label>
                <Input
                  type="email"
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Numéro téléphone</Label>
                <Input
                  onChange={(e) =>
                    setForm({ ...form, tel: e.target.value })
                  }
                />
              </div>

              <div className="col-span-2">
                <Label>Date de naissance</Label>
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

            <DialogFooter>
              <Button onClick={handleAdd}>Enregistrer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      {/* TABLE */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Matricule</TableHead>
            <TableHead>Nom complet</TableHead>
            <TableHead>Matière</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((enseignant) => (
            <TableRow key={enseignant.matricule}>
              <TableCell>{enseignant.matricule}</TableCell>
              <TableCell>
                {enseignant.nom} {enseignant.prenom}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {enseignant.matiere}
                </Badge>
              </TableCell>
              <TableCell>{enseignant.email}</TableCell>
              <TableCell>{enseignant.tel}</TableCell>

              <TableCell className="flex justify-end gap-2">
                {/* DETAIL */}
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    setSelected(enseignant)
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
                    setForm(enseignant)
                    setOpenEdit(true)
                  }}
                >
                  <Edit size={16} />
                </Button>

                {/* DELETE */}
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() =>
                    handleDelete(enseignant.matricule)
                  }
                >
                  <Trash size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* DIALOG EDIT */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier l'enseignant</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Nom</Label>
              <Input
                value={form.nom}
                onChange={(e) =>
                  setForm({ ...form, nom: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Prénom</Label>
              <Input
                value={form.prenom}
                onChange={(e) =>
                  setForm({ ...form, prenom: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Téléphone</Label>
              <Input
                value={form.tel}
                onChange={(e) =>
                  setForm({ ...form, tel: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Matière</Label>
              <Input
                value={form.matiere}
                onChange={(e) =>
                  setForm({ ...form, matiere: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Date de naissance</Label>
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

          <DialogFooter>
            <Button onClick={handleEdit}>Mettre à jour</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DIALOG DETAIL */}
      <Dialog open={openDetail} onOpenChange={setOpenDetail}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Détails de l'enseignant</DialogTitle>
          </DialogHeader>

          {selected && (
            <div className="space-y-3">
              <p>
                <strong>Matricule :</strong> {selected.matricule}
              </p>
              <p>
                <strong>Nom :</strong> {selected.nom}
              </p>
              <p>
                <strong>Prénom :</strong> {selected.prenom}
              </p>
              <p>
                <strong>Email :</strong> {selected.email}
              </p>
              <p>
                <strong>Téléphone :</strong> {selected.tel}
              </p>
              <p>
                <strong>Date de naissance :</strong>{" "}
                {selected.dateNaissance}
              </p>
              <p>
                <strong>Matière :</strong>{" "}
                <Badge>{selected.matiere}</Badge>
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
