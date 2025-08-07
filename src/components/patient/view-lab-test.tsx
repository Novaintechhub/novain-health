
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Printer, Download, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const labTestData = {
  testName: "Complete Blood Count (CBC)",
  date: "14 Nov 2023",
  doctor: {
    name: "Dr. Ruby Perrin",
    specialty: "Dental",
    clinic: "NovainHealth Dental Care",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "female doctor",
  },
  results: [
    { component: "White Blood Cell Count", result: "7.2", normalRange: "4.5-11.0", unit: "x10^9/L" },
    { component: "Red Blood Cell Count", result: "4.95", normalRange: "4.2-5.4", unit: "x10^12/L" },
    { component: "Hemoglobin", result: "15.1", normalRange: "13.5-17.5", unit: "g/dL" },
    { component: "Hematocrit", result: "45.2", normalRange: "41-50", unit: "%" },
    { component: "Platelet Count", result: "250", normalRange: "150-450", unit: "x10^9/L" },
  ],
  notes: "All results are within the normal range. No abnormalities detected."
};

export default function ViewLabTest() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Lab Test Results</h1>
        <Button variant="outline" onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <Card className="p-4 sm:p-8">
        <CardHeader className="p-0 border-b pb-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start">
            <div>
              <CardTitle className="text-2xl mb-2">{labTestData.testName}</CardTitle>
              <p className="text-muted-foreground">Date: {labTestData.date}</p>
            </div>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
               <Avatar className="h-12 w-12">
                  <AvatarImage src={labTestData.doctor.avatarUrl} alt={labTestData.doctor.name} data-ai-hint={labTestData.doctor.avatarHint} />
                  <AvatarFallback>{labTestData.doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{labTestData.doctor.name}</p>
                    <p className="text-sm text-muted-foreground">{labTestData.doctor.specialty}</p>
                </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <h3 className="font-semibold mb-4 text-lg">Results</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Component</TableHead>
                  <TableHead className="text-center">Result</TableHead>
                  <TableHead className="text-center">Normal Range</TableHead>
                  <TableHead className="text-right">Unit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {labTestData.results.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{result.component}</TableCell>
                    <TableCell className="text-center">{result.result}</TableCell>
                    <TableCell className="text-center">{result.normalRange}</TableCell>
                    <TableCell className="text-right">{result.unit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
           <div className="mt-8">
            <h3 className="font-semibold text-lg">Doctor's Notes</h3>
            <p className="text-muted-foreground mt-2 bg-gray-50 p-4 rounded-md border">{labTestData.notes}</p>
           </div>
        </CardContent>
        <CardFooter className="p-0 mt-8 pt-6 border-t">
            <div className="flex justify-end w-full gap-2">
                <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Print</Button>
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white"><Download className="mr-2 h-4 w-4" /> Download</Button>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
