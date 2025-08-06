
import { NextResponse } from 'next/server';

const appointments = [
  {
    name: "Tosin Adebayo",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "woman portrait",
    date: "12th October 2025, 4:00 PM",
    bookingDate: "11th October 2025",
    type: "Video Call",
    status: "Approved",
    amount: "₦200",
  },
  {
    name: "Wright Thinker",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "woman smiling",
    date: "16th October 2025, 4:00 PM",
    bookingDate: "15th October 2025",
    type: "Audio Call",
    status: "Cancelled",
    amount: "₦150",
    cancellationReason: "Doctor had a personal emergency.",
  },
  {
    name: "Kanayo Ike",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "man traditional",
    date: "12th October 2025, 4:00 PM",
    bookingDate: "10th October 2025",
    type: "Chat",
    status: "Approved",
    amount: "₦100",
  },
  {
    name: "Victor Thompson",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "man portrait",
    date: "12th October 2025, 4:00 PM",
    bookingDate: "12th October 2025",
    type: "Video Call",
    status: "Pending",
    amount: "₦300",
  },
  {
    name: "Vera Ogechi",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "woman happy",
    date: "22nd January 2024, 10:00 AM",
    bookingDate: "21st January 2024",
    type: "Video Call",
    status: "Completed",
    amount: "₦250",
  },
  {
    name: "Esther Peterson",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "woman looking",
    date: "1st February 2025, 9:00 AM",
    bookingDate: "31st January 2025",
    type: "Chat",
    status: "Approved",
    amount: "₦50",
  },
];

export async function GET() {
  return NextResponse.json(appointments);
}
