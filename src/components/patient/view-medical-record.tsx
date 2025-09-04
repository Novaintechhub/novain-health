
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Printer, Download, ChevronLeft, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

type MedicalRecord = {
  id: string;
  date: string;
  description: string;
  doctor: {
    name: string;
    specialty: string;
    clinic: string;
    avatarUrl: string;
    avatarHint: string;
  };
  notes: string;
  attachment: {
    name: string;
    url: string;
  };
};

export default function ViewMedicalRecord() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recordId = searchParams.get("id");
  const [recordData, setRecordData] = useState<MedicalRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!recordId) {
        setLoading(false);
        return;
    };
    
    async function fetchRecord() {
        try {
            const response = await fetch(`/api/medical-record/${recordId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch medical record");
            }
            const data = await response.json();
            setRecordData(data);
        } catch(error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    
    fetchRecord();
  }, [recordId]);

  if (loading) {
      return (
          <div className="space-y-6">
              <div className="flex justify-between items-center">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-10 w-24" />
              </div>
              <Card className="p-4 sm:p-8">
                <CardHeader className="p-0 border-b pb-6 mb-6">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                </CardHeader>
                <CardContent className="p-0 space-y-6">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
          </div>
      )
  }

  if (!recordData) {
      return (
          <div className="text-center py-10">
              <h2 className="text-xl font-semibold">Medical Record Not Found</h2>
              <p className="text-muted-foreground mt-2">The record you are looking for does not exist or could not be loaded.</p>
              <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
          </div>
      )
  }

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
              <CardTitle className="text-2xl mb-2">{recordData.description}</CardTitle>
              <p className="text-muted-foreground">Record ID: {recordData.id} | Date: {recordData.date}</p>
            </div>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
               <Avatar className="h-12 w-12">
                  <AvatarImage src={recordData.doctor.avatarUrl} alt={recordData.doctor.name} data-ai-hint={recordData.doctor.avatarHint} />
                  <AvatarFallback>{recordData.doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{recordData.doctor.name}</p>
                    <p className="text-sm text-muted-foreground">{recordData.doctor.specialty}</p>
                </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
           <div className="space-y-6">
            <div>
                <h3 className="font-semibold text-lg">Doctor's Notes</h3>
                <p className="text-muted-foreground mt-2 bg-gray-50 p-4 rounded-md border">{recordData.notes}</p>
            </div>
             <div>
                <h3 className="font-semibold text-lg">Attachment</h3>
                <div className="flex items-center justify-between p-3 mt-2 rounded-lg border bg-gray-50/50">
                    <div className="flex items-center gap-4">
                        <FileText className="h-6 w-6 text-primary"/>
                        <p className="font-semibold">{recordData.attachment.name}</p>
                    </div>
                    <a href={recordData.attachment.url} download>
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
                <Button as="a" href={recordData.attachment.url} download className="bg-cyan-500 hover:bg-cyan-600 text-white"><Download className="mr-2 h-4 w-4" /> Download</Button>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
