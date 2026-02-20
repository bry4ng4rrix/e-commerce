'use client'

import React from 'react'
import { CreditCard, DollarSign } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const AdministrativeStatus = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gestion Administrative</h1>
        <p className="text-muted-foreground mt-1">Consultation de vos paiements et statut</p>
      </div>

      {/* Payment Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Frais de scolarité</p>
                <p className="text-2xl font-bold mt-2">À jour</p>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-8 h-8 text-muted-foreground" />
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Solde: 0 Ar</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Frais de documentation</p>
                <p className="text-2xl font-bold mt-2">À jour</p>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-8 h-8 text-muted-foreground" />
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Solde: 0 Ar</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Autres frais</p>
                <p className="text-2xl font-bold mt-2">À jour</p>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-8 h-8 text-muted-foreground" />
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Solde: 0 Ar</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des paiements</CardTitle>
          <CardDescription>Consultez l'historique complet de vos transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Montant</TableHead>
                <TableHead className="text-center">Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { date: '2026-01-15', desc: 'Frais de scolarité T2', amount: '500,000 Ar', status: 'Payé' },
                { date: '2026-01-01', desc: 'Frais de documentation', amount: '50,000 Ar', status: 'Payé' },
                { date: '2025-12-20', desc: 'Frais de scolarité T1', amount: '500,000 Ar', status: 'Payé' }
              ].map((payment, i) => (
                <TableRow key={i} className="hover:bg-muted/50">
                  <TableCell className="text-sm">{payment.date}</TableCell>
                  <TableCell>{payment.desc}</TableCell>
                  <TableCell className="text-center font-semibold">{payment.amount}</TableCell>
                  <TableCell className="text-center">
                    <Badge className="bg-green-500/20 text-green-600">
                      {payment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdministrativeStatus