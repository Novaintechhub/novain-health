
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import { z } from 'zod';
import { doctorConverter } from '@/lib/firestore-converters';

const DoctorProfileUpdateSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  mobileNumber: z.string().min(10, "Valid phone number is required"),
  gender: z.string().optional(),
  dateOfBirth: z.string().optional(),
  aboutMe: z.string().optional(),
  
  // Clinic Info
  clinicName: z.string().optional(),
  clinicAddress: z.string().optional(),
  
  // Contact Details
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),

  // Pricing
  pricing: z.any().optional(),

  // Services and Specialization
  services: z.array(z.string()).optional(),
  specializations: z.array(z.string()).optional(),

  // Professional Details
  education: z.array(z.any()).optional(),
  experience: z.array(z.any()).optional(),
  awards: z.array(z.any()).optional(),
  memberships: z.array(z.any()).optional(),
  registrations: z.array(z.any()).optional(),
});


// GET handler to fetch doctor profile
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
    const doctorRef = db.collection('doctors').doc(doctorId).withConverter(doctorConverter);
    const doc = await doctorRef.get();

    if (!doc.exists) {
        return NextResponse.json({ error: 'Doctor profile not found' }, { status: 404 });
    }
    
    return NextResponse.json(doc.data());
  } catch (error) {
    console.error('Error fetching doctor profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

// POST handler to update doctor profile
export async function POST(request: Request) {
  try {
    const headersList = headers();
    const idToken = headersList.get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = await getAdminAuth().verifyIdToken(idToken);
    const doctorId = decodedToken.uid;
    
    const body = await request.json();
    const validation = DoctorProfileUpdateSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const db = getAdminDb();
    const doctorRef = db.collection('doctors').doc(doctorId);
    
    // We use set with merge: true to update the document, which is equivalent to update.
    // This also creates the document if it doesn't exist, though it should for a logged-in doctor.
    await doctorRef.set(validation.data, { merge: true });

    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating doctor profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
