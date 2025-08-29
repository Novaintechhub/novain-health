
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { sendVerificationEmail } from '@/services/emailService';
import crypto from 'crypto';
import { z } from 'zod';
import { createHash } from 'crypto';

const generateAlphanumericOTP = (length: number = 6) => {
  return crypto.randomBytes(length).toString('hex').slice(0, length).toUpperCase();
};

const ResendOtpSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = ResendOtpSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid email provided' }, { status: 400 });
    }
    
    const { email } = validation.data;
    const db = getAdminDb();

    // Find user in patients or doctors collection by email
    const patientsQuery = db.collection('patients').where('email', '==', email).limit(1);
    const doctorsQuery = db.collection('doctors').where('email', '==', email).limit(1);

    const [patientSnapshot, doctorSnapshot] = await Promise.all([patientsQuery.get(), doctorsQuery.get()]);

    let userDoc;
    if (!patientSnapshot.empty) {
      userDoc = patientSnapshot.docs[0];
    } else if (!doctorSnapshot.empty) {
      userDoc = doctorSnapshot.docs[0];
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userData = userDoc.data();
    if (userData.emailVerified) {
        return NextResponse.json({ message: 'Email already verified' });
    }

    const otp = generateAlphanumericOTP();
    const otpHash = createHash('sha256').update(otp).digest('hex');

    const response = NextResponse.json({ message: 'A new OTP has been sent to your email address.' });

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

    await sendVerificationEmail(userData.firstName, userData.email, otp);

    return response;
  } catch (error) {
    console.error('Resend OTP Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
