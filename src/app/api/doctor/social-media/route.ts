
'use server';

import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import { z } from 'zod';

const SocialMediaSchema = z.object({
  facebookUrl: z.string().url().optional().or(z.literal('')),
  twitterUrl: z.string().url().optional().or(z.literal('')),
  instagramUrl: z.string().url().optional().or(z.literal('')),
  pinterestUrl: z.string().url().optional().or(z.literal('')),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  youtubeUrl: z.string().url().optional().or(z.literal('')),
});

const getDetailsRef = (doctorId: string) => 
    getAdminDb().collection('doctors').doc(doctorId).collection('details').doc('profile');

export async function GET() {
  try {
    const headersList = headers();
    const idToken = headersList.get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = await getAdminAuth().verifyIdToken(idToken);
    const doctorId = decodedToken.uid;
    
    const detailsDoc = await getDetailsRef(doctorId).get();
    
    if (!detailsDoc.exists) {
        return NextResponse.json({
            facebookUrl: '',
            twitterUrl: '',
            instagramUrl: '',
            pinterestUrl: '',
            linkedinUrl: '',
            youtubeUrl: '',
        });
    }

    const data = detailsDoc.data() || {};
    const socialMediaData = {
        facebookUrl: data.facebookUrl || '',
        twitterUrl: data.twitterUrl || '',
        instagramUrl: data.instagramUrl || '',
        pinterestUrl: data.pinterestUrl || '',
        linkedinUrl: data.linkedinUrl || '',
        youtubeUrl: data.youtubeUrl || '',
    };
    
    return NextResponse.json(socialMediaData);
  } catch (error) {
    console.error('Error fetching social media links:', error);
    return NextResponse.json({ error: 'Failed to fetch social media links' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const headersList = headers();
    const idToken = headersList.get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = await getAdminAuth().verifyIdToken(idToken);
    const doctorId = decodedToken.uid;
    
    const body = await request.json();
    const validation = SocialMediaSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const detailsRef = getDetailsRef(doctorId);
    
    await detailsRef.set(validation.data, { merge: true });

    return NextResponse.json({ message: 'Social media links updated successfully' });
  } catch (error) {
    console.error('Error updating social media links:', error);
    return NextResponse.json({ error: 'Failed to update social media links' }, { status: 500 });
  }
}
