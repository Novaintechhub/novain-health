'use server';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAdminAuth, getAdminDb, getAdminStorage } from '@/lib/firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import { fileTypeFromBuffer } from 'file-type';
import crypto from 'crypto';
import { sendVerificationEmail } from '@/services/emailService';
import { fixedWindowPerIp, fixedWindowPerEmail } from '@/lib/rateLimiter';

const OTP_PEPPER = process.env.OTP_PEPPER || '';
if (!OTP_PEPPER) console.error('Missing OTP_PEPPER environment variable');

const OTP_LENGTH = 8;
const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
const MAX_OTP_ATTEMPTS = 5;

const OTP_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // avoid 0/O/1/I

const RegistrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  // Optional Data URI image
  profileImage: z.string().dataURI().optional(),
  // Any additional whitelisted fields go here; keep schema strict
}).strict();

function generateOtp(len = OTP_LENGTH) {
  let s = '';
  for (let i = 0; i < len; i++) s += OTP_ALPHABET[crypto.randomInt(0, OTP_ALPHABET.length)];
  return s;
}
function hmacOtp(otp: string) {
  return crypto.createHmac('sha256', OTP_PEPPER).update(otp).digest('hex');
}

async function uploadProfileImageDataUri(dataUri: string, uid: string) {
  const m = dataUri.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=]+)$/);
  if (!m) throw new Error('Invalid image data URI');
  const base64 = m[2];
  const buf = Buffer.from(base64, 'base64');

  const MAX_BYTES = 5 * 1024 * 1024; // 5MB
  if (buf.byteLength > MAX_BYTES) throw new Error('Image too large (>5MB)');

  const detected = await fileTypeFromBuffer(buf);
  const allowed = new Set(['image/png', 'image/jpeg', 'image/webp']);
  if (!detected || !allowed.has(detected.mime)) throw new Error('Unsupported image type');

  const storage = getAdminStorage();
  const bucket = storage.bucket();
  const ext = detected.ext;
  const filePath = `profile-images/${uid}/${uuidv4()}.${ext}`;
  const file = bucket.file(filePath);

  await file.save(buf, {
    metadata: { contentType: detected.mime, cacheControl: 'public,max-age=31536000,immutable' },
    resumable: false,
    validation: 'md5',
  });

  // Keep object private; store the path. Clients should fetch via a short-lived signed URL endpoint.
  return { storagePath: filePath };
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  try {
    // Basic anti-abuse (per-IP)
    if (!(await fixedWindowPerIp.allow(`register:ip:${ip}`, 5, 60_000))) {
      return NextResponse.json({ error: 'Too many attempts. Try again shortly.' }, { status: 429 });
    }

    const body = await req.json();
    const parsed = RegistrationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    const { email, password, firstName, lastName, profileImage, ...rest } = parsed.data;
    const emailNorm = email.trim().toLowerCase();

    // Per-email throttle
    if (!(await fixedWindowPerEmail.allow(`register:email:${emailNorm}`, 3, 60_000))) {
      return NextResponse.json({ error: 'Too many attempts for this email. Try again shortly.' }, { status: 429 });
    }

    const auth = getAdminAuth();
    const db = getAdminDb();
    const storage = getAdminStorage();

    let uid: string | null = null;
    let imagePath: string | null = null;

    try {
      // Create Firebase Auth user (no claims yet; not verified)
      const userRecord = await auth.createUser({
        email: emailNorm,
        password,
        displayName: `${firstName} ${lastName}`,
        emailVerified: false,
        disabled: false,
      });
      uid = userRecord.uid;

      if (profileImage) {
        const res = await uploadProfileImageDataUri(profileImage, uid);
        imagePath = res.storagePath;
      }

      // Minimal profile; unified collection
      const profileDoc = {
        uid,
        email: emailNorm,
        firstName,
        lastName,
        role: 'user',              // default; no elevation
        emailVerified: false,
        createdAt: new Date().toISOString(),
        imagePath: imagePath ?? null,
        ...rest,                   // ensure RegistrationSchema is strict
      };

      await db.collection('users').doc(uid).set(profileDoc, { merge: false });

      // Generate OTP + store server-side
      const otp = generateOtp();
      const otpHash = hmacOtp(otp);
      const now = Date.now();

      await db.collection('email_verifications').doc(uid).set({
        otpHash,
        expiresAt: now + OTP_TTL_MS,
        attempts: 0,
        maxAttempts: MAX_OTP_ATTEMPTS,
        resendCount: 1,
        lastSentAt: now,
        dayStartMs: new Date(new Date().toISOString().slice(0, 10)).getTime(),
        createdAt: now,
      });

      // Send verification email
      await sendVerificationEmail(emailNorm, firstName, otp);

      return NextResponse.json({
        message: 'User created. Verification email sent.',
        uid,
        email: emailNorm,
      });

    } catch (err: any) {
      // Compensation/rollback
      const dbi = getAdminDb();
      const authi = getAdminAuth();
      const bucketi = storage.bucket();

      if (uid) {
        try { await dbi.collection('users').doc(uid).delete(); } catch {}
        try { await dbi.collection('email_verifications').doc(uid).delete(); } catch {}
        try { await authi.deleteUser(uid); } catch {}
      }
      if (imagePath) {
        try { await bucketi.file(imagePath).delete({ ignoreNotFound: true }); } catch {}
      }

      if (err?.code === 'auth/email-already-exists') {
        return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
      }
      console.error('Registration Error:', err);
      return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
  } catch (err) {
    console.error('Registration Error (outer):', err);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
