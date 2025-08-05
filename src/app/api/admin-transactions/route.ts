import { NextResponse } from 'next/server';

const transactions = [
  {
    invoiceNumber: "#INV-0010",
    patientId: "#PT0016",
    patientName: "Richard Wilson",
    patientAvatar: "https://placehold.co/40x40.png",
    patientAvatarHint: "man portrait",
    totalAmount: "₦200.00",
    status: "Paid",
    date: "14 Nov 2023"
  },
  {
    invoiceNumber: "#INV-0009",
    patientId: "#PT0001",
    patientName: "Charlene Reed",
    patientAvatar: "https://placehold.co/40x40.png",
    patientAvatarHint: "woman smiling",
    totalAmount: "₦100.00",
    status: "Paid",
    date: "13 Nov 2023"
  },
  {
    invoiceNumber: "#INV-0008",
    patientId: "#PT0002",
    patientName: "Travis Trimble",
    patientAvatar: "https://placehold.co/40x40.png",
    patientAvatarHint: "male doctor portrait",
    totalAmount: "₦350.00",
    status: "Pending",
    date: "12 Nov 2023"
  },
  {
    invoiceNumber: "#INV-0007",
    patientId: "#PT0003",
    patientName: "Carl Kelly",
    patientAvatar: "https://placehold.co/40x40.png",
    patientAvatarHint: "man portrait",
    totalAmount: "₦450.00",
    status: "Paid",
    date: "11 Nov 2023"
  }
];

export async function GET() {
  return NextResponse.json(transactions);
}
