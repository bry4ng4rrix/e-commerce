'use client'

import React, { useState } from 'react'
import { Bell, Eye, MessageSquare } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChatForm } from '@/components/chat-form'

const Communications = () => {
  const [activeTab, setActiveTab] = useState('notifications')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Communications</h1>
        <p className="text-muted-foreground mt-1">Notifications, messagerie et communications</p>
      </div>

      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="messagerie">Messagerie interne</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <div className="space-y-3">
            {[
              { message: 'Annonce: Fermeture le 25 janvier', date: "Aujourd'hui", type: 'Annonce' },
              { message: 'Résultats: Contrôle 3 validés', date: 'Il y a 2j', type: 'Résultats' },
              { message: 'Devoir: Exercices 1-10 page 45 pour lundi', date: 'Il y a 3j', type: 'Devoir' },
              { message: 'Rappel: Réunion parents-profs demain', date: 'Il y a 4j', type: 'Rappel' }
            ].map((notif, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Bell className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold">{notif.message}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">{notif.date}</span>
                        <Badge className="bg-primary/10 text-primary text-xs">
                          {notif.type}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Messagerie Tab */}
        <TabsContent value="messagerie">
          <div className="space-y-3">
            {[
              { from: 'M. Dupont (Professeur)', subject: 'Correction du contrôle 3', date: 'Hier' },
              { from: 'Administration', subject: 'Renouvellement de la carte étudiant', date: 'Il y a 2j' },
              { from: 'Mme Martin (Professeur)', subject: 'Absence à justifier', date: 'Il y a 3j' }
            ].map((msg, i) => (
              <Card key={i} className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{msg.from}</p>
                      <p className="text-sm text-muted-foreground mt-1">{msg.subject}</p>
                    </div>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">{msg.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Chat Tab */}
        <TabsContent value="chat">
          <div className="h-[600px] border rounded-lg overflow-hidden">
            <ChatForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Communications