import { NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { RegistrationSchema } from '@/lib/types';
import { sendVerificationEmail } from '@/services/emailService';
import crypto from 'crypto';

const generateAlphanumericOTP = (length: number = 6) => {
  return crypto.randomBytes(length).toString('hex').slice(0, length).toUpperCase();
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = RegistrationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const { email, password, firstName, lastName, role, ...profileData } = validation.data;
    const auth = getAdminAuth();
    const db = getAdminDb();

    const userRecord = await auth.createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });

    await auth.setCustomUserClaims(userRecord.uid, { role });
    
    // Generate Alphanumeric OTP
    const otp = generateAlphanumericOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    const userProfile = {
      uid: userRecord.uid,
      email,
      firstName,
      lastName,
      role,
      createdAt: new Date().toISOString(),
      emailVerified: false,
      otp,
      otpExpires: otpExpires.toISOString(),
      ...profileData,
    };
    
    await db.collection(`${role}s`).doc(userRecord.uid).set(userProfile);

    // Send verification email
    await sendVerificationEmail(email, firstName, otp);

    return NextResponse.json({
      message: 'User created successfully. Verification email sent.',
      uid: userRecord.uid,
      email: email
    });
  } catch (error: any) {
    console.error('Registration Error:', error);
    if (error.code === 'auth/email-already-exists') {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
