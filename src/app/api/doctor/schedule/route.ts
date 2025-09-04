
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import { z } from 'zod';

// Schedule schema now validates keys as YYYY-MM-DD dates and values as arrays of time strings.
const scheduleSchema = z.record(
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Expected YYYY-MM-DD"),
  z.array(z.string())
);


export async function GET(request: Request) {
  try {
    const idToken = headers().get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = await getAdminAuth().verifyIdToken(idToken);
    const doctorId = decodedToken.uid;
    
    const db = getAdminDb();
    const doctorRef = db.collection('doctors').doc(doctorId);
    const doc = await doctorRef.get();

    if (!doc.exists) {
        return NextResponse.json({ error: 'Doctor profile not found' }, { status: 404 });
    }
    
    // The field is now 'availability' which stores date-specific slots
    const schedule = doc.data()?.availability || {};

    return NextResponse.json(schedule);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    return NextResponse.json({ error: 'Failed to fetch schedule' }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const idToken = headers().get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = await getAdminAuth().verifyIdToken(idToken);
    const doctorId = decodedToken.uid;
    
    const body = await request.json();
    const validation = scheduleSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const db = getAdminDb();
    const doctorRef = db.collection('doctors').doc(doctorId);
    
    // Storing under 'availability' field
    await doctorRef.set({
        availability: validation.data
    }, { merge: true });

    return NextResponse.json({ message: 'Schedule updated successfully' });
  } catch (error) {
    console.error('Error updating schedule:', error);
    return NextResponse.json({ error: 'Failed to update schedule' }, { status: 500 });
  }
}
