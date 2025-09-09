
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import { z } from 'zod';
import { appointmentConverter } from '@/lib/firestore-converters';

const VerifyPaymentSchema = z.object({
  reference: z.string(),
  appointmentId: z.string(),
  amount: z.number(),
});

export async function POST(request: Request) {
  try {
    const idToken = headers().get('Authorization')?.split('Bearer ')[1];
    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const decodedToken = await getAdminAuth().verifyIdToken(idToken);
    const patientId = decodedToken.uid;

    const body = await request.json();
    const validation = VerifyPaymentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const { reference, appointmentId, amount } = validation.data;

    // 1. Verify transaction with Paystack
    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecret) {
        throw new Error("Paystack secret key is not configured.");
    }

    const paystackResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${paystackSecret}`,
        },
    });

    if (!paystackResponse.ok) {
        throw new Error('Failed to verify payment with Paystack.');
    }

    const paystackData = await paystackResponse.json();

    if (paystackData.data.status !== 'success') {
        return NextResponse.json({ error: 'Payment was not successful.' }, { status: 400 });
    }

    // 2. Security Checks
    const db = getAdminDb();
    const appointmentRef = db.collection('appointments').doc(appointmentId).withConverter(appointmentConverter);
    const appointmentDoc = await appointmentRef.get();

    if (!appointmentDoc.exists) {
        return NextResponse.json({ error: 'Appointment not found.' }, { status: 404 });
    }

    const appointment = appointmentDoc.data()!;
    if (appointment.patientId !== patientId) {
        return NextResponse.json({ error: 'Forbidden. This appointment does not belong to you.' }, { status: 403 });
    }
    
    // Check amount. Paystack returns amount in kobo.
    const amountInKobo = Math.round(amount * 100);
    if (paystackData.data.amount !== amountInKobo) {
        // Here you might want to flag for manual review instead of just erroring
        console.warn(`Amount mismatch for appointment ${appointmentId}. Paystack: ${paystackData.data.amount}, Expected: ${amountInKobo}`);
        return NextResponse.json({ error: 'Payment amount mismatch.' }, { status: 400 });
    }

    // 3. Update Firestore
    await appointmentRef.update({
        isPaid: true,
        // you might want to store the payment reference as well
        paymentReference: reference,
    });

    // Optionally create a notification for the doctor
    await db.collection('notifications').add({
        userId: appointment.doctorId,
        message: `${appointment.patientName} has paid for the appointment.`,
        link: `/doctor/appointments`,
        createdAt: new Date().toISOString(),
        read: false,
    });


    return NextResponse.json({ message: 'Payment verified and appointment updated successfully' });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ error: error.message || 'Failed to verify payment' }, { status: 500 });
  }
}
