
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import { patientConverter } from '@/lib/firestore-converters';
import type { PatientProfile } from '@/lib/types';

// GET handler to fetch patient profile
export async function GET() {
  try {
    const headersList = headers();
    const idToken = headersList.get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = await getAdminAuth().verifyIdToken(idToken);
    const patientId = decodedToken.uid;
    
    const db = getAdminDb();
    const patientRef = db.collection('patients').doc(patientId).withConverter(patientConverter);
    const doc = await patientRef.get();

    if (!doc.exists) {
        return NextResponse.json({ error: 'Patient profile not found' }, { status: 404 });
    }

    const patientProfile: PatientProfile = doc.data()!;
    
    return NextResponse.json(patientProfile);
  } catch (error) {
    console.error('Error fetching patient profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}
