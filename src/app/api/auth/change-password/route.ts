
'use server';

import { NextResponse } from 'next/server';
import { getAdminAuth } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import { z } from 'zod';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from '@/lib/firebase';

const ChangePasswordSchema = z.object({
  oldPassword: z.string().min(1, 'Old password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
});

export async function POST(request: Request) {
  try {
    const headersList = headers();
    const idToken = headersList.get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = await getAdminAuth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const email = decodedToken.email;

    if (!email) {
      return NextResponse.json({ error: 'User email not found.' }, { status: 400 });
    }
    
    const body = await request.json();
    const validation = ChangePasswordSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const { oldPassword, newPassword } = validation.data;

    // Use client SDK to verify the old password as Admin SDK can't do it directly.
    const clientAuth = getAuth(app);
    await signInWithEmailAndPassword(clientAuth, email, oldPassword);

    // If the above doesn't throw, the old password is correct.
    // Now, use the Admin SDK to update the password.
    await getAdminAuth().updateUser(uid, {
      password: newPassword,
    });

    return NextResponse.json({ message: 'Password updated successfully' });

  } catch (error: any) {
    console.error('Change Password Error:', error);
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        return NextResponse.json({ error: 'The old password you entered is incorrect.' }, { status: 401 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
