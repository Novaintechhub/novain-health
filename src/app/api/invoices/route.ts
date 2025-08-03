
import { NextResponse } from 'next/server';

const invoices = [
  {
    invoiceNo: "#INV-0010",
    patientName: "Richard Wilson",
    patientId: "#PT0016",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "man portrait",
    amount: "₦450",
    paidOn: "14 Nov 2019",
  },
  {
    invoiceNo: "#INV-0009",
    patientName: "Charlene Reed",
    patientId: "#PT0001",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "woman smiling",
    amount: "₦200",
    paidOn: "13 Nov 2019",
  },
  {
    invoiceNo: "#INV-0008",
    patientName: "Travis Trimble",
    patientId: "#PT0002",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "male doctor portrait",
    amount: "₦100",
    paidOn: "12 Nov 2019",
  },
  {
    invoiceNo: "#INV-0007",
    patientName: "Carl Kelly",
    patientId: "#PT0003",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "man portrait",
    amount: "₦350",
    paidOn: "11 Nov 2019",
  },
  {
    invoiceNo: "#INV-0006",
    patientName: "Michelle Fairfax",
    patientId: "#PT0004",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "woman portrait",
    amount: "₦275",
    paidOn: "10 Nov 2019",
  },
  {
    invoiceNo: "#INV-0005",
    patientName: "Gina Moore",
    patientId: "#PT0005",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "woman portrait",
    amount: "₦600",
    paidOn: "9 Nov 2019",
  },
  {
    invoiceNo: "#INV-0004",
    patientName: "Elsie Gilley",
    patientId: "#PT0006",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "woman portrait",
    amount: "₦50",
    paidOn: "8 Nov 2019",
  },
  {
    invoiceNo: "#INV-0003",
    patientName: "Joan Gardner",
    patientId: "#PT0007",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "woman portrait",
    amount: "₦400",
    paidOn: "7 Nov 2019",
  },
];

export async function GET() {
  return NextResponse.json(invoices);
}
