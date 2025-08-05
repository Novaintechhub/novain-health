import { NextResponse } from 'next/server';

const patients = [
  {
    id: "#P0016",
    name: "Charlene Reed",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "woman smiling",
    age: 29,
    address: "4417 Goosetown Drive, Taylorsville, North Carolina, 28681",
    phone: "828-214-5235",
    lastVisit: "20 Oct 2023",
    paid: "₦100.00"
  },
  {
    id: "#P0001",
    name: "Travis Trimble",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "male doctor portrait",
    age: 23,
    address: "2077 Hilton Street, superbly, Virginia, 20169",
    phone: "703-996-3383",
    lastVisit: "22 Oct 2023",
    paid: "₦200.00"
  },
  {
    id: "#P0002",
    name: "Carl Kelly",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "man portrait",
    age: 29,
    address: "2037 Pearcy Avenue, Decatur, Indiana, 46733",
    phone: "260-724-7769",
    lastVisit: "21 Oct 2023",
    paid: "₦250.00"
  },
  {
    id: "#P0003",
    name: "Michelle Fairfax",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "woman portrait",
    age: 25,
    address: "2037 Pearcy Avenue, Decatur, Indiana, 46733",
    phone: "504-368-6874",
    lastVisit: "21 Sep 2023",
    paid: "₦150.00"
  }
];

export async function GET() {
  return NextResponse.json(patients);
}
