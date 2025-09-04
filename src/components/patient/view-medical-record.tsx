
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Printer, Download, ChevronLeft, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const medicalRecordData = {
  id: "#MR-0010",
  date: "14 Nov 2023",
  description: "General Checkup",
  doctor: {
    name: "Dr. Darren Elder",
    specialty: "Cardiology",
    clinic: "NovainHealth Medical Center",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "male doctor",
  },
  notes: "Patient reported mild chest pain and shortness of breath. ECG and blood pressure readings are normal. Advised lifestyle changes including diet and exercise. Follow-up in 3 months.",
  attachment: {
    name: "ECG_Report_14-11-23.pdf",
    url: "#"
  }
};

export default function ViewMedicalRecord() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Medical Record Details</h1>
        <Button variant="outline" onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <Card className="p-4 sm:p-8">
        <CardHeader className="p-0 border-b pb-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start">
            <div>
              <CardTitle className="text-2xl mb-2">{medicalRecordData.description}</CardTitle>
              <p className="text-muted-foreground">Record ID: {medicalRecordData.id} | Date: {medicalRecordData.date}</p>
            </div>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
               <Avatar className="h-12 w-12">
                  <AvatarImage src={medicalRecordData.doctor.avatarUrl} alt={medicalRecordData.doctor.name} data-ai-hint={medicalRecordData.doctor.avatarHint} />
                  <AvatarFallback>{medicalRecordData.doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{medicalRecordData.doctor.name}</p>
                    <p className="text-sm text-muted-foreground">{medicalRecordData.doctor.specialty}</p>
                </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
           <div className="space-y-6">
            <div>
                <h3 className="font-semibold text-lg">Doctor's Notes</h3>
                <p className="text-muted-foreground mt-2 bg-gray-50 p-4 rounded-md border">{medicalRecordData.notes}</p>
            </div>
             <div>
                <h3 className="font-semibold text-lg">Attachment</h3>
                <div className="flex items-center justify-between p-3 mt-2 rounded-lg border bg-gray-50/50">
                    <div className="flex items-center gap-4">
                        <FileText className="h-6 w-6 text-primary"/>
                        <p className="font-semibold">{medicalRecordData.attachment.name}</p>
                    </div>
                    <a href={medicalRecordData.attachment.url} download>
                        <Button variant="ghost" size="icon">
                            <Download className="h-5 w-5"/>
                        </Button>
                    </a>
                </div>
            </div>
           </div>
        </CardContent>
        <CardFooter className="p-0 mt-8 pt-6 border-t">
            <div className="flex justify-end w-full gap-2">
                <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Print</Button>
                <Button as="a" href={medicalRecordData.attachment.url} download className="bg-cyan-500 hover:bg-cyan-600 text-white"><Download className="mr-2 h-4 w-4" /> Download</Button>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
