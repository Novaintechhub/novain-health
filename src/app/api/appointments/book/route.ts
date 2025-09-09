
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import { z } from 'zod';
import { patientConverter, doctorConverter } from '@/lib/firestore-converters';
import { sendAppointmentRequestEmails } from '@/services/emailService';

const ConsultationDetailsSchema = z.object({
  symptoms: z.string().min(1, "Symptoms are required."),
  symptomsStartDate: z.string().min(1, "Symptom start date is required."),
  existingConditions: z.string().min(1, "Existing conditions are required."),
  currentMedications: z.string().min(1, "Current medications are required."),
  allergies: z.string().min(1, "Allergies are required."),
  seenDoctorBefore: z.enum(['Yes', 'No']),
  medicalRecordUri: z.string().optional(),
});

const BookAppointmentSchema = z.object({
  doctorId: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  time: z.string(), // e.g., "8:00 AM - 8:30 AM"
  method: z.enum(['Video Call', 'Voice Call', 'Chat']),
  price: z.number(),
  duration: z.string(),
  consultationDetails: ConsultationDetailsSchema,
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

    const { doctorId, date, time, method, price, duration, consultationDetails } = validation.data;
    const db = getAdminDb();
    
    const patientRef = db.collection('patients').doc(patientId).withConverter(patientConverter);
    const doctorRef = db.collection('doctors').doc(doctorId).withConverter(doctorConverter);

    const [patientDoc, doctorDoc] = await Promise.all([patientRef.get(), doctorRef.get()]);

    if (!patientDoc.exists || !doctorDoc.exists) {
        return NextResponse.json({ error: 'Patient or Doctor not found.' }, { status: 404 });
    }
    
    const patientData = patientDoc.data()!;
    const doctorData = doctorDoc.data()!;

    const startTime = time.split(' - ')[0]; 
    const [timePart, ampm] = startTime.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;

    const appointmentDate = new Date(`${date}T00:00:00.000Z`);
    appointmentDate.setUTCHours(hours, minutes, 0, 0);

    const newAppointmentData = {
        patientId,
        doctorId,
        appointmentDate: appointmentDate.toISOString(),
        bookingDate: new Date().toISOString(),
        type: method, 
        status: 'Pending',
        amount: price.toString(),
        duration: duration,
        isPaid: false,
        patientName: `${patientData.firstName} ${patientData.lastName}`,
        patientAvatar: patientData.imageUrl || '',
        doctorName: `Dr. ${doctorData.firstName} ${doctorData.lastName}`,
        doctorAvatar: doctorData.imageUrl || '',
        specialty: doctorData.specialty || 'General Practice',
        consultationDetails: consultationDetails,
    };

    const appointmentRef = await db.collection('appointments').add(newAppointmentData);
    const appointmentId = appointmentRef.id;

    // Create in-app notifications
    const notificationsRef = db.collection('notifications');
    const patientNotification = {
      userId: patientId,
      message: `Your appointment request with ${newAppointmentData.doctorName} has been sent.`,
      link: `/patients/appointments`,
      createdAt: new Date().toISOString(),
      read: false,
    };
    const doctorNotification = {
        userId: doctorId,
        message: `You have a new appointment request from ${newAppointmentData.patientName}.`,
        link: `/doctor/appointments`,
        createdAt: new Date().toISOString(),
        read: false,
    };
    await Promise.all([
        notificationsRef.add(patientNotification),
        notificationsRef.add(doctorNotification)
    ]);
    
    // Send emails
    await sendAppointmentRequestEmails({
        appointmentId,
        patient: { name: newAppointmentData.patientName, email: patientData.email! },
        doctor: { name: newAppointmentData.doctorName, email: doctorData.email! },
        appointmentDate: new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        appointmentTime: time,
    });


    return NextResponse.json({ message: 'Appointment requested successfully' });
  } catch (error) {
    console.error('Error booking appointment:', error);
    return NextResponse.json({ error: 'Failed to book appointment' }, { status: 500 });
  }
}
