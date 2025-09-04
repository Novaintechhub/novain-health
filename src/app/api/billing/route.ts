
import { NextResponse } from 'next/server';

const billingData = [
    {
        invoiceNo: "#INV-0010",
        doctorName: "Dr. Darren Elder",
        doctorSpecialty: "Cardiology",
        amount: "₦150.00",
        paidOn: "14 Nov 2023",
        doctorAvatarUrl: "https://placehold.co/40x40.png",
        doctorAvatarHint: "male doctor portrait",
    },
    {
        invoiceNo: "#INV-0009",
        doctorName: "Dr. Linda Tobin",
        doctorSpecialty: "Endocrinology",
        amount: "₦200.00",
        paidOn: "13 Nov 2023",
        doctorAvatarUrl: "https://placehold.co/40x40.png",
        doctorAvatarHint: "female doctor smiling",
    },
    {
        invoiceNo: "#INV-0008",
        doctorName: "Dr. Paul Richard",
        doctorSpecialty: "Dermatology",
        amount: "₦250.00",
        paidOn: "11 Nov 2023",
        doctorAvatarUrl: "https://placehold.co/40x40.png",
        doctorAvatarHint: "doctor smiling",
    },
];

export async function GET() {
    // In a real app, you would fetch this from Firestore based on the logged-in user.
    return NextResponse.json(billingData);
}
