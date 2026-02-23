'use client'

import React, { useState } from 'react'
import { Search, Plus, Edit, Eye, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Student {
  id: number
  nom: string
  matricule: string
  classe: string
  absence: number
}

interface Grade {
  id: number
  subject: string
  t1: number
  t2: number
  t3: number
  average: number
}

const EtudiantsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState('mathematiques')
  const [showAddGradeDialog, setShowAddGradeDialog] = useState(false)
  const [newGrade, setNewGrade] = useState({ t1: '', t2: '', t3: '' })

  // Mock data
  const students: Student[] = [
    { id: 1, nom: 'Jean Dupont', matricule: '24-001', classe: '2nde C', absence: 2 },
    { id: 2, nom: 'Marie Martin', matricule: '24-002', classe: '2nde C', absence: 0 },
    { id: 3, nom: 'Pierre Durand', matricule: '24-003', classe: '2nde D', absence: 5 },
    { id: 4, nom: 'Sophie Bernard', matricule: '24-004', classe: '2nde C', absence: 1 },
    { id: 5, nom: 'Lucas Petit', matricule: '24-005', classe: '2nde D', absence: 3 },
  ]

  const subjects = [
    { id: 'mathematiques', name: 'Mathématiques' },
    { id: 'francais', name: 'Français' },
    { id: 'anglais', name: 'Anglais' },
    { id: 'sciences', name: 'Sciences' },
  ]

  const grades: Grade[] = [
    { id: 1, subject: 'mathematiques', t1: 14, t2: 15, t3: 14.5, average: 14.5 },
    { id: 2, subject: 'francais', t1: 12, t2: 11.5, t3: 12.5, average: 12.0 },
    { id: 3, subject: 'anglais', t1: 13, t2: 14, t3: 13.5, average: 13.5 },
    { id: 4, subject: 'sciences', t1: 15, t2: 15.5, t3: 15, average: 15.2 },
  ]

  const filteredStudents = students.filter(student => 
    student.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.matricule.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student)
    setShowDetailsDialog(true)
  }

  const handleAddGrade = () => {
    console.log('Adding grade for student:', selectedStudent?.nom, 'Subject:', selectedSubject)
    setShowAddGradeDialog(false)
    setNewGrade({ t1: '', t2: '', t3: '' })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Gestion des Étudiants</h1>
        <p className="text-muted-foreground mt-1">Consultez et gérez les informations des étudiants</p>
      </div>

      {/* Grade Management */}
      <Card>
        <CardHeader>
          <CardTitle>Ajouter une note</CardTitle>
          <CardDescription>Sélectionnez un étudiant et ajoutez ses notes par matière</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Student Selection */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher par nom ou matricule..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Matière" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={() => setShowAddGradeDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              </div>
            </div>

            {/* Selected Student Display */}
            {filteredStudents.length > 0 && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Étudiant sélectionné: <span className="text-foreground font-semibold">
                    {filteredStudents[0]?.nom} ({filteredStudents[0]?.matricule})
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Classe: {filteredStudents[0]?.classe} | Absences: {filteredStudents[0]?.absence}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des étudiants</CardTitle>
          <CardDescription>{filteredStudents.length} étudiants trouvés</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Matricule</TableHead>
                <TableHead>Classe</TableHead>
                <TableHead>Absences</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.nom}</TableCell>
                  <TableCell>{student.matricule}</TableCell>
                  <TableCell>{student.classe}</TableCell>
                  <TableCell>
                    <Badge variant={student.absence > 3 ? 'destructive' : 'secondary'}>
                      {student.absence} absences
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(student)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => console.log('Edit student:', student.nom)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Subject Tabs for Grades */}
   

      {/* Student Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails de l'étudiant</DialogTitle>
            <DialogDescription>
              Informations complètes et notes de {selectedStudent?.nom}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Student Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nom</p>
                <p className="text-lg font-semibold">{selectedStudent?.nom}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Matricule</p>
                <p className="text-lg font-semibold">{selectedStudent?.matricule}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Classe</p>
                <p className="text-lg font-semibold">{selectedStudent?.classe}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total absences</p>
                <p className="text-lg font-semibold">{selectedStudent?.absence}</p>
              </div>
            </div>

            {/* Grades by Subject */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Notes par matière</h3>
              <div className="space-y-4">
                {grades.map((grade) => (
                  <Card key={grade.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold">
                          {subjects.find(s => s.id === grade.subject)?.name}
                        </h4>
                        <Badge className="bg-primary/10 text-primary">
                          Moyenne: {grade.average.toFixed(1)}/20
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">T1</p>
                          <p className="text-xl font-bold">{grade.t1}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">T2</p>
                          <p className="text-xl font-bold">{grade.t2}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">T3</p>
                          <p className="text-xl font-bold">{grade.t3}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Grade Dialog */}
      <Dialog open={showAddGradeDialog} onOpenChange={setShowAddGradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une note</DialogTitle>
            <DialogDescription>
              Ajoutez les notes pour {subjects.find(s => s.id === selectedSubject)?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Note T1</label>
                <Input
                  type="number"
                  placeholder="Note T1"
                  value={newGrade.t1}
                  onChange={(e) => setNewGrade({...newGrade, t1: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Note T2</label>
                <Input
                  type="number"
                  placeholder="Note T2"
                  value={newGrade.t2}
                  onChange={(e) => setNewGrade({...newGrade, t2: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Note T3</label>
                <Input
                  type="number"
                  placeholder="Note T3"
                  value={newGrade.t3}
                  onChange={(e) => setNewGrade({...newGrade, t3: e.target.value})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddGradeDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddGrade}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EtudiantsPage