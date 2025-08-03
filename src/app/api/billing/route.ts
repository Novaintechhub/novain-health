
import { NextResponse } from 'next/server';

const billingData = [
  {
    invoiceNo: "#INV-0010",
    doctorName: "Dr. Ruby Perrin",
    doctorSpecialty: "Dental",
    amount: "₦450",
    paidOn: "14 Nov 2019",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor",
  },
  {
    invoiceNo: "#INV-0009",
    doctorName: "Dr. Darren Elder",
    doctorSpecialty: "Dental",
    amount: "₦300",
    paidOn: "13 Nov 2019",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "male doctor",
  },
  {
    invoiceNo: "#INV-0008",
    doctorName: "Dr. Deborah Angel",
    doctorSpecialty: "Cardiology",
    amount: "₦150",
    paidOn: "12 Nov 2019",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor portrait",
  },
  {
    invoiceNo: "#INV-0007",
    doctorName: "Dr. Sofia Brient",
    doctorSpecialty: "Urology",
    amount: "₦50",
    paidOn: "11 Nov 2019",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor smiling",
  },
  {
    invoiceNo: "#INV-0006",
    doctorName: "Dr. Marvin Campbell",
    doctorSpecialty: "Ophthalmology",
    amount: "₦600",
    paidOn: "10 Nov 2019",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "male doctor portrait",
  },
   {
    invoiceNo: "#INV-0005",
    doctorName: "Dr. Katharine Berthold",
    doctorSpecialty: "Dental",
    amount: "₦200",
    paidOn: "9 Nov 2019",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor glasses",
  },
];

export async function GET() {
  return NextResponse.json(billingData);
}
