// app/gestion-eleves/page.tsx
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

// Données exemple
const classesData = [
  {
    nomClasse: "6ème",
    eleves: [
      { matricule: "6A001", nom: "Rabe", prenom: "Jean", dob: "2011-04-15", moyenne: 15.2, absences: 2 },
      { matricule: "6A002", nom: "Ando", prenom: "Lina", dob: "2011-08-22", moyenne: 12.5, absences: 5 },
    ],
  },
  {
    nomClasse: "5ème",
    eleves: [
      { matricule: "5B001", nom: "Rakoto", prenom: "Mamy", dob: "2010-05-30", moyenne: 14.7, absences: 3 },
      { matricule: "5B002", nom: "Ranaivo", prenom: "Sara", dob: "2010-09-12", moyenne: 11.3, absences: 6 },
    ],
  },
  // Ajouter autres classes
];

export default function GestionElevesPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedClasse, setSelectedClasse] = useState(classesData[0].nomClasse);

  const currentClasse = classesData.find((c) => c.nomClasse === selectedClasse);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Tableau des évaluations et absences</CardTitle>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
          />
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filtre par classe */}
          <div className="flex items-center gap-4">
            <span className="font-semibold">Classe :</span>
            {classesData.map((classe) => (
              <Button
                key={classe.nomClasse}
                variant={selectedClasse === classe.nomClasse ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedClasse(classe.nomClasse)}
              >
                {classe.nomClasse}
              </Button>
            ))}
          </div>

          {/* Tableau des élèves de la classe sélectionnée */}
          {currentClasse && (
            <Card className="border border-gray-200">
              <CardHeader className="flex justify-between items-center">
                <CardTitle>
                  {currentClasse.nomClasse}{" "}
                  <Badge variant="secondary">{currentClasse.eleves.length} élèves</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Matricule</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Prénom</TableHead>
                      <TableHead>Date de naissance</TableHead>
                      <TableHead>Moyenne générale</TableHead>
                      <TableHead>Total d'absences</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentClasse.eleves
                      .sort((a, b) => b.moyenne - a.moyenne) // tri par moyenne décroissante
                      .map((eleve) => (
                        <TableRow key={eleve.matricule}>
                          <TableCell>{eleve.matricule}</TableCell>
                          <TableCell>{eleve.nom}</TableCell>
                          <TableCell>{eleve.prenom}</TableCell>
                          <TableCell>{format(new Date(eleve.dob), "dd/MM/yyyy")}</TableCell>
                          <TableCell>{eleve.moyenne.toFixed(2)}</TableCell>
                          <TableCell>{eleve.absences}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Détails
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
