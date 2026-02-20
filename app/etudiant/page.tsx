'use client'

import React, { useState } from 'react'
import { BookOpen, BarChart3, Clock, FileText, Bell, Calendar, Download } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const StudentDashboardOverview = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground mt-1">Bienvenue sur votre portail étudiant sécurisé</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Classe</p>
                <p className="text-2xl font-bold">2nde C</p>
              </div>
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Moyenne générale</p>
                <p className="text-2xl font-bold">12.8/20</p>
              </div>
              <BarChart3 className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taux présence</p>
                <p className="text-2xl font-bold">94.5%</p>
              </div>
              <Clock className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Paiements</p>
                <p className="text-2xl font-bold">À jour</p>
                <Badge variant="default" className="mt-2 bg-green-500/20 text-green-600">
                  À jour
                </Badge>
              </div>
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mes matières</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Mathématiques', prof: 'M. Dupont', avg: 14.5 },
                { name: 'Français', prof: 'Mme Martin', avg: 12.0 },
                { name: 'Anglais', prof: 'M. Johnson', avg: 13.5 }
              ].map((subject, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-semibold text-sm">{subject.name}</p>
                    <p className="text-xs text-muted-foreground">{subject.prof}</p>
                  </div>
                  <p className="font-bold text-primary">{subject.avg}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Annonces récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { message: 'Réunion parents-profs mercredi', date: "Aujourd'hui" },
                { message: 'Bulletins validés pour T2', date: 'Il y a 2j' },
                { message: 'Fermeture établissement 25 jan', date: 'Il y a 3j' }
              ].map((annonce, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <Bell className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">{annonce.message}</p>
                    <p className="text-xs text-muted-foreground">{annonce.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default StudentDashboardOverview