
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import { appointmentConverter, doctorConverter } from '@/lib/firestore-converters';
import { sendAppointmentCancelledEmail } from '@/services/emailService';

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
    
    if (appointment.status === 'Cancelled') {
        return NextResponse.json({ error: 'Appointment is already cancelled.' }, { status: 400 });
    }

    await appointmentRef.update({ status: 'Cancelled', cancellationReason: 'Cancelled by patient.' });

    const doctorRef = db.collection('doctors').doc(appointment.doctorId).withConverter(doctorConverter);
    const doctorDoc = await doctorRef.get();

    if (doctorDoc.exists) {
        const doctorData = doctorDoc.data()!;

        await db.collection('notifications').add({
            userId: appointment.doctorId,
            message: `Your appointment with ${appointment.patientName} has been cancelled.`,
            link: `/doctor/appointments`,
            createdAt: new Date().toISOString(),
            read: false,
        });
        
        const appointmentDate = new Date(appointment.appointmentDate);
        await sendAppointmentCancelledEmail({
            // This time, email goes to the doctor
            patient: { name: doctorData.firstName, email: doctorData.email! },
            doctorName: appointment.patientName, // From patient perspective
            appointmentDate: appointmentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            appointmentTime: appointmentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
            reason: "Cancelled by the patient before confirmation.",
        });
    }


    return NextResponse.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    return NextResponse.json({ error: 'Failed to cancel appointment' }, { status: 500 });
  }
}
