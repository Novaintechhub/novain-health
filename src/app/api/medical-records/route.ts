
import { NextResponse } from 'next/server';

const medicalRecords = [
  {
    id: "#MR-0010",
    date: "14 Nov 2019",
    description: "Dental Filling",
    attachment: "dental-test.pdf",
    doctorName: "Dr. Ruby Perrin",
    doctorSpecialty: "Dental",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor",
    visibility: "Public",
  },
  {
    id: "#MR-0009",
    date: "13 Nov 2019",
    description: "Teeth Cleaning",
    attachment: "dental-test.pdf",
    doctorName: "Dr. Darren Elder",
    doctorSpecialty: "Dental",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "male doctor",
    visibility: "Public",
  },
  {
    id: "#MR-0008",
    date: "12 Nov 2019",
    description: "General Checkup",
    attachment: "cardio-test.pdf",
    doctorName: "Dr. Deborah Angel",
    doctorSpecialty: "Cardiology",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor portrait",
    visibility: "Private",
  },
  {
    id: "#MR-0007",
    date: "11 Nov 2019",
    description: "General Test",
    attachment: "general-test.pdf",
    doctorName: "Dr. Sofia Brient",
    doctorSpecialty: "Urology",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor smiling",
    visibility: "Public",
  },
  {
    id: "#MR-0006",
    date: "10 Nov 2019",
    description: "Eye Test",
    attachment: "eye-test.pdf",
    doctorName: "Dr. Marvin Campbell",
    doctorSpecialty: "Ophthalmology",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "male doctor portrait",
    visibility: "Public",
  },
   {
    id: "#MR-0005",
    date: "9 Nov 2019",
    description: "Anaemia",
    attachment: "anaemia-test.pdf",
    doctorName: "Dr. Katharine Berthold",
    doctorSpecialty: "Dental",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor glasses",
    visibility: "Private",
  },
];

export async function GET() {
  return NextResponse.json(medicalRecords);
}
