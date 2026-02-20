'use client'

import { Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const AcademicManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gestion Académique</h1>
        <p className="text-muted-foreground mt-1">Consultation de votre emploi du temps et programme</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Mon emploi du temps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { day: 'Lundi', time: '08h-10h', subject: 'Mathématiques', prof: 'M. Dupont', room: 'S103' },
                { day: 'Lundi', time: '10h-12h', subject: 'Français', prof: 'Mme Martin', room: 'L204' },
                { day: 'Mardi', time: '09h-11h', subject: 'Anglais', prof: 'M. Johnson', room: 'L105' },
                { day: 'Mardi', time: '14h-16h', subject: 'Mathématiques', prof: 'M. Dupont', room: 'S103' },
                { day: 'Jeudi', time: '10h-12h', subject: 'Sciences', prof: 'Mme Rousseau', room: 'LAB1' }
              ].map((slot, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <Calendar className="w-5 h-5 text-primary shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold">{slot.day} {slot.time}</p>
                    <p className="text-sm text-muted-foreground">{slot.subject} - {slot.prof}</p>
                  </div>
                  <Badge className="bg-primary/10 text-primary">{slot.room}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <Card>
          <CardHeader>
            <CardTitle>Mes matières</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Mathématiques', hours: '4h/sem' },
                { name: 'Français', hours: '4h/sem' },
                { name: 'Anglais', hours: '3h/sem' },
                { name: 'Sciences', hours: '3h/sem' }
              ].map((subject, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-muted rounded-lg text-sm">
                  <span className="font-medium">{subject.name}</span>
                  <span className="text-muted-foreground">{subject.hours}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Program */}
      <Card>
        <CardHeader>
          <CardTitle>Programme par matière</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { subject: 'Mathématiques', program: 'Algèbre, Géométrie, Probabilités, Statistiques' },
              { subject: 'Français', program: 'Littérature, Grammaire, Écriture, Compréhension' }
            ].map((item, i) => (
              <div key={i} className="border border-border rounded-lg p-4">
                <p className="font-semibold mb-2">{item.subject}</p>
                <p className="text-sm text-muted-foreground">{item.program}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AcademicManagement