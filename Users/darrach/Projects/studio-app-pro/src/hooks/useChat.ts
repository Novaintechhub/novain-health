
"use client";

import { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { useAuth } from './use-auth';
import { useToast } from './use-toast';
import { FirestorePermissionError, errorEmitter } from '@/lib/firebase-error-handling';

export type Message = {
    id: string;
    text: string;
    senderId: string;
    timestamp: Timestamp | null;
};

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

    const sendMessage = useCallback(async (text: string): Promise<boolean> => {
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
            const response = await fetch('/api/messages/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({ appointmentId, text }),
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
                    { text }
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
