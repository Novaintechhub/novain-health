
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import { appointmentConverter } from '@/lib/firestore-converters';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const idToken = request.headers.get('Authorization')?.split('Bearer ')[1];
    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = await getAdminAuth().verifyIdToken(idToken);
    const doctorId = decodedToken.uid;
    const appointmentId = params.id;

    if (!appointmentId) {
        return NextResponse.json({ error: 'Appointment ID is required' }, { status: 400 });
    }

    const db = getAdminDb();
    const appointmentRef = db.collection('appointments').doc(appointmentId).withConverter(appointmentConverter);
    const doc = await appointmentRef.get();

    if (!doc.exists) {
        return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    const appointment = doc.data()!;

    // Security check: ensure the doctor requesting is the assigned doctor
    if (appointment.doctorId !== doctorId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    return NextResponse.json({ error: 'Failed to fetch appointment' }, { status: 500 });
  }
}
