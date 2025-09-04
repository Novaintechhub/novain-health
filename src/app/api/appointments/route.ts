
import { NextResponse } from 'next/server';

const appointmentsData = [
    {
        name: "Dr. Tosin Adebayo",
        avatarUrl: "https://placehold.co/40x40.png",
        avatarHint: "female doctor",
        date: "11th December 2024, 10:00 AM",
        bookingDate: "10th Dec 2024",
        type: "Video Call",
        status: "Approved",
        amount: "₦15,000",
    },
    {
        name: "Dr. Musa Ahmed",
        avatarUrl: "https://placehold.co/40x40.png",
        avatarHint: "male doctor portrait",
        date: "14th December 2024, 1:00 PM",
        bookingDate: "12th Dec 2024",
        type: "Audio Call",
        status: "Completed",
        amount: "₦10,000",
    },
    {
        name: "Dr. Peter Obi",
        avatarUrl: "https://placehold.co/40x40.png",
        avatarHint: "doctor smiling",
        date: "16th December 2024, 9:30 AM",
        bookingDate: "15th Dec 2024",
        type: "Chat",
        status: "Pending",
        amount: "₦5,000",
    },
    {
        name: "Dr. Chima Okenwa",
        avatarUrl: "https://placehold.co/40x40.png",
        avatarHint: "female doctor glasses",
        date: "24th November 2024, 6:00 PM",
        bookingDate: "20th Nov 2024",
        type: "Video Call",
        status: "Cancelled",
        amount: "₦15,000",
        cancellationReason: "Doctor had an emergency.",
    },
];

export async function GET() {
    return NextResponse.json(appointmentsData);
}
