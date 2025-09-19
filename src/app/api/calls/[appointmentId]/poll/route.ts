
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { headers } from 'next/headers';

// This API route is polled by the client to get the "answer" and ICE candidates
// from the other party without listening to Firestore directly.
export async function GET(request: Request, { params }: { params: { appointmentId: string } }) {
  try {
    const idToken = headers().get('Authorization')?.split('Bearer ')[1];
    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const decodedToken = await getAdminAuth().verifyIdToken(idToken);
    const userId = decodedToken.uid;
    
    const { appointmentId } = params;

    const db = getAdminDb();
    const callDocRef = db.collection('calls').doc(appointmentId);
    const callDoc = await callDocRef.get();

    if (!callDoc.exists) {
      return NextResponse.json({ error: 'Call not found' }, { status: 404 });
    }

    const callData = callDoc.data()!;
    const isCaller = callData.callerId === userId;

    const answer = callData.answer || null;
    const candidatesCollectionName = isCaller ? 'calleeCandidates' : 'callerCandidates';
    
    const candidatesSnapshot = await callDocRef.collection(candidatesCollectionName).get();
    const candidates = candidatesSnapshot.docs.map(doc => doc.data());

    // Clean up candidates after fetching to avoid re-adding them
    if (candidates.length > 0) {
        const batch = db.batch();
        candidatesSnapshot.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
    }

    return NextResponse.json({ answer, candidates });

  } catch (error) {
    console.error('Error polling call state:', error);
    return NextResponse.json({ error: 'Failed to poll call state' }, { status: 500 });
  }
}
