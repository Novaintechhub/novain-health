
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import { z } from 'zod';
import { appointmentConverter, patientConverter, doctorConverter } from '@/lib/firestore-converters';
import { isPast } from 'date-fns';

const NoShowSchema = z.object({
  action: z.enum(['refund', 'reschedule']),
});

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const idToken = headers().get('Authorization')?.split('Bearer ')[1];
    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = await getAdminAuth().verifyIdToken(idToken);
    const patientId = decodedToken.uid;
    const appointmentId = params.id;

    const body = await request.json();
    const validation = NoShowSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }
    const { action } = validation.data;

    const db = getAdminDb();
    const appointmentRef = db.collection('appointments').doc(appointmentId).withConverter(appointmentConverter);
    const appointmentDoc = await appointmentRef.get();

    if (!appointmentDoc.exists) {
      return NextResponse.json({ error: 'Appointment not found.' }, { status: 404 });
    }

    const appointment = appointmentDoc.data()!;

    if (appointment.patientId !== patientId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (!isPast(new Date(appointment.appointmentDate))) {
      return NextResponse.json({ error: 'Cannot report no-show for a future appointment.' }, { status: 400 });
    }
    
    if (appointment.status !== 'Approved') {
        return NextResponse.json({ error: 'Can only report no-show for approved appointments.' }, { status: 400 });
    }

    // Update appointment status
    await appointmentRef.update({ status: 'No-Show' });

    const patientRef = db.collection('patients').doc(patientId).withConverter(patientConverter);

    if (action === 'refund') {
      // In a real app, this would be a transactional update.
      // For now, we'll just update the patient's wallet balance if it exists.
      const patientDoc = await patientRef.get();
      if (patientDoc.exists) {
        const patientData = patientDoc.data()!;
        const currentBalance = patientData.walletBalance || 0;
        const refundAmount = parseFloat(appointment.amount);
        await patientRef.update({ walletBalance: currentBalance + refundAmount });
      }
    }
    
    // Notify doctor
     await db.collection('notifications').add({
        userId: appointment.doctorId,
        message: `Patient ${appointment.patientName} reported a no-show for your appointment.`,
        link: `/doctor/appointments`,
        createdAt: new Date().toISOString(),
        read: false,
    });

    return NextResponse.json({ 
        message: 'No-show reported successfully.',
        redirectPath: action === 'reschedule' ? `/patients/reschedule-appointment?id=${appointmentId}` : '/patients/appointments'
    });
  } catch (error) {
    console.error('Error reporting no-show:', error);
    return NextResponse.json({ error: 'Failed to report no-show' }, { status: 500 });
  }
}
