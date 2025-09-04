
import { NextResponse } from 'next/server';

const medicalRecordsData = [
    {
        id: "#MR-0010",
        date: "14 Nov 2023, 10:00 AM",
        description: "General Checkup",
        attachment: "checkup.pdf",
        doctorName: "Dr. Darren Elder",
        doctorSpecialty: "Cardiology",
        doctorAvatarUrl: "https://placehold.co/40x40.png",
        doctorAvatarHint: "male doctor portrait",
    },
    {
        id: "#MR-0009",
        date: "13 Nov 2023, 9:00 AM",
        description: "Blood Test Results",
        attachment: "blood_test.pdf",
        doctorName: "Dr. Linda Tobin",
        doctorSpecialty: "Endocrinology",
        doctorAvatarUrl: "https://placehold.co/40x40.png",
        doctorAvatarHint: "female doctor smiling",
    },
];

export async function GET() {
    // In a real app, you would fetch this data from Firestore based on the logged-in user's ID.
    return NextResponse.json(medicalRecordsData);
}
