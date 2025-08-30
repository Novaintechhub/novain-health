'use server';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { fixedWindowPerIp } from '@/lib/rateLimiter';

const OTP_PEPPER = process.env.OTP_PEPPER || '';
if (!OTP_PEPPER) console.error('Missing OTP_PEPPER environment variable');

const OTP_LENGTH = 8;
const VerifySchema = z.object({
  email: z.string().email(),
  otp: z.string().min(OTP_LENGTH).max(OTP_LENGTH),
}).strict();

function hmacOtp(otp: string) {
  return crypto.createHmac('sha256', OTP_PEPPER).update(otp).digest('hex');
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  try {
    // IP rate limit: 10/min
    if (!(await fixedWindowPerIp.allow(`verify:ip:${ip}`, 10, 60_000))) {
      return NextResponse.json({ error: 'Invalid code or expired. Request a new one.' }, { status: 400 });
    }

    const json = await req.json();
    const parsed = VerifySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid code or expired. Request a new one.' }, { status: 400 });
    }

    const email = parsed.data.email.trim().toLowerCase();
    const otp = parsed.data.otp;

    const db = getAdminDb();
    const auth = getAdminAuth();

    const snap = await db.collection('users').where('email', '==', email).limit(1).get();
    if (snap.empty) {
      return NextResponse.json({ error: 'Invalid code or expired. Request a new one.' }, { status: 400 });
    }
    const userDoc = snap.docs[0];
    const uid = userDoc.id;

    const verRef = db.collection('email_verifications').doc(uid);
    const result = await db.runTransaction(async (tx) => {
      const v = await tx.get(verRef);
      if (!v.exists) return { ok: false as const };

      const doc = v.data() as {
        otpHash: string;
        expiresAt: number;
        attempts: number;
        maxAttempts: number;
      };

      const now = Date.now();
      if (now > doc.expiresAt) {
        tx.delete(verRef);
        return { ok: false as const };
      }
      if (doc.attempts >= doc.maxAttempts) {
        tx.delete(verRef);
        return { ok: false as const };
      }

      const computed = hmacOtp(otp);
      const match = crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(doc.otpHash));
      if (!match) {
        tx.update(verRef, { attempts: doc.attempts + 1 });
        return { ok: false as const };
      }

      // Success: consume the token
      tx.delete(verRef);
      return { ok: true as const };
    });

    if (!result.ok) {
      return NextResponse.json({ error: 'Invalid code or expired. Request a new one.' }, { status: 400 });
    }

    // Mark verified in profile and Auth
    await userDoc.ref.update({ emailVerified: true, verifiedAt: new Date().toISOString() });
    try { await auth.updateUser(uid, { emailVerified: true }); } catch (e) { console.warn('Auth update failed:', e); }

    // Post-verify: set minimal custom claims (no client-controlled elevation)
    try { await auth.setCustomUserClaims(uid, { role: 'user' }); } catch (e) { console.warn('Claim set failed:', e); }

    return NextResponse.json({ message: 'Email verified successfully.' }, { status: 200 });
  } catch (err) {
    console.error('Verify OTP Error:', err);
    return NextResponse.json({ error: 'Invalid code or expired. Request a new one.' }, { status: 400 });
  }
}
