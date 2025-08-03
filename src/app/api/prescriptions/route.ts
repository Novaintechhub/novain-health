
import { NextResponse } from 'next/server';

const prescriptions = [
  {
    date: "14 Nov 2019",
    name: "Prescription 1",
    doctorName: "Dr. Ruby Perrin",
    doctorSpecialty: "Dental",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor",
  },
  {
    date: "13 Nov 2019",
    name: "Prescription 2",
    doctorName: "Dr. Darren Elder",
    doctorSpecialty: "Dental",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "male doctor",
  },
  {
    date: "12 Nov 2019",
    name: "Prescription 3",
    doctorName: "Dr. Deborah Angel",
    doctorSpecialty: "Cardiology",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor portrait",
  },
  {
    date: "11 Nov 2019",
    name: "Prescription 4",
    doctorName: "Dr. Sofia Brient",
    doctorSpecialty: "Urology",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor smiling",
  },
  {
    date: "10 Nov 2019",
    name: "Prescription 5",
    doctorName: "Dr. Marvin Campbell",
    doctorSpecialty: "Dental",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "male doctor portrait",
  },
   {
    date: "9 Nov 2019",
    name: "Prescription 6",
    doctorName: "Dr. Katharine Berthold",
    doctorSpecialty: "Dental",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor glasses",
  },
];

export async function GET() {
  return NextResponse.json(prescriptions);
}
