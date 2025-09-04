
import { NextResponse } from 'next/server';

const prescriptionsData = [
    {
        id: "PRES-001",
        date: "14 Nov 2023",
        name: "Prescription for General Checkup",
        doctorName: "Dr. Darren Elder",
        doctorSpecialty: "Cardiology",
        doctorAvatarUrl: "https://placehold.co/40x40.png",
        doctorAvatarHint: "male doctor portrait",
    },
    {
        id: "PRES-002",
        date: "13 Nov 2023",
        name: "Prescription for Blood Test",
        doctorName: "Dr. Linda Tobin",
        doctorSpecialty: "Endocrinology",
        doctorAvatarUrl: "https://placehold.co/40x40.png",
        doctorAvatarHint: "female doctor smiling",
    },
];

export async function GET() {
    // In a real app, you would fetch this from Firestore based on the logged-in user.
    return NextResponse.json(prescriptionsData);
}
