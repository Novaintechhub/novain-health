import { NextResponse } from 'next/server';

const doctors = [
  {
    id: "#D0001",
    name: "Dr. Ruby Perrin",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "female doctor",
    specialty: "Dental",
    memberSince: "14 Jan 2017",
    earned: "₦3100.00",
    accountStatus: "active"
  },
  {
    id: "#D0002",
    name: "Dr. Darren Elder",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "male doctor",
    specialty: "Dental",
    memberSince: "11 Jun 2019",
    earned: "₦5000.00",
    accountStatus: "active"
  },
  {
    id: "#D0003",
    name: "Dr. Deborah Angel",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "female doctor portrait",
    specialty: "Cardiology",
    memberSince: "4 Jan 2018",
    earned: "₦3300.00",
    accountStatus: "inactive"
  },
  {
    id: "#D0004",
    name: "Dr. Sofia Brient",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "female doctor smiling",
    specialty: "Urology",
    memberSince: "5 Jul 2017",
    earned: "₦3500.00",
    accountStatus: "active"
  }
];

export async function GET() {
  return NextResponse.json(doctors);
}
