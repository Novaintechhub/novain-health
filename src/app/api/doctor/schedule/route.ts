
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import { z } from 'zod';

const timeSlotSchema = z.object({
  start: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
  end: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
}).refine(data => data.start < data.end, {
  message: "Start time must be before end time",
});

const dailyScheduleSchema = z.array(timeSlotSchema).refine(slots => {
    if (slots.length <= 1) return true;
    const sortedSlots = [...slots].sort((a, b) => a.start.localeCompare(b.start));
    for (let i = 0; i < sortedSlots.length - 1; i++) {
        if (sortedSlots[i].end > sortedSlots[i + 1].start) {
            return false; // Found an overlap
        }
    }
    return true;
}, {
    message: "Time slots cannot overlap",
});

const availabilitySchema = z.record(z.string().regex(/^\d{4}-\d{2}-\d{2}$/), dailyScheduleSchema);

const schedulePayloadSchema = z.object({
  schedule: availabilitySchema,
  slotDuration: z.string().optional(),
});

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
    
    const data = doc.data();
    const schedule = {
        schedule: data?.schedule || {},
        slotDuration: data?.slotDuration || '30',
    };

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
    const validation = schedulePayloadSchema.safeParse(body);

    if (!validation.success) {
        const firstError = validation.error.errors[0];
        const errorMessage = `Invalid schedule for day ${firstError.path.slice(1).join(', ')}: ${firstError.message}`;
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const db = getAdminDb();
    const doctorRef = db.collection('doctors').doc(doctorId);
    
    await doctorRef.set({
        schedule: validation.data.schedule,
        slotDuration: validation.data.slotDuration,
    }, { merge: true });

    return NextResponse.json({ message: 'Schedule updated successfully' });
  } catch (error) {
    console.error('Error updating schedule:', error);
    return NextResponse.json({ error: 'Failed to update schedule' }, { status: 500 });
  }
}
