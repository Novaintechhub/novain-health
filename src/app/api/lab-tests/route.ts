
import { NextResponse } from 'next/server';

const labTests = [
  {
    testName: "Complete Blood Count (CBC)",
    date: "14 Nov 2023",
    status: "Completed",
    doctorName: "Dr. Ruby Perrin",
    doctorSpecialty: "Dental",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor",
  },
  {
    testName: "Lipid Panel",
    date: "18 Nov 2023",
    status: "Completed",
    doctorName: "Dr. Darren Elder",
    doctorSpecialty: "Dental",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "male doctor",
  },
  {
    testName: "Thyroid Stimulating Hormone (TSH)",
    date: "21 Nov 2023",
    status: "Pending",
    doctorName: "Dr. Deborah Angel",
    doctorSpecialty: "Cardiology",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor portrait",
  },
  {
    testName: "Urinalysis",
    date: "25 Nov 2023",
    status: "Completed",
    doctorName: "Dr. Sofia Brient",
    doctorSpecialty: "Urology",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor smiling",
  },
  {
    testName: "Glucose Tolerance Test",
    date: "28 Nov 2023",
    status: "Pending",
    doctorName: "Dr. Marvin Campbell",
    doctorSpecialty: "Ophthalmology",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "male doctor portrait",
  },
];

export async function GET() {
  return NextResponse.json(labTests);
}
