"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock patient data
const patients = [
  { id: "P0016", name: "Charlene Reed" },
  { id: "P0001", name: "Travis Trimble" },
  { id: "P0002", name: "Carl Kelly" },
  { id: "P0003", name: "Michelle Fairfax" },
];

type Medication = {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
};

export default function CreatePrescription() {
  const { toast } = useToast();
  const router = useRouter();
  const [selectedPatient, setSelectedPatient] = useState("");
  const [medications, setMedications] = useState<Medication[]>([
    { name: "", dosage: "", frequency: "", duration: "", instructions: "" },
  ]);

  const handleAddMedication = () => {
    setMedications([
      ...medications,
      { name: "", dosage: "", frequency: "", duration: "", instructions: "" },
    ]);
  };

  const handleRemoveMedication = (index: number) => {
    const newMedications = medications.filter((_, i) => i !== index);
    setMedications(newMedications);
  };

  const handleMedicationChange = (
    index: number,
    field: keyof Medication,
    value: string
  ) => {
    const newMedications = [...medications];
    newMedications[index][field] = value;
    setMedications(newMedications);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to save the prescription would go here.
    toast({
      title: "Prescription Created",
      description: `Prescription for ${
        patients.find((p) => p.id === selectedPatient)?.name
      } has been saved.`,
    });
    router.push("/doctor/prescriptions");
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">
            <Link href="/doctor">Home</Link> / <Link href="/doctor/prescriptions">Prescriptions</Link> / Create
        </p>
        <h1 className="text-2xl font-bold">Create New Prescription</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Prescription Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="patient-select">Select Patient</Label>
              <Select onValueChange={setSelectedPatient} value={selectedPatient}>
                <SelectTrigger id="patient-select">
                  <SelectValue placeholder="Select a patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name} ({patient.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Medications</Label>
              {medications.map((med, index) => (
                <div
                  key={index}
                  className="rounded-lg border p-4 space-y-4 relative"
                >
                  {medications.length > 1 && (
                     <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-destructive"
                        onClick={() => handleRemoveMedication(index)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`med-name-${index}`}>Medication Name</Label>
                      <Input
                        id={`med-name-${index}`}
                        value={med.name}
                        onChange={(e) => handleMedicationChange(index, "name", e.target.value)}
                        placeholder="e.g., Amoxicillin"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`med-dosage-${index}`}>Dosage</Label>
                      <Input
                        id={`med-dosage-${index}`}
                        value={med.dosage}
                        onChange={(e) => handleMedicationChange(index, "dosage", e.target.value)}
                        placeholder="e.g., 500mg"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                      <Label htmlFor={`med-frequency-${index}`}>Frequency</Label>
                      <Input
                        id={`med-frequency-${index}`}
                        value={med.frequency}
                        onChange={(e) => handleMedicationChange(index, "frequency", e.target.value)}
                        placeholder="e.g., Every 8 hours"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`med-duration-${index}`}>Duration</Label>
                      <Input
                        id={`med-duration-${index}`}
                        value={med.duration}
                        onChange={(e) => handleMedicationChange(index, "duration", e.target.value)}
                        placeholder="e.g., 7 days"
                      />
                    </div>
                  </div>
                   <div className="space-y-2">
                      <Label htmlFor={`med-instructions-${index}`}>Instructions</Label>
                      <Input
                        id={`med-instructions-${index}`}
                        value={med.instructions}
                        onChange={(e) => handleMedicationChange(index, "instructions", e.target.value)}
                        placeholder="e.g., Take with food"
                      />
                    </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={handleAddMedication}
                className="text-cyan-500 border-cyan-500 hover:text-cyan-600 hover:bg-cyan-50"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Another Medication
              </Button>
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="notes">General Notes</Label>
                <Textarea id="notes" placeholder="Add any additional notes for the patient or pharmacist..."/>
            </div>

            <div className="flex justify-end">
                <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white">Save Prescription</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
