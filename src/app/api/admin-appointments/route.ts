import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { Appointment } from '@/lib/types';
import { appointmentConverter } from '@/lib/firestore-converters';

export async function GET() {
  try {
    const db = getAdminDb();
    const appointmentsRef = db.collection('appointments').withConverter(appointmentConverter);
    const snapshot = await appointmentsRef.orderBy('appointmentDate', 'desc').get();
    
    if (snapshot.empty) {
      return NextResponse.json([]);
    }

    const appointments: Appointment[] = [];
    snapshot.forEach(doc => {
        appointments.push(doc.data());
    });
    
    // You might want to enrich this data with doctor and patient details
    // For simplicity, returning as is for now.

    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}
