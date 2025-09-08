
import { NextResponse } from 'next/server';

const invoicesData = [
  {
    invoiceNo: "#INV-0010",
    patientName: "Richard Wilson",
    patientId: "#PT0016",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "man portrait",
    amount: "₦100.00",
    paidOn: "14 Nov 2023",
  },
  {
    invoiceNo: "#INV-0009",
    patientName: "Charlene Reed",
    patientId: "#PT0001",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "woman smiling",
    amount: "₦200.00",
    paidOn: "13 Nov 2023",
  },
  {
    invoiceNo: "#INV-0008",
    patientName: "Travis Trimble",
    patientId: "#PT0002",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "male doctor portrait",
    amount: "₦250.00",
    paidOn: "11 Nov 2023",
  },
];

export async function GET() {
  // In a real app, you would fetch this from Firestore based on the logged-in doctor.
  return NextResponse.json(invoicesData);
}
