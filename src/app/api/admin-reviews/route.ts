import { NextResponse } from 'next/server';

const reviews = [
  {
    id: "#R0001",
    patientName: "Charlene Reed",
    patientAvatar: "https://placehold.co/40x40.png",
    patientAvatarHint: "woman smiling",
    doctorName: "Dr. Ruby Perrin",
    doctorAvatar: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor",
    rating: 5,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "27 Sep 2023, 03.45 PM",
  },
  {
    id: "#R0002",
    patientName: "Travis Trimble",
    patientAvatar: "https://placehold.co/40x40.png",
    patientAvatarHint: "male doctor portrait",
    doctorName: "Dr. Darren Elder",
    doctorAvatar: "https://placehold.co/40x40.png",
    doctorAvatarHint: "male doctor",
    rating: 4,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "25 Sep 2023, 04.15 PM",
  },
];

export async function GET() {
  return NextResponse.json(reviews);
}
