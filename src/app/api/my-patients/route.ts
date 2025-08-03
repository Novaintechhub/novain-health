
import { NextResponse } from 'next/server';

const patients = [
  {
    id: "P0017",
    name: "Tosin Adebayo",
    location: "New York, United States",
    gender: "Female",
    age: "29 Years",
    genotype: "AS",
    bloodGroup: "AB+",
    avatarUrl: "https://placehold.co/100x100.png",
    avatarHint: "woman portrait",
  },
  {
    id: "P0018",
    name: "Tosin Adebayo",
    location: "New York, United States",
    gender: "Female",
    age: "29 Years",
    genotype: "AS",
    bloodGroup: "AB+",
    avatarUrl: "https://placehold.co/100x100.png",
    avatarHint: "woman portrait",
  },
  {
    id: "P0019",
    name: "Tosin Adebayo",
    location: "New York, United States",
    gender: "Female",
    age: "29 Years",
    genotype: "AS",
    bloodGroup: "AB+",
    avatarUrl: "https://placehold.co/100x100.png",
    avatarHint: "woman portrait",
  },
  {
    id: "P0020",
    name: "Tosin Adebayo",
    location: "New York, United States",
    gender: "Female",
    age: "29 Years",
    genotype: "AS",
    bloodGroup: "AB+",
    avatarUrl: "https://placehold.co/100x100.png",
    avatarHint: "woman portrait",
  },
  {
    id: "P0021",
    name: "Tosin Adebayo",
    location: "New York, United States",
    gender: "Female",
    age: "29 Years",
    genotype: "AS",
    bloodGroup: "AB+",
    avatarUrl: "https://placehold.co/100x100.png",
    avatarHint: "woman portrait",
  },
  {
    id: "P0022",
    name: "Tosin Adebayo",
    location: "New York, United States",
    gender: "Female",
    age: "29 Years",
    genotype: "AS",
    bloodGroup: "AB+",
    avatarUrl: "https://placehold.co/100x100.png",
    avatarHint: "woman portrait",
  },
];

export async function GET() {
  return NextResponse.json(patients);
}
