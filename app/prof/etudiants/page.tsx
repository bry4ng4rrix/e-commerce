'use client'

import React, { useState } from 'react'
import { Search, Plus, Edit, Eye, X, Calendar, TrendingUp, BookOpen, Download, BarChart3, Trash2 } from 'lucide-react'
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
  const [selectedClass, setSelectedClass] = useState('all')
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState('mathematiques')
  const [showAddGradeDialog, setShowAddGradeDialog] = useState(false)
  const [showEditGradeDialog, setShowEditGradeDialog] = useState(false)
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null)
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

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.matricule.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesClass = selectedClass === 'all' || student.classe === selectedClass
    
    return matchesSearch && matchesClass
  })

  const handleViewDetails = (student: Student) => {
    setSelectedClass(student.classe)
    setSelectedStudent(student)
    setShowDetailsDialog(true)
  }

  const handleAddGrade = () => {
    console.log('Adding grade for student:', selectedStudent?.nom, 'Subject:', selectedSubject)
    setShowAddGradeDialog(false)
    setNewGrade({ t1: '', t2: '', t3: '' })
  }

  const handleEditGrade = (grade: Grade) => {
    setEditingGrade(grade)
    setShowEditGradeDialog(true)
    setNewGrade({ t1: grade.t1.toString(), t2: grade.t2.toString(), t3: grade.t3.toString() })
  }

  const handleUpdateGrade = () => {
    if (!editingGrade) return
    console.log('Updating grade:', editingGrade)
    setShowEditGradeDialog(false)
    setEditingGrade(null)
    setNewGrade({ t1: '', t2: '', t3: '' })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Gestion des Étudiants</h1>
        <p className="text-muted-foreground mt-1">Consultez et gérez les informations des étudiants</p>
      </div>


        {/* tabs classe  */}


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
                  <SelectTrigger className="w-50">
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

      {/* Class Selection Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des étudiants</CardTitle>
          <CardDescription>{filteredStudents.length} étudiants trouvés</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedClass} onValueChange={setSelectedClass}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Toutes les classes</TabsTrigger>
              <TabsTrigger value="2nde C">2nde C</TabsTrigger>
              <TabsTrigger value="2nde D">2nde D</TabsTrigger>
              <TabsTrigger value="1ere">1ère</TabsTrigger>
            </TabsList>

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
          </Tabs>
        </CardContent>
      </Card>

      {/* Student Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-xl">Détails de l'étudiant</DialogTitle>
              <DialogDescription>
                Informations complètes et notes de {selectedClass === 'all' ? 'tous les étudiants' : `l'étudiant de la classe ${selectedClass}`}
              </DialogDescription>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="sm:hidden"
              onClick={() => setShowDetailsDialog(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Student Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-muted-foreground font-bold text-sm">JD</span>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{selectedStudent?.nom}</p>
                      <p className="text-sm text-muted-foreground">{selectedStudent?.matricule}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <p>Identité</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-muted-foreground font-bold text-sm">2C</span>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{selectedStudent?.classe}</p>
                      <p className="text-sm text-muted-foreground">2nde C</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <p>Classe</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{selectedStudent?.absence}</p>
                      <p className="text-sm text-muted-foreground">absences</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <p>Absences</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">12.8</p>
                      <p className="text-sm text-muted-foreground">moyenne</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <p>Moyenne générale</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Grades by Subject - Responsive Grid */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Notes par matière
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {grades.map((grade) => {
                  const subjectInfo = subjects.find(s => s.id === grade.subject)
                  const gradeColor = grade.average >= 14 ? 'text-green-600' : grade.average >= 10 ? 'text-yellow-600' : 'text-red-600'
                  return (
                    <Card key={grade.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {subjectInfo?.name}
                            <Badge className={grade.average >= 14 ? 'bg-green-100 text-green-800' : grade.average >= 10 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                              {grade.average.toFixed(1)}/20
                            </Badge>
                          </CardTitle>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditGrade(grade)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => console.log('Delete grade:', grade)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <CardDescription className="text-xs">
                          Performance {grade.average >= 14 ? 'excellente' : grade.average >= 10 ? 'bonne' : 'à améliorer'}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">T1</p>
                            <p className={`text-2xl font-bold ${gradeColor}`}>{grade.t1}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">T2</p>
                            <p className={`text-2xl font-bold ${gradeColor}`}>{grade.t2}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">T3</p>
                            <p className={`text-2xl font-bold ${gradeColor}`}>{grade.t3}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)} className="w-full sm:w-auto">
              Fermer
            </Button>
            <Button onClick={() => console.log('Export student data')}>
              <Download className="w-4 h-4 mr-2" />
              Exporter
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
      {/* Edit Grade Dialog */}
      <Dialog open={showEditGradeDialog} onOpenChange={setShowEditGradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier une note</DialogTitle>
            <DialogDescription>
              Modifiez les notes pour {subjects.find(s => s.id === selectedSubject)?.name}
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
            <Button variant="outline" onClick={() => setShowEditGradeDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleUpdateGrade}>
              Mettre à jour
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EtudiantsPage