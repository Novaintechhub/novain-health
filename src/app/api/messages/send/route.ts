'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import { z } from 'zod';
import { FieldValue } from 'firebase-admin/firestore';
import { appointmentConverter } from '@/lib/firestore-converters';

const SendMessageSchema = z.object({
  appointmentId: z.string().min(1),
  text: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const idToken = headers().get('Authorization')?.split('Bearer ')[1];
    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const decodedToken = await getAdminAuth().verifyIdToken(idToken);
    const senderId = decodedToken.uid;

    const body = await request.json();
    const validation = SendMessageSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }
    const { appointmentId, text } = validation.data;

    const db = getAdminDb();
    
    // Security Check: Verify the sender is part of the appointment
    const appointmentRef = db.collection('appointments').doc(appointmentId).withConverter(appointmentConverter);
    const appointmentDoc = await appointmentRef.get();

    if (!appointmentDoc.exists) {
        return NextResponse.json({ error: 'Appointment not found.' }, { status: 404 });
    }
    
    const appointment = appointmentDoc.data()!;
    if (senderId !== appointment.patientId && senderId !== appointment.doctorId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    // Add the message to the subcollection
    const messageRef = db.collection('appointments').doc(appointmentId).collection('messages').doc();
    
    await messageRef.set({
        senderId: senderId,
        text: text,
        timestamp: FieldValue.serverTimestamp(),
    });
    
    return NextResponse.json({ message: 'Message sent successfully', messageId: messageRef.id });

  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
