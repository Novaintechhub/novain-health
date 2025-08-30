
"use client";

import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { getAuth, onIdTokenChanged, signOut, type User } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  role: 'doctor' | 'patient' | null;
  handleSignOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  role: null,
  handleSignOut: () => {},
});

const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'doctor' | 'patient' | null>(null);
  const [loading, setLoading] = useState(true);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = useCallback(async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      // The onIdTokenChanged listener will handle state updates
      // No need to redirect here as ProtectedLayout will handle it
    } catch (error) {
      console.error('Sign out error', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to sign out.',
      });
    }
  }, [toast]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    inactivityTimer.current = setTimeout(() => {
      toast({
        title: "You've been logged out",
        description: 'You were logged out due to inactivity.',
      });
      handleSignOut();
    }, INACTIVITY_TIMEOUT);
  }, [handleSignOut, toast]);

  useEffect(() => {
    if (user) {
      resetInactivityTimer();
      const events = ['mousemove', 'keydown', 'scroll', 'click'];
      events.forEach(event => window.addEventListener(event, resetInactivityTimer));

      return () => {
        events.forEach(event => window.removeEventListener(event, resetInactivityTimer));
        if (inactivityTimer.current) {
          clearTimeout(inactivityTimer.current);
        }
      };
    }
  }, [user, resetInactivityTimer]);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onIdTokenChanged(auth, async (newUser) => {
      setUser(newUser);
      if (newUser) {
        try {
          const tokenResult = await newUser.getIdTokenResult();
          const userRole = tokenResult.claims.role as 'doctor' | 'patient' | null;
          setRole(userRole);
        } catch (error) {
          console.error("Error getting user role:", error);
          setRole(null);
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, role, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
