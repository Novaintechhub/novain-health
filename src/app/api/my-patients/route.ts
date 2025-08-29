import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { getAdminAuth } from '@/lib/firebase-admin';
import { PatientProfile } from '@/lib/types';
import { patientConverter } from '@/lib/firestore-converters';
import { headers } from 'next/headers';

export async function GET() {
  try {
    const headersList = headers();
    const idToken = headersList.get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const decodedToken = await getAdminAuth().verifyIdToken(idToken);
    const doctorId = decodedToken.uid;
    
    const db = getAdminDb();
    // This is a simplified query. A real-world scenario might involve a subcollection
    // of patients for each doctor or querying appointments to find unique patients.
    const appointmentsSnapshot = await db.collection('appointments')
        .where('doctorId', '==', doctorId)
        .get();

    if (appointmentsSnapshot.empty) {
        return NextResponse.json([]);
    }

    const patientIds = new Set<string>();
    appointmentsSnapshot.forEach(doc => {
        patientIds.add(doc.data().patientId);
    });

    if (patientIds.size === 0) {
        return NextResponse.json([]);
    }
    
    const patientsRef = db.collection('patients').withConverter(patientConverter);
    const patientsSnapshot = await patientsRef.where('uid', 'in', Array.from(patientIds)).get();
    
    const patients: PatientProfile[] = [];
    patientsSnapshot.forEach(doc => {
        patients.push(doc.data());
    });

    return NextResponse.json(patients);
  } catch (error) {
    console.error('Error fetching my patients:', error);
    return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
  }
}
