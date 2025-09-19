
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import { z } from 'zod';
import { appointmentConverter } from '@/lib/firestore-converters';

const InitializePaymentSchema = z.object({
  appointmentId: z.string(),
  amount: z.number(),
  email: z.string().email(),
});

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
    const validation = InitializePaymentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const { appointmentId, amount, email } = validation.data;
    
    // Security Check: Verify appointment belongs to the user
    const db = getAdminDb();
    const appointmentRef = db.collection('appointments').doc(appointmentId).withConverter(appointmentConverter);
    const appointmentDoc = await appointmentRef.get();

    if (!appointmentDoc.exists || appointmentDoc.data()?.patientId !== patientId) {
        return NextResponse.json({ error: 'Appointment not found or access denied.' }, { status: 404 });
    }

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecret) {
        throw new Error("Paystack secret key is not configured.");
    }
    
    // Dynamically determine the base URL
    const host = headersList.get('x-forwarded-host') || headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;
    
    const callbackUrl = `${baseUrl}/patients/appointments`;

    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${paystackSecret}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            amount: Math.round(amount * 100), // Amount in kobo
            callback_url: callbackUrl,
            metadata: {
                appointmentId: appointmentId,
                patientId: patientId,
            }
        })
    });

    if (!paystackResponse.ok) {
        const errorData = await paystackResponse.json();
        console.error("Paystack API Error:", errorData);
        throw new Error('Failed to initialize payment with Paystack.');
    }

    const paystackData = await paystackResponse.json();

    if (!paystackData.status) {
        throw new Error(paystackData.message || 'Failed to initialize payment.');
    }

    return NextResponse.json({ authorization_url: paystackData.data.authorization_url });

  } catch (error: any) {
    console.error('Payment initialization error:', error);
    return NextResponse.json({ error: error.message || 'Failed to initialize payment' }, { status: 500 });
  }
}
