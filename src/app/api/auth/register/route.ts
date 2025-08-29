
'use server';

import { NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb, getAdminStorage } from '@/lib/firebase-admin';
import { RegistrationSchema } from '@/lib/types';
import { sendVerificationEmail } from '@/services/emailService';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { createHash } from 'crypto';

const generateAlphanumericOTP = (length: number = 6) => {
  return crypto.randomBytes(length).toString('hex').slice(0, length).toUpperCase();
};

async function uploadProfileImage(dataUri: string, uid: string): Promise<string> {
    const storage = getAdminStorage();
    const bucket = storage.bucket();

    // Extract content type and base64 data from Data URI
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
        metadata: {
            contentType,
        },
    });

    // Make the file public and get the URL
    await file.makePublic();
    return file.publicUrl();
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = RegistrationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const { email, password, firstName, lastName, role, profileImage, ...profileData } = validation.data;
    const auth = getAdminAuth();
    const db = getAdminDb();

    const userRecord = await auth.createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });

    await auth.setCustomUserClaims(userRecord.uid, { role });
    
    const otp = generateAlphanumericOTP();
    const otpHash = createHash('sha256').update(otp).digest('hex');

    let imageUrl = '';
    if (profileImage) {
        try {
            imageUrl = await uploadProfileImage(profileImage, userRecord.uid);
        } catch(uploadError) {
            console.error("Image upload failed:", uploadError);
        }
    }

    const userProfile = {
      uid: userRecord.uid,
      email,
      firstName,
      lastName,
      role,
      createdAt: new Date().toISOString(),
      emailVerified: false,
      imageUrl: imageUrl, // Save image URL
      ...profileData,
    };
    
    await db.collection(`${role}s`).doc(userRecord.uid).set(userProfile);

    const response = NextResponse.json({
      message: 'User created successfully. Verification email sent.',
      uid: userRecord.uid,
      email: email
    });

    // Store hash in a secure, http-only cookie on the response
    response.cookies.set('otp_hash', otpHash, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 600, // 10 minutes
        path: '/',
        sameSite: 'strict',
    });
     response.cookies.set('otp_email', email, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 600, // 10 minutes
        path: '/',
        sameSite: 'strict',
    });


    // Send verification email
    await sendVerificationEmail(email, firstName, otp);

    return response;

  } catch (error: any) {
    console.error('Registration Error:', error);
    if (error.code === 'auth/email-already-exists') {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
