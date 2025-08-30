'use server';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { sendVerificationEmail } from '@/services/emailService';
import { fixedWindowPerIp, fixedWindowPerEmail, dailyCapPerEmail } from '@/lib/rateLimiter';

const OTP_PEPPER = process.env.OTP_PEPPER || '';
if (!OTP_PEPPER) console.error('Missing OTP_PEPPER environment variable');

const OTP_LENGTH = 8;
const OTP_TTL_MS = 10 * 60 * 1000;
const RESEND_MIN_INTERVAL_MS = 60 * 1000; // 60s minimum gap
const DAILY_RESEND_CAP = 5;

const OTP_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const ResendSchema = z.object({ email: z.string().email() }).strict();

function generateOtp(len = OTP_LENGTH) {
  let s = '';
  for (let i = 0; i < len; i++) s += OTP_ALPHABET[crypto.randomInt(0, OTP_ALPHABET.length)];
  return s;
}
function hmacOtp(otp: string) {
  return crypto.createHmac('sha256', OTP_PEPPER).update(otp).digest('hex');
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  try {
    // IP rate limit
    if (!(await fixedWindowPerIp.allow(`resend:ip:${ip}`, 12, 60_000))) {
      return NextResponse.json({ message: 'If an account exists, a code will be sent.' }, { status: 200 });
    }

    const json = await req.json();
    const parsed = ResendSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ message: 'If an account exists, a code will be sent.' }, { status: 200 });
    }

    const email = parsed.data.email.trim().toLowerCase();

    // Per-email rate limit and daily cap
    if (!(await fixedWindowPerEmail.allow(`resend:email:${email}`, 6, 60_000))) {
      return NextResponse.json({ message: 'If an account exists, a code will be sent.' }, { status: 200 });
    }
    if (!(await dailyCapPerEmail.allow(`resend:daily:${email}`, DAILY_RESEND_CAP))) {
      return NextResponse.json({ message: 'If an account exists, a code will be sent.' }, { status: 200 });
    }

    const db = getAdminDb();
    const auth = getAdminAuth();

    // Look up user (unified 'users' collection)
    const snap = await db.collection('users').where('email', '==', email).limit(1).get();
    if (snap.empty) {
      // Anti-enumeration: generic response
      return NextResponse.json({ message: 'If an account exists, a code will be sent.' }, { status: 200 });
    }
    const userDoc = snap.docs[0];
    const user = userDoc.data();
    const uid = userDoc.id;

    if (user.emailVerified === true) {
      return NextResponse.json({ message: 'If an account exists, a code will be sent.' }, { status: 200 });
    }

    const verRef = db.collection('email_verifications').doc(uid);
    const verSnap = await verRef.get();
    const now = Date.now();
    const dayStartMs = new Date(new Date().toISOString().slice(0, 10)).getTime();

    let lastSentAt = 0;
    let resendCount = 0;
    let existingDayStart = dayStartMs;

    if (verSnap.exists) {
      const v = verSnap.data() as any;
      lastSentAt = v?.lastSentAt ?? 0;
      const sameDay = v?.dayStartMs === dayStartMs;
      resendCount = sameDay ? v?.resendCount ?? 0 : 0;
      existingDayStart = sameDay ? v?.dayStartMs : dayStartMs;

      // Enforce min interval
      if (now - lastSentAt < RESEND_MIN_INTERVAL_MS) {
        return NextResponse.json({ message: 'If an account exists, a code will be sent.' }, { status: 200 });
      }
    }

    // New OTP
    const otp = generateOtp();
    const otpHash = hmacOtp(otp);

    await verRef.set(
      {
        otpHash,
        expiresAt: now + OTP_TTL_MS,
        attempts: 0,
        maxAttempts: 5,
        resendCount: resendCount + 1,
        lastSentAt: now,
        dayStartMs: existingDayStart === dayStartMs ? dayStartMs : dayStartMs,
        createdAt: verSnap.exists ? (verSnap.data() as any).createdAt : now,
      },
      { merge: true }
    );

    await sendVerificationEmail(email, user.firstName ?? 'there', otp);
    try { await auth.updateUser(uid, { emailVerified: false }); } catch {}

    // Always generic
    return NextResponse.json({ message: 'If an account exists, a code will be sent.' }, { status: 200 });
  } catch (err) {
    console.error('Resend OTP Error:', err);
    return NextResponse.json({ message: 'If an account exists, a code will be sent.' }, { status: 200 });
  }
}
