import { NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { RegistrationSchema } from '@/lib/types';

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

    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });

    // Set custom claim for role
    await auth.setCustomUserClaims(userRecord.uid, { role });

    // Create user profile in Firestore
    const userProfile = {
      uid: userRecord.uid,
      email,
      firstName,
      lastName,
      role,
      createdAt: new Date().toISOString(),
      ...profileData,
    };
    
    // The collection will be 'doctors' or 'patients' based on the role
    await db.collection(`${role}s`).doc(userRecord.uid).set(userProfile);

    return NextResponse.json({
      message: 'User created successfully',
      uid: userRecord.uid,
    });
  } catch (error: any) {
    console.error('Registration Error:', error);
    // Provide more specific error messages
    if (error.code === 'auth/email-already-exists') {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
