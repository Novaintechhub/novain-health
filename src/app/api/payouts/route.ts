
import { NextResponse } from 'next/server';

const payoutsData = [
  {
    date: "15 Nov 2023",
    amount: "₦5000.00",
    status: "Completed",
    method: "Bank Transfer",
  },
  {
    date: "08 Nov 2023",
    amount: "₦3500.00",
    status: "Completed",
    method: "Bank Transfer",
  },
  {
    date: "01 Nov 2023",
    amount: "₦7200.00",
    status: "Completed",
    method: "Bank Transfer",
  },
];

export async function GET() {
  // In a real app, you would fetch this from Firestore based on the logged-in doctor.
  return NextResponse.json(payoutsData);
}
