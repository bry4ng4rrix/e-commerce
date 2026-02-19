"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Eye, Edit, Trash, Plus } from "lucide-react"
const initialEtudiants = [
  {
    matricule: 123,
    nom: "Bryan",
    prenom: "Garrix",
    classe: "2nd A",
    status: "inscrit",
    absences: 5,
    dateNaissance: "2010-05-12",
    adresse: "Antananarivo",
    droitInscription: true, // NEW
    ecolage: [ // 15 mois
      { mois: "Mois 1", paye: true },
      { mois: "Mois 2", paye: false },
      { mois: "Mois 3", paye: true },
      { mois: "Mois 4", paye: true },
      { mois: "Mois 5", paye: false },
      { mois: "Mois 6", paye: true },
      { mois: "Mois 7", paye: false },
      { mois: "Mois 8", paye: true },
      { mois: "Mois 9", paye: true },
      { mois: "Mois 10", paye: false },
      { mois: "Mois 11", paye: true },
      { mois: "Mois 12", paye: true },
      { mois: "Mois 13", paye: false },
      { mois: "Mois 14", paye: true },
      { mois: "Mois 15", paye: false },
    ],
    parent: {
      nom: "Rakoto",
      tel: "0340000000",
      email: "parent@gmail.com",
    },
  },
]


export default function Page() {
  const [etudiants, setEtudiants] = useState(initialEtudiants)
  const [selected, setSelected] = useState(null)
  const [openDetail, setOpenDetail] = useState(false)
  const [openForm, setOpenForm] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const emptyForm = {
    matricule: "",
    nom: "",
    prenom: "",
    classe: "",
    status: "inscrit",
    dateNaissance: "",
    adresse: "",
    parentNom: "",
    parentTel: "",
    parentEmail: "",
  }

  const [form, setForm] = useState(emptyForm)

  // DELETE
  const handleDelete = (matricule) => {
    setEtudiants(etudiants.filter((e) => e.matricule !== matricule))
  }

  // OPEN ADD
  const openAdd = () => {
    setIsEdit(false)
    setForm(emptyForm)
    setOpenForm(true)
  }

  // OPEN EDIT
  const openEdit = (e) => {
    setIsEdit(true)
    setForm({
      matricule: e.matricule,
      nom: e.nom,
      prenom: e.prenom,
      classe: e.classe,
      status: e.status,
      dateNaissance: e.dateNaissance,
      adresse: e.adresse,
      parentNom: e.parent?.nom,
      parentTel: e.parent?.tel,
      parentEmail: e.parent?.email,
    })
    setOpenForm(true)
  }

  // SUBMIT ADD + EDIT
  const handleSubmit = () => {
    const payload = {
      matricule: isEdit ? form.matricule : Date.now(),
      nom: form.nom,
      prenom: form.prenom,
      classe: form.classe,
      status: form.status,
      absences: 0,
      dateNaissance: form.dateNaissance,
      adresse: form.adresse,
      parent: {
        nom: form.parentNom,
        tel: form.parentTel,
        email: form.parentEmail,
      },
    }

    if (isEdit) {
      setEtudiants(
        etudiants.map((e) =>
          e.matricule === form.matricule ? payload : e
        )
      )
    } else {
      setEtudiants([...etudiants, payload])
    }

    setOpenForm(false)
  }

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des étudiants</h1>
        <Button onClick={openAdd} className="gap-2">
          <Plus size={16} /> Ajouter
        </Button>
      </div>

      {/* TABLE */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Matricule</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Prénom</TableHead>
            <TableHead>Classe</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {etudiants.map((e) => (
            <TableRow key={e.matricule}>
              <TableCell>{e.matricule}</TableCell>
              <TableCell>{e.nom}</TableCell>
              <TableCell>{e.prenom}</TableCell>
              <TableCell>{e.classe}</TableCell>
              <TableCell>
                <Badge>{e.status}</Badge>
              </TableCell>
              <TableCell className="flex gap-2">
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

                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => openEdit(e)}
                >
                  <Edit size={16} />
                </Button>

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

      {/* DIALOG ADD / EDIT COMPLET */}
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Modifier l'étudiant" : "Ajouter un étudiant"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3">
            {/* AJOUT + EDIT */}
            {!isEdit && (
              <Input
                placeholder="Matricule"
                value={form.matricule}
                onChange={(e) =>
                  setForm({ ...form, matricule: e.target.value })
                }
              />
            )}

            <Input
              placeholder="Nom"
              value={form.nom}
              onChange={(e) =>
                setForm({ ...form, nom: e.target.value })
              }
            />

            <Input
              placeholder="Prénom"
              value={form.prenom}
              onChange={(e) =>
                setForm({ ...form, prenom: e.target.value })
              }
            />

            <Input
              type="date"
              placeholder="Date de naissance"
              value={form.dateNaissance}
              onChange={(e) =>
                setForm({
                  ...form,
                  dateNaissance: e.target.value,
                })
              }
            />

            <Input
              placeholder="Classe"
              value={form.classe}
              onChange={(e) =>
                setForm({ ...form, classe: e.target.value })
              }
            />

            <Input
              placeholder="Adresse"
              value={form.adresse}
              onChange={(e) =>
                setForm({ ...form, adresse: e.target.value })
              }
            />

            {/* PARENT */}
            <Input
              placeholder="Nom du parent"
              value={form.parentNom}
              onChange={(e) =>
                setForm({ ...form, parentNom: e.target.value })
              }
            />

            <Input
              placeholder="Téléphone du parent"
              value={form.parentTel}
              onChange={(e) =>
                setForm({ ...form, parentTel: e.target.value })
              }
            />

            <Input
              className="col-span-2"
              placeholder="Email du parent"
              value={form.parentEmail}
              onChange={(e) =>
                setForm({ ...form, parentEmail: e.target.value })
              }
            />

            <Button
              className="col-span-2 mt-2"
              onClick={handleSubmit}
            >
              {isEdit ? "Mettre à jour" : "Créer l'étudiant"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* DIALOG DETAIL */}
      <Dialog open={openDetail} onOpenChange={setOpenDetail}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Détail de l'étudiant</DialogTitle>
          </DialogHeader>

          {selected && (
            <div className="space-y-2">
              <p><strong>Nom :</strong> {selected.nom} {selected.prenom}</p>
              <p><strong>Date de naissance :</strong> {selected.dateNaissance}</p>
              <p><strong>Adresse :</strong> {selected.adresse}</p>
              <p><strong>Classe :</strong> {selected.classe}</p>
              <p><strong>Parent :</strong> {selected.parent?.nom}</p>
              <p><strong>Téléphone :</strong> {selected.parent?.tel}</p>
              <p><strong>Email :</strong> {selected.parent?.email}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
