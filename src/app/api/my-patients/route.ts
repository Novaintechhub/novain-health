import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import type { PatientProfile, Appointment } from '@/lib/types';
import { patientConverter, appointmentConverter } from '@/lib/firestore-converters';
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
    
    const appointmentsRef = db.collection('appointments').withConverter(appointmentConverter);
    const appointmentsSnapshot = await appointmentsRef.where('doctorId', '==', doctorId).get();

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
        const patientData = doc.data();
        const appointmentsForPatient = appointmentsSnapshot.docs
            .map(d => d.data())
            .filter(a => a.patientId === patientData.uid);

        const lastVisit = appointmentsForPatient.reduce((latest, current) => {
            return new Date(current.appointmentDate) > new Date(latest) ? current.appointmentDate : latest;
        }, '1970-01-01T00:00:00.000Z');
        
        patients.push({
            ...patientData,
            lastVisit: lastVisit !== '1970-01-01T00:00:00.000Z' ? new Date(lastVisit).toLocaleDateString() : 'N/A',
        });
    });

    return NextResponse.json(patients);
  } catch (error) {
    console.error('Error fetching my patients:', error);
    return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
  }
}
