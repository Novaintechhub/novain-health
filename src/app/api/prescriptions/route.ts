
import { NextResponse } from 'next/server';

const prescriptions = [
  {
    date: "14 Nov 2024",
    name: "Prescription #2024001",
    patientName: "Tosin Chukwuka",
    doctorName: "Dr. Ruby Perrin",
    doctorSpecialty: "Dental",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor",
  },
  {
    date: "13 Nov 2024",
    name: "Prescription #2024002",
    patientName: "Tosin Chukwuka",
    doctorName: "Dr. Darren Elder",
    doctorSpecialty: "Dental",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "male doctor",
  },
  {
    date: "12 Nov 2024",
    name: "Prescription #2024003",
    patientName: "Charlene Reed",
    doctorName: "Dr. Deborah Angel",
    doctorSpecialty: "Cardiology",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor portrait",
  },
  {
    date: "11 Nov 2024",
    name: "Prescription #2024004",
    patientName: "Travis Trimble",
    doctorName: "Dr. Sofia Brient",
    doctorSpecialty: "Urology",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor smiling",
  },
  {
    date: "10 Nov 2024",
    name: "Prescription #2024005",
    patientName: "Carl Kelly",
    doctorName: "Dr. Marvin Campbell",
    doctorSpecialty: "Dental",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "male doctor portrait",
  },
   {
    date: "9 Nov 2024",
    name: "Prescription #2024006",
    patientName: "Michelle Fairfax",
    doctorName: "Dr. Katharine Berthold",
    doctorSpecialty: "Dental",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor glasses",
  },
];

export async function GET() {
  return NextResponse.json(prescriptions);
}
