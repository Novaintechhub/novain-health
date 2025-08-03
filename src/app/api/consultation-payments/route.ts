
import { NextResponse } from 'next/server';

const transactions = [
  {
    name: "Vera Ogechi",
    id: "#00016",
    amount: "₦150",
    transactionId: "25JN03/67890/TN04",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "woman happy",
  },
  {
    name: "Ovie Whiskey",
    id: "#02016",
    amount: "₦150",
    transactionId: "25JN03/67890/TN04",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "man smiling",
  },
  {
    name: "Peter Ogene",
    id: "#140016",
    amount: "₦150",
    transactionId: "25JN03/67890/TN04",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "man portrait",
  },
  {
    name: "Sophia Zara",
    id: "#00016",
    amount: "₦150",
    transactionId: "25JN03/67890/TN04",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "woman portrait",
  },
  {
    name: "Chicha Tobe",
    id: "#00066",
    amount: "₦150",
    transactionId: "25JN03/67890/TN04",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "woman traditional",
  },
  {
    name: "Carol Susan",
    id: "#110016",
    amount: "₦150",
    transactionId: "25JN03/67890/TN04",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "woman smiling",
  },
];

export async function GET() {
  return NextResponse.json(transactions);
}
