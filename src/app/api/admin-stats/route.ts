import { NextResponse } from 'next/server';

const stats = {
  totalPatients: 1500,
  totalDoctors: 75,
  totalAppointments: 85,
  totalRevenue: 500000,
};

export async function GET() {
  return NextResponse.json(stats);
}
