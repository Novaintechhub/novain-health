'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { headers } from 'next/headers';

// This function will handle creating the initial call document
export async function POST(request: Request, { params }: { params: { appointmentId: string } }) {
  try {
    const idToken = headers().get('Authorization')?.split('Bearer ')[1];
    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Verify the token to ensure the user is authenticated
    await getAdminAuth().verifyIdToken(idToken);

    const { appointmentId } = params;
    const { offer, callerId } = await request.json();

    if (!offer || !callerId) {
        return NextResponse.json({ error: 'Offer and callerId are required.' }, { status: 400 });
    }

    const db = getAdminDb();
    const callRef = db.collection('calls').doc(appointmentId);
    
    // Create the call document with the offer
    await callRef.set({
      callerId,
      offer,
      createdAt: new Date().toISOString(),
    });
    
    return NextResponse.json({ message: 'Call initiated successfully' });

  } catch (error) {
    console.error('Error initiating call:', error);
    return NextResponse.json({ error: 'Failed to initiate call' }, { status: 500 });
  }
}