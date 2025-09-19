
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import { z } from 'zod';

const IceCandidateSchema = z.object({
  candidate: z.any(),
  type: z.enum(['caller', 'callee']),
});

// This function will handle adding ICE candidates
export async function POST(request: Request, { params }: { params: { appointmentId: string } }) {
  try {
    const idToken = headers().get('Authorization')?.split('Bearer ')[1];
    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Verify the token to ensure the user is authenticated
    await getAdminAuth().verifyIdToken(idToken);

    const { appointmentId } = params;
    const body = await request.json();

    const validation = IceCandidateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const { candidate, type } = validation.data;

    if (!candidate) {
        return NextResponse.json({ error: 'Candidate is required.' }, { status: 400 });
    }

    const db = getAdminDb();
    const callDocRef = db.collection('calls').doc(appointmentId);
    const candidatesCollection = callDocRef.collection(type === 'caller' ? 'callerCandidates' : 'calleeCandidates');
    
    await candidatesCollection.add(candidate);
    
    return NextResponse.json({ message: 'ICE candidate added successfully' });

  } catch (error) {
    console.error('Error adding ICE candidate:', error);
    return NextResponse.json({ error: 'Failed to add ICE candidate' }, { status: 500 });
  }
}
