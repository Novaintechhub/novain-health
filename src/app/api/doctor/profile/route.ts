
'use server';

import { NextResponse, type NextRequest } from 'next/server';
import { getAdminDb, getAdminAuth, getAdminStorage } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import { z } from 'zod';
import { doctorConverter } from '@/lib/firestore-converters';
import { v4 as uuidv4 } from 'uuid';
import type { DoctorProfile, DoctorDetails, DoctorEducation, DoctorExperience, DoctorAward, DoctorMembership, DoctorRegistration, DoctorCoreProfile } from '@/lib/types';

const pricingDurationSchema = z.object({
    '15': z.preprocess(val => val === '' ? 0 : Number(val), z.number().optional()),
    '30': z.preprocess(val => val === '' ? 0 : Number(val), z.number().optional()),
    '45': z.preprocess(val => val === '' ? 0 : Number(val), z.number().optional()),
    '60': z.preprocess(val => val === '' ? 0 : Number(val), z.number().optional()),
}).optional();

const DoctorProfileUpdateSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  mobileNumber: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  dateOfBirth: z.string().optional().nullable(),
  aboutMe: z.string().optional().nullable(),
  profileImage: z.string().optional().nullable(),
  
  clinicName: z.string().optional().nullable(),
  clinicAddress: z.string().optional().nullable(),
  
  addressLine1: z.string().optional().nullable(),
  addressLine2: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  stateOfResidence: z.string().optional().nullable(),
  lga: z.string().optional().nullable(),
  language: z.string().optional().nullable(),

  pricingModel: z.enum(['free', 'custom']).optional(),
  freeMethods: z.object({
    video: z.boolean().optional(),
    voice: z.boolean().optional(),
    chat: z.boolean().optional(),
  }).optional(),
  customPricing: z.object({
    video: pricingDurationSchema,
    voice: pricingDurationSchema,
    chat: pricingDurationSchema,
  }).optional(),

  services: z.array(z.string()).optional(),
  specializations: z.array(z.string()).optional(),

  education: z.array(z.object({ id: z.string().optional(), college: z.string(), degree: z.string(), yearStarted: z.string(), yearCompleted: z.string() })).optional(),
  experience: z.array(z.object({ id: z.string().optional(), hospital: z.string(), designation: z.string(), from: z.string(), to: z.string() })).optional(),
  awards: z.array(z.object({ id: z.string().optional(), name: z.string(), year: z.string() })).optional(),
  memberships: z.array(z.object({ id: z.string().optional(), organization: z.string() })).optional(),
  registrations: z.array(z.object({ id: z.string().optional(), registration: z.string(), year: z.string() })).optional(),
});

async function uploadProfileImage(dataUri: string, uid: string): Promise<string> {
    const storage = getAdminStorage();
    const bucket = storage.bucket();

    const match = dataUri.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!match) {
        throw new Error('Invalid Data URI for profile image.');
    }
    const contentType = match[1];
    const base64Data = match[2];
    const buffer = Buffer.from(base64Data, 'base64');
    
    const filePath = `profile-images/${uid}/${uuidv4()}`;
    const file = bucket.file(filePath);

    await file.save(buffer, {
        metadata: { contentType },
    });

    await file.makePublic();
    return file.publicUrl();
}

async function getSubcollectionData<T>(db: FirebaseFirestore.Firestore, doctorId: string, collectionName: string): Promise<T[]> {
    const snapshot = await db.collection('doctors').doc(doctorId).collection(collectionName).get();
    if (snapshot.empty) return [];
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
}

// GET handler to fetch doctor profile
export async function GET() {
  try {
    const idToken = headers().get('Authorization')?.split('Bearer ')[1];

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

    const coreProfile = doc.data() as DoctorCoreProfile;
    
    const profileDetailsDoc = await db.collection('doctors').doc(doctorId).collection('details').doc('profile').get();
    const details = profileDetailsDoc.data() as DoctorDetails || {};

    const [education, experience, awards, memberships, registrations] = await Promise.all([
        getSubcollectionData<DoctorEducation>(db, doctorId, 'education'),
        getSubcollectionData<DoctorExperience>(db, doctorId, 'experience'),
        getSubcollectionData<DoctorAward>(db, doctorId, 'awards'),
        getSubcollectionData<DoctorMembership>(db, doctorId, 'memberships'),
        getSubcollectionData<DoctorRegistration>(db, doctorId, 'registrations'),
    ]);

    const fullProfile: DoctorProfile = {
        ...coreProfile,
        ...details,
        education,
        experience,
        awards,
        memberships,
        registrations,
    };
    
    return NextResponse.json(fullProfile);
  } catch (error) {
    console.error('Error fetching doctor profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

async function updateSubcollection<T extends { id?: string }>(db: FirebaseFirestore.Firestore, batch: FirebaseFirestore.WriteBatch, doctorId: string, collectionName: string, data: T[] = []) {
    const collectionRef = db.collection('doctors').doc(doctorId).collection(collectionName);
    
    // Simple approach: delete existing and add new ones.
    // A more sophisticated approach would be to diff and update/delete/add selectively.
    const snapshot = await collectionRef.get();
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    
    data.forEach(item => {
        const { id, ...itemData } = item; // remove id before writing
        const docRef = collectionRef.doc(); // Always create new doc for simplicity
        batch.set(docRef, itemData);
    });
}

// POST handler to update doctor profile
export async function POST(request: NextRequest) {
  try {
    const idToken = request.headers.get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = await getAdminAuth().verifyIdToken(idToken);
    const doctorId = decodedToken.uid;
    
    const body = await request.json();
    const validation = DoctorProfileUpdateSchema.safeParse(body);

    if (!validation.success) {
        console.error("Validation Error:", validation.error.format());
        return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }
    
    const { 
        profileImage,
        firstName, lastName, 
        education, experience, awards, memberships, registrations,
        ...detailsData 
    } = validation.data;
    
    let imageUrl;

    if (profileImage && profileImage.startsWith('data:image')) {
        try {
            imageUrl = await uploadProfileImage(profileImage, doctorId);
        } catch(uploadError) {
            console.error("Image upload failed:", uploadError);
            return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
        }
    }
    
    const db = getAdminDb();
    const doctorRef = db.collection('doctors').doc(doctorId);
    const detailsRef = doctorRef.collection('details').doc('profile');

    const coreData: Partial<DoctorCoreProfile> = {};
    if (imageUrl) {
        coreData.imageUrl = imageUrl;
    }
    
    const batch = db.batch();

    // Update core profile if there's an image
    if (Object.keys(coreData).length > 0) {
        batch.set(doctorRef, coreData, { merge: true });
    }

    // Update details subcollection
    batch.set(detailsRef, detailsData, { merge: true });

    // Handle subcollections
    await updateSubcollection(db, batch, doctorId, 'education', education);
    await updateSubcollection(db, batch, doctorId, 'experience', experience);
    await updateSubcollection(db, batch, doctorId, 'awards', awards);
    await updateSubcollection(db, batch, doctorId, 'memberships', memberships);
    await updateSubcollection(db, batch, doctorId, 'registrations', registrations);

    await batch.commit();

    // Update Auth user record after Firestore operations
    const authUpdatePayload: { displayName?: string; photoURL?: string } = {
        displayName: `${firstName} ${lastName}`
    };
    if (imageUrl) {
        authUpdatePayload.photoURL = imageUrl;
    }
    
    await getAdminAuth().updateUser(doctorId, authUpdatePayload);
    

    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating doctor profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
