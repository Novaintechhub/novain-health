import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { DoctorProfile } from '@/lib/types';
import { doctorConverter } from '@/lib/firestore-converters';

export async function GET() {
  try {
    const db = getAdminDb();
    const doctorsRef = db.collection('doctors').withConverter(doctorConverter);
    const snapshot = await doctorsRef.get();
    
    if (snapshot.empty) {
      return NextResponse.json([]);
    }

    const doctors: DoctorProfile[] = [];
    snapshot.forEach(doc => {
      doctors.push(doc.data());
    });

    return NextResponse.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}
