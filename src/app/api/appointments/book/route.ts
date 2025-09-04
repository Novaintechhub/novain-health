
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import { z } from 'zod';
import { patientConverter, doctorConverter } from '@/lib/firestore-converters';

const BookAppointmentSchema = z.object({
  doctorId: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  time: z.string(), // e.g., "8:00 AM - 8:30 AM"
});

export async function POST(request: Request) {
  try {
    const idToken = headers().get('Authorization')?.split('Bearer ')[1];
    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = await getAdminAuth().verifyIdToken(idToken);
    const patientId = decodedToken.uid;

    const body = await request.json();
    const validation = BookAppointmentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const { doctorId, date, time } = validation.data;
    const db = getAdminDb();
    
    // Fetch patient and doctor details to enrich the appointment document
    const patientRef = db.collection('patients').doc(patientId).withConverter(patientConverter);
    const doctorRef = db.collection('doctors').doc(doctorId).withConverter(doctorConverter);

    const [patientDoc, doctorDoc] = await Promise.all([patientRef.get(), doctorRef.get()]);

    if (!patientDoc.exists || !doctorDoc.exists) {
        return NextResponse.json({ error: 'Patient or Doctor not found.' }, { status: 404 });
    }
    
    const patientData = patientDoc.data()!;
    const doctorData = doctorDoc.data()!;

    // Combine date and start time to create a full Date object for sorting
    const startTime = time.split(' - ')[0]; // "8:00 AM"
    const [timePart, ampm] = startTime.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;

    const appointmentDate = new Date(date);
    appointmentDate.setUTCHours(hours, minutes, 0, 0);

    const newAppointment = {
        patientId,
        doctorId,
        appointmentDate: appointmentDate.toISOString(),
        bookingDate: new Date().toISOString(),
        type: 'Video Call', // Default or could be passed from client
        status: 'Pending',
        amount: doctorData.price || '0',
        // Denormalized data for easier display
        patientName: `${patientData.firstName} ${patientData.lastName}`,
        patientAvatar: patientData.imageUrl || '',
        doctorName: `Dr. ${doctorData.firstName} ${doctorData.lastName}`,
        doctorAvatar: doctorData.imageUrl || '',
        specialty: doctorData.specialty || 'General Practice',
    };

    await db.collection('appointments').add(newAppointment);

    return NextResponse.json({ message: 'Appointment requested successfully' });
  } catch (error) {
    console.error('Error booking appointment:', error);
    return NextResponse.json({ error: 'Failed to book appointment' }, { status: 500 });
  }
}
