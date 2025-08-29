import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { PatientProfile } from '@/lib/types';
import { patientConverter } from '@/lib/firestore-converters';

export async function GET() {
  try {
    const db = getAdminDb();
    const patientsRef = db.collection('patients').withConverter(patientConverter);
    const snapshot = await patientsRef.get();
    
    if (snapshot.empty) {
      return NextResponse.json([]);
    }

    const patients: PatientProfile[] = [];
    snapshot.forEach(doc => {
        patients.push(doc.data());
    });

    return NextResponse.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
  }
}
