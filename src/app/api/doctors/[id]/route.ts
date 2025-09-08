
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { doctorConverter } from '@/lib/firestore-converters';
import type { DoctorProfile, DoctorDetails, DoctorEducation, DoctorExperience, DoctorAward, DoctorMembership, DoctorRegistration, DoctorCoreProfile, Appointment } from '@/lib/types';

async function getSubcollectionData<T>(db: FirebaseFirestore.Firestore, doctorId: string, collectionName: string): Promise<T[]> {
    const snapshot = await db.collection('doctors').doc(doctorId).collection(collectionName).get();
    if (snapshot.empty) return [];
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const doctorId = params.id;
    if (!doctorId) {
      return NextResponse.json({ error: 'Doctor ID is required' }, { status: 400 });
    }

    const db = getAdminDb();
    const doctorRef = db.collection('doctors').doc(doctorId);
    const doc = await doctorRef.get();

    if (!doc.exists) {
        return NextResponse.json({ error: 'Doctor profile not found' }, { status: 404 });
    }

    const doctorData = doc.data()!;
    const coreProfile = doctorConverter.fromFirestore(doc as any);
    
    const profileDetailsDoc = await db.collection('doctors').doc(doctorId).collection('details').doc('profile').get();
    const details = profileDetailsDoc.data() as DoctorDetails || {};

    const [education, experience, awards, memberships, registrations, appointmentsSnapshot] = await Promise.all([
        getSubcollectionData<DoctorEducation>(db, doctorId, 'education'),
        getSubcollectionData<DoctorExperience>(db, doctorId, 'experience'),
        getSubcollectionData<DoctorAward>(db, doctorId, 'awards'),
        getSubcollectionData<DoctorMembership>(db, doctorId, 'memberships'),
        getSubcollectionData<DoctorRegistration>(db, doctorId, 'registrations'),
        db.collection('appointments').where('doctorId', '==', doctorId).where('status', '==', 'Approved').get()
    ]);

    const approvedAppointments: Partial<Appointment>[] = appointmentsSnapshot.docs.map(doc => ({
        appointmentDate: doc.data().appointmentDate
    }));

    const fullProfile: DoctorProfile = {
        ...coreProfile,
        ...details,
        education,
        experience,
        awards,
        memberships,
        registrations,
        schedule: doctorData.schedule || {},
        approvedAppointments: approvedAppointments,
    };
    
    return NextResponse.json(fullProfile);
  } catch (error) {
    console.error('Error fetching doctor profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}
