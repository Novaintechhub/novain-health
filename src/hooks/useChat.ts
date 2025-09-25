
"use client";

import { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { useToast } from './use-toast';

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
            return;
        }

        setLoading(true);
        setError(null);

        const messagesRef = collection(db, 'appointments', appointmentId, 'messages');
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
            console.error("Error fetching messages:", err);
            setError("Could not load messages. Please check your connection or permissions.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, [appointmentId, user]);

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
