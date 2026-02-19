'use client'

import React, { useState } from 'react'
import { DollarSign, FileText, Users, Download, Edit2, Trash2, Plus, TrendingUp, TrendingDown, CreditCard, UserPlus, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

interface Payment {
  id: number
  studentName: string
  amount: number
  date: string
  status: 'paid' | 'pending' | 'overdue'
  type: string
}

interface Document {
  id: number
  name: string
  type: string
  description: string
  available: boolean
}

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

const AdministrativePage = () => {
  const [activeTab, setActiveTab] = useState<'paiements' | 'documents' | 'utilisateurs'>('paiements')
  const [showAddPaymentDialog, setShowAddPaymentDialog] = useState(false)
  const [showAddUserDialog, setShowAddUserDialog] = useState(false)
  const [showAddDocumentDialog, setShowAddDocumentDialog] = useState(false)
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [editingDocument, setEditingDocument] = useState<Document | null>(null)
  
  const [payments, setPayments] = useState<Payment[]>([
    { id: 1, studentName: 'Jean Paul', amount: 250000, date: '2026-01-15', status: 'paid', type: 'Écolage' },
    { id: 2, studentName: 'Marie Rakoto', amount: 500000, date: '2026-01-10', status: 'overdue', type: 'Écolage' },
    { id: 3, studentName: 'Pierre Dupont', amount: 150000, date: '2026-01-20', status: 'pending', type: 'Frais divers' }
  ])
  
  const [documents] = useState<Document[]>([
    { id: 1, name: 'Attestation de scolarité', type: 'Attestation', description: 'Document attestant la scolarité', available: true },
    { id: 2, name: 'Certificat de réussite', type: 'Certificat', description: 'Certificat de fin d\'année', available: true },
    { id: 3, name: 'Carte étudiante', type: 'Carte', description: 'Carte d\'identité étudiante', available: true },
    { id: 4, name: 'Bulletin de notes', type: 'Bulletin', description: 'Relevé de notes trimestriel', available: true }
  ])
  
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Admin', email: 'admin@lycee.ma', role: 'Administrateur', status: 'active' },
    { id: 2, name: 'Prof. Martin', email: 'martin@lycee.ma', role: 'Enseignant', status: 'active' },
    { id: 3, name: 'Secrétaire', email: 'secretariat@lycee.ma', role: 'Secrétaire', status: 'active' }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-500/20 text-green-600'
      case 'pending': return 'bg-orange-500/20 text-orange-600'
      case 'overdue': return 'bg-red-500/20 text-red-600'
      case 'active': return 'bg-green-500/20 text-green-600'
      case 'inactive': return 'bg-gray-500/20 text-gray-600'
      default: return 'bg-gray-500/20 text-gray-600'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'Payé'
      case 'pending': return 'En attente'
      case 'overdue': return 'En retard'
      case 'active': return 'Actif'
      case 'inactive': return 'Inactif'
      default: return status
    }
  }

  const totalRevenue = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0)
  const totalDebt = payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0)
  const recoveryRate = (totalRevenue / (totalRevenue + totalDebt)) * 100

  const handleAddPayment = () => {
    // Logic to add payment
    setShowAddPaymentDialog(false)
  }

  const handleEditPayment = (payment: Payment) => {
    setEditingPayment(payment)
  }

  const handleDeletePayment = (id: number) => {
    setPayments(payments.filter(p => p.id !== id))
  }

  const handleAddUser = () => {
    // Logic to add user
    setShowAddUserDialog(false)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
  }

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id))
  }

  return (
    <div className="container   space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Gestion Administrative</h1>
        <p className="text-muted-foreground mt-1">Paiements, documents et utilisateurs</p>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'paiements' | 'documents' | 'utilisateurs')}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="paiements" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Paiements
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="utilisateurs" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Utilisateurs
          </TabsTrigger>
        </TabsList>

        {/* Paiements Tab */}
        <TabsContent value="paiements">
          <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Revenus collectés</p>
                    <p className="text-3xl font-bold mt-2">{(totalRevenue / 1000000).toFixed(1)}M Ar</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-500">+12% vs mois dernier</span>
                    </div>
                  </div>
                  <DollarSign className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Dettes totales</p>
                    <p className="text-3xl font-bold mt-2 text-destructive">{(totalDebt / 1000000).toFixed(1)}M Ar</p>
                    <div className="flex items-center mt-2">
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      <span className="text-sm text-red-500">-5% vs mois dernier</span>
                    </div>
                  </div>
                  <CreditCard className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Taux recouvrement</p>
                    <p className="text-3xl font-bold mt-2">{recoveryRate.toFixed(1)}%</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-500">+3% vs mois dernier</span>
                    </div>
                  </div>
                  <Settings className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Liste des paiements</CardTitle>
                <CardDescription>Gérez tous les paiements et dettes</CardDescription>
              </div>
              <Dialog open={showAddPaymentDialog} onOpenChange={setShowAddPaymentDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un paiement
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ajouter un paiement</DialogTitle>
                    <DialogDescription>Enregistrez un nouveau paiement ou une dette</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-name">Nom de l'élève</Label>
                      <Input id="student-name" placeholder="Nom de l'élève" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Montant (Ar)</Label>
                      <Input id="amount" type="number" placeholder="Montant" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="payment-type">Type de paiement</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ecolage">Écolage</SelectItem>
                          <SelectItem value="frais-divers">Frais divers</SelectItem>
                          <SelectItem value="inscription">Inscription</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Statut</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="paid">Payé</SelectItem>
                          <SelectItem value="pending">En attente</SelectItem>
                          <SelectItem value="overdue">En retard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddPaymentDialog(false)}>Annuler</Button>
                    <Button onClick={handleAddPayment}>Ajouter</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Élève</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.studentName}</TableCell>
                      <TableCell>{payment.amount.toLocaleString()} Ar</TableCell>
                      <TableCell>{payment.type}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(payment.status)}>
                          {getStatusLabel(payment.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditPayment(payment)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeletePayment(payment.id)} className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Documents disponibles</CardTitle>
                <CardDescription>Gérez les documents générés par l'établissement</CardDescription>
              </div>
              <Dialog open={showAddDocumentDialog} onOpenChange={setShowAddDocumentDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un document
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ajouter un document</DialogTitle>
                    <DialogDescription>Ajoutez un nouveau type de document</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="doc-name">Nom du document</Label>
                      <Input id="doc-name" placeholder="Ex: Attestation de présence" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doc-type">Type de document</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="attestation">Attestation</SelectItem>
                          <SelectItem value="certificat">Certificat</SelectItem>
                          <SelectItem value="carte">Carte</SelectItem>
                          <SelectItem value="bulletin">Bulletin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doc-description">Description</Label>
                      <Input id="doc-description" placeholder="Description du document" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddDocumentDialog(false)}>Annuler</Button>
                    <Button onClick={() => setShowAddDocumentDialog(false)}>Ajouter</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc) => (
                  <Card key={doc.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">{doc.name}</h3>
                          <p className="text-sm text-muted-foreground">{doc.description}</p>
                        </div>
                        <Badge variant={doc.available ? 'default' : 'secondary'}>
                          {doc.available ? 'Disponible' : 'Indisponible'}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit2 className="w-4 h-4 mr-2" />
                          Éditer
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Générer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        </TabsContent>

        {/* Utilisateurs Tab */}
        <TabsContent value="utilisateurs">
          <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Gestion des utilisateurs</CardTitle>
                <CardDescription>Gérez les comptes utilisateurs du système</CardDescription>
              </div>
              <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Ajouter un utilisateur
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ajouter un utilisateur</DialogTitle>
                    <DialogDescription>Créez un nouveau compte utilisateur</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="user-name">Nom complet</Label>
                      <Input id="user-name" placeholder="Nom complet" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="user-email">Email</Label>
                      <Input id="user-email" type="email" placeholder="Email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="user-role">Rôle</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le rôle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrateur</SelectItem>
                          <SelectItem value="teacher">Enseignant</SelectItem>
                          <SelectItem value="secretary">Secrétaire</SelectItem>
                          <SelectItem value="accountant">Comptable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="user-password">Mot de passe</Label>
                      <Input id="user-password" type="password" placeholder="Mot de passe" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>Annuler</Button>
                    <Button onClick={handleAddUser}>Ajouter</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>
                          {getStatusLabel(user.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id)} className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdministrativePage