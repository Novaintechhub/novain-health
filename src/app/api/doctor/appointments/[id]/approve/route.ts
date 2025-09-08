
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { appointmentConverter, patientConverter } from '@/lib/firestore-converters';
import { sendAppointmentConfirmedEmail } from '@/services/emailService';

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

    const db = getAdminDb();
    const appointmentRef = db.collection('appointments').doc(appointmentId).withConverter(appointmentConverter);
    const appointmentDoc = await appointmentRef.get();

    if (!appointmentDoc.exists) {
        return NextResponse.json({ error: 'Appointment not found.' }, { status: 404 });
    }

    const appointment = appointmentDoc.data()!;

    // Security check: ensure the doctor approving is the assigned doctor
    if (appointment.doctorId !== doctorId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (appointment.status !== 'Pending') {
        return NextResponse.json({ error: 'Appointment is not in a pending state.' }, { status: 400 });
    }

    await appointmentRef.update({ status: 'Approved' });

    // Fetch patient and doctor details for email
    const patientRef = db.collection('patients').doc(appointment.patientId).withConverter(patientConverter);
    const doctorRef = db.collection('doctors').doc(appointment.doctorId); // Fetch without converter
    const [patientDoc, doctorDoc] = await Promise.all([patientRef.get(), doctorRef.get()]);

    if (!patientDoc.exists || !doctorDoc.exists) {
        console.warn(`Could not find patient or doctor for appointment ${appointmentId}`);
    } else {
        const patientData = patientDoc.data()!;
        const doctorData = doctorDoc.data()!; // Raw data

        // Create in-app notification for the patient
        await db.collection('notifications').add({
            userId: appointment.patientId,
            message: `Your appointment with Dr. ${doctorData.firstName} ${doctorData.lastName} has been confirmed.`,
            link: `/patients/appointments`,
            createdAt: new Date().toISOString(),
            read: false,
        });

        // Send confirmation email to the patient
        const appointmentDate = new Date(appointment.appointmentDate);
        await sendAppointmentConfirmedEmail({
            patient: { name: `${patientData.firstName} ${patientData.lastName}`, email: patientData.email! },
            doctorName: `Dr. ${doctorData.firstName} ${doctorData.lastName}`,
            appointmentDate: appointmentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            appointmentTime: appointmentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        });
    }

    return NextResponse.json({ message: 'Appointment approved successfully' });
  } catch (error) {
    console.error('Error approving appointment:', error);
    return NextResponse.json({ error: 'Failed to approve appointment' }, { status: 500 });
  }
}
