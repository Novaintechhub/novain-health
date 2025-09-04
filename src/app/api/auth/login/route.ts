
'use server';

import { NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { z } from 'zod';

const LoginSchema = z.object({
  emailOrId: z.string(), // Can be email or patient ID
  password: z.string(),
});

// For simplicity in this starter app, we'll hardcode the admin email.
// In a production environment, you might manage admin users in a separate Firestore collection or via environment variables.
const ADMIN_EMAIL = 'admin@novain.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = LoginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const { emailOrId, password } = validation.data;
    const db = getAdminDb();
    let email = emailOrId;

    // Check if the input is a patient ID
    if (emailOrId.toUpperCase().startsWith('NOV-')) {
        const patientQuery = await db.collection('patients').where('patientId', '==', emailOrId.toUpperCase()).limit(1).get();
        if (!patientQuery.empty) {
            email = patientQuery.docs[0].data().email;
        } else {
            const doctorQuery = await db.collection('doctors').where('email', '==', emailOrId).limit(1).get();
            if(doctorQuery.empty) {
                return NextResponse.json({ error: 'Invalid credentials. Please check your Patient ID/email and password.' }, { status: 401 });
            }
        }
    }
    
    // We need to use the client SDK here to verify the password,
    // as the Admin SDK doesn't have a direct method for it.
    const clientAuth = getAuth(app);
    const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
    const user = userCredential.user;

    if (!user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const adminAuth = getAdminAuth();
    const adminUserRecord = await adminAuth.getUser(user.uid);
    
    let role = null;
    
    // Special check for the admin user
    if (adminUserRecord.email === ADMIN_EMAIL) {
        role = 'admin';
    } else if (adminUserRecord.customClaims && adminUserRecord.customClaims.role) {
      role = adminUserRecord.customClaims.role;
    } else {
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

    // Ensure the role is set in custom claims for future sessions
    if (adminUserRecord.customClaims?.role !== role) {
        await adminAuth.setCustomUserClaims(user.uid, { role });
    }

    const customToken = await adminAuth.createCustomToken(user.uid, { role });

    return NextResponse.json({ token: customToken, role: role });

  } catch (error: any) {
    console.error('Login API Error:', error);
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        return NextResponse.json({ error: 'Invalid credentials. Please check your Patient ID/email and password.' }, { status: 401 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
