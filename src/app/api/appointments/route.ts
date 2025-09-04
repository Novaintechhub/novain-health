
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

    const appointments: Partial<Appointment>[] = [];
    snapshot.forEach(doc => {
        const appointmentData = doc.data();
        // The frontend component expects 'name' for the doctor's name and 'avatarUrl' for the avatar.
        // Let's map the fields to match what the component expects.
        appointments.push({
            name: appointmentData.doctorName,
            avatarUrl: appointmentData.doctorAvatar,
            avatarHint: appointmentData.doctorAvatarHint,
            date: new Date(appointmentData.appointmentDate).toLocaleString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            }),
            bookingDate: new Date(appointmentData.bookingDate).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            }),
            type: appointmentData.type,
            status: appointmentData.status,
            amount: `₦${appointmentData.amount}`,
            cancellationReason: appointmentData.cancellationReason,
        });
    });

    return NextResponse.json(appointments);

  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}
