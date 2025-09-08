
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import type { Appointment } from '@/lib/types';
import { appointmentConverter } from '@/lib/firestore-converters';

export async function GET() {
  try {
    const idToken = headers().get('Authorization')?.split('Bearer ')[1];
    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = await getAdminAuth().verifyIdToken(idToken);
    const patientId = decodedToken.uid;

    const db = getAdminDb();
    const appointmentsRef = db.collection('appointments').withConverter(appointmentConverter);
    const snapshot = await appointmentsRef.where('patientId', '==', patientId).orderBy('appointmentDate', 'desc').get();

    if (snapshot.empty) {
      return NextResponse.json([]);
    }

    const appointments: Appointment[] = [];
    snapshot.forEach(doc => {
        appointments.push(doc.data());
    });

    return NextResponse.json(appointments);

  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}
