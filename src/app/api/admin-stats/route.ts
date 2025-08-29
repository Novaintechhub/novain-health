import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';

export async function GET() {
  try {
    const db = getAdminDb();
    const patientsSnapshot = await db.collection('patients').get();
    const doctorsSnapshot = await db.collection('doctors').get();
    const appointmentsSnapshot = await db.collection('appointments').get();

    // In a real app, total revenue would be calculated from successful payments.
    // Here, we'll use a placeholder value.
    const totalRevenue = 500000;

    const stats = {
      totalPatients: patientsSnapshot.size,
      totalDoctors: doctorsSnapshot.size,
      totalAppointments: appointmentsSnapshot.size,
      totalRevenue: totalRevenue,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ error: 'Failed to fetch admin stats' }, { status: 500 });
  }
}
