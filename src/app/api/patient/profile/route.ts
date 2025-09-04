
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth, getAdminStorage } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import { patientConverter } from '@/lib/firestore-converters';
import type { PatientProfile } from '@/lib/types';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

const PatientProfileUpdateSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  mobileNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
  bloodGroup: z.string().optional(),
  address: z.string().optional(),
  lga: z.string().optional(),
  stateOfResidence: z.string().optional(),
  country: z.string().optional(),
  profileImage: z.string().optional(), // data URI
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

// POST handler to update patient profile
export async function POST(request: Request) {
    try {
        const headersList = headers();
        const idToken = headersList.get('Authorization')?.split('Bearer ')[1];

        if (!idToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const decodedToken = await getAdminAuth().verifyIdToken(idToken);
        const patientId = decodedToken.uid;
        
        const body = await request.json();
        const validation = PatientProfileUpdateSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: validation.error.format() }, { status: 400 });
        }

        const { profileImage, ...profileData } = validation.data;
        let newImageUrl;

        if (profileImage && profileImage.startsWith('data:image')) {
            try {
                newImageUrl = await uploadProfileImage(profileImage, patientId);
            } catch (uploadError) {
                console.error("Image upload failed:", uploadError);
                return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
            }
        }
        
        const db = getAdminDb();
        const patientRef = db.collection('patients').doc(patientId);
        
        const updateData: Partial<PatientProfile> = { ...profileData };
        if (newImageUrl) {
            updateData.imageUrl = newImageUrl;
        }

        await patientRef.set(updateData, { merge: true });
        
        // Also update the Auth user record
        const authUpdatePayload: { displayName?: string; photoURL?: string } = {};
        if (profileData.firstName && profileData.lastName) {
            authUpdatePayload.displayName = `${profileData.firstName} ${profileData.lastName}`;
        }
        if (newImageUrl) {
            authUpdatePayload.photoURL = newImageUrl;
        }

        if (Object.keys(authUpdatePayload).length > 0) {
            await getAdminAuth().updateUser(patientId, authUpdatePayload);
        }

        return NextResponse.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating patient profile:', error);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}
