
import { NextResponse } from 'next/server';

const reviewsData = [
    {
        id: "1",
        patientName: "Richard Wilson",
        patientAvatar: "https://placehold.co/40x40.png",
        patientAvatarHint: "man portrait",
        rating: 5,
        description: "Great experience with the doctor. Very knowledgeable and explained everything clearly.",
        date: "14 Nov 2023",
    },
    {
        id: "2",
        patientName: "Linda Tobin",
        patientAvatar: "https://placehold.co/40x40.png",
        patientAvatarHint: "woman smiling",
        rating: 4,
        description: "The doctor was helpful and addressed all my concerns. The waiting time was a bit long.",
        date: "12 Nov 2023",
    },
     {
        id: "3",
        patientName: "Paul Richard",
        patientAvatar: "https://placehold.co/40x40.png",
        patientAvatarHint: "doctor smiling",
        rating: 5,
        description: "Excellent service and care. I would highly recommend this doctor to anyone.",
        date: "11 Nov 2023",
    },
];

export async function GET() {
    // In a real app, you would fetch reviews for the logged-in doctor from Firestore.
    return NextResponse.json(reviewsData);
}
