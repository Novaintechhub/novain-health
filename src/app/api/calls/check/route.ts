'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import { z } from 'zod';

const CheckCallSchema = z.object({
  appointmentIds: z.array(z.string()),
});

export async function POST(request: Request) {
  try {
    const headersList = headers();
    const idToken = headersList.get('Authorization')?.split('Bearer ')[1];
    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const decodedToken = await getAdminAuth().verifyIdToken(idToken);
    const userId = decodedToken.uid;

    const body = await request.json();
    const validation = CheckCallSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const { appointmentIds } = validation.data;
    if (appointmentIds.length === 0) {
      return NextResponse.json({ incomingCall: null });
    }

    const db = getAdminDb();
    const callsRef = db.collection('calls');
    const snapshot = await callsRef.where('__name__', 'in', appointmentIds).get();

    if (snapshot.empty) {
      return NextResponse.json({ incomingCall: null });
    }

    let incomingCall = null;
    snapshot.forEach(doc => {
        const callData = doc.data();
        // Check if there is a call document where the current user is NOT the caller
        if (callData.callerId && callData.callerId !== userId) {
            incomingCall = {
                appointmentId: doc.id,
                callerId: callData.callerId
            };
        }
    });
    
    return NextResponse.json({ incomingCall });

  } catch (error) {
    console.error('Error checking for calls:', error);
    return NextResponse.json({ error: 'Failed to check for calls' }, { status: 500 });
  }
}