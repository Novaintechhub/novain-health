
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Download, ChevronLeft, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const recordData = {
  id: "#MR-0010",
  date: "14 Nov 2019",
  description: "Dental Filling",
  attachmentUrl: "/dental-test.pdf",
  doctor: {
    name: "Dr. Ruby Perrin",
    specialty: "Dental",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "female doctor",
  },
  patient: {
      name: "Tosin Chukwuka",
      id: "P0016"
  },
  notes: "The dental filling procedure was successful. The patient reported minimal discomfort. Advised to avoid hard foods for 24 hours. Follow-up scheduled in 6 months for a routine check-up."
};

export default function ViewMedicalRecord() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Medical Record</h1>
        <Button variant="outline" onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <Card className="p-4 sm:p-8">
        <CardHeader className="p-0 border-b pb-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start">
            <div>
              <CardTitle className="text-2xl mb-2">{recordData.description}</CardTitle>
              <p className="text-muted-foreground">Record ID: {recordData.id} | Date: {recordData.date}</p>
            </div>
             <div className="mt-4 sm:mt-0">
                <Image src="/logo.png" alt="NovainHealth Logo" width={124} height={34} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-2">Patient Details</h3>
              <p>{recordData.patient.name}</p>
              <p className="text-sm text-muted-foreground">Patient ID: {recordData.patient.id}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Created By</h3>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={recordData.doctor.avatarUrl} alt={recordData.doctor.name} data-ai-hint={recordData.doctor.avatarHint} />
                  <AvatarFallback>{recordData.doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p>{recordData.doctor.name}</p>
                  <p className="text-sm text-muted-foreground">{recordData.doctor.specialty}</p>
                </div>
              </div>
            </div>
          </div>
          
           <div className="mb-8">
            <h3 className="font-semibold text-lg">Doctor's Notes</h3>
            <p className="text-muted-foreground mt-2 bg-gray-50 p-4 rounded-md border">{recordData.notes}</p>
           </div>

           <div>
             <h3 className="font-semibold text-lg mb-2">Attachment</h3>
             <div className="flex items-center justify-between p-3 rounded-lg border bg-gray-50/50">
                <div className="flex items-center gap-4">
                    <FileText className="h-6 w-6 text-primary"/>
                    <p className="font-semibold text-blue-600 hover:underline cursor-pointer">{recordData.attachmentUrl.split('/').pop()}</p>
                </div>
                <Button variant="ghost" size="icon">
                    <Download className="h-5 w-5"/>
                </Button>
            </div>
           </div>

        </CardContent>
        <CardFooter className="p-0 mt-8 pt-6 border-t flex justify-end">
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white"><Download className="mr-2 h-4 w-4" /> Download Full Record</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
