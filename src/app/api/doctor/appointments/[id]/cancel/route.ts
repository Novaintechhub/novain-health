
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import { appointmentConverter, patientConverter } from '@/lib/firestore-converters';
import { sendAppointmentCancelledEmail } from '@/services/emailService';
import { z } from 'zod';

const CancelSchema = z.object({
  reason: z.string().min(10, "A reason for cancellation is required."),
});

export async function POST(
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

    const body = await request.json();
    const validation = CancelSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }
    const { reason } = validation.data;

    const db = getAdminDb();
    const appointmentRef = db.collection('appointments').doc(appointmentId).withConverter(appointmentConverter);
    const appointmentDoc = await appointmentRef.get();

    if (!appointmentDoc.exists) {
        return NextResponse.json({ error: 'Appointment not found.' }, { status: 404 });
    }

    const appointment = appointmentDoc.data()!;

    if (appointment.doctorId !== doctorId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (appointment.status === 'Cancelled') {
        return NextResponse.json({ error: 'Appointment is already cancelled.' }, { status: 400 });
    }

    await appointmentRef.update({ status: 'Cancelled', cancellationReason: reason });

    const patientRef = db.collection('patients').doc(appointment.patientId).withConverter(patientConverter);
    const patientDoc = await patientRef.get();

    if (patientDoc.exists) {
        const patientData = patientDoc.data()!;

        await db.collection('notifications').add({
            userId: appointment.patientId,
            message: `Your appointment with ${appointment.doctorName} has been cancelled.`,
            link: `/patients/appointments`,
            createdAt: new Date().toISOString(),
            read: false,
        });

        const appointmentDate = new Date(appointment.appointmentDate);
        await sendAppointmentCancelledEmail({
            patient: { name: `${patientData.firstName} ${patientData.lastName}`, email: patientData.email! },
            doctorName: appointment.doctorName,
            appointmentDate: appointmentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            appointmentTime: appointmentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
            reason: reason,
        });
    }

    return NextResponse.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    return NextResponse.json({ error: 'Failed to cancel appointment' }, { status: 500 });
  }
}
