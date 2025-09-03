
'use server';

import { NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = LoginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }

    const { email, password } = validation.data;
    
    // We need to use the client SDK here to verify the password,
    // as the Admin SDK doesn't have a direct method for it.
    // This is a safe operation on the server.
    const clientAuth = getAuth(app);
    const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
    const user = userCredential.user;

    if (!user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Now use the Admin SDK to get user details and create a custom token with roles
    const adminAuth = getAdminAuth();
    const adminUserRecord = await adminAuth.getUser(user.uid);
    
    let role = null;
    if (adminUserRecord.customClaims && adminUserRecord.customClaims.role) {
      role = adminUserRecord.customClaims.role;
    } else {
        // Fallback: check firestore if no claim is set
        const db = getAdminDb();
        const doctorDoc = await db.collection('doctors').doc(user.uid).get();
        if (doctorDoc.exists()) {
            role = 'doctor';
        } else {
            const patientDoc = await db.collection('patients').doc(user.uid).get();
            if(patientDoc.exists()) {
                role = 'patient';
            }
        }
    }
    
    if (!role) {
         return NextResponse.json({ error: 'Could not determine user role.' }, { status: 500 });
    }

    const customToken = await adminAuth.createCustomToken(user.uid, { role });

    return NextResponse.json({ token: customToken, role: role });

  } catch (error: any) {
    console.error('Login API Error:', error);
    // Firebase auth errors have a 'code' property
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        return NextResponse.json({ error: 'Invalid credentials. Please check your email and password.' }, { status: 401 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
