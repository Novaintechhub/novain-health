
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import { z } from 'zod';

const ConnectCallSchema = z.object({
  answer: z.any(),
});

// This function will handle updating the call with the callee's answer
// and setting the status to 'connected'
export async function POST(request: Request, { params }: { params: { appointmentId: string } }) {
  try {
    const idToken = headers().get('Authorization')?.split('Bearer ')[1];
    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await getAdminAuth().verifyIdToken(idToken);

    const { appointmentId } = params;
    const body = await request.json();

    const validation = ConnectCallSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const { answer } = validation.data;
    if (!answer) {
        return NextResponse.json({ error: 'Answer is required.' }, { status: 400 });
    }

    const db = getAdminDb();
    const callDocRef = db.collection('calls').doc(appointmentId);
    
    await callDocRef.update({ answer, status: 'connected' });
    
    return NextResponse.json({ message: 'Call connected successfully' });

  } catch (error) {
    console.error('Error connecting call:', error);
    return NextResponse.json({ error: 'Failed to connect call' }, { status: 500 });
  }
}
