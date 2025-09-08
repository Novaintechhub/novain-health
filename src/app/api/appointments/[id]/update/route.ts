
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import { z } from 'zod';
import { doctorConverter, patientConverter } from '@/lib/firestore-converters';
import { sendAppointmentRescheduledEmail } from '@/services/emailService';

const UpdateAppointmentSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  time: z.string(), // e.g., "8:00 AM - 8:30 AM"
  method: z.enum(['Video Call', 'Voice Call', 'Chat']),
  price: z.number(),
  duration: z.string(),
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
    const validation = UpdateAppointmentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const { date, time, method, price, duration } = validation.data;
    const db = getAdminDb();
    
    const appointmentRef = db.collection('appointments').doc(appointmentId);
    const appointmentDoc = await appointmentRef.get();

    if (!appointmentDoc.exists) {
        return NextResponse.json({ error: 'Appointment not found.' }, { status: 404 });
    }

    if (appointmentDoc.data()?.patientId !== patientId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const startTime = time.split(' - ')[0]; 
    const [timePart, ampm] = startTime.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;

    const appointmentDate = new Date(`${date}T00:00:00.000Z`);
    appointmentDate.setUTCHours(hours, minutes, 0, 0);
    
    const updatedAppointmentData = {
        appointmentDate: appointmentDate.toISOString(),
        bookingDate: new Date().toISOString(), // Update booking date to reflect change
        type: method, 
        amount: price.toString(),
        duration: duration,
        status: 'Pending', // Reset status to Pending for re-approval
    };

    await appointmentRef.update(updatedAppointmentData);
    
    // Notify doctor about the update and send email to patient
    const doctorId = appointmentDoc.data()?.doctorId;
    const doctorRef = db.collection('doctors').doc(doctorId).withConverter(doctorConverter);
    const patientRef = db.collection('patients').doc(patientId).withConverter(patientConverter);

    const [doctorDoc, patientDoc] = await Promise.all([doctorRef.get(), patientRef.get()]);

    if (doctorDoc.exists() && patientDoc.exists()) {
        const doctorData = doctorDoc.data()!;
        const patientData = patientDoc.data()!;

        await db.collection('notifications').add({
            userId: doctorId,
            message: `Appointment with ${patientData.firstName} ${patientData.lastName} has been rescheduled.`,
            link: `/doctor/appointments`,
            createdAt: new Date().toISOString(),
            read: false,
        });
        
        // Send email to patient confirming the change request
        await sendAppointmentRescheduledEmail({
            patient: { name: `${patientData.firstName} ${patientData.lastName}`, email: patientData.email! },
            doctorName: `Dr. ${doctorData.firstName} ${doctorData.lastName}`,
            appointmentDate: new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            appointmentTime: time,
        });
    }


    return NextResponse.json({ message: 'Appointment updated successfully' });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 });
  }
}
