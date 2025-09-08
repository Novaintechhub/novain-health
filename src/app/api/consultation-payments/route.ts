
import { NextResponse } from 'next/server';

const transactionsData = [
  {
    name: "Richard Wilson",
    id: "#PT0016",
    amount: "₦100.00",
    transactionId: "TRX_20240720_001",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "man portrait",
  },
  {
    name: "Charlene Reed",
    id: "#PT0001",
    amount: "₦200.00",
    transactionId: "TRX_20240719_005",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "woman smiling",
  },
  {
    name: "Travis Trimble",
    id: "#PT0002",
    amount: "₦250.00",
    transactionId: "TRX_20240718_012",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "male doctor portrait",
  },
];

export async function GET() {
  // In a real app, you would fetch this data from Firestore based on the logged-in doctor.
  return NextResponse.json(transactionsData);
}
