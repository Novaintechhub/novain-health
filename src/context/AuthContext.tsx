
"use client";

import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { getAuth, onIdTokenChanged, signOut, type User } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  const { toast } = useToast();

  const handleSignOut = useCallback(async () => {
    const auth = getAuth(app);
    // Determine where to redirect after logout based on the current role
    const redirectPath = role === 'doctor' ? '/doctor-login' : '/patient-login';
    
    try {
      await signOut(auth);
      setUser(null);
      setRole(null);
      router.push(redirectPath);
    } catch (error) {
      console.error('Sign out error', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to sign out.',
      });
    }
  }, [role, router, toast]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    inactivityTimer.current = setTimeout(() => {
      // Check if user is still logged in before logging out
      if (getAuth(app).currentUser) {
        toast({
          title: "You've been logged out",
          description: 'You were logged out due to inactivity.',
        });
        handleSignOut();
      }
    }, INACTIVITY_TIMEOUT);
  }, [handleSignOut, toast]);

  // This effect should only run when the user's login state changes
  useEffect(() => {
    // Only set up inactivity listeners if the user is logged in
    if (user) {
      resetInactivityTimer();
      const events: (keyof WindowEventMap)[] = ['mousemove', 'keydown', 'scroll', 'click'];
      events.forEach(event => window.addEventListener(event, resetInactivityTimer));

      return () => {
        events.forEach(event => window.removeEventListener(event, resetInactivityTimer));
        if (inactivityTimer.current) {
          clearTimeout(inactivityTimer.current);
        }
      };
    }
  }, [user, resetInactivityTimer, pathname]); // Re-run if user or path changes

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onIdTokenChanged(auth, async (newUser) => {
      setLoading(true);
      setUser(newUser);
      if (newUser) {
        try {
          const tokenResult = await newUser.getIdTokenResult();
          const userRole = tokenResult.claims.role as 'doctor' | 'patient' | null;
          setRole(userRole);
        } catch (error) {
          console.error("Error getting user role:", error);
          setRole(null);
          await signOut(auth); // Sign out if token is invalid
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
