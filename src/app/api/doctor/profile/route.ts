
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth, getAdminStorage } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import { z } from 'zod';
import { doctorConverter } from '@/lib/firestore-converters';
import { v4 as uuidv4 } from 'uuid';

const DoctorProfileUpdateSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  mobileNumber: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  dateOfBirth: z.string().optional().nullable(),
  aboutMe: z.string().optional().nullable(),
  profileImage: z.string().optional(), // Base64 data URI for new image
  
  // Clinic Info
  clinicName: z.string().optional().nullable(),
  clinicAddress: z.string().optional().nullable(),
  
  // Contact Details
  addressLine1: z.string().optional().nullable(),
  addressLine2: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  stateOfResidence: z.string().optional().nullable(),
  lga: z.string().optional().nullable(),
  language: z.string().optional().nullable(),

  // Pricing
  pricing: z.string().optional().nullable(),

  // Services and Specialization
  services: z.array(z.string()).optional(),
  specializations: z.array(z.string()).optional(),

  // Professional Details
  education: z.array(z.object({ college: z.string(), degree: z.string(), yearStarted: z.string(), yearCompleted: z.string() })).optional(),
  experience: z.array(z.object({ hospital: z.string(), designation: z.string(), from: z.string(), to: z.string() })).optional(),
  awards: z.array(z.object({ name: z.string(), year: z.string() })).optional(),
  memberships: z.array(z.object({ organization: z.string() })).optional(),
  registrations: z.array(z.object({ registration: z.string(), year: z.string() })).optional(),
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
    
    const { profileImage, ...profileData } = validation.data;
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
    
    const dataToUpdate: any = { ...profileData };
    if (imageUrl) {
        dataToUpdate.imageUrl = imageUrl;
    }
    
    // Ensure arrays are not undefined when merging
    const fieldsToInitialize = ['services', 'specializations', 'education', 'experience', 'awards', 'memberships', 'registrations'];
    fieldsToInitialize.forEach(field => {
        if (dataToUpdate[field] === undefined) {
            dataToUpdate[field] = [];
        }
    });

    await doctorRef.set(dataToUpdate, { merge: true });
    
    // Note: We don't update Firebase Auth display name here because it's disabled in the form
    if (imageUrl) {
        await getAdminAuth().updateUser(doctorId, {
            photoURL: imageUrl,
        });
    }

    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating doctor profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
