
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from './use-toast';
import type { Timestamp } from 'firebase/firestore';

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
    const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const fetchMessages = useCallback(async () => {
        if (!appointmentId || !user) {
            setLoading(false);
            return;
        }
        
        // Don't show loading skeleton on subsequent polls
        if (messages.length === 0) {
            setLoading(true);
        }
        setError(null);

        try {
            const idToken = await user.getIdToken();
            const response = await fetch(`/api/messages/${appointmentId}`, {
                headers: { 'Authorization': `Bearer ${idToken}` },
                cache: 'no-store', // Ensure fresh data
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch messages.');
            }
            const data: Message[] = await response.json();
            setMessages(data);
        } catch (err: any) {
            setError(err.message);
            toast({
                variant: 'destructive',
                title: 'Error Loading Chat',
                description: err.message
            });
            // Stop polling on error
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        } finally {
            if (loading) setLoading(false);
        }

    }, [appointmentId, user, toast, loading, messages.length]);


    useEffect(() => {
        fetchMessages(); // Initial fetch

        // Set up polling
        if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = setInterval(fetchMessages, 5000); // Poll every 5 seconds

        // Cleanup on unmount
        return () => {
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        };
    }, [fetchMessages]);

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
            
            // Immediately fetch messages after sending to get the latest update
            await fetchMessages();
            return true;

        } catch (err: any) {
            toast({
                variant: 'destructive',
                title: 'Message failed',
                description: err.message,
            });
            return false;
        }
    }, [appointmentId, user, toast, fetchMessages]);

    return { messages, loading, error, sendMessage };
}
