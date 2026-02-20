'use client'

import React, { useState } from 'react'
import { Plus, MessageSquare, Mail, Bell, Edit2, Trash2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ChatForm } from '@/components/chat-form'

interface Notification {
  id: number
  title: string
  message: string
  date: string
  priority: 'low' | 'medium' | 'high'
}

interface EmailTemplate {
  id: number
  name: string
  subject: string
  description: string
}

interface Message {
  id: number
  sender: string
  subject: string
  content: string
  date: string
  read: boolean
}

const CommunicationPage = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'notifications' | 'messages' | 'emails'>('chat')
  const [showNotificationForm, setShowNotificationForm] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: 'Fermeture exceptionnelle', message: 'L\'établissement sera fermé le 25 janvier pour maintenance', date: '2026-01-20', priority: 'high' },
    { id: 2, title: 'Rappel paiement', message: 'N\'oubliez pas de régler les frais de scolarité pour le trimestre 2', date: '2026-01-19', priority: 'medium' },
    { id: 3, title: 'Conseil de classe', message: 'Conseil de classe prévu pour demain à 14h', date: '2026-01-18', priority: 'medium' }
  ])
  
  const [messages] = useState<Message[]>([
    { id: 1, sender: 'Prof. Martin', subject: 'Devoir à rendre', content: 'N\'oubliez pas le devoir de mathématiques pour vendredi', date: '2026-01-20', read: false },
    { id: 2, sender: 'Administration', subject: 'Inscription ouverte', content: 'Les inscriptions pour l\'année prochaine sont ouvertes', date: '2026-01-19', read: true },
    { id: 3, sender: 'Prof. Dubois', subject: 'Changement d\'horaire', content: 'Le cours de physique est déplacé à 15h', date: '2026-01-18', read: true }
  ])
  
  const [emailTemplates] = useState<EmailTemplate[]>([
    { id: 1, name: 'Confirmation inscription', subject: 'Bienvenue dans notre établissement', description: 'Email envoyé lors de l\'inscription d\'un nouvel élève' },
    { id: 2, name: 'Rappel paiement', subject: 'Rappel: Paiement des frais de scolarité', description: 'Email de rappel pour les paiements en retard' },
    { id: 3, name: 'Résultats d\'examen', subject: 'Vos résultats sont disponibles', description: 'Email envoyé lors de la publication des résultats' }
  ])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-600'
      case 'medium': return 'bg-orange-500/20 text-orange-600'
      case 'low': return 'bg-green-500/20 text-green-600'
      default: return 'bg-gray-500/20 text-gray-600'
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Urgent'
      case 'medium': return 'Moyen'
      case 'low': return 'Normal'
      default: return 'Normal'
    }
  }

  const handleDeleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header - Only show when not in chat tab */}
      {activeTab !== 'chat' && (
        <div className="container mx-auto px-4 md:px-6 py-6 border-b">
          <h1 className="text-2xl md:text-3xl font-bold">Communication</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">Gérez les notifications, messages et templates d'emails</p>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-3 md:px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap text-sm md:text-base ${
                activeTab === 'chat'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Chat
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center gap-2 px-3 md:px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap text-sm md:text-base ${
                activeTab === 'notifications'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Bell className="w-4 h-4" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex items-center gap-2 px-3 md:px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap text-sm md:text-base ${
                activeTab === 'messages'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Messagerie
            </button>
            <button
              onClick={() => setActiveTab('emails')}
              className={`flex items-center gap-2 px-3 md:px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap text-sm md:text-base ${
                activeTab === 'emails'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Mail className="w-4 h-4" />
              Templates
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <ChatForm />
        )}

        {/* Other Tabs */}
        {activeTab !== 'chat' && (
          <div className="overflow-y-auto h-full">
            <div className="container mx-auto px-4 md:px-6 py-6 space-y-6">
              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-4">
                  <Button
                    onClick={() => setShowNotificationForm(!showNotificationForm)}
                    className="w-full rounded-lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle notification
                  </Button>

                  {showNotificationForm && (
                    <Card className='rounded-lg'>
                      <CardHeader>
                        <CardTitle>Créer une notification</CardTitle>
                        <CardDescription>Envoyez une notification aux utilisateurs concernés</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="notif-title">Titre</Label>
                          <Input id="notif-title" placeholder="Titre de la notification" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="notif-message">Message</Label>
                          <Input id="notif-message" placeholder="Contenu de la notification" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="notif-priority">Priorité</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner une priorité" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Normal</SelectItem>
                              <SelectItem value="medium">Moyen</SelectItem>
                              <SelectItem value="high">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="notif-target">Destinataires</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner les destinataires" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Tous les utilisateurs</SelectItem>
                              <SelectItem value="students">Élèves uniquement</SelectItem>
                              <SelectItem value="teachers">Enseignants uniquement</SelectItem>
                              <SelectItem value="parents">Parents uniquement</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1">
                            <Send className="w-4 h-4 mr-2" />
                            Envoyer
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => setShowNotificationForm(false)}
                          >
                            Annuler
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <Card key={notification.id} className='rounded-lg'>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold">{notification.title}</h3>
                                <Badge className={getPriorityColor(notification.priority)}>
                                  {getPriorityLabel(notification.priority)}
                                </Badge>
                              </div>
                              <p className="text-muted-foreground mb-2 text-sm">{notification.message}</p>
                              <p className="text-xs text-muted-foreground">{notification.date}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteNotification(notification.id)}
                              className="text-destructive hover:text-destructive h-8 w-8 p-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages Tab */}
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <Card className='rounded-lg'>
                    <CardHeader>
                      <CardTitle>Messagerie interne</CardTitle>
                      <CardDescription>Consultez et gérez tous les messages du système</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div key={message.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{message.subject}</h3>
                                {!message.read && (
                                  <Badge variant="secondary">Nouveau</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{message.date}</p>
                            </div>
                            <p className="text-muted-foreground mb-2 text-sm">De: {message.sender}</p>
                            <p className="text-sm">{message.content}</p>
                            <Separator className="my-3" />
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Répondre
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Supprimer
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Email Templates Tab */}
              {activeTab === 'emails' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {emailTemplates.map((template) => (
                      <Card key={template.id} className='rounded-lg'>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between text-base md:text-lg">
                            {template.name}
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                          </CardTitle>
                          <CardDescription className="text-xs md:text-sm">{template.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div>
                              <Label className="text-xs md:text-sm font-medium">Sujet</Label>
                              <p className="text-xs md:text-sm text-muted-foreground">{template.subject}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="flex-1 text-xs md:text-sm">
                                <Edit2 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                                Éditer
                              </Button>
                              <Button variant="outline" size="sm" className="flex-1 text-xs md:text-sm">
                                <Send className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                                Aperçu
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card className='rounded-lg'>
                    <CardHeader>
                      <CardTitle>Créer un nouveau template</CardTitle>
                      <CardDescription>Ajoutez un nouveau modèle d'email</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="template-name">Nom du template</Label>
                        <Input id="template-name" placeholder="Ex: Bienvenue nouvel élève" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="template-subject">Sujet de l'email</Label>
                        <Input id="template-subject" placeholder="Sujet de l'email" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="template-content">Contenu de l'email</Label>
                        <Input id="template-content" placeholder="Contenu du message" />
                      </div>
                      <Button className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Créer le template
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommunicationPage
