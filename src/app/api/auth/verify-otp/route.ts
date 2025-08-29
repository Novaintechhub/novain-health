
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { z } from 'zod';
import { createHash } from 'crypto';
import { cookies } from 'next/headers';

const VerifyOtpSchema = z.object({
  otp: z.string().length(6, { message: 'OTP must be 6 characters long' }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = VerifyOtpSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const { otp } = validation.data;
    
    const cookieStore = cookies();
    const otpHashFromCookie = cookieStore.get('otp_hash')?.value;
    const emailFromCookie = cookieStore.get('otp_email')?.value;

    if (!otpHashFromCookie || !emailFromCookie) {
      return NextResponse.json({ error: 'OTP has expired or is invalid. Please request a new one.' }, { status: 400 });
    }

    const otpHash = createHash('sha256').update(otp).digest('hex');

    if (otpHash !== otpHashFromCookie) {
      return NextResponse.json({ error: 'Invalid OTP provided.' }, { status: 400 });
    }

    // OTP is correct, now update the user's status in Firestore
    const db = getAdminDb();
    const patientsQuery = db.collection('patients').where('email', '==', emailFromCookie).limit(1);
    const doctorsQuery = db.collection('doctors').where('email', '==', emailFromCookie).limit(1);

    const [patientSnapshot, doctorSnapshot] = await Promise.all([patientsQuery.get(), doctorsQuery.get()]);
    
    let userDocRef;
    if (!patientSnapshot.empty) {
      userDocRef = patientSnapshot.docs[0].ref;
    } else if (!doctorSnapshot.empty) {
      userDocRef = doctorSnapshot.docs[0].ref;
    } else {
      // This should ideally not happen if the registration flow is correct
      return NextResponse.json({ error: 'User not found for the provided email.' }, { status: 404 });
    }

    await userDocRef.update({ emailVerified: true });

    // Clear the cookies after successful verification
    cookieStore.delete('otp_hash');
    cookieStore.delete('otp_email');

    return NextResponse.json({ message: 'Email verified successfully.' });

  } catch (error) {
    console.error('Verify OTP Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
