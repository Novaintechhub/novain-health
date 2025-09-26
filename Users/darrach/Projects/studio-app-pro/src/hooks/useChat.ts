
"use client";

import { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { useAuth } from './use-auth';
import { useToast } from './use-toast';
import { FirestorePermissionError, errorEmitter } from '@/lib/firebase-error-handling';
import { v4 as uuidv4 } from 'uuid';

export type Message = {
    id: string;
    text?: string;
    senderId: string;
    timestamp: Timestamp | null;
    audioUrl?: string;
    fileUrl?: string;
    fileName?: string;
};

export type SendMessagePayload = {
  text?: string;
  attachment?: File;
  audio?: Blob;
};

async function uploadFile(file: File | Blob, uid: string, token: string): Promise<{ url: string, name: string }> {
  const isAudio = file instanceof Blob && !(file instanceof File);
  const fileName = isAudio ? `${uuidv4()}.webm` : (file as File).name;
  
  // Create a temporary data URI to pass to the upload endpoint
  const reader = new FileReader();
  const dataUriPromise = new Promise<string>((resolve, reject) => {
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  const dataUri = await dataUriPromise;

  const response = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      files: [{ name: fileName, dataUri }]
    }),
  });

  if (!response.ok) {
    throw new Error('File upload failed');
  }

  const result = await response.json();
  return { url: result.urls[0], name: fileName };
}


export function useChat(appointmentId: string | null) {
    const { user } = useAuth();
    const { toast } = useToast();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!appointmentId || !user) {
            setLoading(false);
            setMessages([]);
            return;
        }

        setLoading(true);
        setError(null);

        const messagesPath = `appointments/${appointmentId}/messages`;
        const messagesRef = collection(db, messagesPath);
        const q = query(messagesRef, orderBy('timestamp', 'asc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const msgs: Message[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                msgs.push({
                    id: doc.id,
                    text: data.text,
                    senderId: data.senderId,
                    timestamp: data.timestamp,
                    audioUrl: data.audioUrl,
                    fileUrl: data.fileUrl,
                    fileName: data.fileName,
                });
            });
            setMessages(msgs);
            setLoading(false);
        }, (err) => {
            if (err.code === 'permission-denied') {
                const customError = new FirestorePermissionError(
                    "Lacking permissions to read chat messages.",
                    messagesPath,
                    'list'
                );
                errorEmitter.emit('permission-error', customError);
                setError("You don't have permission to view these messages.");
            } else {
                console.error("Error fetching messages:", err);
                setError("Could not load messages.");
            }
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [appointmentId, user, toast]);

    const sendMessage = useCallback(async (payload: SendMessagePayload): Promise<boolean> => {
        if (!appointmentId || !user) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'You must be logged in to send a message.'
            });
            return false;
        }

        try {
            const idToken = await user.getIdToken();
            const messageData: Partial<Message> = {
                text: payload.text
            };
            let resourceDataForError = { text: payload.text };

            if (payload.attachment) {
                const { url, name } = await uploadFile(payload.attachment, user.uid, idToken);
                messageData.fileUrl = url;
                messageData.fileName = name;
                resourceDataForError = { ...resourceDataForError, ...messageData };
            } else if (payload.audio) {
                const { url } = await uploadFile(payload.audio, user.uid, idToken);
                messageData.audioUrl = url;
                resourceDataForError = { ...resourceDataForError, ...messageData };
            }

            const response = await fetch('/api/messages/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({ appointmentId, ...messageData }),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send message.');
            }
            return true;

        } catch (err: any) {
             if (err.message.includes('permission-denied')) {
                const customError = new FirestorePermissionError(
                    "Lacking permissions to send a message.",
                    `appointments/${appointmentId}/messages`,
                    'write',
                    { text: payload.text }
                );
                errorEmitter.emit('permission-error', customError);
            }
            toast({
                variant: 'destructive',
                title: 'Message failed',
                description: err.message,
            });
            return false;
        }
    }, [appointmentId, user, toast]);

    return { messages, loading, error, sendMessage };
}
