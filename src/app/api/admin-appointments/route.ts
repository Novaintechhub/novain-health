import { NextResponse } from 'next/server';

const appointments = [
  {
    id: "#APT0001",
    doctorName: "Dr. Ruby Perrin",
    doctorAvatar: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor",
    specialty: "Dental",
    patientName: "Charlene Reed",
    patientAvatar: "https://placehold.co/40x40.png",
    patientAvatarHint: "woman smiling",
    appointmentTime: "14 Nov 2023, 10.00 AM",
    status: "Approved",
    amount: "₦200.00"
  },
  {
    id: "#APT0002",
    doctorName: "Dr. Darren Elder",
    doctorAvatar: "https://placehold.co/40x40.png",
    doctorAvatarHint: "male doctor",
    specialty: "Dental",
    patientName: "Travis Trimble",
    patientAvatar: "https://placehold.co/40x40.png",
    patientAvatarHint: "male doctor portrait",
    appointmentTime: "12 Nov 2023, 11.00 AM",
    status: "Approved",
    amount: "₦300.00"
  },
  {
    id: "#APT0003",
    doctorName: "Dr. Deborah Angel",
    doctorAvatar: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor portrait",
    specialty: "Cardiology",
    patientName: "Carl Kelly",
    patientAvatar: "https://placehold.co/40x40.png",
    patientAvatarHint: "man portrait",
    appointmentTime: "11 Nov 2023, 12.00 PM",
    status: "Cancelled",
    amount: "₦150.00"
  },
   {
    id: "#APT0004",
    doctorName: "Dr. Sofia Brient",
    doctorAvatar: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor smiling",
    specialty: "Urology",
    patientName: "Michelle Fairfax",
    patientAvatar: "https://placehold.co/40x40.png",
    patientAvatarHint: "woman portrait",
    appointmentTime: "10 Nov 2023, 1.00 PM",
    status: "Approved",
    amount: "₦150.00"
  }
];

export async function GET() {
  return NextResponse.json(appointments);
}
