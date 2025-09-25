
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import { appointmentConverter } from '@/lib/firestore-converters';
import { FieldValue } from 'firebase-admin/firestore';

export async function GET(
  request: Request,
  { params }: { params: { appointmentId: string } }
) {
  try {
    const idToken = headers().get('Authorization')?.split('Bearer ')[1];
    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const decodedToken = await getAdminAuth().verifyIdToken(idToken);
    const userId = decodedToken.uid;
    const { appointmentId } = params;

    const db = getAdminDb();
    
    // Security Check: Verify the requester is part of the appointment
    const appointmentRef = db.collection('appointments').doc(appointmentId).withConverter(appointmentConverter);
    const appointmentDoc = await appointmentRef.get();

    if (!appointmentDoc.exists) {
        return NextResponse.json({ error: 'Appointment not found.' }, { status: 404 });
    }
    
    const appointment = appointmentDoc.data()!;
    if (userId !== appointment.patientId && userId !== appointment.doctorId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Fetch messages
    const messagesRef = appointmentRef.collection('messages').orderBy('timestamp', 'asc');
    const messagesSnapshot = await messagesRef.get();
    
    const messages = messagesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return NextResponse.json(messages);

  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
