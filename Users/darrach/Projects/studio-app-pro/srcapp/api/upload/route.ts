
'use server';

import { NextResponse } from 'next/server';
import { getAdminAuth, getAdminStorage } from '@/lib/firebase-admin';
import { headers } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

const UploadRequestSchema = z.object({
  files: z.array(z.object({
    name: z.string(),
    dataUri: z.string(),
  })).min(1),
});

async function uploadFileFromDataUri(dataUri: string, uid: string, fileName: string): Promise<string> {
    const storage = getAdminStorage();
    const bucket = storage.bucket();

    // Flexible regex to capture various MIME types for images, pdfs, audio, etc.
    const match = dataUri.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
    if (!match) {
        throw new Error(`Invalid Data URI for file: ${fileName}`);
    }
    const contentType = match[1];
    const base64Data = match[2];
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Use a more generic path for chat attachments
    const filePath = `chat-attachments/${uid}/${uuidv4()}-${fileName}`;
    const file = bucket.file(filePath);

    await file.save(buffer, {
        metadata: { contentType },
    });

    await file.makePublic();
    return file.publicUrl();
}

export async function POST(request: Request) {
  try {
    const headersList = headers();
    const idToken = headersList.get('Authorization')?.split('Bearer ')[1];
    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const decodedToken = await getAdminAuth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const body = await request.json();
    const validation = UploadRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const { files } = validation.data;

    const uploadPromises = files.map(file => uploadFileFromDataUri(file.dataUri, uid, file.name));
    const fileUrls = await Promise.all(uploadPromises);

    return NextResponse.json({ urls: fileUrls });

  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: error.message || 'Failed to upload files' }, { status: 500 });
  }
}
